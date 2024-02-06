import sql from "@/lib/db";
import { Address } from "viem";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);

  const wallet = searchParams.get("wallet");

  const result =
    await sql`SELECT total_rewards_pending FROM "learners" WHERE wallet = ${
      wallet as Address
    }`;

  if (result[0] && "total_rewards_pending" in result[0]) {
    return new NextResponse(JSON.stringify(result[0].total_rewards_pending), {
      status: 200,
    });
  } else {
    return new NextResponse(
      JSON.stringify({ error: "Something went wrong." }),
      { status: 500 }
    );
  }
}
