import { NextApiRequest, NextApiResponse } from "next";
import answers from "@/data/quizAnswers";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { quizId },
  } = req;

  const requestAnswers = answers.find(
    (answer) => answer.quizId === parseFloat(quizId as string)
  );

  if (!requestAnswers) {
    return res.status(404).json({ message: "Answers not found" });
  }

  return res.status(200).json(requestAnswers.correctAnswers);
}
