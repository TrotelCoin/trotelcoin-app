import { NextApiRequest, NextApiResponse } from "next";
import cron from "node-cron";
import sql from "@/lib/db";
import { calculateRewards } from "@/lib/calculateRewards";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // reset remaining rewards every 24h
  cron.schedule("0 0 * * *", async () => {
    const defaultRewards = 54.7945205479;
    try {
      await sql`UPDATE "algorithm" SET remaining_rewards = ${defaultRewards}`;
    } catch (error) {
      console.error("Error resetting remaining rewards:", error);
    }
  });

  // get remaining rewards
  const result = await sql`SELECT remaining_rewards FROM "algorithm"`;
  const remainingRewards = result[0]?.remaining_rewards;

  // calculate rewards
  const calculatedRewards = calculateRewards(remainingRewards);

  res.status(200).json(calculatedRewards);
};
