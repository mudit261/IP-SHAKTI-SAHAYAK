import { NextRequest, NextResponse } from "next/server";
import { wizardTree, WIZARD_START_ID, WizardNode } from "@/data/wizardTree";
import { knowledgeBase } from "@/data/knowledgeBase";

function serializeNode(node: WizardNode) {
  if (node.type === "question") {
    return {
      type: "question" as const,
      id: node.id,
      question: node.question,
      help: node.help,
      options: node.options.map((o) => ({ label: o.label, next: o.next })),
    };
  }
  return {
    type: "result" as const,
    id: node.id,
    title: node.title,
    roadmap: node.roadmap,
    sources: node.relatedChunkIds
      .map((id) => knowledgeBase.find((c) => c.id === id))
      .filter((c): c is NonNullable<typeof c> => Boolean(c))
      .map((c) => ({ source: c.source, section: c.section, title: c.title })),
  };
}

export async function GET() {
  return NextResponse.json(serializeNode(wizardTree[WIZARD_START_ID]));
}

export async function POST(req: NextRequest) {
  let body: { nodeId?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const nodeId = body.nodeId;
  const node = nodeId ? wizardTree[nodeId] : undefined;
  if (!node) {
    return NextResponse.json({ error: "Unknown wizard step" }, { status: 400 });
  }

  return NextResponse.json(serializeNode(node));
}
