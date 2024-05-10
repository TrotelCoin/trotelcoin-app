import type { LanguageStrings } from "@/types/language/lang";
import type { Tier } from "@/types/premium/premium";

export interface Lesson {
  title: LanguageStrings;
  description: LanguageStrings;
  href: string;
  tier: Tier;
  sponsored: boolean;
  new: boolean;
  quizId: number;
  available: boolean;
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
  | "Investing";

export interface Lessons {
  category: LessonCategory;
  courses: Lesson[];
}
