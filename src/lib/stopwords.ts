// Shared between BM25 scoring and the hashed embedding layer. Filtering
// these out before hashing matters more for the embedding: without it,
// two completely unrelated sentences still share enough common function
// words (and their character trigrams) to produce a deceptively high
// cosine similarity — exactly the kind of noise the "data unavailable"
// fallback exists to avoid.
export const STOPWORDS = new Set([
  "the", "a", "an", "is", "are", "of", "for", "to", "in", "on", "and", "or",
  "what", "how", "do", "does", "can", "i", "my", "it", "this", "that", "with",
  "be", "was", "were", "will", "if", "under", "about", "which", "you", "your",
  "me", "we", "us", "am", "today", "like", "want", "would", "should", "could",
  "there", "here", "when", "where", "who", "why", "so", "as", "at", "by",
]);
