import Link from "next/link";
import { Leaf, Play } from "lucide-react";

export function LandingFooter() {
  return (
    <footer className="bg-[#122d31] px-6 pb-10 pt-16 sm:px-10 lg:px-16">
      <div className="mx-auto grid max-w-[1400px] gap-12 sm:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#dca12f] text-[#122d31]">
              <Leaf className="h-5 w-5" strokeWidth={1.75} />
            </span>
            <span className="leading-tight">
              <span className="block text-[#f5f0e4]">IP-SAKTI Sahayak</span>
              <span className="block font-mono text-[10px] tracking-[0.2em] text-[#f5f0e4]/40">
                AYURTECH · SIH 2026
              </span>
            </span>
          </div>
          <p className="mt-5 max-w-sm text-sm text-[#f5f0e4]/50">
            A public-interest innovation for navigating Indian IP, AYUSH, and biodiversity
            compliance with clarity and care.
          </p>
        </div>

        <div>
          <p className="font-mono text-xs tracking-[0.2em] text-[#dca12f]">EXPLORE</p>
          <ul className="mt-4 space-y-3 text-sm text-[#f5f0e4]/70">
            <li>
              <a href="#why" className="hover:text-[#f5f0e4]">
                The gap
              </a>
            </li>
            <li>
              <a href="#workflow" className="hover:text-[#f5f0e4]">
                The workflow
              </a>
            </li>
            <li>
              <a href="#trust" className="hover:text-[#f5f0e4]">
                Trust &amp; evidence
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="font-mono text-xs tracking-[0.2em] text-[#dca12f]">THE FULL TOOL</p>
          <ul className="mt-4 space-y-3 text-sm text-[#f5f0e4]/70">
            <li>
              <Link href="/chat" className="hover:text-[#f5f0e4]">
                Ask the Assistant
              </Link>
            </li>
            <li>
              <Link href="/wizard" className="hover:text-[#f5f0e4]">
                Compliance Wizard
              </Link>
            </li>
            <li>
              <Link href="/lookup" className="hover:text-[#f5f0e4]">
                Herb &amp; IP Lookup
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="font-mono text-xs tracking-[0.2em] text-[#dca12f]">PROJECT</p>
          <ul className="mt-4 space-y-3 text-sm text-[#f5f0e4]/70">
            <li>Problem ID SIH26045</li>
            <li>Team AyurTech</li>
            <li className="flex items-center gap-2">
              <Play className="h-3.5 w-3.5" strokeWidth={2} />
              Showcase build
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-[1400px] border-t border-[#f5f0e4]/10 pt-6">
        <p className="max-w-3xl text-xs leading-relaxed text-[#f5f0e4]/40">
          Disclaimer: IP-SAKTI Sahayak provides preliminary guidance and is not a substitute for a
          legal professional or government authority. Always verify the current position with the
          relevant authority.
        </p>
        <div className="mt-4 flex flex-col gap-2 text-xs text-[#f5f0e4]/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 AyurTech. Built for SIH.</p>
          <p className="flex items-center gap-1.5">
            Knowledge should travel with its context
            <Leaf className="h-3.5 w-3.5" strokeWidth={1.75} />
          </p>
        </div>
      </div>
    </footer>
  );
}
