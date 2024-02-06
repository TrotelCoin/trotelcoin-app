import sql from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const result =
    await sql`SELECT number_of_quizzes_answered FROM "learners" WHERE wallet = ${
      req.query.wallet as string
    }`;
  if (result[0] && "number_of_quizzes_answered" in result[0]) {
    res.status(200).json(result[0].number_of_quizzes_answered);
  } else {
    res.status(500).json({ error: "Something went wrong." });
  }
}
