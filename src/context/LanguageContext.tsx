"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { LanguageCode, languages } from "@/data/languages";

type LanguageContextValue = {
  code: LanguageCode;
  setCode: (code: LanguageCode) => void;
};

const LanguageContext = createContext<LanguageContextValue>({
  code: "en",
  setCode: () => {},
});

const STORAGE_KEY = "ip-sakti-language";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [code, setCodeState] = useState<LanguageCode>("en");

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY) as LanguageCode | null;
      if (stored && languages.some((l) => l.code === stored)) {
        // Deliberate: hydrate from localStorage only after mount so server and
        // client first-render markup match; avoids a hydration mismatch.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setCodeState(stored);
      }
    } catch {
      // ignore (private browsing / disabled storage)
    }
  }, []);

  function setCode(next: LanguageCode) {
    setCodeState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore
    }
  }

  return (
    <LanguageContext.Provider value={{ code, setCode }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
