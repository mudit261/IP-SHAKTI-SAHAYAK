import { KnowledgeChunk, knowledgeBase } from "@/data/knowledgeBase";
import { embed, cosineSimilarity } from "@/lib/embeddings";
import { classifyJurisdiction, Jurisdiction } from "@/lib/jurisdiction";
import { STOPWORDS } from "@/lib/stopwords";

export type ScoredChunk = KnowledgeChunk & { score: number };

export type RetrievalResult = {
  results: ScoredChunk[];
  jurisdiction: Jurisdiction;
  matchedKeywords: string[];
  candidatesConsidered: number;
};

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((tok) => tok.length > 1);
}

const DOCS = knowledgeBase.map((chunk) => {
  const text = `${chunk.title} ${chunk.text} ${chunk.tags.join(" ")}`;
  return {
    chunk,
    tokens: tokenize(text),
    // Precomputed once at module load — see src/lib/embeddings.ts for what
    // this hashed vector does and doesn't capture.
    embedding: embed(text),
  };
});

const DOC_FREQ = new Map<string, number>();
for (const doc of DOCS) {
  const seen = new Set(doc.tokens);
  for (const tok of seen) {
    DOC_FREQ.set(tok, (DOC_FREQ.get(tok) ?? 0) + 1);
  }
}
const N = DOCS.length;
const AVG_LEN = DOCS.reduce((sum, d) => sum + d.tokens.length, 0) / N;

const K1 = 1.5;
const B = 0.75;

function idf(term: string): number {
  const df = DOC_FREQ.get(term) ?? 0;
  return Math.log(1 + (N - df + 0.5) / (df + 0.5));
}

function bm25Score(queryTerms: Map<string, number>, tokens: string[]): number {
  const docTermFreq = new Map<string, number>();
  for (const t of tokens) docTermFreq.set(t, (docTermFreq.get(t) ?? 0) + 1);

  let score = 0;
  for (const term of queryTerms.keys()) {
    const f = docTermFreq.get(term) ?? 0;
    if (f === 0) continue;
    const num = f * (K1 + 1);
    const den = f + K1 * (1 - B + B * (tokens.length / AVG_LEN));
    score += idf(term) * (num / den);
  }
  return score;
}

// Weight for the dense (hashed-embedding) signal relative to BM25. Dense
// cosine similarity is already in [0, 1]; this scales it into the same
// rough range as BM25 scores so neither signal silently dominates.
const DENSE_WEIGHT = 4;
// When a doc has zero lexical overlap with the query (no BM25/tag/section
// hit at all), require a stronger cosine similarity before the dense signal
// alone can surface it — guards against generic hashed-vector noise between
// unrelated sentences pushing an off-topic query past CONFIDENCE_THRESHOLD.
const DENSE_ONLY_FLOOR = 0.32;
const JURISDICTION_BOOST = 1.5;
const RERANK_POOL_SIZE = 8;
// Weight for the rerank-stage term-coverage bonus (see rerank() below).
const COVERAGE_WEIGHT = 2;

/**
 * Stage 1 — retrieve: score every doc with a fused BM25 (lexical) + hashed
 * dense-embedding (cosine) signal, boosted by jurisdiction-router agreement
 * and a couple of exact-match heuristics. This is the "hybrid search"
 * (BM25 + dense vectors) from the architecture — the dense half is a local,
 * dependency-free hashed embedding rather than a trained model; see
 * src/lib/embeddings.ts.
 */
function retrieveCandidates(query: string, jurisdiction: Jurisdiction): ScoredChunk[] {
  const queryTokens = tokenize(query).filter((t) => !STOPWORDS.has(t));
  if (queryTokens.length === 0) return [];

  const termFreqQuery = new Map<string, number>();
  for (const t of queryTokens) termFreqQuery.set(t, (termFreqQuery.get(t) ?? 0) + 1);

  const queryEmbedding = embed(query);
  const lowerQuery = query.toLowerCase();

  const scored: ScoredChunk[] = DOCS.map(({ chunk, tokens, embedding }) => {
    const bm25 = bm25Score(termFreqQuery, tokens);
    const dense = Math.max(0, cosineSimilarity(queryEmbedding, embedding));

    const tagBoost = chunk.tags.reduce(
      (acc, tag) => (lowerQuery.includes(tag.toLowerCase()) ? acc + 2 : acc),
      0
    );
    const sectionBoost = chunk.section.toLowerCase().includes(lowerQuery.trim()) ? 3 : 0;
    const jurisdictionBoost =
      jurisdiction !== "general" && chunk.jurisdiction === jurisdiction ? JURISDICTION_BOOST : 0;

    const hasLexicalSignal = bm25 > 0 || tagBoost > 0 || sectionBoost > 0;
    const denseContribution =
      hasLexicalSignal || dense > DENSE_ONLY_FLOOR ? dense * DENSE_WEIGHT : 0;

    const score = bm25 + denseContribution + tagBoost + sectionBoost + jurisdictionBoost;
    return { ...chunk, score };
  });

  return scored.filter((s) => s.score > 0).sort((a, b) => b.score - a.score);
}

/**
 * Stage 2 — rerank: a second, distinct pass over the retrieval shortlist,
 * standing in for the "BGE Reranker" step in the architecture. It's a
 * heuristic (query-term coverage: what fraction of the query's distinct
 * terms actually appear in the chunk) rather than a trained cross-encoder,
 * but it genuinely re-scores and re-sorts the candidate pool rather than
 * just trusting stage 1's ranking.
 */
function rerank(query: string, candidates: ScoredChunk[]): ScoredChunk[] {
  const queryTerms = new Set(tokenize(query).filter((t) => !STOPWORDS.has(t)));
  if (queryTerms.size === 0) return candidates;

  return candidates
    .map((c) => {
      const chunkTokens = new Set(tokenize(`${c.title} ${c.text} ${c.tags.join(" ")}`));
      const covered = [...queryTerms].filter((t) => chunkTokens.has(t)).length;
      const coverage = covered / queryTerms.size;
      return { ...c, score: c.score + coverage * COVERAGE_WEIGHT };
    })
    .sort((a, b) => b.score - a.score);
}

/** Full retrieve-then-rerank pipeline, plus the jurisdiction the query was routed to. */
export function retrieve(query: string, topK = 4): RetrievalResult {
  const { jurisdiction, matchedKeywords } = classifyJurisdiction(query);
  const candidates = retrieveCandidates(query, jurisdiction).slice(0, RERANK_POOL_SIZE);
  const reranked = rerank(query, candidates);

  return {
    results: reranked.slice(0, topK),
    jurisdiction,
    matchedKeywords,
    candidatesConsidered: candidates.length,
  };
}

// Kept for callers that only want the ranked chunks (e.g. quick scripts/tests).
export function hybridSearch(query: string, topK = 4): ScoredChunk[] {
  return retrieve(query, topK).results;
}

// Confidence threshold below which we trigger the zero-hallucination fallback.
export const CONFIDENCE_THRESHOLD = 1.2;
