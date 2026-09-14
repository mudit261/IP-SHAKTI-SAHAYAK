"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Leaf, AlertTriangle, BookOpen } from "lucide-react";
import type { ChatResponse, ChatSource } from "@/app/api/chat/route";

const languages = [
  {
    code: "en" as const,
    label: "English",
    tag: "ENGLISH · LIVE",
    greeting:
      "Namaste. Tell me about the plant, practice, or product you are working with — I'll search the real knowledge base and cite my sources.",
    placeholder: "e.g. Can I patent a turmeric wound-healing formulation?",
    suggestion: "Can I patent a turmeric wound-healing formulation?",
  },
  {
    code: "hi" as const,
    label: "हिन्दी",
    tag: "हिन्दी · लाइव",
    greeting:
      "नमस्ते। मुझे उस पौधे, प्रथा या उत्पाद के बारे में बताएं जिस पर आप काम कर रहे हैं — मैं असली नॉलेज बेस खोजूंगा और स्रोत बताऊंगा।",
    placeholder: "जैसे, NBA फॉर्म II किसलिए है?",
    suggestion: "NBA फॉर्म II किसलिए है?",
  },
  {
    code: "ta" as const,
    label: "தமிழ்",
    tag: "தமிழ் · நேரலை",
    greeting:
      "வணக்கம். நீங்கள் பணிபுரியும் தாவரம், நடைமுறை அல்லது தயாரிப்பைப் பற்றி சொல்லுங்கள் — உண்மையான தரவுத்தளத்தில் தேடி மூலங்களைக் காட்டுகிறேன்.",
    placeholder: "எ.கா. classical மற்றும் proprietary ஆயுஷ் மருந்துக்கு என்ன வித்தியாசம்?",
    suggestion: "classical மற்றும் proprietary ஆயுஷ் மருந்துக்கு என்ன வித்தியாசம்?",
  },
];

type Message = {
  role: "user" | "assistant";
  text: string;
  confident?: boolean;
  llmSynthesized?: boolean;
  sources?: ChatSource[];
  jurisdictionLabel?: string;
};

