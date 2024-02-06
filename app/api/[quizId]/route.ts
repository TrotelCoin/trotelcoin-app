import { NextApiRequest, NextApiResponse } from "next";
import answers from "@/data/quizAnswers";

const getAnswersByLanguage = (quiz: any, lang: string) => {
  switch (lang) {
    case "en":
      return quiz.correctAnswers.en;
    case "fr":
      return quiz.correctAnswers.fr;
    default:
      return quiz.correctAnswers.en;
  }
};

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { quizId, lang },
  } = req;

  const quiz = answers.find(
    (answer) => answer.quizId === parseFloat(quizId as string)
  );

  if (!quiz) {
    return res.status(404).json({ message: "Answers not found" });
  }

  const answersInLanguage = getAnswersByLanguage(quiz, lang as string);

  if (!answersInLanguage) {
    return res.status(404).json({ message: "Language not found" });
  }

  return res.status(200).json(answersInLanguage);
}
