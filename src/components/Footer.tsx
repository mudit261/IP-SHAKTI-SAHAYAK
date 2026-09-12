"use client";

import { usePathname } from "next/navigation";

export function Footer() {
  const pathname = usePathname();
  if (pathname === "/") return null;

  return (
    <footer className="border-t border-slate-800 bg-slate-950 px-4 py-6 text-center text-xs text-slate-500 sm:px-6">
      <p>
        Hackathon prototype — informational only, not legal advice. Verify anything
        important with the Patent Office, NBA, Ministry of AYUSH, or a qualified professional.
      </p>
      <p className="mt-1">SIH 2025 · IP-SAKTI Sahayak</p>
    </footer>
  );
}
