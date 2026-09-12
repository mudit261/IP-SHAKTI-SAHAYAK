import { NextRequest, NextResponse } from "next/server";
import { hybridSearch, CONFIDENCE_THRESHOLD } from "@/lib/search";
import { synthesizeAnswer, LLM_CONFIGURED } from "@/lib/llm";
import { languages, LanguageCode } from "@/data/languages";

export type ChatSource = {
  id: string;
  source: string;
  section: string;
  title: string;
  text: string;
  score: number;
};

export type ChatResponse = {
  answer: string;
  confident: boolean;
  llmSynthesized: boolean;
  sources: ChatSource[];
};

export async function POST(req: NextRequest) {
  let body: { query?: string; language?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const query = (body.query ?? "").trim();
  const languageCode = (body.language ?? "en") as LanguageCode;
  if (!query) {
    return NextResponse.json({ error: "Query is required" }, { status: 400 });
  }
  if (query.length > 2000) {
    return NextResponse.json({ error: "Query is too long" }, { status: 400 });
  }

  const results = hybridSearch(query, 4);
  const topScore = results[0]?.score ?? 0;
  const confident = results.length > 0 && topScore >= CONFIDENCE_THRESHOLD;

  const languageLabel =
    languages.find((l) => l.code === languageCode)?.label ?? "English";

  let answer: string;
  let llmSynthesized = false;

  if (!confident) {
    answer =
      "I couldn't find a confident match for this in the current knowledge base. " +
      "Rather than guess, I'm flagging this as unresolved — please verify with an " +
      "official source (India Patent Office, NBA, or Ministry of AYUSH) or a qualified consultant. " +
      (results.length > 0
        ? "The closest related topics I found are listed below in case they help."
        : "");
  } else {
    const llmAnswer = await synthesizeAnswer(query, results, languageLabel);
    if (llmAnswer) {
      answer = llmAnswer;
      llmSynthesized = true;
    } else {
      // Extractive fallback: present retrieved snippets directly, fully grounded.
      answer = results
        .slice(0, 2)
        .map((r) => `**${r.section}** (${r.source}): ${r.text}`)
        .join("\n\n");
    }
  }

  const response: ChatResponse = {
    answer,
    confident,
    llmSynthesized,
    sources: results.map((r) => ({
      id: r.id,
      source: r.source,
      section: r.section,
      title: r.title,
      text: r.text,
      score: Math.round(r.score * 100) / 100,
    })),
  };

  return NextResponse.json(response);
}

export async function GET() {
  return NextResponse.json({
    status: "ok",
    llmConfigured: LLM_CONFIGURED,
    note: "POST { query, language } to this endpoint.",
  });
}
