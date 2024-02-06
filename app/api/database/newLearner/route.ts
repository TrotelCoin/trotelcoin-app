import { NextApiRequest, NextApiResponse } from "next";
import sql from "@/lib/db";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const wallet = req.body.wallet;

  try {
    // check if the wallet exists in the database
    const userExists =
      await sql`SELECT * FROM "learners" WHERE wallet = ${wallet}`;

    if (!userExists.length) {
      // wallet does not exist in the database
      await sql`INSERT INTO "learners" (wallet, number_of_quizzes_answered, number_of_quizzes_created, total_rewards_pending, created_at, updated_at) VALUES (${wallet}, 0, 0, 0, now(), now())`;
      res.status(200).json({ success: "New learner added." });
      return;
    }

    res.status(200).json({ success: "Learner already exists." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong." });
  }
}
