import sql from "@/lib/db";
import { Address } from "viem";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);

  const wallet = searchParams.get("wallet");

  // get streak and lastUpdated by user
  await sql`UPDATE "streak" SET current_streak = 0 WHERE last_streak_at < now() - interval '2 day'`;
  const result = await sql`SELECT * FROM "streak" WHERE wallet = ${
    wallet as Address
  }`;
  const currentStreak = result[0]?.current_streak;
  let lastUpdated = result[0]?.last_streak_at;
  let disabled = false;

  // disabled if one day hasn't passed since the last streak
  if (lastUpdated) {
    const oneDay =
      await sql`SELECT * FROM "streak" WHERE last_streak_at < now() - interval '1 day' AND wallet = ${
        wallet as Address
      }`;
    if (!oneDay.length) {
      disabled = true;
    }
  }

  // transform last_streak_at to a more readable format
  if (lastUpdated) {
    const date = new Date(lastUpdated);
    lastUpdated = date;
  }

  if (result) {
    return new NextResponse(
      JSON.stringify({ currentStreak, lastUpdated, disabled }),
      { status: 200 }
    );
  } else {
    return new NextResponse(
      JSON.stringify({ error: "Something went wrong." }),
      { status: 500 }
    );
  }
}
