import sql from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const result =
    await sql`SELECT remaining_rewards FROM "algorithm"`;
  res.json(result[0].remaining_rewards);
};
