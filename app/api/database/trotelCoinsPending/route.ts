import sql from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const result = await sql`
      SELECT SUM(total_rewards_pending) AS total_rewards_pending_sum FROM "learners"`;

  if (result[0] && "total_rewards_pending_sum" in result[0]) {
    res.status(200).json(result[0].total_rewards_pending_sum);
  } else {
    res.status(500).json({ error: "Something went wrong." });
  }
}
