import sql from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const result = await sql`SELECT id FROM "learners"`;
  res.json(result.length);
};
