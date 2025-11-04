'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  
} from "react";
import type { ReactNode } from "react";
export type LanguageOption = "en" | "hi" | "as";

export interface TranslationKeys {
  home: string;
  insight: string;
  compare: string;
  about: string;
  contact: string;
  install: string;
  guide: string;
  [key: string]: string;
}

// 3️⃣ Define context structure
interface LanguageContextType {
  language: LanguageOption;
  changeLanguage: (lang: LanguageOption) => void;
  t: TranslationKeys;
}

// Add ALL keys used in Navbar!
const translations: Record<LanguageOption, TranslationKeys> = {
  en: {
    home: "Home",
    insight: "Insights",
    compare: "Compare",
    about: "About",
    contact: "Contact",
    install: "Install App",
    guide: "Guide",
  },
  hi: {
    home: "होम",
    insight: "इनसाइट्स",
    compare: "तुलना करें",
    about: "हमारे बारे में",
    contact: "संपर्क करें",
    install: "ऐप इंस्टॉल करें",
    guide: "मार्गदर्शिका",
  },
  as: {
    home: "ঘৰ",
    insight: "পূৰ্বাভাস",
    compare: "তুলনা কৰক",
    about: "আমাৰ বিষয়ে",
    contact: "যোগাযোগ",
    install: "এপ ইনষ্টল কৰক",
    guide: "গাইড",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<LanguageOption>("en");

  useEffect(() => {
    const savedLang = localStorage.getItem("language") as LanguageOption | null;
    if (savedLang && ["en", "hi", "as"].includes(savedLang)) {
      setLanguage(savedLang);
    }
  }, []);

  const changeLanguage = (lang: LanguageOption) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        changeLanguage,
        t: translations[language],
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};