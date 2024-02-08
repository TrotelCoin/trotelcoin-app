import sql from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const result =
    await sql`SELECT MAX(max_streak) as biggest_streak FROM "streak"`;

  if (result) {
    return new NextResponse(
      JSON.stringify({ maxStreak: result[0].biggest_streak }),
      { status: 200 }
    );
  } else {
    return new NextResponse(
      JSON.stringify({ error: "Something went wrong." }),
      { status: 500 }
    );
  }
}
