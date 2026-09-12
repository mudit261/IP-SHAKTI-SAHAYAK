import Link from "next/link";

const features = [
  {
    title: "Source-cited answers",
    body:
      "Every answer is grounded in a specific Act, Section, Rule, or landmark case — with the exact snippet shown alongside, never a bare claim.",
  },
  {
    title: "Zero-hallucination fallback",
    body:
      "If the knowledge base doesn't confidently cover a question, the assistant says so instead of guessing at legal clauses.",
  },
  {
    title: "Hybrid search",
    body:
      "BM25 keyword scoring plus tag/section boosting narrows in on exact provisions like Section 3(p) or NBA Form II.",
  },
  {
    title: "Voice, multilingual UI",
    body:
      "Speak your question and hear the answer read back, with the interface itself available in Hindi, Tamil, Telugu, Kannada, Marathi and Bengali.",
  },
  {
    title: "Interactive compliance wizard",
    body:
      "A branching questionnaire turns 'what am I trying to protect?' into a concrete, cited step-by-step roadmap.",
  },
  {
    title: "Herb → IP knowledge graph",
    body:
      "Look up a local herb name and trace local name → Sanskrit → botanical name → the patent/biopiracy considerations that follow.",
  },
];

const stack = [
  "Next.js", "TypeScript", "Tailwind CSS",
  "Hybrid BM25 retrieval", "Claude (optional synthesis)",
  "Web Speech API",
];

export default function Home() {
  return (
    <div>
      <section className="mx-auto max-w-6xl px-4 pt-16 pb-14 sm:px-6 sm:pt-24">
        <p className="text-sm font-semibold uppercase tracking-widest text-teal-400">
          Smart India Hackathon 2025 · Prototype
        </p>
        <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">
          IP-SAKTI Sahayak
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-300">
          A multilingual, source-cited AI assistant for Indian IP rights, patent
          pathways, biodiversity/NBA compliance, and AYUSH regulation —
          built so grassroots innovators and AYUSH MSMEs can get grounded
          guidance in their own language, without guessing.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/chat"
            className="rounded-lg bg-teal-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-teal-400"
          >
            Ask the Assistant
          </Link>
          <Link
            href="/wizard"
            className="rounded-lg border border-slate-700 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-teal-500 hover:text-teal-400"
          >
            Run the Compliance Wizard
          </Link>
          <Link
            href="/lookup"
            className="rounded-lg border border-slate-700 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-teal-500 hover:text-teal-400"
          >
            Herb & IP Lookup
          </Link>
        </div>
      </section>

      <section className="border-t border-slate-800 bg-slate-900/40 py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-xl font-semibold text-white">What it does</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-xl border border-slate-800 bg-slate-950/60 p-5"
              >
                <h3 className="text-sm font-semibold text-teal-400">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <h2 className="text-xl font-semibold text-white">The problem</h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-300">
          Traditional Ayurvedic and biodiversity-derived knowledge sits in a legal
          grey zone: Section 3(p) of the Patents Act blocks patenting known
          traditional knowledge outright, the Biological Diversity Act requires NBA
          approval before using or filing IP on Indian biological resources, and
          AYUSH manufacturing has its own licensing track entirely. Most grassroots
          innovators and small AYUSH manufacturers have no easy way to navigate all
          three at once, in a language they&rsquo;re comfortable with — which either
          exposes them to biopiracy or leaves good innovation unfiled.
        </p>
      </section>

      <section className="border-t border-slate-800 py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-500">
            Built with
          </h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {stack.map((s) => (
              <span
                key={s}
                className="rounded-full border border-slate-800 bg-slate-900 px-3 py-1 text-xs text-slate-300"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
