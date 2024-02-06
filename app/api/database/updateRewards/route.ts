import { NextApiRequest, NextApiResponse } from "next";
import sql from "@/lib/db";
import { calculateRewards } from "@/lib/calculateRewards";
import remainingRewards from "@/data/remainingRewards";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    // reset rewards if 24h has passed
    try {
      await sql`UPDATE "algorithm" SET remaining_rewards = ${remainingRewards} WHERE updated_at < now() - interval '1 day' RETURNING *`;
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Something went wrong." });
    }

    const jsonString = req.body;
    const parsedObject = JSON.parse(jsonString);

    const wallet = parsedObject.wallet;
    const quizId = parsedObject.quizId;

    await sql.begin(async (sql) => {
      const remainingRewards =
        await sql`SELECT remaining_rewards FROM "algorithm"`;
      const rewards = calculateRewards(remainingRewards[0].remaining_rewards);
      await sql`INSERT INTO "learners" (wallet, total_rewards_pending) VALUES (${wallet}, ${rewards}) ON CONFLICT (wallet) DO UPDATE SET total_rewards_pending = "learners".total_rewards_pending + ${rewards}`;
      await sql`INSERT INTO "quizzes_answered" (wallet, quiz_id, answered, answered_at) VALUES (${wallet}, ${quizId}, true, now()) ON CONFLICT (id) DO UPDATE SET answered = true`;
      await sql`ALTER TABLE "algorithm" REPLICA IDENTITY FULL`;
      await sql`UPDATE "algorithm" SET remaining_rewards = remaining_rewards - ${
        rewards / 50
      }`;
      await sql`UPDATE "quizzes" SET number_of_answers = number_of_answers + 1 WHERE quiz_id = ${quizId}`;
      await sql`INSERT INTO "quizzes" (quiz_id, last_answered_at) VALUES (${quizId}, now()) ON CONFLICT (quiz_id) DO UPDATE SET last_answered_at = now()`;
      await sql`INSERT INTO "learners" (wallet, number_of_quizzes_answered) VALUES (${wallet}, 1) ON CONFLICT (wallet) DO UPDATE SET number_of_quizzes_answered = "learners".number_of_quizzes_answered + 1`;
    });

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.json({ success: false });
  }
}
