"use client";

import { useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { languages, t } from "@/data/languages";
import { useVoiceInput, speak } from "@/lib/useVoice";
import type { ChatResponse, ChatSource } from "@/app/api/chat/route";

type Message = {
  role: "user" | "assistant";
  text: string;
  confident?: boolean;
  llmSynthesized?: boolean;
  sources?: ChatSource[];
  jurisdictionLabel?: string;
  candidatesConsidered?: number;
};

const SUGGESTIONS = [
  "Can I patent an ashwagandha extract?",
  "What is NBA Form II used for?",
  "Is turmeric wound-healing patentable?",
  "Difference between classical and proprietary AYUSH medicine",
];

export default function ChatPage() {
  const { code } = useLanguage();
  const activeLanguage = languages.find((l) => l.code === code) ?? languages[0];

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text:
        "Namaste! Ask me about patents, traditional knowledge, NBA/biodiversity approvals, or AYUSH licensing. I'll cite the exact Act, Section or case behind every answer.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const { listening, supported, start, stop } = useVoiceInput(
    activeLanguage.speechLocale,
    (transcript) => {
      setInput(transcript);
    }
  );

  async function sendMessage(text: string) {
    const query = text.trim();
    if (!query || loading) return;

    setMessages((prev) => [...prev, { role: "user", text: query }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ query, language: code }),
      });
      const data: ChatResponse = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: data.answer,
          confident: data.confident,
          llmSynthesized: data.llmSynthesized,
          sources: data.sources,
          jurisdictionLabel: data.jurisdictionLabel,
          candidatesConsidered: data.candidatesConsidered,
        },
      ]);
      speak(data.answer, activeLanguage.speechLocale);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: "Something went wrong reaching the assistant. Please try again." },
      ]);
    } finally {
      setLoading(false);
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
    }
  }

  return (
    <div className="mx-auto flex max-w-3xl flex-col px-4 py-8 sm:px-6" style={{ minHeight: "calc(100vh - 8rem)" }}>
      <div className="mb-4">
        <h1 className="text-xl font-semibold text-white">Ask the Assistant</h1>
        <p className="text-sm text-slate-400">{t("tagline", code)}</p>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto rounded-xl border border-slate-800 bg-slate-900/40 p-4">
        {messages.map((m, i) => (
          <div key={i} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                m.role === "user"
                  ? "bg-teal-500 text-slate-950"
                  : "bg-slate-800 text-slate-100"
              }`}
            >
              {m.role === "assistant" && m.confident === false && (
                <span className="mb-1 inline-block rounded-full bg-amber-500/15 px-2 py-0.5 text-[11px] font-medium text-amber-400">
                  ⚠ low confidence
                </span>
              )}
              {m.role === "assistant" && m.confident && (
                <span className="mb-1 inline-block rounded-full bg-teal-500/15 px-2 py-0.5 text-[11px] font-medium text-teal-400">
                  {m.llmSynthesized ? "Grounded · AI-synthesized" : "Grounded · extractive"}
                </span>
              )}
              {m.role === "assistant" && m.jurisdictionLabel && (
                <p className="mb-1.5 font-mono text-[10px] uppercase tracking-wide text-slate-500">
                  Routed as: {m.jurisdictionLabel}
                  {typeof m.candidatesConsidered === "number" &&
                    ` · ${m.candidatesConsidered} candidates retrieved → reranked`}
                </p>
              )}
              <p className="whitespace-pre-wrap">{m.text}</p>

              {m.sources && m.sources.length > 0 && (
                <div className="mt-3 space-y-2 border-t border-slate-700/60 pt-2">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                    {t("sources", code)}
                  </p>
                  {m.sources.map((s) => (
                    <div key={s.id} className="rounded-lg bg-slate-900/70 p-2 text-xs text-slate-300">
                      <p className="font-medium text-slate-200">
                        {s.source} — {s.section}
                      </p>
                      <p className="mt-0.5 text-slate-400">{s.title}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="rounded-2xl bg-slate-800 px-4 py-3 text-sm text-slate-400">
              Retrieving & grounding answer…
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            onClick={() => sendMessage(s)}
            className="rounded-full border border-slate-800 bg-slate-900 px-3 py-1 text-xs text-slate-300 hover:border-teal-500 hover:text-teal-400"
          >
            {s}
          </button>
        ))}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage(input);
        }}
        className="mt-3 flex items-center gap-2"
      >
        <button
          type="button"
          onClick={() => (listening ? stop() : start())}
          disabled={!supported}
          title={supported ? "Voice input" : "Voice input not supported in this browser"}
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border text-lg ${
            listening
              ? "mic-active border-teal-500 bg-teal-500/20 text-teal-400"
              : "border-slate-700 bg-slate-900 text-slate-300 hover:border-teal-500"
          } disabled:cursor-not-allowed disabled:opacity-40`}
        >
          🎙
        </button>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={listening ? t("listening", code) : t("askPlaceholder", code)}
          className="flex-1 rounded-full border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-teal-500 focus:outline-none"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="rounded-full bg-teal-500 px-5 py-3 text-sm font-semibold text-slate-950 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {t("send", code)}
        </button>
      </form>
    </div>
  );
}
