import sql from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const result =
    await sql`SELECT SUM(number_of_quizzes_answered) AS total_quizzes_answered FROM "learners"`;
  res.json(result[0].total_quizzes_answered);
};
