import { NextApiRequest, NextApiResponse } from "next";
import sql from "@/lib/db";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const satisfaction = req.body;

  try {
    await sql`INSERT INTO "satisfaction" (net_promoter_score, answered_at) VALUES (${satisfaction}, now())`;
    res.status(200).json({ success: "Satisfaction recorded." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong." });
  }
}
