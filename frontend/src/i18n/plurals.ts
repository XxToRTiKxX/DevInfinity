import type { Language } from "./translations";
import { plural } from "../utils/plural";

export type CountNoun = "participant" | "person" | "role";

const FORMS: Record<Language, Record<CountNoun, [one: string, few: string, many: string]>> = {
  ru: {
    participant: ["участник", "участника", "участников"],
    person: ["человек", "человека", "человек"],
    role: ["роль", "роли", "ролей"],
  },
  en: {
    participant: ["member", "members", "members"],
    person: ["person", "people", "people"],
    role: ["role", "roles", "roles"],
  },
};

export function countLabel(lang: Language, n: number, noun: CountNoun): string {
  const [one, few, many] = FORMS[lang][noun];
  return `${n} ${plural(n, { one, few, many })}`;
}