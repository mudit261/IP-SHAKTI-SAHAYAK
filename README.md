# IP-SAKTI Sahayak

IP-SAKTI Sahayak is a multilingual, evidence-grounded guide for India's intellectual
property, AYUSH, and biodiversity obligations — built for Smart India Hackathon
(Problem ID SIH26045). It's a Next.js (TypeScript, Tailwind) app deployed to Cloudflare
Workers via OpenNext.

**This is a hackathon prototype, not legal advice.** Every answer is meant to point
people toward the right official source or professional, not replace one.

## Running locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`. The homepage (`/`) is a marketing/explainer page
with a live demo widget; the working tool lives at `/chat`, `/wizard`, and `/lookup`.

## What's actually in this repo

| Page | What it does |
| --- | --- |
| `/` | Explainer/marketing homepage, with a live demo of the assistant (`DemoWidget`) |
| `/chat` | The full assistant — ask a question, get a cited answer |
| `/wizard` | A branching questionnaire that produces a step-by-step compliance roadmap |
| `/lookup` | Herb name → Sanskrit → botanical name → IP/biopiracy notes |

### The retrieval pipeline (`/api/chat`)

```
query → jurisdiction router → hybrid retrieval (BM25 + hashed embedding)
      → rerank (term coverage) → confidence gate → answer
                                                   ├─ confident:  LLM synthesis (if configured)
                                                   │              or extractive fallback
                                                   └─ not confident: "data unavailable" — no guessing
```

1. **Jurisdiction router** (`src/lib/jurisdiction.ts`) — a heuristic keyword
   classifier that routes the query to `patent` / `biodiversity` / `ayush` /
   `trademark_gi` / `general` before retrieval, mirroring the deck's
   "Jurisdiction Router." It's an auditable keyword match, not a trained
   intent classifier.
2. **Hybrid retrieval** (`src/lib/search.ts`) — fuses a BM25 lexical score
   with cosine similarity from a local, dependency-free hashed n-gram
   embedding (`src/lib/embeddings.ts`), plus jurisdiction/tag/section
   boosts. The embedding step means morphological variants ("patent" /
   "patentable" / "patenting") land close together even without an exact
   keyword match — see the caveat below.
3. **Rerank** (`src/lib/search.ts` → `rerank()`) — a second, distinct pass
   over the top candidates that re-scores by query-term coverage, standing
   in for the deck's BGE Reranker step.
4. **Confidence gate** — if the top reranked score is below
   `CONFIDENCE_THRESHOLD`, the API returns the "I couldn't find a confident
   match" fallback instead of ever letting the LLM improvise. This is the
   zero-hallucination guarantee, and it's enforced in code, not by prompting.
5. **Answer generation** (`src/lib/llm.ts`) — see below.

All of this runs entirely in JS on the Cloudflare Workers edge runtime — no
Python service, no external vector DB, no model download.

### Enabling LLM-synthesized answers

By default (including the live deployment) there's no `ANTHROPIC_API_KEY`
configured, so answers are built **extractively** — the retrieved snippets are
concatenated and cited directly. This is fully grounded and works offline, but
reads a bit like a document excerpt rather than a conversational answer.

To turn on fluent, multilingual LLM synthesis on top of the same retrieved,
cited context:

```bash
# .env.local (local dev)
ANTHROPIC_API_KEY=sk-ant-...
```

For the Cloudflare deployment, set it as a Worker secret instead of an env file:

```bash
npx wrangler secret put ANTHROPIC_API_KEY
```

When the key is present, `src/lib/llm.ts` sends the retrieved snippets (already
selected by the confidence-gated pipeline above) to Claude with an instruction
to answer only from that context, cite it inline, say so if the context doesn't
actually answer the question, and respond in the requested language. If the
API call fails for any reason (bad key, network, rate limit), it returns `null`
and the route transparently falls back to the extractive path — there's no
user-facing error state that depends on the key being valid.

## Roadmap: what's simulated vs. what's real

The pitch deck describes a production system (Qdrant + Neo4j + a FastAPI/Python
backend + local Llama/Qwen inference + AI4Bharat/Bhashini speech + a Flutter
mobile app + Redis caching + live NBA-portal automation). Building all of that
needs paid infra and API keys this prototype doesn't have. Rather than fake
those pieces, here's an honest accounting:

| Deck concept | This prototype | Status |
| --- | --- | --- |
| Hybrid search (BM25 + dense vectors) | BM25 + a local hashed n-gram embedding, fused in `search.ts` | **Real**, but the "dense" half is a lightweight hash-based approximation, not a trained embedding model (see caveat below) |
| Jurisdiction Router | Keyword classifier in `jurisdiction.ts` | **Real**, heuristic rather than ML |
| BGE Reranker | Term-coverage rerank pass in `search.ts` | **Real**, heuristic rather than a trained cross-encoder |
| Zero-hallucination fallback | Confidence-gated "data unavailable" response | **Real**, enforced in code |
| Multilingual voice UI | Browser Web Speech API (`useVoice.ts`) for mic input + speech synthesis output; 7-language UI chrome | **Real**, but browser-only — no AI4Bharat/Whisper backend, no dedicated mobile app |
| LLM answer synthesis | Claude, via `ANTHROPIC_API_KEY` | **Real when configured**, extractive fallback otherwise (see above) |
| Neo4j knowledge graph (formulation mapping) | Static TypeScript array in `src/data/entities.ts`, traversed by `/api/entity` | **Simulated** — a small curated table (7 herbs), not a queryable graph database |
| Qdrant vector DB | In-memory hashed vectors computed at module load | **Simulated locally** — would need a real embedding model + a vector DB to scale past the ~16 curated knowledge-base chunks |
| FastAPI/Python backend, LangChain/LlamaIndex | Next.js API routes | **Different implementation**, same role — everything runs in one edge-deployable app instead of a separate Python service |
| Local Llama 3 / Qwen 2.5 inference | Claude API (optional) | **Different model**, no self-hosted inference in this environment |
| AI4Bharat / Bhashini translation | None — browser Web Speech API + hand-authored UI translations | **Not implemented** — there's no server-side translation step |
| Redis response caching | None | **Not implemented** |
| Live NBA portal / Form I–IV filing automation | Static informational content about what each form is for | **Not implemented** — no integration with any government portal |
| Knowledge base coverage | ~16 curated, paraphrased legal snippets (Patents Act, Biological Diversity Act/Rules, AYUSH licensing, GI Act, 2 landmark cases) | **Illustrative**, not a complete corpus of Indian IP/AYUSH/biodiversity law |

**Caveat on the "dense embedding" layer:** `src/lib/embeddings.ts` hashes word
unigrams and character trigrams into a fixed-size vector (the classic "hashing
trick"). It's genuinely useful — it's dependency-free, runs on the Workers edge
runtime with no model download, and catches morphological overlap that pure
keyword BM25 misses. But it has no trained notion of meaning: it won't connect
"herb" and "plant" unless they share substrings. A production version would
swap this for a real multilingual embedding model (e.g. bge-m3, as in the
original deck) — the fusion point in `search.ts` is already where that would
plug in.

## Deployment (Cloudflare Workers via OpenNext)

```bash
npm run cf:build     # build for Cloudflare Workers
npm run cf:preview   # build + local preview under the Workers runtime
npm run cf:deploy    # build + deploy
```

Configuration lives in `wrangler.jsonc` and `open-next.config.ts`. Secrets
(like `ANTHROPIC_API_KEY`) are set via `npx wrangler secret put <NAME>`, not
committed to the repo.

## Development

```bash
npm run lint
npm run build
```
