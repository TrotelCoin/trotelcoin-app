import { Question, Quiz } from "@/types/courses/quiz";
import { Lang } from "@/types/language/lang";

export const getQuestionsByLanguage = (quiz: Quiz, lang: Lang) => {
  switch (lang) {
    case "en":
      return quiz.questions.map((q: Question) => ({
        questionId: q.questionId,
        question: q.question,
        options: q.options,
      }));
    case "fr":
      return quiz.questions.map((q: Question) => ({
        questionId: q.questionId,
        question: q.question,
        options: q.options,
      }));
    default:
      return quiz.questions.map((q: Question) => ({
        questionId: q.questionId,
        question: q.question,
        options: q.options,
      }));
  }
};
