import sql from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const result = await sql`
      SELECT SUM(total_rewards_pending) AS total_rewards_pending_sum FROM "learners"`;
    const totalRewardsPendingSum = result[0].total_rewards_pending_sum;

    res.json(totalRewardsPendingSum);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
