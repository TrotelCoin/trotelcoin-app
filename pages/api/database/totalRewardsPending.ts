import sql from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const result =
    await sql`SELECT total_rewards_pending FROM "learners" WHERE wallet = ${
      req.query.wallet as string
    }`;
  res.json(result[0].total_rewards_pending);
};
