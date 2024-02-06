import sql from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import remainingRewards from "@/data/remainingRewards";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    // reset rewards if 24h has passed
    await sql`UPDATE "algorithm" SET remaining_rewards = ${remainingRewards} WHERE updated_at < now() - interval '1 day' RETURNING *`;

    const result = await sql`SELECT remaining_rewards FROM "algorithm"`;

    if (result[0] && "remaining_rewards" in result[0]) {
      res.status(200).json(result[0].remaining_rewards);
    } else {
      res.status(500).json({ error: "Something went wrong." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong." });
  }
}
