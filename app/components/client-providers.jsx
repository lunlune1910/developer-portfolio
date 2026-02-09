"use client";

import { LanguageProvider } from "@/app/context/LanguageContext";

export default function ClientProviders({ children }) {
  return <LanguageProvider>{children}</LanguageProvider>;
}
