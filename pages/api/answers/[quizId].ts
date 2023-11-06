import { NextApiRequest, NextApiResponse } from "next";

const answers = [
  {
    id: "1",
    quizId: "1",
    correctAnswers: [
      "An interface between my seed phrase and the blockchain",
      "All of the above",
    ],
  },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { quizId },
  } = req;

  const requestAnswers = answers.find((answer) => answer.quizId === quizId);

  if (!requestAnswers) {
    return res.status(404).json({ message: "Answers not found" });
  }

  return res.status(200).json(requestAnswers.correctAnswers);
}
