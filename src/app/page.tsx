import Link from "next/link";
import {
  Network,
  Globe,
  Users,
  AlertCircle,
  Sparkles,
  Check,
  NotebookPen,
  BookOpen,
  Scale,
  ShieldCheck,
  Zap,
  Quote,
  ArrowUpRight,
  ArrowDown,
  MessageCircle,
  Compass,
  Leaf,
} from "lucide-react";
import { LandingNav } from "@/components/home/LandingNav";
import { LandingFooter } from "@/components/home/LandingFooter";
import { HeroOrbit } from "@/components/home/HeroOrbit";
import { DemoWidget } from "@/components/home/DemoWidget";
import { Reveal } from "@/components/home/Reveal";

const stats = [
  { value: "3", label: "knowledge\nsystems" },
  { value: "8+", label: "languages\nplanned" },
  { value: "4", label: "evidence\nlayers" },
  { value: "1", label: "careful\nnext step" },
];

const gapCards = [
  {
    icon: Network,
    tint: "bg-[#dfe9d8]",
    title: "Many doors, no map",
    body: "IP, AYUSH, and biodiversity rules overlap. Guidance is scattered across portals, circulars, and dense legal language.",
  },
  {
    icon: Globe,
    tint: "bg-[#e8dfce]",
    title: "Language is a barrier",
    body: "The first question is often asked in a local language, while the source material rarely is.",
  },
  {
    icon: Users,
    tint: "bg-[#e8dfce]",
    title: "Context can be lost",
    body: "A generic answer may miss community rights, prior knowledge, or the need for benefit sharing.",
  },
  {
    icon: AlertCircle,
    tint: "bg-[#e8dfce]",
    title: "Overconfidence harms",
    body: "When a system cannot establish an answer, it must say so — and help someone find the right human next.",
  },
];

const workflowSteps = [
  {
    icon: NotebookPen,
    title: "Describe the practice",
    body: "Share a crop, formulation, traditional use, or community knowledge in your own words.",
  },
  {
    icon: Network,
    title: "Map the obligations",
    body: "Sahayak finds the relevant IP, AYUSH, biodiversity, and benefit-sharing pathways.",
  },
  {
    icon: BookOpen,
    title: "Read the evidence",
    body: "Every suggestion arrives with a source trail, confidence signal, and a reason to verify.",
  },
  {
    icon: Scale,
    title: "Choose your next step",
    body: "Get a practical checklist for documentation, consultation, or a qualified referral.",
  },
];

const trustPoints = [
  {
    title: "Source trace",
    body: "Links back to a named public source, not a mysterious score.",
  },
  {
    title: "Confidence cue",
    body: "Separates established context from an open question.",
  },
  {
    title: "Human hand-off",
    body: "Makes referral part of the experience, not a failure.",
  },
];

const technicalSteps = [
  {
    title: "Intent & language layer",
    body: "Recognises the user's question across Indian languages and turns it into a structured compliance intent.",
    icon: Zap,
  },
  {
    title: "Retrieval, not invention",
    body: "Retrieves from a curated corpus of acts, portals, guidance, and knowledge-system references before composing.",
    icon: null,
  },
  {
    title: "Evidence-shaped response",
    body: "Returns the answer, relevant source cards, confidence, and a suggested next action as one readable unit.",
    icon: Zap,
  },
];

const rollout = [
  {
    tag: "NOW",
    title: "Prototype & listen",
    body: "Validate the question flow with practitioners, students, and community representatives.",
    caption: "User research · curated sources",
    featured: false,
  },
  {
    tag: "NEXT",
    title: "Pilot with institutions",
    body: "Test referral pathways and multilingual retrieval with AYUSH and biodiversity partners.",
    caption: "Small cohort · measured abstention",
    featured: true,
  },
  {
    tag: "THEN",
    title: "Open knowledge layer",
    body: "Publish learnings, source updates, and safeguards so the system can be scrutinised.",
    caption: "Governance · maintenance · scale",
    featured: false,
  },
];

