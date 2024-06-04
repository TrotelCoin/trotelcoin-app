import type { LanguageStrings } from "@/types/language/lang";
import type { Tier } from "@/types/premium/premium";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

export interface Lesson {
  title: LanguageStrings;
  description: LanguageStrings;
  href: string;
  tier: Tier;
  date: Date;
  sponsored: boolean;
  new: boolean;
  quizId: number;
  available: boolean;
  cover?: string | StaticImport;
  category?: LessonCategory;
}

export type LessonCategory =
  | "TrotelCoin"
  | "Wallet"
  | "Blockchain"
  | "Bitcoin"
  | "Ethereum"
  | "Governance"
  | "Stablecoins"
  | "Web3"
  | "DeFi"
  | "GameFi"
  | "Metaverse"
  | "NFTs"
  | "Altcoins"
  | "Trading"
  | "Investing"
  | "New Courses";

export interface Lessons {
  category: LessonCategory;
  courses: Lesson[];
}
