import type { Lang } from "@/types/lang";

export interface Modals {
  title: string;
  show: boolean;
  message: string;
  onClose: () => void;
  lang: Lang;
}

export type Colors = "Blue" | "Red" | "Green" | "Yellow" | "Purple" | "Orange";

export type FooterItem = {
  name: string | false | undefined;
  href: string;
  display: boolean;
  id: number;
  anotherWindow: boolean;
};

export type MobileFooterItem = {
  name: string;
  href: string;
  id: number;
  iconOutline?: React.JSX.Element;
  iconSolid?: React.JSX.Element;
};

export type LeaderboardItem = {
  name: string;
  href: string;
  id: number;
  wallet: string;
  ens: string;
  number_of_quizzes_answered: number;
  current_streak: number;
  iconOutline: React.JSX.Element;
  iconSolid: React.JSX.Element;
};
