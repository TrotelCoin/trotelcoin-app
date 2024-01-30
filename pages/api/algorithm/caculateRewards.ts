import { NextApiRequest, NextApiResponse } from "next";
import cron from "node-cron";
import sql from "@/lib/db";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === "GET") {
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

      // update remaining rewards
      await sql`UPDATE "algorithm" SET remaining_rewards = ${
        remainingRewards - calculatedRewards / 50
      } WHERE id = 0`;

      res.status(200).json({ calculatedRewards });
    } else {
      res.status(405).json({ message: "Method Not Allowed" });
    }
  } catch (error) {
    console.error("Error in API endpoint:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export function calculateRewards(remainingRewards: number): number {
  const minReward = remainingRewards / 10;
  const maxReward = remainingRewards / 4;
  return Math.floor(Math.random() * (maxReward - minReward + 1)) + minReward;
}
