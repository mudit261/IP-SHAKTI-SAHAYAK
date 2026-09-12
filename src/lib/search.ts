import { KnowledgeChunk, knowledgeBase } from "@/data/knowledgeBase";

export type ScoredChunk = KnowledgeChunk & { score: number };

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((tok) => tok.length > 1);
}

const STOPWORDS = new Set([
  "the", "a", "an", "is", "are", "of", "for", "to", "in", "on", "and", "or",
  "what", "how", "do", "does", "can", "i", "my", "it", "this", "that", "with",
  "be", "was", "were", "will", "if", "under", "about", "which",
]);

const DOCS = knowledgeBase.map((chunk) => ({
  chunk,
  tokens: tokenize(`${chunk.title} ${chunk.text} ${chunk.tags.join(" ")}`),
}));

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

// BM25 sparse scoring (stands in for the "BM25 + Dense Vectors" hybrid search
// described in the architecture) plus a tag/exact-phrase boost that simulates
// the extra precision a dense embedding + reranker pass would add.
export function hybridSearch(query: string, topK = 3): ScoredChunk[] {
  const queryTokens = tokenize(query).filter((t) => !STOPWORDS.has(t));
  if (queryTokens.length === 0) return [];

  const termFreqQuery = new Map<string, number>();
  for (const t of queryTokens) termFreqQuery.set(t, (termFreqQuery.get(t) ?? 0) + 1);

  const scored: ScoredChunk[] = DOCS.map(({ chunk, tokens }) => {
    const docTermFreq = new Map<string, number>();
    for (const t of tokens) docTermFreq.set(t, (docTermFreq.get(t) ?? 0) + 1);

    let bm25 = 0;
    for (const term of termFreqQuery.keys()) {
      const f = docTermFreq.get(term) ?? 0;
      if (f === 0) continue;
      const num = f * (K1 + 1);
      const den = f + K1 * (1 - B + B * (tokens.length / AVG_LEN));
      bm25 += idf(term) * (num / den);
    }

    const lowerQuery = query.toLowerCase();
    const tagBoost = chunk.tags.reduce(
      (acc, tag) => (lowerQuery.includes(tag.toLowerCase()) ? acc + 2 : acc),
      0
    );
    const sectionBoost = chunk.section.toLowerCase().includes(lowerQuery.trim())
      ? 3
      : 0;

    return { ...chunk, score: bm25 + tagBoost + sectionBoost };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);
}

// Confidence threshold below which we trigger the zero-hallucination fallback.
export const CONFIDENCE_THRESHOLD = 1.2;