export function DemoWidget() {
  const [active, setActive] = useState(languages[0].code);
  const lang = languages.find((l) => l.code === active) ?? languages[0];

  const [messagesByLang, setMessagesByLang] = useState<Record<string, Message[]>>({});
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const messages = messagesByLang[active] ?? [];

  function setMessages(next: Message[]) {
    setMessagesByLang((prev) => ({ ...prev, [active]: next }));
  }

  function switchLanguage(code: typeof active) {
    setActive(code);
    setInput("");
  }

  async function ask(question: string) {
    const query = question.trim();
    if (!query || loading) return;

    const base = messages.length > 0 ? messages : [{ role: "assistant" as const, text: lang.greeting }];
    const withUser = [...base, { role: "user" as const, text: query }];
    setMessages(withUser);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ query, language: active }),
      });
      const data: ChatResponse = await res.json();
      setMessages([
        ...withUser,
        {
          role: "assistant",
          text: data.answer,
          confident: data.confident,
          llmSynthesized: data.llmSynthesized,
          sources: data.sources,
          jurisdictionLabel: data.jurisdictionLabel,
        },
      ]);
    } catch {
      setMessages([
        ...withUser,
        { role: "assistant", text: "Something went wrong reaching the assistant. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  const displayMessages = messages.length > 0 ? messages : [{ role: "assistant" as const, text: lang.greeting }];

  return (
    <div className="grid overflow-hidden rounded-3xl border border-[#f5f0e4]/10 bg-[#173a3d] lg:grid-cols-[minmax(0,340px)_1fr]">
      <div className="flex flex-col justify-between p-8 sm:p-10">
        <div>
          <p className="font-mono text-xs tracking-[0.2em] text-[#dca12f]">04 / TRY THE GUIDE</p>
          <h3 className="mt-4 font-serif text-4xl leading-[1.1] text-[#f5f0e4] sm:text-5xl">
            Ask the first question.
          </h3>
          <p className="mt-5 max-w-xs text-[#f5f0e4]/60">
            This calls the same retrieval-and-citation pipeline as the full assistant. It is a
            hackathon prototype, not legal advice.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {languages.map((l) => (
            <button
              key={l.code}
              type="button"
              onClick={() => switchLanguage(l.code)}
              className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                active === l.code
                  ? "border-[#dca12f] bg-[#dca12f] text-[#122d31]"
                  : "border-[#f5f0e4]/20 text-[#f5f0e4]/70 hover:border-[#f5f0e4]/40"
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>

        <Link
          href="/chat"
          className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-[#dca12f] hover:text-[#e2b65d]"
        >
          Open the full assistant
          <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
        </Link>
      </div>

      <div className="flex flex-col bg-[#f3eddf]">
        <div className="flex-1 space-y-4 overflow-y-auto p-6 sm:p-8" style={{ maxHeight: 420 }}>
          <p className="font-mono text-[10px] tracking-[0.2em] text-[#122d31]/40">{lang.tag}</p>

          {displayMessages.map((m, i) =>
            m.role === "assistant" ? (
              <div key={i} className="flex items-start gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#dfe9d8] text-[#53775f]">
                  <Leaf className="h-4 w-4" strokeWidth={1.75} />
                </span>
                <div className="max-w-md rounded-2xl rounded-tl-sm bg-[#dfe9d8] px-4 py-3 text-[#122d31]">
                  {m.confident === false && (
                    <p className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-[#a15c1f]">
                      <AlertTriangle className="h-3.5 w-3.5" strokeWidth={2} />
                      Low confidence — flagged instead of guessing
                    </p>
                  )}
                  {m.jurisdictionLabel && (
                    <p className="mb-1 font-mono text-[10px] uppercase tracking-wide text-[#122d31]/40">
                      Routed as: {m.jurisdictionLabel}
                    </p>
                  )}
                  <p className="whitespace-pre-wrap text-sm leading-relaxed">{m.text}</p>

                  {m.sources && m.sources.length > 0 && (
                    <div className="mt-3 space-y-1.5 border-t border-[#122d31]/10 pt-2">
                      <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide text-[#122d31]/50">
                        <BookOpen className="h-3 w-3" strokeWidth={2} />
                        Sources
                      </p>
                      {m.sources.map((s) => (
                        <p key={s.id} className="text-xs text-[#122d31]/70">
                          <span className="font-medium">{s.source}</span> — {s.section}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div key={i} className="flex justify-end">
                <div className="max-w-md rounded-2xl rounded-tr-sm bg-[#e8dfce] px-4 py-3 text-sm text-[#122d31]">
                  {m.text}
                </div>
              </div>
            )
          )}

          {loading && (
            <div className="flex items-start gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#dfe9d8] text-[#53775f]">
                <Leaf className="h-4 w-4" strokeWidth={1.75} />
              </span>
              <div className="rounded-2xl rounded-tl-sm bg-[#dfe9d8] px-4 py-3 text-sm text-[#122d31]/60">
                Retrieving &amp; grounding answer…
              </div>
            </div>
          )}

          {messages.length === 0 && (
            <button
              type="button"
              onClick={() => ask(lang.suggestion)}
              className="flex items-center gap-2 pt-2 text-sm text-[#122d31]/50 hover:text-[#122d31]"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#dca12f]" />
              Try: &ldquo;{lang.suggestion}&rdquo;
            </button>
          )}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            ask(input);
          }}
          className="flex items-center gap-3 border-t border-[#122d31]/10 bg-[#fbf8f0] px-6 py-4 sm:px-8"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={lang.placeholder}
            className="flex-1 bg-transparent text-sm text-[#122d31] placeholder:text-[#122d31]/40 focus:outline-none"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#dca12f] text-[#122d31] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
          </button>
        </form>
      </div>
    </div>
  );
}
