"use client";

import { createContext, useContext, useState, useEffect } from "react";
import en from "@/utils/i18n/en";
import vi from "@/utils/i18n/vi";

const translations = { en, vi };

const LanguageContext = createContext(null);

const defaultT = (key) => {
  const keys = key.split(".");
  let value = translations["en"];
  for (const k of keys) {
    value = value?.[k];
  }
  return value || key;
};

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("en");

  useEffect(() => {
    const saved = localStorage.getItem("lang");
    if (saved && (saved === "en" || saved === "vi")) {
      setLang(saved);
    }
  }, []);

  const toggleLanguage = () => {
    const newLang = lang === "en" ? "vi" : "en";
    setLang(newLang);
    localStorage.setItem("lang", newLang);
  };

  const t = (key) => {
    const keys = key.split(".");
    let value = translations[lang];
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    return { lang: "en", toggleLanguage: () => {}, t: defaultT };
  }
  return context;
}
