import sql from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const result = await sql`SELECT COUNT(*) FROM "learners"`;
  if (result[0] && "count" in result[0]) {
    res.status(200).json(result[0].count);
  } else {
    res.status(500).json({ error: "Something went wrong." });
  }
};
