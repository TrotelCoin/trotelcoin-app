import { NextApiRequest, NextApiResponse } from "next";
import sql from "@/lib/db";
import { calculateRewards } from "@/lib/calculateRewards";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // get remaining rewards
  const result = await sql`SELECT remaining_rewards FROM "algorithm"`;
  const remainingRewards = result[0]?.remaining_rewards;

  // calculate rewards
  const calculatedRewards = calculateRewards(remainingRewards);

  res.status(200).json(calculatedRewards);
};
