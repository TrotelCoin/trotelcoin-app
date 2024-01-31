import sql from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const result =
    await sql`SELECT answered FROM "quizzes_answered" WHERE wallet = ${
      req.query.wallet as string
    } AND quiz_id = ${req.query.quizId as string}`;

  if (result[0] && "answered" in result[0]) {
    res.json(result[0].answered);
  } else {
    res.json({});
  }
};