export type WizardOption = {
  label: string;
  next: string;
};

export type WizardNode =
  | {
      id: string;
      type: "question";
      question: string;
      help?: string;
      options: WizardOption[];
    }
  | {
      id: string;
      type: "result";
      title: string;
      roadmap: string[];
      relatedChunkIds: string[];
    };

// A simplified decision tree standing in for the "Interactive Wizard" described
// in the pitch deck. Each terminal node produces a step-by-step compliance roadmap.
export const wizardTree: Record<string, WizardNode> = {
  start: {
    id: "start",
    type: "question",
    question: "What are you trying to protect or register?",
    options: [
      { label: "A new invention or product (patent)", next: "patent_traditional" },
      { label: "A traditional herbal / Ayurvedic formulation", next: "formulation_use" },
      { label: "An AYUSH product license to manufacture & sell", next: "ayush_category" },
      { label: "A community or region-specific product name (trademark / GI)", next: "brand_scope" },
    ],
  },

  patent_traditional: {
    id: "patent_traditional",
    type: "question",
    question: "Is your invention derived from, or based on, a known traditional/Ayurvedic formulation or plant?",
    help: "This determines whether Section 3(p) of the Patents Act applies.",
    options: [
      { label: "Yes, it builds on traditional knowledge", next: "patent_bioresource" },
      { label: "No, it is an independently developed invention", next: "result_standard_patent" },
    ],
  },

  patent_bioresource: {
    id: "patent_bioresource",
    type: "question",
    question: "Does it use a biological resource (plant, microbe, extract) sourced from India?",
    help: "This determines whether NBA approval under the Biological Diversity Act is required.",
    options: [
      { label: "Yes", next: "result_tk_bioresource_patent" },
      { label: "No / sourced from outside India", next: "result_tk_patent_only" },
    ],
  },

  result_standard_patent: {
    id: "result_standard_patent",
    type: "result",
    title: "Standard patent filing roadmap",
    roadmap: [
      "Run a prior-art search (including TKDL and global patent databases) even without a TK connection, to confirm novelty.",
      "Confirm the invention meets novelty, inventive step and industrial applicability under Section 2(1)(j).",
      "Prepare and file a provisional or complete specification (Form 1, Form 2) with the Patent Office.",
      "Engage a registered patent agent for claims drafting to withstand examination and opposition.",
      "Respond to the First Examination Report (FER) within the prescribed period.",
    ],
    relatedChunkIds: ["patents-2-1-j"],
  },

  result_tk_patent_only: {
    id: "result_tk_patent_only",
    type: "result",
    title: "Patent roadmap for a traditional-knowledge-based invention (non-Indian biological source)",
    roadmap: [
      "Search TKDL and classical texts to confirm exactly what is already known — isolate the genuinely new element (process, formulation ratio, delivery form, validated new indication).",
      "Draft claims around that novel element only; avoid claiming the known traditional use itself (Section 3(p) risk).",
      "Prepare Form 1 disclosure of biological material source even if sourced outside India, if applicable.",
      "File the application and be ready to defend novelty against Section 3(p) objections during examination.",
    ],
    relatedChunkIds: ["patents-3p", "patents-2-1-j", "tkdl"],
  },

  result_tk_bioresource_patent: {
    id: "result_tk_bioresource_patent",
    type: "result",
    title: "Full compliance roadmap: TK-based invention using an Indian biological resource",
    roadmap: [
      "Search TKDL and classical texts first — identify the specific novel element beyond the known traditional use (Section 3(p)).",
      "File NBA Form II to obtain prior approval under Section 6 of the Biological Diversity Act before your patent application is finally granted.",
      "If you are accessing/collecting the raw biological resource yourself, also file NBA Form I for access approval and agree a benefit-sharing arrangement with the source community.",
      "Disclose the source and geographic origin of the biological material in Form 1 of the patent application (Section 10(4)(d)(ii)).",
      "Draft claims narrowly around the demonstrated novel element (extraction process, standardized formulation, new indication) to survive Section 3(p) scrutiny.",
      "Budget extra time — NBA approval and patent examination run on separate timelines and should be tracked in parallel.",
    ],
    relatedChunkIds: ["patents-3p", "bda-2002-s6", "bd-rules-2024-form1", "bd-rules-2024-form2", "patents-10-4d"],
  },

  formulation_use: {
    id: "formulation_use",
    type: "question",
    question: "What is the primary intended use of the formulation?",
    options: [
      { label: "Commercial sale within India", next: "result_formulation_domestic" },
      { label: "Export / international commercialization", next: "result_formulation_export" },
      { label: "Academic or clinical research only", next: "result_formulation_research" },
    ],
  },

  result_formulation_domestic: {
    id: "result_formulation_domestic",
    type: "result",
    title: "Roadmap: domestic commercial sale of a traditional formulation",
    roadmap: [
      "Classify the product as 'classical' (matches an approved formulary exactly) or 'proprietary' (new combination/ratio/indication) — this decides your licensing path.",
      "Set up manufacturing to meet Schedule T GMP requirements under the Drugs and Cosmetics Rules, 1945.",
      "Apply to your State Licensing Authority: a manufacturing licence for classical products, or a product-specific proprietary medicine licence (with safety/efficacy dossier) for proprietary ones.",
      "If a biological resource native to India is commercially utilized, check whether NBA Form I access approval and benefit-sharing is triggered.",
      "Ensure labeling meets AYUSH labeling and claims regulations before sale.",
    ],
    relatedChunkIds: ["dcr-schedule-t", "classical-vs-proprietary", "bd-rules-2024-form1"],
  },

  result_formulation_export: {
    id: "result_formulation_export",
    type: "result",
    title: "Roadmap: exporting a traditional formulation",
    roadmap: [
      "Complete domestic AYUSH manufacturing licensing first (Schedule T GMP + State Licensing Authority approval).",
      "Check destination-country regulatory classification (drug, dietary supplement, cosmetic) — requirements vary widely.",
      "If any foreign entity is involved in funding, R&D collaboration or IP filing based on the formulation, NBA approval (Section 3 and/or Section 6) is very likely required — do this before signing agreements.",
      "Consider WIPO GRATK-aligned disclosure of genetic resource origin if filing IP abroad.",
      "Evaluate GI or collective trademark protection if the formulation is tied to a specific community or region.",
    ],
    relatedChunkIds: ["bda-2002-s3", "bda-2002-s6", "wipo-gratk", "gi-act"],
  },

  result_formulation_research: {
    id: "result_formulation_research",
    type: "result",
    title: "Roadmap: research use of a traditional formulation",
    roadmap: [
      "Confirm institutional ethics/IBSC clearance for the study as applicable.",
      "If a foreign institution or researcher is involved, or results will be shared abroad, check NBA Form I (access) and Form III (transfer of research results) requirements.",
      "Document provenance of all plant/biological material used — this protects both compliance and future patentability.",
      "If findings later support a patent filing, revisit the patent branch of this wizard before filing.",
    ],
    relatedChunkIds: ["bd-rules-2024-form1", "bd-rules-2024-form3", "bda-2002-s3"],
  },

  ayush_category: {
    id: "ayush_category",
    type: "question",
    question: "Does your product match an established classical formulary exactly, or is it a new/modified formulation?",
    options: [
      { label: "Matches an official classical formulary", next: "result_classical" },
      { label: "New or modified (proprietary) formulation", next: "result_proprietary" },
    ],
  },

  result_classical: {
    id: "result_classical",
    type: "result",
    title: "Roadmap: classical AYUSH medicine licensing",
    roadmap: [
      "Confirm the formulation matches the cited authoritative text/formulary exactly (name, ingredients, ratios, process).",
      "Set up manufacturing under Schedule T GMP.",
      "Apply for a manufacturing licence (Form 25/25-D equivalent under state rules) citing the formulary reference — typically no separate product approval is required.",
      "Maintain batch and raw-material records for inspection.",
    ],
    relatedChunkIds: ["classical-vs-proprietary", "dcr-schedule-t"],
  },

  result_proprietary: {
    id: "result_proprietary",
    type: "result",
    title: "Roadmap: proprietary AYUSH medicine licensing",
    roadmap: [
      "Prepare a safety and efficacy dossier for the new/modified formulation (ingredients, ratios, or indication that depart from the formulary).",
      "Set up manufacturing under Schedule T GMP.",
      "Apply to the State Licensing Authority for a proprietary medicine licence, including the formulation dossier.",
      "Consider whether the novel formulation is also patentable (see the patent branch of this wizard) — proprietary status and patentability are assessed separately.",
    ],
    relatedChunkIds: ["classical-vs-proprietary", "dcr-schedule-t", "patents-2-1-j"],
  },

  brand_scope: {
    id: "brand_scope",
    type: "question",
    question: "Is the product/name tied to a specific community, region, or shared traditional practice, rather than a single company's brand?",
    options: [
      { label: "Yes, it's a shared, region/community-linked product", next: "result_gi" },
      { label: "No, it's a single company's brand", next: "result_trademark" },
    ],
  },

  result_gi: {
    id: "result_gi",
    type: "result",
    title: "Roadmap: Geographical Indication (GI) protection",
    roadmap: [
      "Identify the producer association or registered body eligible to apply as the GI applicant (individual companies generally cannot register a GI alone).",
      "Document how the product's qualities/characteristics are essentially attributable to the region of origin.",
      "File a GI application under the Geographical Indications of Goods (Registration & Protection) Act, 1999.",
      "Consider a linked collective/certification trademark for members to use the GI on their own branding.",
    ],
    relatedChunkIds: ["gi-act"],
  },

  result_trademark: {
    id: "result_trademark",
    type: "result",
    title: "Roadmap: standard trademark registration",
    roadmap: [
      "Run a trademark search to confirm the brand name/logo is not already registered or confusingly similar to an existing mark.",
      "File a trademark application under the Trade Marks Act, 1999 in the relevant class(es) of goods/services.",
      "If the brand also involves a proprietary formulation, evaluate the patent branch of this wizard separately — trademark and patent protection are independent and complementary.",
    ],
    relatedChunkIds: [],
  },
};

export const WIZARD_START_ID = "start";
