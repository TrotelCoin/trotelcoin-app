import { NextApiRequest, NextApiResponse } from "next";
import sql from "@/lib/db";
import { calculateRewards } from "@/lib/calculateRewards";
import remainingRewards from "@/data/remainingRewards";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // get remaining rewards
  const result = await sql`SELECT remaining_rewards FROM "algorithm"`;
  const remainingRewards = result[0]?.remaining_rewards;

  // reset rewards if 24h has passed
  try {
    await sql`UPDATE "algorithm" SET remaining_rewards = ${remainingRewards} WHERE updated_at < now() - interval '1 day' RETURNING *`;
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong." });
  }

  // calculate rewards
  const calculatedRewards = calculateRewards(remainingRewards);

  if (result[0] && "remaining_rewards" in result[0]) {
    res.status(200).json(calculatedRewards);
  } else {
    res.status(500).json({ error: "Something went wrong." });
  }
};
