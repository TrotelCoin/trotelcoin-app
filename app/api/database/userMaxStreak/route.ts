import { NextRequest, NextResponse } from "next/server";
import sql from "@/lib/db";
import { Address } from "viem";

export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);

  const wallet = searchParams.get("wallet");

  const result = await sql`SELECT max_streak FROM "streak" WHERE wallet = ${
    wallet as Address
  } ORDER BY max_streak DESC LIMIT 1`;

  if (result) {
    return new NextResponse(
      JSON.stringify({ maxStreak: result[0].max_streak })
    );
  } else {
    console.error(result);
    return new NextResponse("Something went wrong.", { status: 500 });
  }
}
