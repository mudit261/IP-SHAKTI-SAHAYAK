"use client";

import { useEffect, useState } from "react";

type EntityResult = {
  id: string;
  localNames: { lang: string; name: string }[];
  sanskrit: string;
  botanical: string;
  family: string;
  knownUses: string;
  ipNotes: string;
  relatedSources: { source: string; section: string; title: string; text: string }[];
};

const LANG_LABEL: Record<string, string> = { hi: "Hindi", ta: "Tamil", te: "Telugu" };

export default function LookupPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<EntityResult[]>([]);
  const [allIds, setAllIds] = useState<{ id: string; botanical: string }[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/entity")
      .then((r) => r.json())
      .then((d) => setAllIds(d.results));
  }, []);

  async function search(q: string) {
    setQuery(q);
    setLoading(true);
    try {
      const res = await fetch(`/api/entity?q=${encodeURIComponent(q)}`);
      const data = await res.json();
      setResults(q.trim() ? data.results : []);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="text-xl font-semibold text-white">Herb &amp; IP Lookup</h1>
      <p className="mt-1 text-sm text-slate-400">
        Trace a local herb name through Sanskrit and botanical naming to the IP/biopiracy
        considerations that follow — a simplified view of the underlying formulation
        knowledge graph.
      </p>

      <input
        value={query}
        onChange={(e) => search(e.target.value)}
        placeholder="Try: haldi, ashwagandha, neem, tulsi, brahmi, guggul…"
        className="mt-5 w-full rounded-full border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-teal-500 focus:outline-none"
      />

      {!query && (
        <div className="mt-4 flex flex-wrap gap-2">
          {allIds.map((e) => (
            <button
              key={e.id}
              onClick={() => search(e.id)}
              className="rounded-full border border-slate-800 bg-slate-900 px-3 py-1 text-xs text-slate-300 hover:border-teal-500 hover:text-teal-400"
            >
              {e.botanical}
            </button>
          ))}
        </div>
      )}

      {loading && <p className="mt-6 text-sm text-slate-400">Searching…</p>}

      {!loading && query && results.length === 0 && (
        <p className="mt-6 rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-300">
          No entry found for &ldquo;{query}&rdquo; in this demo knowledge graph. In production this
          would fall back to a live Neo4j lookup across the full formulation database.
        </p>
      )}

      <div className="mt-6 space-y-6">
        {results.map((e) => (
          <div key={e.id} className="rounded-xl border border-slate-800 bg-slate-900/40 p-5">
            <div className="flex flex-wrap items-center gap-2 text-sm">
              {e.localNames.map((n) => (
                <span
                  key={n.lang}
                  className="rounded-full bg-slate-800 px-2.5 py-0.5 text-xs text-slate-300"
                >
                  {LANG_LABEL[n.lang] ?? n.lang}: {n.name}
                </span>
              ))}
            </div>

            <div className="mt-3 flex flex-wrap items-baseline gap-x-2 gap-y-1">
              <span className="text-lg font-semibold text-white">{e.sanskrit}</span>
              <span className="text-slate-500">→</span>
              <span className="text-lg italic text-teal-400">{e.botanical}</span>
              <span className="text-xs text-slate-500">({e.family})</span>
            </div>

            <p className="mt-3 text-sm text-slate-300">
              <span className="font-semibold text-slate-200">Known traditional use: </span>
              {e.knownUses}
            </p>
            <p className="mt-2 text-sm text-slate-300">
              <span className="font-semibold text-slate-200">IP / compliance notes: </span>
              {e.ipNotes}
            </p>

            {e.relatedSources.length > 0 && (
              <div className="mt-4 space-y-2 border-t border-slate-800 pt-3">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                  Related legal sources
                </p>
                {e.relatedSources.map((s, i) => (
                  <div key={i} className="rounded-lg bg-slate-950/60 p-2 text-xs text-slate-300">
                    <span className="font-medium text-slate-200">
                      {s.source} — {s.section}
                    </span>
                    <p className="mt-0.5 text-slate-400">{s.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
