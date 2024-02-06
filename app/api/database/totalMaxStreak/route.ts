import { NextApiRequest, NextApiResponse } from "next";
import sql from "@/lib/db";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const result =
    await sql`SELECT max_streak FROM "streak" ORDER BY max_streak DESC LIMIT 1`;

  if (result) {
    res.status(200).json({ maxStreak: result[0].max_streak });
  } else {
    res.status(500).json({ error: "Something went wrong." });
  }
}
