import type { LanguageOptions, LanguageStrings } from "@/types/lang";

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
