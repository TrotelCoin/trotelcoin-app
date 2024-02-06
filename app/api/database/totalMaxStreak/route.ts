import sql from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const result =
    await sql`SELECT max_streak FROM "streak" ORDER BY max_streak DESC LIMIT 1`;

  if (result) {
    return new NextResponse(
      JSON.stringify({ maxStreak: result[0].max_streak }),
      { status: 200 }
    );
  } else {
    return new NextResponse(
      JSON.stringify({ error: "Something went wrong." }),
      { status: 500 }
    );
  }
}
