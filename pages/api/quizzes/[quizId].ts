import quizzes from "@/data/quizData";
import { NextApiRequest, NextApiResponse } from "next";

export default function quizHandler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { quizId },
  } = req;

  const quiz = quizzes.find((quiz) => quiz.id === parseFloat(quizId as string));

  if (!quiz) {
    return res.status(404).json({ message: "Quiz not found" });
  }

  return res.status(200).json(quiz.questions);
}
