import { NextApiRequest, NextApiResponse } from "next";
import sql from "@/lib/db";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const wallet = req.body.wallet;

  try {
    const walletExists =
      await sql`SELECT * FROM "learners" WHERE wallet = ${wallet}`;

    if (!walletExists.length) {
      // wallet does not exist in the database
      await sql`INSERT INTO "learners" (wallet, number_of_quizzes_answered, number_of_quizzes_created, total_rewards_pending, created_at, updated_at) VALUES (${wallet}, 0, 0, 0, now(), now())`;
    }

    // check if the wallet exists in the database
    const streakExists =
      await sql`SELECT * FROM "streak" WHERE wallet = ${wallet}`;

    if (!streakExists.length) {
      // create a new streak if the wallet does not exist
      await sql`INSERT INTO "streak" (wallet, current_streak, max_streak) VALUES (${wallet}, 0, 0)`;

      // update current streak
      await sql`UPDATE "streak" SET current_streak = current_streak + 1, last_streak_at = now() WHERE wallet = ${wallet}`;

      // update max streak
      await sql`UPDATE "streak" SET max_streak = GREATEST(max_streak, current_streak) WHERE wallet = ${wallet}`;
      res.status(200).json({ success: "Streak updated." });
      return;
    }

    // check if one day has passed since the last streak
    const oneDay =
      await sql`SELECT * WHERE last_streak_at < now() - interval '1 day' RETURNING *`;

    // update only if the last streak was more than 1 day ago
    if (oneDay.length) {
      await sql`UPDATE "streak" SET current_streak = current_streak + 1, last_streak_at = now() WHERE wallet = ${wallet}`;

      // update max streak
      await sql`UPDATE "streak" SET max_streak = GREATEST(max_streak, current_streak) WHERE wallet = ${wallet}`;

      res.status(200).json({ success: "Streak updated." });
    } else {
      res.status(200).json({ success: "Streak not updated." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong." });
  }
};
