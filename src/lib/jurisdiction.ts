export type Jurisdiction = "patent" | "biodiversity" | "ayush" | "trademark_gi" | "general";

export const JURISDICTION_LABELS: Record<Jurisdiction, string> = {
  patent: "Patent & novelty",
  biodiversity: "Biodiversity / NBA",
  ayush: "AYUSH licensing",
  trademark_gi: "Trademark / GI",
  general: "General",
};

const JURISDICTION_KEYWORDS: Record<Exclude<Jurisdiction, "general">, string[]> = {
  patent: [
    "patent", "invention", "novelty", "inventive step", "claim", "3(p)",
    "patentable", "prior art", "filing", "specification", "tkdl", "biopiracy",
  ],
  biodiversity: [
    "nba", "biodiversity", "biological resource", "access", "benefit sharing",
    "form i", "form ii", "form iii", "form iv", "genetic resource",
    "bioprospecting", "foreign entity", "gratk",
  ],
  ayush: [
    "ayush", "license", "licence", "gmp", "schedule t", "classical",
    "proprietary", "manufactur", "drug", "formulary", "ayurved", "siddha", "unani",
  ],
  trademark_gi: [
    "trademark", "gi ", "geographical indication", "brand", "logo", "community name", "region",
  ],
};

/**
 * Heuristic keyword classifier standing in for the deck's "Jurisdiction
 * Router" — routes a query to the compliance domain it most likely belongs
 * to (patent / biodiversity-NBA / AYUSH licensing / trademark-GI) *before*
 * retrieval, so matching chunks can be boosted. This is deliberately a
 * simple, auditable heuristic rather than a trained intent classifier.
 */
export function classifyJurisdiction(query: string): {
  jurisdiction: Jurisdiction;
  matchedKeywords: string[];
} {
  const q = ` ${query.toLowerCase()} `;
  let best: Jurisdiction = "general";
  let bestCount = 0;
  let bestMatches: string[] = [];

  for (const [jurisdiction, keywords] of Object.entries(JURISDICTION_KEYWORDS) as [
    Exclude<Jurisdiction, "general">,
    string[],
  ][]) {
    const matches = keywords.filter((k) => q.includes(k));
    if (matches.length > bestCount) {
      best = jurisdiction;
      bestCount = matches.length;
      bestMatches = matches;
    }
  }

  return { jurisdiction: best, matchedKeywords: bestMatches };
}
