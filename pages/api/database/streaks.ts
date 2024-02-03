import { NextApiRequest, NextApiResponse } from "next";
import sql from "@/lib/db";
import { Address } from "viem";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const wallet = req.query.wallet as Address;

  // get streaks and lastUpdated by user
  await sql`UPDATE "streaks" SET current_streak = 0 WHERE last_streaks_at < now() - interval '2 day'`;
  const result = await sql`SELECT * FROM "streaks" WHERE wallet = ${wallet}`;
  const currentStreaks = result[0]?.current_streak;
  let lastUpdated = result[0]?.last_streaks_at;
  let disabled = false;

  // disabled if one day hasn't passed since the last streak
  if (lastUpdated) {
    const oneDay =
      await sql`SELECT * FROM "streaks" WHERE last_streaks_at < now() - interval '1 day'`;
    if (!oneDay.length) {
      disabled = true;
    }
  }

  // transform last_streaks_at to a more readable format
  if (lastUpdated) {
    const date = new Date(lastUpdated);
    lastUpdated = date;
  }

  if (result) {
    res.status(200).json({ currentStreaks, lastUpdated, disabled });
  } else {
    res.status(500).json({ error: "Something went wrong." });
  }
};
