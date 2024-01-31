import { NextApiRequest, NextApiResponse } from "next";
import sql from "@/lib/db";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const jsonString = req.body;
    const parsedObject = JSON.parse(jsonString);

    const wallet = parsedObject.wallet;
    const rewards = parsedObject.rewards;
    const quizId = parsedObject.quizId;

    await sql.begin(async (sql) => {
      await sql`INSERT INTO "learners" (wallet, total_rewards_pending) VALUES (${wallet}, ${rewards}) ON CONFLICT (wallet) DO UPDATE SET total_rewards_pending = "learners".total_rewards_pending + ${rewards}`;
      await sql`INSERT INTO "quizzes_answered" (wallet, quiz_id, answered) VALUES (${wallet}, ${quizId}, true) ON CONFLICT (id) DO UPDATE SET answered = true`;
      await sql`ALTER TABLE "algorithm" REPLICA IDENTITY FULL`;
      await sql`UPDATE "algorithm" SET remaining_rewards = remaining_rewards - ${
        rewards / 50
      }`;
      await sql`UPDATE "quizzes" SET number_of_answers = number_of_answers + 1 WHERE quiz_id = ${quizId}`;
    });

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.json({ success: false });
  }
};
