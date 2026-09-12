"use client";

import { useState } from "react";
import { ArrowUpRight, Leaf } from "lucide-react";

const languages = [
  {
    code: "en",
    label: "English",
    tag: "ENGLISH · PRELIMINARY",
    greeting:
      "Namaste. Tell me about the plant, practice, or product you are working with. I'll help map the questions worth asking first.",
    user: "I want to develop a herbal formulation using a local plant.",
    placeholder: "e.g. What should I document first?",
  },
  {
    code: "hi",
    label: "हिन्दी",
    tag: "हिन्दी · प्रारंभिक",
    greeting:
      "नमस्ते। मुझे उस पौधे, प्रथा या उत्पाद के बारे में बताएं जिस पर आप काम कर रहे हैं। मैं पहले पूछे जाने वाले सवालों को समझने में मदद करूंगा।",
    user: "मैं एक स्थानीय पौधे का उपयोग करके एक हर्बल फॉर्मूलेशन विकसित करना चाहता हूं।",
    placeholder: "जैसे, मुझे पहले क्या दस्तावेज़ करना चाहिए?",
  },
  {
    code: "ta",
    label: "தமிழ்",
    tag: "தமிழ் · ஆரம்பநிலை",
    greeting:
      "வணக்கம். நீங்கள் பணிபுரியும் தாவரம், நடைமுறை அல்லது தயாரிப்பைப் பற்றி சொல்லுங்கள். முதலில் கேட்க வேண்டிய கேள்விகளை வரைபடமாக்க உதவுகிறேன்.",
    user: "உள்ளூர் தாவரத்தைப் பயன்படுத்தி மூலிகை சூத்திரத்தை உருவாக்க விரும்புகிறேன்.",
    placeholder: "எ.கா. முதலில் எதை ஆவணப்படுத்த வேண்டும்?",
  },
];

export function DemoWidget() {
  const [active, setActive] = useState(languages[0].code);
  const lang = languages.find((l) => l.code === active) ?? languages[0];

  return (
    <div className="grid overflow-hidden rounded-3xl border border-[#f5f0e4]/10 bg-[#173a3d] lg:grid-cols-[minmax(0,340px)_1fr]">
      <div className="flex flex-col justify-between p-8 sm:p-10">
        <div>
          <p className="font-mono text-xs tracking-[0.2em] text-[#dca12f]">04 / TRY THE GUIDE</p>
          <h3 className="mt-4 font-serif text-4xl leading-[1.1] text-[#f5f0e4] sm:text-5xl">
            Ask the first question.
          </h3>
          <p className="mt-5 max-w-xs text-[#f5f0e4]/60">
            This small demo shows the shape of a Sahayak response. It is a local prototype, not
            legal advice.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {languages.map((l) => (
            <button
              key={l.code}
              type="button"
              onClick={() => setActive(l.code)}
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
      </div>

      <div className="flex flex-col bg-[#f3eddf]">
        <div className="flex-1 space-y-4 p-6 sm:p-8">
          <p className="font-mono text-[10px] tracking-[0.2em] text-[#122d31]/40">{lang.tag}</p>

          <div className="flex items-start gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#dfe9d8] text-[#53775f]">
              <Leaf className="h-4 w-4" strokeWidth={1.75} />
            </span>
            <div className="max-w-md rounded-2xl rounded-tl-sm bg-[#dfe9d8] px-4 py-3 text-[#122d31]">
              {lang.greeting}
            </div>
          </div>

          <div className="flex justify-end">
            <div className="max-w-md rounded-2xl rounded-tr-sm bg-[#e8dfce] px-4 py-3 text-[#122d31]">
              {lang.user}
            </div>
          </div>

          <p className="flex items-center gap-2 pt-2 text-sm text-[#122d31]/50">
            <span className="h-1.5 w-1.5 rounded-full bg-[#dca12f]" />
            Try a question to see a grounded response
          </p>
        </div>

        <div className="flex items-center gap-3 border-t border-[#122d31]/10 bg-[#fbf8f0] px-6 py-4 sm:px-8">
          <input
            type="text"
            placeholder={lang.placeholder}
            className="flex-1 bg-transparent text-sm text-[#122d31] placeholder:text-[#122d31]/40 focus:outline-none"
          />
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#dca12f] text-[#122d31]">
            <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
          </span>
        </div>
      </div>
    </div>
  );
}
