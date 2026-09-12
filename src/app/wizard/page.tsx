"use client";

import { useEffect, useState } from "react";
import { WIZARD_START_ID } from "@/data/wizardTree";

type QuestionStep = {
  type: "question";
  id: string;
  question: string;
  help?: string;
  options: { label: string; next: string }[];
};

type ResultStep = {
  type: "result";
  id: string;
  title: string;
  roadmap: string[];
  sources: { source: string; section: string; title: string }[];
};

type Step = QuestionStep | ResultStep;

export default function WizardPage() {
  const [step, setStep] = useState<Step | null>(null);
  const [history, setHistory] = useState<string[]>([WIZARD_START_ID]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/wizard")
      .then((r) => r.json())
      .then(setStep)
      .finally(() => setLoading(false));
  }, []);

  async function goTo(nodeId: string) {
    setLoading(true);
    const res = await fetch("/api/wizard", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ nodeId }),
    });
    const data = await res.json();
    setStep(data);
    setHistory((prev) => [...prev, nodeId]);
    setLoading(false);
  }

  function restart() {
    setHistory([WIZARD_START_ID]);
    setLoading(true);
    fetch("/api/wizard")
      .then((r) => r.json())
      .then(setStep)
      .finally(() => setLoading(false));
  }

  async function goBack() {
    if (history.length < 2) return;
    const prevHistory = history.slice(0, -1);
    const prevId = prevHistory[prevHistory.length - 1];
    setLoading(true);
    const res = await fetch("/api/wizard", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ nodeId: prevId }),
    });
    const data = await res.json();
    setStep(data);
    setHistory(prevHistory);
    setLoading(false);
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <h1 className="text-xl font-semibold text-white">Compliance Wizard</h1>
      <p className="mt-1 text-sm text-slate-400">
        Answer a few questions to get a step-by-step IP / AYUSH compliance roadmap.
      </p>

      <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
        <span>Step {history.length}</span>
        {history.length > 1 && (
          <button onClick={goBack} className="text-teal-400 hover:underline">
            ← back
          </button>
        )}
        <button onClick={restart} className="ml-auto text-teal-400 hover:underline">
          restart
        </button>
      </div>

      <div className="mt-4 rounded-xl border border-slate-800 bg-slate-900/40 p-6">
        {loading && <p className="text-sm text-slate-400">Loading…</p>}

        {!loading && step?.type === "question" && (
          <div>
            <p className="text-base font-medium text-slate-100">{step.question}</p>
            {step.help && <p className="mt-1 text-xs text-slate-500">{step.help}</p>}
            <div className="mt-5 flex flex-col gap-2">
              {step.options.map((opt) => (
                <button
                  key={opt.next}
                  onClick={() => goTo(opt.next)}
                  className="rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-left text-sm text-slate-200 transition hover:border-teal-500 hover:text-teal-400"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {!loading && step?.type === "result" && (
          <div>
            <span className="inline-block rounded-full bg-teal-500/15 px-2 py-0.5 text-[11px] font-medium text-teal-400">
              Roadmap
            </span>
            <h2 className="mt-2 text-lg font-semibold text-white">{step.title}</h2>
            <ol className="mt-4 space-y-3">
              {step.roadmap.map((item, i) => (
                <li key={i} className="flex gap-3 text-sm text-slate-200">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-500/20 text-xs font-semibold text-teal-400">
                    {i + 1}
                  </span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ol>

            {step.sources.length > 0 && (
              <div className="mt-6 border-t border-slate-800 pt-4">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                  Grounded in
                </p>
                <div className="mt-2 space-y-2">
                  {step.sources.map((s, i) => (
                    <div key={i} className="rounded-lg bg-slate-950/60 p-2 text-xs text-slate-300">
                      <span className="font-medium text-slate-200">
                        {s.source} — {s.section}
                      </span>{" "}
                      · {s.title}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={restart}
              className="mt-6 rounded-lg bg-teal-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-teal-400"
            >
              Start over
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
