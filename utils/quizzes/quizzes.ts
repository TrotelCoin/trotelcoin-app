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
  await axios.post(
    `/api/user/quizzes/mark?quizId=${quizId}&wallet=${address}&numberOfWrongAnswers=${numberOfWrongAnswers}&totalQuestions=${totalQuestions}`
  );
};

export const postQuizzesTime = async (
  quizId: number,
  address: Address,
  diffTime: number
) => {
  await axios.post(
    `/api/user/quizzes/time?quizId=${quizId}&wallet=${address}&diffTime=${diffTime}`
  );
};

export const checkIfCourseIsAvailable = (quizId: number): boolean => {
  const isCourseAvailable = lessons.some((category) => {
    category.courses.some((lesson) => {
      return lesson.quizId && lesson.available;
    });
  });

  return isCourseAvailable;
};
