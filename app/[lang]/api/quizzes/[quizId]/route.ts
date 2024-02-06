import quizzes from "@/data/quizData";
import { NextApiRequest, NextApiResponse } from "next";

const getQuestionsByLanguage = (quiz: any, lang: string) => {
  switch (lang) {
    case "en":
      return quiz.questions.map((q: any) => ({
        questionId: q.questionId,
        question: q.question.en,
        options: q.options.en,
      }));
    case "fr":
      return quiz.questions.map((q: any) => ({
        questionId: q.questionId,
        question: q.question.fr,
        options: q.options.fr,
      }));
    default:
      return quiz.questions.map((q: any) => ({
        questionId: q.questionId,
        question: q.question.en,
        options: q.options.en,
      }));
  }
};

export default function quizHandler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { quizId, lang },
  } = req;

  const quiz = quizzes.find(
    (quiz) => quiz.quizId === parseFloat(quizId as string)
  );

  if (!quiz) {
    return res.status(404).json({ message: "Quiz not found" });
  }

  const questionsInLanguage = getQuestionsByLanguage(quiz, lang as string);

  if (!questionsInLanguage) {
    return res.status(404).json({ message: "Language not found" });
  }

  return res.status(200).json(questionsInLanguage);
}
