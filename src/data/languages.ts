export type LanguageCode = "en" | "hi" | "ta" | "te" | "kn" | "mr" | "bn";

export type Language = {
  code: LanguageCode;
  label: string;
  nativeLabel: string;
  speechLocale: string; // BCP-47 tag for Web Speech API
};

export const languages: Language[] = [
  { code: "en", label: "English", nativeLabel: "English", speechLocale: "en-IN" },
  { code: "hi", label: "Hindi", nativeLabel: "हिन्दी", speechLocale: "hi-IN" },
  { code: "ta", label: "Tamil", nativeLabel: "தமிழ்", speechLocale: "ta-IN" },
  { code: "te", label: "Telugu", nativeLabel: "తెలుగు", speechLocale: "te-IN" },
  { code: "kn", label: "Kannada", nativeLabel: "ಕನ್ನಡ", speechLocale: "kn-IN" },
  { code: "mr", label: "Marathi", nativeLabel: "मराठी", speechLocale: "mr-IN" },
  { code: "bn", label: "Bengali", nativeLabel: "বাংলা", speechLocale: "bn-IN" },
];

type Dict = Record<LanguageCode, string>;

// Hand-authored UI strings for the languages named in the pitch deck.
// Answer *content* generation (via the LLM path) targets the same languages;
// this dictionary covers the app chrome so the UI itself feels multilingual
// even without a live translation API key configured.
export const ui: Record<string, Dict> = {
  tagline: {
    en: "Multilingual RAG assistant for IP guidance & AYUSH compliance",
    hi: "आईपी मार्गदर्शन और आयुष अनुपालन के लिए बहुभाषी एआई सहायक",
    ta: "அறிவுசார் சொத்து வழிகாட்டுதல் மற்றும் ஆயுஷ் இணக்கத்திற்கான பலமொழி உதவியாளர்",
    te: "ఐపీ మార్గదర్శకత్వం & ఆయుష్ సమ్మతి కోసం బహుభాషా సహాయకుడు",
    kn: "ಐಪಿ ಮಾರ್ಗದರ್ಶನ ಮತ್ತು ಆಯುಷ್ ಅನುಸರಣೆಗಾಗಿ ಬಹುಭಾಷಾ ಸಹಾಯಕ",
    mr: "आयपी मार्गदर्शन आणि आयुष अनुपालनासाठी बहुभाषिक सहाय्यक",
    bn: "আইপি নির্দেশিকা ও আয়ুশ কমপ্লায়েন্সের জন্য বহুভাষিক সহায়ক",
  },
  askPlaceholder: {
    en: "Ask about patents, TKDL, NBA approvals, AYUSH licensing…",
    hi: "पेटेंट, टीकेडीएल, एनबीए अनुमोदन, आयुष लाइसेंसिंग के बारे में पूछें…",
    ta: "காப்புரிமை, TKDL, NBA ஒப்புதல்கள், ஆயுஷ் உரிமம் பற்றி கேளுங்கள்…",
    te: "పేటెంట్లు, TKDL, NBA అనుమతులు, ఆయుష్ లైసెన్సింగ్ గురించి అడగండి…",
    kn: "ಪೇಟೆಂಟ್, TKDL, NBA ಅನುಮೋದನೆ, ಆಯುಷ್ ಪರವಾನಗಿ ಬಗ್ಗೆ ಕೇಳಿ…",
    mr: "पेटंट, TKDL, NBA मंजुरी, आयुष परवाना याबद्दल विचारा…",
    bn: "পেটেন্ট, TKDL, NBA অনুমোদন, আয়ুশ লাইসেন্স নিয়ে জিজ্ঞাসা করুন…",
  },
  send: {
    en: "Send", hi: "भेजें", ta: "அனுப்பு", te: "పంపండి", kn: "ಕಳುಹಿಸಿ", mr: "पाठवा", bn: "পাঠান",
  },
  listening: {
    en: "Listening…", hi: "सुन रहा है…", ta: "கேட்கிறது…", te: "వింటోంది…", kn: "ಆಲಿಸುತ್ತಿದೆ…", mr: "ऐकत आहे…", bn: "শুনছে…",
  },
  sources: {
    en: "Sources", hi: "स्रोत", ta: "மூலங்கள்", te: "మూలాలు", kn: "ಮೂಲಗಳು", mr: "स्रोत", bn: "উৎস",
  },
  dataUnavailable: {
    en: "Data unavailable in the current knowledge base — please verify with an official source or a qualified IP/AYUSH consultant rather than relying on a guess.",
    hi: "वर्तमान नॉलेज बेस में जानकारी उपलब्ध नहीं है — कृपया किसी आधिकारिक स्रोत या योग्य आईपी/आयुष सलाहकार से पुष्टि करें।",
    ta: "தற்போதைய தரவுத்தளத்தில் தகவல் இல்லை — தயவுசெய்து அதிகாரப்பூர்வ மூலத்தை அல்லது தகுதியான ஆலோசகரை அணுகவும்.",
    te: "ప్రస్తుత నాలెడ్జ్ బేస్‌లో సమాచారం అందుబాటులో లేదు — దయచేసి అధికారిక మూలాన్ని లేదా అర్హత కలిగిన సలహాదారుని సంప్రదించండి.",
    kn: "ಪ್ರಸ್ತುತ ಜ್ಞಾನಕೋಶದಲ್ಲಿ ಮಾಹಿತಿ ಲಭ್ಯವಿಲ್ಲ — ದಯವಿಟ್ಟು ಅಧಿಕೃತ ಮೂಲ ಅಥವಾ ತಜ್ಞ ಸಲಹೆಗಾರರನ್ನು ಸಂಪರ್ಕಿಸಿ.",
    mr: "सध्याच्या नॉलेज बेसमध्ये माहिती उपलब्ध नाही — कृपया अधिकृत स्रोत किंवा तज्ञ सल्लागाराची मदत घ्या.",
    bn: "বর্তমান নলেজ বেসে তথ্য নেই — অনুগ্রহ করে সরকারি উৎস বা যোগ্য পরামর্শদাতার সাহায্য নিন।",
  },
};

export function t(key: keyof typeof ui, lang: LanguageCode): string {
  return ui[key][lang] ?? ui[key].en;
}
