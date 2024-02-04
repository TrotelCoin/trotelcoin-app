import sql from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // reset rewards if 24h has passed
  try {
    await sql`UPDATE "algorithm" SET remaining_rewards = 54.7945205479 WHERE cycle_timestampd < now() - interval '1 day' RETURNING *`;
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong." });
  }

  const result = await sql`SELECT remaining_rewards FROM "algorithm"`;

  if (result[0] && "remaining_rewards" in result[0]) {
    res.status(200).json(result[0].remaining_rewards);
  } else {
    res.status(500).json({ error: "Something went wrong." });
  }
};
