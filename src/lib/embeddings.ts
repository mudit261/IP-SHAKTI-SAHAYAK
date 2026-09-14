import { STOPWORDS } from "@/lib/stopwords";

const EMBED_DIM = 384;

// FNV-1a — fast, deterministic, no dependency.
function hashString(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function charTrigrams(token: string): string[] {
  const padded = `^${token}$`;
  if (padded.length <= 3) return [padded];
  const grams: string[] = [];
  for (let i = 0; i <= padded.length - 3; i++) grams.push(padded.slice(i, i + 3));
  return grams;
}

/**
 * Lightweight, dependency-free stand-in for a neural embedding model
 * (e.g. bge-m3 in the original architecture). Hashes word unigrams and
 * character trigrams of the input into a fixed-size vector (the "hashing
 * trick" / feature hashing), so morphological variants ("patent",
 * "patentable", "patenting") land close together in vector space even
 * without a trained model, model download, or API key. Runs in pure JS —
 * safe on the Cloudflare Workers edge runtime.
 *
 * This is NOT a semantic embedding: it won't know "herb" and "plant" are
 * related unless they share substrings. See README for what this
 * simulates vs. a real embedding model.
 */
export function embed(text: string): Float32Array {
  const vec = new Float32Array(EMBED_DIM);
  const tokens = text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((tok) => tok.length > 1 && !STOPWORDS.has(tok));

  for (const token of tokens) {
    vec[hashString(token) % EMBED_DIM] += 1;
    for (const gram of charTrigrams(token)) {
      vec[hashString(gram) % EMBED_DIM] += 0.4;
    }
  }

  let norm = 0;
  for (let i = 0; i < EMBED_DIM; i++) norm += vec[i] * vec[i];
  norm = Math.sqrt(norm) || 1;
  for (let i = 0; i < EMBED_DIM; i++) vec[i] /= norm;
  return vec;
}

// Both inputs are already L2-normalized by embed(), so dot product = cosine similarity.
export function cosineSimilarity(a: Float32Array, b: Float32Array): number {
  let dot = 0;
  for (let i = 0; i < a.length; i++) dot += a[i] * b[i];
  return dot;
}
