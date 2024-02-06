import { NextApiRequest, NextApiResponse } from "next";
import sql from "@/lib/db";
import { Address } from "viem";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const wallet = req.query.wallet as Address;

  const result =
    await sql`SELECT max_streak FROM "streak" WHERE wallet = ${wallet} ORDER BY max_streak DESC LIMIT 1`;

  if (result) {
    res.status(200).json({ maxStreak: result[0].max_streak });
  } else {
    console.error(result);
    res.status(500).json({ error: "Something went wrong." });
  }
}


