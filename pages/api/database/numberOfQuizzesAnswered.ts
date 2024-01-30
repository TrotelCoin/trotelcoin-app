import sql from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const result =
    await sql`SELECT number_of_quizzes_answered FROM "learners" WHERE wallet = ${
      req.query.wallet as string
    }`;
  res.json(result[0].number_of_quizzes_answered);
};
