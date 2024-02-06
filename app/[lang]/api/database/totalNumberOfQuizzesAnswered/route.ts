import sql from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const result =
    await sql`SELECT SUM(number_of_quizzes_answered) AS total_quizzes_answered FROM "learners"`;
  if (result[0] && "total_quizzes_answered" in result[0]) {
    res.status(200).json(result[0].total_quizzes_answered);
  } else {
    res.status(500).json({ error: "Something went wrong." });
  }
}
