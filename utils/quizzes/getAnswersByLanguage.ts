import { QuizAnswer } from "@/types/courses/quiz";

export const getAnswersByLanguage = (quiz: QuizAnswer, lang: string) => {
  switch (lang) {
    case "en":
      return quiz.correctAnswers.en;
    case "fr":
      return quiz.correctAnswers.fr;
    default:
      return quiz.correctAnswers.en;
  }
};
