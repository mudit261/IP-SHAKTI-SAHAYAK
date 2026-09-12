import { ScoredChunk } from "@/lib/search";

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const MODEL = "claude-sonnet-5";

// Optional LLM synthesis step. If no API key is configured, callers fall back
// to purely extractive answers built from retrieved snippets — the app is
// fully functional offline; this just upgrades fluency/translation when a
// key is available, mirroring the "Guardrailed Prompt" stage in the architecture.
export async function synthesizeAnswer(
  query: string,
  chunks: ScoredChunk[],
  languageLabel: string
): Promise<string | null> {
  if (!ANTHROPIC_API_KEY || chunks.length === 0) return null;

  const context = chunks
    .map((c, i) => `[${i + 1}] ${c.source} — ${c.section}\n${c.text}`)
    .join("\n\n");

  const prompt = `You are IP-SAKTI Sahayak, an assistant on Indian IP law, biodiversity/NBA compliance, and AYUSH regulation.
Answer the user's question using ONLY the numbered context snippets below. Cite snippets inline like [1], [2].
If the context does not actually answer the question, say so plainly instead of guessing.
Respond in ${languageLabel}. Keep the answer under 180 words.

Context:
${context}

Question: ${query}`;

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 500,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!res.ok) {
      console.error("Anthropic API error", res.status, await res.text());
      return null;
    }

    const data = await res.json();
    const text = data?.content?.[0]?.text;
    return typeof text === "string" ? text.trim() : null;
  } catch (err) {
    console.error("LLM synthesis failed", err);
    return null;
  }
}

export const LLM_CONFIGURED = Boolean(ANTHROPIC_API_KEY);
