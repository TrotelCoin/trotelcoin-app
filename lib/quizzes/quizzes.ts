import lessons from "@/data/lessons/lessonsData";
import type { Quiz, Question } from "@/types/courses/quiz";
import type { Lang } from "@/types/lang";
import axios from "axios";
import { Address } from "viem";

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
  address: Address,
  numberOfWrongAnswers: number,
  totalQuestions: number
) => {
  await axios
    .post(
      `/api/database/postQuizzesResult?quizId=${quizId}&wallet=${address}&numberOfWrongAnswers=${numberOfWrongAnswers}&totalQuestions=${totalQuestions}`
    )
    .catch((error) => {
      console.error(error);
    });
};

export const postQuizzesTime = async (
  quizId: number,
  address: Address,
  diffTime: number
) => {
  await axios
    .post(
      `/api/database/postQuizzesTime?quizId=${quizId}&wallet=${address}&diffTime=${diffTime}`
    )
    .catch((error) => console.error(error));
};

export const checkIfCourseIsAvailable = (quizId: number): boolean => {
  const isCourseAvailable = lessons.some((category) => {
    category.courses.some((lesson) => {
      return lesson.quizId && lesson.available;
    });
  });

  return isCourseAvailable;
};
