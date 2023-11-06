import { NextApiRequest, NextApiResponse } from "next";

const answers = [
  {
    id: "1",
    quizId: "1",
    answers: [
      {
        id: 1,
        correctAnswer: "An interface between my seed phrase and the blockchain",
      },
      { id: 2, correctAnswer: "All of the above" },
    ],
  },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { quizId },
  } = req;

  const answer = answers.find((answer) => answer.id === quizId);

  if (!answer) {
    return res.status(404).json({ message: "Answers not found" });
  }

  return res.status(200).json(answer);
}
