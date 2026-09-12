import { NextRequest, NextResponse } from "next/server";
import { entityGraph } from "@/data/entities";
import { knowledgeBase } from "@/data/knowledgeBase";

function matches(query: string, name: string) {
  return name.toLowerCase().includes(query);
}

export async function GET(req: NextRequest) {
  const q = (req.nextUrl.searchParams.get("q") ?? "").trim().toLowerCase();

  if (!q) {
    return NextResponse.json({
      results: entityGraph.map((e) => ({ id: e.id, botanical: e.botanical, sanskrit: e.sanskrit })),
    });
  }

  const results = entityGraph.filter(
    (e) =>
      matches(q, e.botanical) ||
      matches(q, e.sanskrit) ||
      matches(q, e.family) ||
      e.localNames.some((n) => matches(q, n.name))
  );

  const enriched = results.map((e) => ({
    ...e,
    relatedSources: e.relatedChunkIds
      .map((id) => knowledgeBase.find((c) => c.id === id))
      .filter((c): c is NonNullable<typeof c> => Boolean(c)),
  }));

  return NextResponse.json({ results: enriched });
}
