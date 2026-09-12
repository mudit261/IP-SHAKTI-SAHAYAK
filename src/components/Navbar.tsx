"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { languages, LanguageCode } from "@/data/languages";

const links = [
  { href: "/", label: "Home" },
  { href: "/chat", label: "Assistant" },
  { href: "/wizard", label: "Compliance Wizard" },
  { href: "/lookup", label: "Herb & IP Lookup" },
];

export function Navbar() {
  const pathname = usePathname();
  const { code, setCode } = useLanguage();

  return (
    <header className="sticky top-0 z-20 border-b border-slate-800 bg-slate-950/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-500 text-sm font-bold text-slate-950">
            IP
          </span>
          <span className="text-sm font-semibold tracking-tight text-slate-100 sm:text-base">
            IP-SAKTI Sahayak
          </span>
        </Link>

        <nav className="hidden gap-1 md:flex">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "bg-teal-500/10 text-teal-400"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <select
          aria-label="Select language"
          value={code}
          onChange={(e) => setCode(e.target.value as LanguageCode)}
          className="rounded-md border border-slate-700 bg-slate-900 px-2 py-1.5 text-sm text-slate-200 focus:border-teal-500 focus:outline-none"
        >
          {languages.map((l) => (
            <option key={l.code} value={l.code}>
              {l.nativeLabel}
            </option>
          ))}
        </select>
      </div>

      <nav className="flex gap-1 overflow-x-auto border-t border-slate-800 px-4 py-2 md:hidden">
        {links.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`whitespace-nowrap rounded-md px-3 py-1.5 text-xs font-medium ${
                active ? "bg-teal-500/10 text-teal-400" : "text-slate-300"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
