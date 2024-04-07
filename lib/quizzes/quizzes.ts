import type { Quiz, Question } from "@/types/courses/quiz";
import type { Lang } from "@/types/lang";
import axios from "axios";

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

export const postQuizzesResult = async (
  quizId: number,
  numberOfWrongAnswers: number,
  totalQuestions: number
) => {
  await axios
    .post(
      `/api/database/postQuizzesResult?quizId=${quizId}&numberOfWrongAnswers=${numberOfWrongAnswers}&totalQuestions=${totalQuestions}`
    )
    .catch((error) => {
      console.error(error);
    });
};
