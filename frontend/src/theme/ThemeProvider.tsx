import { useEffect, useState, type ReactNode } from "react";
import { ThemeContext } from "./context";
import type { ThemeContextValue } from "./context";

export type ThemeMode = "light" | "dark";

const STORAGE_KEY = "devinfinity.theme";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark") return stored;
    return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, mode);
  }, [mode]);

  const toggle = () => setMode((prev) => (prev === "light" ? "dark" : "light"));

  const value: ThemeContextValue = { mode, toggle };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}