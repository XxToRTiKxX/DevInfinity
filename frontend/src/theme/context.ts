import { createContext } from "react";
import type { ThemeMode } from "./ThemeProvider";

export interface ThemeContextValue {
  mode: ThemeMode;
  toggle: () => void;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);