const tools = [
  {
    href: "/chat",
    icon: MessageCircle,
    title: "Ask the Assistant",
    body: "The full chat — hybrid retrieval, jurisdiction routing, and every answer cited back to its source.",
  },
  {
    href: "/wizard",
    icon: Compass,
    title: "Compliance Wizard",
    body: "A branching questionnaire that turns 'what am I protecting?' into a step-by-step roadmap.",
  },
  {
    href: "/lookup",
    icon: Leaf,
    title: "Herb & IP Lookup",
    body: "Trace a local herb name through Sanskrit and botanical naming to the IP considerations that follow.",
  },
];

const references = [
  {
    code: "TKDL",
    title: "Traditional Knowledge Digital Library",
    body: "Prior-art and traditional-use context",
  },
  {
    code: "NBA",
    title: "National Biodiversity Authority",
    body: "Access and benefit-sharing pathways",
  },
  {
    code: "AYUSH",
    title: "AYUSH ministry guidance",
    body: "Sectoral compliance and practice context",
  },
  {
    code: "IPO",
    title: "Indian Patent Office",
    body: "Forms, process, and filing references",
  },
];

function SectionLabel({ index, label, dark }: { index: string; label: string; dark?: boolean }) {
  return (
    <p
      className={`flex items-center gap-2 font-mono text-xs tracking-[0.2em] ${
        dark ? "text-[#f5f0e4]/50" : "text-[#122d31]/40"
      }`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-[#dca12f]" />
      {index} / {label}
    </p>
  );
}

export default function Home() {
  return (
    <div id="top" className="font-[family-name:var(--font-dm-sans)]">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#122d31] to-[#173a3d]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(220,161,47,0.06),transparent_45%)]" />
        <LandingNav />

        <div className="relative mx-auto grid max-w-[1400px] gap-12 px-6 pb-24 pt-8 sm:px-10 lg:grid-cols-[1.1fr_1fr] lg:px-16 lg:pb-32">
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full border border-[#f5f0e4]/15 bg-[#f5f0e4]/5 px-4 py-1.5 font-mono text-xs tracking-[0.15em] text-[#f5f0e4]/70">
              <span className="h-1.5 w-1.5 rounded-full bg-[#dca12f]" />
              SIH 2026 · PROBLEM ID SIH26045
            </p>

            <h1 className="mt-8 font-[family-name:var(--font-instrument-serif)] text-6xl leading-[1.05] text-[#f5f0e4] sm:text-7xl">
              The right
              <br />
              <em className="text-[#dca12f] italic">knowledge.</em>
              <br />
              The right path.
            </h1>

            <p className="mt-8 max-w-lg text-lg text-[#f5f0e4]/60">
              IP-SAKTI Sahayak is a multilingual, evidence-grounded guide for India&apos;s
              intellectual property, AYUSH, and biodiversity obligations.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="#demo"
                className="inline-flex items-center gap-2 rounded-full bg-[#dca12f] px-6 py-3 text-sm font-medium text-[#122d31] transition-colors hover:bg-[#e2b65d]"
              >
                Start with a question
                <ArrowDown className="h-4 w-4" strokeWidth={2} />
              </a>
              <a
                href="#why"
                className="inline-flex items-center gap-2 rounded-full border border-[#f5f0e4]/20 px-6 py-3 text-sm font-medium text-[#f5f0e4] transition-colors hover:border-[#f5f0e4]/40"
              >
                See how it works
                <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
              </a>
            </div>

            <p className="mt-8 text-xs text-[#f5f0e4]/35">
              Grounded in public sources · Built by AyurTech
            </p>
          </Reveal>

          <Reveal delay={150}>
            <HeroOrbit />
          </Reveal>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="border-b border-[#122d31]/10 bg-[#f3eddf]">
        <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-8 px-6 py-10 sm:px-10 md:grid-cols-4 lg:px-16">
          {stats.map((s) => (
            <div key={s.label} className="flex items-baseline gap-3">
              <span className="font-[family-name:var(--font-instrument-serif)] text-4xl text-[#53775f]">
                {s.value}
              </span>
              <span className="whitespace-pre-line text-xs leading-tight text-[#122d31]/50">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 01 / THE GAP */}
      <section id="why" className="bg-[#f5f0e4] px-6 py-24 sm:px-10 lg:px-16">
        <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <SectionLabel index="01" label="THE GAP" />
            <h2 className="mt-6 font-[family-name:var(--font-instrument-serif)] text-5xl leading-[1.1] text-[#122d31]">
              Good work gets stuck in a maze of rules.
            </h2>
            <p className="mt-6 max-w-md text-[#122d31]/60">
              A practitioner may hold valuable knowledge and still not know which office, act,
              form, or community protocol comes first.
            </p>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2">
            {gapCards.map((c, i) => (
              <Reveal key={c.title} delay={i * 100}>
                <div className={`h-full rounded-2xl ${c.tint} p-6`}>
                  <c.icon className="h-5 w-5 text-[#53775f]" strokeWidth={1.5} />
                  <h3 className="mt-6 text-lg font-semibold text-[#122d31]">{c.title}</h3>
                  <p className="mt-2 text-sm text-[#122d31]/60">{c.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 02 / THE IDEA */}
      <section className="relative overflow-hidden bg-[#53775f] px-6 py-24 sm:px-10 lg:px-16">
        <div className="mx-auto grid max-w-[1400px] items-center gap-16 lg:grid-cols-[1fr_0.9fr]">
          <Reveal>
            <SectionLabel index="02" label="THE IDEA" dark />
            <h2 className="mt-6 font-[family-name:var(--font-instrument-serif)] text-5xl leading-[1.1] text-[#f5f0e4]">
              A calm first step into complex territory.
            </h2>
            <p className="mt-6 max-w-md text-[#f5f0e4]/70">
              Sahayak does not pretend to be a lawyer. It translates the starting point: asks what
              matters, gathers the public evidence, shows its work, and knows when to pause.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {["Multilingual by design", "Evidence before answer", "Human referral when needed"].map(
                (t) => (
                  <span
                    key={t}
                    className="rounded-full border border-[#f5f0e4]/25 px-4 py-2 text-sm text-[#f5f0e4]/90"
                  >
                    {t}
                  </span>
                )
              )}
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="relative mx-auto flex h-[340px] w-[340px] items-center justify-center">
              <div className="absolute left-0 top-0 h-[260px] w-[260px] rounded-full border border-[#dca12f]/30" />
              <div className="absolute inset-0 rounded-full border border-[#f5f0e4]/10" />
              <div className="flex h-[190px] w-[190px] flex-col items-center justify-center gap-2 rounded-full bg-[#dca12f] text-center">
                <Sparkles className="h-5 w-5 text-[#122d31]" strokeWidth={1.5} />
                <p className="font-mono text-[9px] tracking-[0.2em] text-[#122d31]/70">
                  THE SAHAYAK LOOP
                </p>
                <p className="font-[family-name:var(--font-instrument-serif)] text-xl text-[#122d31]">
                  ask → ground
                  <br />→ guide
                </p>
              </div>

              <div className="absolute -right-6 top-2 w-44 rounded-xl bg-[#122d31]/40 p-4 backdrop-blur-sm">
                <p className="font-mono text-[9px] tracking-[0.2em] text-[#dca12f]">
                  ALWAYS VISIBLE
                </p>
                <ul className="mt-3 space-y-2 text-sm text-[#f5f0e4]/90">
                  <li className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-[#dca12f]" strokeWidth={2} />
                    source trail
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-[#dca12f]" strokeWidth={2} />
                    confidence cue
                  </li>
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 03 / THE WORKFLOW */}
      <section id="workflow" className="bg-[#f5f0e4] px-6 py-24 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <div>
                <SectionLabel index="03" label="THE WORKFLOW" />
                <h2 className="mt-6 font-[family-name:var(--font-instrument-serif)] text-5xl leading-[1.1] text-[#122d31]">
                  From lived knowledge
                  <br />
                  <span className="italic text-[#53775f]">to a clear next step.</span>
                </h2>
              </div>
              <p className="max-w-xs text-sm text-[#122d31]/60">
                No black box hand-off. The journey is designed to be read, checked, and explained.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-8 border-t border-[#122d31]/10 pt-10 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-[#122d31]/10">
            {workflowSteps.map((step, i) => (
              <Reveal key={step.title} delay={i * 100} className="lg:px-8 lg:first:pl-0">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm text-[#122d31]/30">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <step.icon className="h-5 w-5 text-[#53775f]" strokeWidth={1.5} />
                </div>
                <h3 className="mt-6 text-lg font-semibold text-[#122d31]">{step.title}</h3>
                <p className="mt-2 text-sm text-[#122d31]/60">{step.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 04 / TRY THE GUIDE */}
      <section id="demo" className="bg-[#122d31] px-6 py-24 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <DemoWidget />
          </Reveal>
        </div>
      </section>

      {/* THE FULL TOOL — this demo is a taster; these are the real, working pages */}
      <section className="bg-[#f3eddf] px-6 py-20 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <p className="flex items-center gap-2 font-mono text-xs tracking-[0.2em] text-[#122d31]/40">
              <span className="h-1.5 w-1.5 rounded-full bg-[#dca12f]" />
              BEYOND THE DEMO
            </p>
            <h2 className="mt-4 font-[family-name:var(--font-instrument-serif)] text-3xl leading-[1.15] text-[#122d31] sm:text-4xl">
              The demo above is a taster. Open the full tool.
            </h2>
          </Reveal>

          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {tools.map((tool, i) => (
              <Reveal key={tool.href} delay={i * 100}>
                <Link
                  href={tool.href}
                  className="group flex h-full flex-col rounded-2xl border border-[#122d31]/10 bg-[#fbf8f0] p-6 transition-colors hover:border-[#dca12f]/60"
                >
                  <tool.icon className="h-5 w-5 text-[#53775f]" strokeWidth={1.5} />
                  <h3 className="mt-6 flex items-center gap-1.5 text-lg font-semibold text-[#122d31]">
                    {tool.title}
                    <ArrowUpRight
                      className="h-4 w-4 text-[#122d31]/30 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#dca12f]"
                      strokeWidth={2}
                    />
                  </h3>
                  <p className="mt-2 text-sm text-[#122d31]/60">{tool.body}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 05 / TRUST, BY DESIGN */}
      <section id="trust" className="bg-[#f5f0e4] px-6 py-24 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <Reveal>
              <SectionLabel index="05" label="TRUST, BY DESIGN" />
              <h2 className="mt-6 font-[family-name:var(--font-instrument-serif)] text-5xl leading-[1.1] text-[#122d31]">
                No answer without a trail.
              </h2>
              <p className="mt-6 max-w-md text-[#122d31]/60">
                Trust is not a badge we add later. It is the shape of each response: what we know,
                where it came from, and when to stop.
              </p>
            </Reveal>

            <Reveal delay={150}>
              <div className="rounded-2xl border border-[#122d31]/10 bg-[#eee6d6] p-8">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-5 w-5 text-[#53775f]" strokeWidth={1.5} />
                  <h3 className="text-lg font-semibold text-[#122d31]">The abstention contract</h3>
                </div>
                <p className="mt-4 text-sm text-[#122d31]/60">
                  When sources conflict, confidence is low, or the question needs a professional
                  determination, Sahayak says: &ldquo;I cannot establish this from the available
                  evidence.&rdquo; Then it points to the next responsible human.
                </p>
              </div>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-8 border-t border-[#122d31]/10 pt-10 sm:grid-cols-3">
            {trustPoints.map((p, i) => (
              <Reveal key={p.title} delay={i * 100}>
                <span className="font-mono text-sm text-[#122d31]/30">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-[#122d31]">{p.title}</h3>
                <p className="mt-2 text-sm text-[#122d31]/60">{p.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 06 / TECHNICAL APPROACH */}
      <section className="bg-[#eee6d6] px-6 py-24 sm:px-10 lg:px-16">
        <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <SectionLabel index="06" label="TECHNICAL APPROACH" />
            <h2 className="mt-6 font-[family-name:var(--font-instrument-serif)] text-5xl leading-[1.1] text-[#122d31]">
              Intelligence with a paper trail.
            </h2>
          </Reveal>

          <div className="divide-y divide-[#122d31]/10">
            {technicalSteps.map((step, i) => (
              <Reveal key={step.title} delay={i * 100} className="flex items-start justify-between gap-6 py-6 first:pt-0">
                <div className="flex gap-6">
                  <span className="font-mono text-sm text-[#122d31]/30">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-[#122d31]">{step.title}</h3>
                    <p className="mt-2 max-w-xl text-sm text-[#122d31]/60">{step.body}</p>
                  </div>
                </div>
                {step.icon ? (
                  <step.icon className="h-5 w-5 shrink-0 text-[#dca12f]" strokeWidth={1.5} />
                ) : null}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 07 / FEASIBILITY & ROLLOUT */}
      <section id="rollout" className="bg-[#f5f0e4] px-6 py-24 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <div>
                <SectionLabel index="07" label="FEASIBILITY & ROLLOUT" />
                <h2 className="mt-6 font-[family-name:var(--font-instrument-serif)] text-5xl leading-[1.1] text-[#122d31]">
                  Start narrow.
                  <br />
                  <span className="italic text-[#53775f]">Learn in public.</span>
                </h2>
              </div>
              <p className="max-w-xs text-sm text-[#122d31]/60">
                A staged route from prototype to a trusted public utility.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {rollout.map((r, i) => (
              <Reveal key={r.tag} delay={i * 100}>
                <div
                  className={`h-full rounded-2xl p-8 ${
                    r.featured ? "bg-[#53775f] text-[#f5f0e4]" : "bg-[#eee6d6] text-[#122d31]"
                  }`}
                >
                  <p
                    className={`font-mono text-xs tracking-[0.2em] ${
                      r.featured ? "text-[#dca12f]" : "text-[#122d31]/40"
                    }`}
                  >
                    {r.tag}
                  </p>
                  <h3 className="mt-6 font-[family-name:var(--font-instrument-serif)] text-3xl">
                    {r.title}
                  </h3>
                  <p className={`mt-4 text-sm ${r.featured ? "text-[#f5f0e4]/75" : "text-[#122d31]/60"}`}>
                    {r.body}
                  </p>
                  <p
                    className={`mt-8 text-xs ${
                      r.featured ? "text-[#f5f0e4]/50" : "text-[#122d31]/40"
                    }`}
                  >
                    {r.caption}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 08 / THE PROMISE */}
      <section className="bg-[#dfe9d8] px-6 py-24 sm:px-10 lg:px-16">
        <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <Reveal>
            <SectionLabel index="08" label="THE PROMISE" />
            <h2 className="mt-6 font-[family-name:var(--font-instrument-serif)] text-4xl leading-[1.25] text-[#122d31] sm:text-5xl">
              &ldquo;A good assistant does not replace judgement. It helps more people arrive at
              the right conversation.&rdquo;
            </h2>
            <p className="mt-6 flex items-center gap-3 text-sm text-[#122d31]/50">
              <span className="h-px w-8 bg-[#122d31]/30" />
              AyurTech · SIH 2026
            </p>
          </Reveal>

          <Reveal delay={150}>
            <Quote className="h-8 w-8 text-[#53775f]" strokeWidth={1.5} />
            <p className="mt-4 text-[#122d31]/70">
              We are building for the first-time inventor, the practitioner working from inherited
              knowledge, the student trying to understand a form, and every community whose
              knowledge deserves context and care.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 09 / REFERENCES */}
      <section className="bg-[#f5f0e4] px-6 py-24 sm:px-10 lg:px-16">
        <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <SectionLabel index="09" label="REFERENCES" />
            <h2 className="mt-6 font-[family-name:var(--font-instrument-serif)] text-5xl leading-[1.1] text-[#122d31]">
              Built on work that already exists.
            </h2>
            <p className="mt-6 max-w-sm text-[#122d31]/60">
              A useful guide starts by respecting the institutions and communities that hold the
              source material.
            </p>
          </Reveal>

          <div className="divide-y divide-[#122d31]/10">
            {references.map((r, i) => (
              <Reveal
                key={r.code}
                delay={i * 80}
                className="flex items-center justify-between gap-6 py-6 first:pt-0"
              >
                <div className="flex items-start gap-6">
                  <span className="w-14 shrink-0 font-mono text-xs tracking-[0.15em] text-[#dca12f]">
                    {r.code}
                  </span>
                  <div>
                    <h3 className="font-semibold text-[#122d31]">{r.title}</h3>
                    <p className="mt-1 text-sm text-[#122d31]/50">{r.body}</p>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-[#122d31]/30" strokeWidth={1.75} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
}
