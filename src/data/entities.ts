export type EntityNode = {
  id: string;
  localNames: { lang: string; name: string }[];
  sanskrit: string;
  botanical: string;
  family: string;
  knownUses: string;
  ipNotes: string;
  relatedChunkIds: string[];
};

// Simulates a small slice of the Neo4j formulation/species knowledge graph:
// Local name -> Sanskrit -> Botanical name -> IP/patent considerations.
export const entityGraph: EntityNode[] = [
  {
    id: "ashwagandha",
    localNames: [
      { lang: "hi", name: "असगंध / अश्वगंधा" },
      { lang: "ta", name: "அமுக்கரா" },
      { lang: "te", name: "పెనేరు గడ్డ" },
    ],
    sanskrit: "अश्वगन्धा (Ashwagandha)",
    botanical: "Withania somnifera",
    family: "Solanaceae",
    knownUses: "Classical rasayana (rejuvenative) herb; documented in Charaka Samhita for stress, strength and vitality.",
    ipNotes: "Its adaptogenic/stress-relief use is well-documented traditional knowledge (TKDL indexed). A claim on 'ashwagandha for stress relief' alone is vulnerable under Section 3(p). A novel standardized extract, delivery form, or clinically validated new indication may still be patentable under Section 2(1)(j).",
    relatedChunkIds: ["patents-3p", "patents-2-1-j", "tkdl"],
  },
  {
    id: "turmeric",
    localNames: [
      { lang: "hi", name: "हल्दी (Haldi)" },
      { lang: "ta", name: "மஞ்சள் (Manjal)" },
      { lang: "te", name: "పసుపు (Pasupu)" },
    ],
    sanskrit: "हरिद्रा (Haridra)",
    botanical: "Curcuma longa",
    family: "Zingiberaceae",
    knownUses: "Wound healing, antiseptic, anti-inflammatory use recorded across classical Indian medicine for centuries.",
    ipNotes: "Subject of the landmark 1997 US patent revocation (Patent 5,401,504) after TKDL-style prior art showed the wound-healing use was traditional knowledge. Foundational example behind Section 3(p) and TKDL.",
    relatedChunkIds: ["case-turmeric", "patents-3p", "tkdl"],
  },
  {
    id: "neem",
    localNames: [
      { lang: "hi", name: "नीम (Neem)" },
      { lang: "ta", name: "வேம்பு (Vembu)" },
      { lang: "te", name: "వేప (Vepa)" },
    ],
    sanskrit: "निम्ब (Nimba)",
    botanical: "Azadirachta indica",
    family: "Meliaceae",
    knownUses: "Traditional antifungal, antibacterial and biopesticide use; also used in skincare and oral care.",
    ipNotes: "Subject of the 1994 European biopesticide patent that was opposed and revoked by 2005 for claiming known traditional antifungal use. A key biopiracy precedent alongside turmeric.",
    relatedChunkIds: ["case-neem", "patents-3p", "tkdl"],
  },
  {
    id: "tulsi",
    localNames: [
      { lang: "hi", name: "तुलसी (Tulsi)" },
      { lang: "ta", name: "துளசி (Thulasi)" },
      { lang: "te", name: "తులసి (Tulasi)" },
    ],
    sanskrit: "तुलसी / सुरसा (Tulasi)",
    botanical: "Ocimum tenuiflorum (syn. Ocimum sanctum)",
    family: "Lamiaceae",
    knownUses: "Respiratory, immunity and adaptogenic use; also of religious/cultural significance.",
    ipNotes: "Widely documented traditional use for immunity and respiratory relief. Generic extract patents risk Section 3(p) objections; novel formulation combinations or extraction methods with a demonstrated new technical effect are the patentable path.",
    relatedChunkIds: ["patents-3p", "patents-2-1-j", "tkdl"],
  },
  {
    id: "brahmi",
    localNames: [
      { lang: "hi", name: "ब्राह्मी (Brahmi)" },
      { lang: "ta", name: "பிரம்மி (Birami)" },
      { lang: "te", name: "సరస్వతి ఆకు" },
    ],
    sanskrit: "ब्राह्मी (Brahmi)",
    botanical: "Bacopa monnieri",
    family: "Plantaginaceae",
    knownUses: "Classical nootropic/memory-enhancing herb used in Medhya Rasayana formulations.",
    ipNotes: "Cognitive-enhancement use is classical traditional knowledge. Standardized bacoside-content extracts with clinically demonstrated, non-obvious efficacy have supported patentable process/formulation claims in the past.",
    relatedChunkIds: ["patents-3p", "patents-2-1-j"],
  },
  {
    id: "guggul",
    localNames: [
      { lang: "hi", name: "गुग्गुल (Guggul)" },
      { lang: "ta", name: "குக்குலு (Gukkulu)" },
      { lang: "te", name: "గుగ్గిలం (Guggilam)" },
    ],
    sanskrit: "गुग्गुलु (Guggulu)",
    botanical: "Commiphora wightii",
    family: "Burseraceae",
    knownUses: "Resin used classically for joint health, lipid metabolism and inflammation.",
    ipNotes: "Endangered/regulated species — sourcing may trigger both Biological Diversity Act access approvals and forest/wildlife sourcing rules in addition to the usual Section 3(p) novelty scrutiny.",
    relatedChunkIds: ["patents-3p", "bda-2002-s3", "bd-rules-2024-form1"],
  },
];
