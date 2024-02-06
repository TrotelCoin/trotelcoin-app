import { NextApiRequest, NextApiResponse } from "next";
import sql from "@/lib/db";
import { Address } from "viem";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const wallet = req.query.wallet as Address;

  const result =
    await sql`SELECT total_rewards_pending FROM "learners" WHERE wallet = ${wallet}`;

  if (result[0] && "total_rewards_pending" in result[0]) {
    res.status(200).json(result[0].total_rewards_pending);
  } else {
    res.status(500).json({ error: "Something went wrong." });
  }
}
