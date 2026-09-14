import Link from "next/link";
import { Leaf, ArrowUpRight } from "lucide-react";

const sectionLinks = [
  { href: "#why", label: "Why it matters" },
  { href: "#workflow", label: "How it works" },
  { href: "#trust", label: "Trust & evidence" },
  { href: "#rollout", label: "Roadmap" },
];

const toolLinks = [
  { href: "/chat", label: "Assistant" },
  { href: "/wizard", label: "Wizard" },
  { href: "/lookup", label: "Lookup" },
];

export function LandingNav() {
  return (
    <header className="relative z-20 mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-6 py-6 sm:px-10 lg:px-16">
      <a href="#top" className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#dca12f]/60 bg-[#dca12f]/10 text-[#dca12f]">
          <Leaf className="h-5 w-5" strokeWidth={1.75} />
        </span>
        <span className="leading-tight">
          <span className="block font-serif text-lg text-[#f5f0e4]">IP-SAKTI</span>
          <span className="block font-mono text-[10px] tracking-[0.25em] text-[#f5f0e4]/50">
            SAHAYAK / 2026
          </span>
        </span>
      </a>

      <nav className="hidden items-center gap-8 md:flex">
        {sectionLinks.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="text-sm text-[#f5f0e4]/70 transition-colors hover:text-[#f5f0e4]"
          >
            {l.label}
          </a>
        ))}
        <span className="h-4 w-px bg-[#f5f0e4]/15" />
        {toolLinks.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="text-sm text-[#dca12f] transition-colors hover:text-[#e2b65d]"
          >
            {l.label}
          </Link>
        ))}
      </nav>

      <a
        href="#demo"
        className="group inline-flex items-center gap-1.5 rounded-full bg-[#dca12f] px-5 py-2.5 text-sm font-medium text-[#122d31] transition-colors hover:bg-[#e2b65d]"
      >
        Try the guide
        <ArrowUpRight
          className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          strokeWidth={2}
        />
      </a>
    </header>
  );
}
