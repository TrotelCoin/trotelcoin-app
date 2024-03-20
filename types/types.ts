import { Address } from "viem";

export interface Modals {
  title: string;
  show: boolean;
  message: string;
  onClose: () => void;
  lang: Lang;
}

export interface Module {
  id: number;
  href: string;
  module: string;
  status: "Not started" | "Finished" | "Ongoing";
  statusText: string;
  description: string;
  environment: "Not started" | "Finished" | "Ongoing";
  submodules: Submodule[];
}

export interface Submodule {
  id: number;
  href: string;
  module: string;
  status: "Not started" | "Finished" | "Ongoing";
  environment: "Not started" | "Finished" | "Ongoing";
  description: string;
}

export interface BalanceData {
  data?: {
    formatted: string;
  };
  isError: boolean;
  isLoading: boolean;
  refetch: () => void;
}

export type Lang = "en" | "fr";

export type LanguageOptions = {
  en: string[];
  fr: string[];
};

export type LanguageStrings = {
  en: string;
  fr: string;
};

export interface Tier {
  en: "Beginner" | "Intermediate" | "Expert";
  fr: "Débutant" | "Intermédiaire" | "Expert";
}

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

export interface Lessons {
  category: string;
  courses: Lesson[];
}

export interface Course {
  title: LanguageStrings;
  one: LanguageStrings;
  two: LanguageStrings;
  three: LanguageStrings;
}

export interface Answers {
  [key: number]: string;
}

export type Question = {
  questionId: number;
  question: LanguageStrings;
  options: LanguageOptions;
};

export type Quiz = {
  quizId: number;
  title: string;
  questions: {
    questionId: number;
    question: LanguageStrings;
    options: LanguageOptions;
  }[];
};

export type QuizAnswer = {
  quizId: number;
  correctAnswers: {
    en: string[];
    fr: string[];
  };
};

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

export type Courses = {
  quiz_id: any;
  answered: any;
}[];

export type Badge = {
  id: number;
  name: string;
  image: string;
  condition: boolean | null;
  progress: number;
  maxProgress: number;
};

export type Badges = Badge[];

export type BadgesNames =
  | "ranks"
  | "quizzes"
  | "streaks"
  | "trotelCoins"
  | "staking"
  | "timeStaked"
  | "stakingDuration";

export type Vocabulary = {
  en: {
    word: string;
    definition: string;
  };
  fr: {
    word: string;
    definition: string;
  };
}[];

export type QuizData = {
  quizId: number;
  title: string;
  questions: {
    questionId: number;
    question: {
      en: string;
      fr: string;
    };
    options: {
      en: string[];
      fr: string[];
    };
  }[];
}[];

export type Cards = {
  en: {
    title: string;
    text: string | JSX.Element;
  }[];
  fr: {
    title: string;
    text: string | JSX.Element;
  }[];
};

export type Theme = "light" | "dark";

export type Token = {
  address: Address;
  decimals: number;
  symbol: string;
};

export type Sort = "output" | "gas" | "time";
