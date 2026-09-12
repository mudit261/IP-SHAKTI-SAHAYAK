export type KnowledgeChunk = {
  id: string;
  source: string;
  section: string;
  title: string;
  text: string;
  tags: string[];
};

// Curated, illustrative legal/reference dataset for the IP-SAKTI Sahayak prototype.
// Paraphrased summaries of public statutes and well-known cases for demo purposes only —
// NOT a substitute for the official gazette text or professional legal advice.
export const knowledgeBase: KnowledgeChunk[] = [
  {
    id: "patents-3p",
    source: "The Patents Act, 1970",
    section: "Section 3(p)",
    title: "Traditional knowledge is not patentable",
    text: "An invention that, in effect, is traditional knowledge or is merely an aggregation or duplication of known properties of a traditionally known component (or components) is not an invention under the Act and cannot be patented. A claim built only on a known plant's known traditional use will typically fail this test.",
    tags: ["traditional knowledge", "patentability", "ayurveda", "formulation", "biopiracy", "novelty", "herbal"],
  },
  {
    id: "patents-2-1-j",
    source: "The Patents Act, 1970",
    section: "Section 2(1)(j)",
    title: "What counts as a patentable invention",
    text: "A patentable invention must be a new product or process involving an inventive step (a feature not obvious to a person skilled in the art) and must be capable of industrial application. A traditional formulation can still be patented if a genuinely novel and non-obvious element is added — e.g. a new extraction process, a new delivery mechanism, or a new combination with a demonstrable, non-obvious technical effect.",
    tags: ["novelty", "inventive step", "industrial application", "patentability", "extraction process", "formulation"],
  },
  {
    id: "patents-10-4d",
    source: "The Patents Act, 1970",
    section: "Section 10(4)(d)(ii) & Form 1",
    title: "Disclosure of source of biological material",
    text: "Where an invention uses a biological material obtained from India, the applicant must disclose the source and geographical origin of that material in the patent specification (Form 1). Non-disclosure or wrongful disclosure can be a ground for opposition or revocation under Sections 25 and 64.",
    tags: ["biological material", "disclosure", "form 1", "source", "geographical origin", "patent application"],
  },
  {
    id: "bda-2002-s3",
    source: "The Biological Diversity Act, 2002",
    section: "Section 3",
    title: "Prior approval for foreign use of Indian biological resources",
    text: "A person who is not a citizen of India, or a body corporate not incorporated/registered in India (or with non-Indian participation in management or share capital), must obtain prior approval of the National Biodiversity Authority (NBA) before obtaining any Indian biological resource for research, commercial use, or bio-survey/bio-utilization.",
    tags: ["nba", "biological diversity act", "foreign entity", "prior approval", "access", "biological resource"],
  },
  {
    id: "bda-2002-s6",
    source: "The Biological Diversity Act, 2002",
    section: "Section 6",
    title: "NBA approval before applying for IP based on Indian biological resources",
    text: "No person shall apply for any intellectual property right, in or outside India, for an invention based on research or information on a biological resource obtained from India, without obtaining the previous approval of the National Biodiversity Authority before making such application. The IP office may still grant the right, but approval must be obtained before it is finally granted, on pain of the application being void.",
    tags: ["nba", "intellectual property", "patent application", "prior approval", "biological resource", "biopiracy"],
  },
  {
    id: "bd-rules-2024-form1",
    source: "Biological Diversity Rules, 2024",
    section: "NBA Form I",
    title: "Form I — Access to biological resources / traditional knowledge",
    text: "Form I is used to seek NBA approval for accessing biological resources and/or associated traditional knowledge occurring in India for research, commercial utilization, bio-survey, or bio-utilization. It requires details of the resource, source location, intended use, and proposed benefit-sharing arrangement with local communities.",
    tags: ["nba form", "form i", "access", "benefit sharing", "biological resource", "traditional knowledge"],
  },
  {
    id: "bd-rules-2024-form2",
    source: "Biological Diversity Rules, 2024",
    section: "NBA Form II",
    title: "Form II — IPR applications involving Indian biological resources",
    text: "Form II is filed to obtain NBA's previous approval, under Section 6 of the Act, before applying for a patent, design, or other IP right (in India or abroad) for an invention based on a biological resource or associated knowledge obtained from India. It must be filed before the IP application is finally granted, and ideally before or alongside filing.",
    tags: ["nba form", "form ii", "ipr", "patent", "section 6", "biological resource"],
  },
  {
    id: "bd-rules-2024-form3",
    source: "Biological Diversity Rules, 2024",
    section: "NBA Form III",
    title: "Form III — Transfer of research results",
    text: "Form III covers intimation/approval for transferring the results of research relating to Indian biological resources to a person who is not a citizen of India, or to a foreign entity, for monetary or non-monetary consideration.",
    tags: ["nba form", "form iii", "transfer of results", "research", "foreign entity"],
  },
  {
    id: "bd-rules-2024-form4",
    source: "Biological Diversity Rules, 2024",
    section: "NBA Form IV",
    title: "Form IV — Third-party transfer of accessed material",
    text: "Form IV is used when a person who has already obtained approval to access a biological resource wishes to transfer that resource, or the associated knowledge, to a third party for further research or commercial use.",
    tags: ["nba form", "form iv", "third party transfer", "biological resource"],
  },
  {
    id: "tkdl",
    source: "CSIR / Ministry of AYUSH",
    section: "Traditional Knowledge Digital Library (TKDL)",
    title: "TKDL as prior-art evidence against wrongful patents",
    text: "The TKDL is a database that documents traditional medicine formulations (Ayurveda, Unani, Siddha, Yoga) from classical texts, translated into patent-office-searchable formats and languages. Patent examiners use it to identify prior art and reject or oppose patent claims that merely restate known traditional knowledge. It was central to revoking the turmeric and neem patents.",
    tags: ["tkdl", "prior art", "biopiracy", "traditional knowledge", "patent examiner", "classical texts"],
  },
  {
    id: "case-turmeric",
    source: "Landmark Case",
    section: "US Patent 5,401,504 (Turmeric)",
    title: "Turmeric wound-healing patent revoked (1997)",
    text: "In 1995 the US Patent Office granted a patent on the use of turmeric powder for wound healing. CSIR challenged it in 1996, citing ancient Ayurvedic texts and traditional use as prior art. The USPTO revoked the patent in 1997 — it is widely cited as the first case where traditional knowledge from a developing country successfully invalidated a US patent.",
    tags: ["turmeric", "haldi", "curcuma longa", "biopiracy", "prior art", "revoked patent", "wound healing"],
  },
  {
    id: "case-neem",
    source: "Landmark Case",
    section: "European Patent EP0436257 (Neem)",
    title: "Neem biopesticide patent revoked (2005)",
    text: "A 1994 European patent on a method of controlling fungal infection using neem oil was opposed by India, the EU, and civil-society groups on the ground that the fungicidal properties of neem were traditional Indian knowledge, not a novel invention. The European Patent Office revoked the patent in 2000, a decision upheld on appeal in 2005.",
    tags: ["neem", "azadirachta indica", "biopesticide", "biopiracy", "revoked patent", "epo"],
  },
  {
    id: "wipo-gratk",
    source: "WIPO Treaty on IP, Genetic Resources and Associated Traditional Knowledge (2024)",
    section: "Disclosure obligation",
    title: "International disclosure requirement for genetic resources / TK",
    text: "Adopted in May 2024, this WIPO treaty requires patent applicants to disclose the country of origin (or source) of genetic resources, and the indigenous/local community that provided associated traditional knowledge, where the claimed invention is materially based on them. It aims to give patent offices worldwide better tools to prevent biopiracy and erroneous patents.",
    tags: ["wipo", "gratk", "genetic resources", "disclosure", "international", "traditional knowledge"],
  },
  {
    id: "dcr-schedule-t",
    source: "Drugs and Cosmetics Rules, 1945",
    section: "Schedule T",
    title: "GMP requirements for Ayurvedic, Siddha & Unani drug manufacturing",
    text: "Schedule T lays down Good Manufacturing Practice (GMP) requirements — factory premises, raw material testing, in-process quality control, and record keeping — that a manufacturing unit must meet to be licensed to produce Ayurvedic, Siddha, or Unani (ASU) drugs under the Drugs and Cosmetics Act, 1940.",
    tags: ["gmp", "schedule t", "ayush license", "manufacturing", "ayurveda", "quality control"],
  },
  {
    id: "classical-vs-proprietary",
    source: "Drugs and Cosmetics Act, 1940 (State Licensing Practice)",
    section: "Classical vs. Proprietary ASU medicine",
    title: "Classical formulations vs. proprietary (patent/novel) AYUSH medicines",
    text: "A 'classical' Ayurvedic/Siddha/Unani medicine is one made exactly as described in an authoritative formulary text (e.g. the Ayurvedic Formulary of India) and generally needs only a manufacturing licence, without per-product approval. A 'proprietary' or patent formulation departs from the formulary (new combination, new ratio, new indication) and typically needs additional safety/efficacy documentation and product-specific approval from the State Licensing Authority before it can be marketed.",
    tags: ["classical medicine", "proprietary medicine", "ayush license", "formulary", "state licensing authority"],
  },
  {
    id: "gi-act",
    source: "Geographical Indications of Goods (Registration & Protection) Act, 1999",
    section: "GI registration",
    title: "Protecting region-specific traditional products via GI tags",
    text: "A Geographical Indication (GI) protects the name of a product that is specific to a region and whose qualities are essentially attributable to that geographic origin (e.g. Darjeeling Tea, Kangra Tea, Nagpur Orange). Community or region-linked traditional formulations and crafts are often better protected through GI + collective trademark registration than through an individual patent, since they are shared community knowledge rather than a single inventor's novel creation.",
    tags: ["geographical indication", "gi tag", "trademark", "community knowledge", "region specific"],
  },
];
