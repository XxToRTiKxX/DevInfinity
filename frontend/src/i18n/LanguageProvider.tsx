import { useEffect, useState, type ReactNode } from "react";
import { I18nContext } from "./context";
import { translations, type Language, type Messages, type TranslationKey } from "./translations";

const STORAGE_KEY = "devinfinity.lang";

function resolvePath(obj: Messages, path: string): string {
  let current: unknown = obj;
  for (const part of path.split(".")) {
    if (current && typeof current === "object" && part in current) {
      current = (current as Record<string, unknown>)[part];
    } else {
      return path;
    }
  }
  return typeof current === "string" ? current : path;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === "en" ? "en" : "ru";
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (next: Language) => setLangState(next);

  const t = (key: TranslationKey, params?: Record<string, string | number>) => {
    let text = resolvePath(translations[lang], key);
    if (params) {
      for (const [name, value] of Object.entries(params)) {
        text = text.replace(`{${name}}`, String(value));
      }
    }
    return text;
  };

  return <I18nContext.Provider value={{ lang, setLang, t }}>{children}</I18nContext.Provider>;
}