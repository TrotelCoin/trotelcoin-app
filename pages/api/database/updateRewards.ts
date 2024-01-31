import { NextApiRequest, NextApiResponse } from "next";
import sql from "@/lib/db";
import { calculateRewards } from "@/lib/calculateRewards";
import cron from "node-cron";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    cron.schedule("0 0 * * *", async () => {
      const defaultRewards = 54.7945205479;
      try {
        await sql`UPDATE "algorithm" SET remaining_rewards = ${defaultRewards}`;
      } catch (error) {
        console.error("Error resetting remaining rewards:", error);
      }
    });

    const jsonString = req.body;
    const parsedObject = JSON.parse(jsonString);

    const wallet = parsedObject.wallet;
    const quizId = parsedObject.quizId;

    await sql.begin(async (sql) => {
      const remainingRewards =
        await sql`SELECT remaining_rewards FROM "algorithm"`;
      const rewards = calculateRewards(remainingRewards[0].remaining_rewards);
      await sql`INSERT INTO "learners" (wallet, total_rewards_pending) VALUES (${wallet}, ${rewards}) ON CONFLICT (wallet) DO UPDATE SET total_rewards_pending = "learners".total_rewards_pending + ${rewards}`;
      await sql`INSERT INTO "quizzes_answered" (wallet, quiz_id, answered) VALUES (${wallet}, ${quizId}, true) ON CONFLICT (id) DO UPDATE SET answered = true`;
      await sql`ALTER TABLE "algorithm" REPLICA IDENTITY FULL`;
      await sql`UPDATE "algorithm" SET remaining_rewards = remaining_rewards - ${
        rewards / 50
      }`;
      await sql`UPDATE "quizzes" SET number_of_answers = number_of_answers + 1 WHERE quiz_id = ${quizId}`;
      await sql`UPDATE "learners" SET number_of_quizzes_answerd = number_of__quizzes_answered + 1 WHERE wallet = ${wallet}`;
    });

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.json({ success: false });
  }
};
