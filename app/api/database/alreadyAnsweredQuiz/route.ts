import sql from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const result =
    await sql`SELECT answered FROM "quizzes_answered" WHERE wallet = ${
      req.query.wallet as string
    } AND quiz_id = ${req.query.quizId as string}`;

  if (result[0] && "answered" in result[0]) {
    res.status(200).json(result[0].answered);
  } else {
    res.status(500).json({ error: "Something went wrong." });
  }
}
