import sql from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { Address } from "viem";

export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);

  const wallet = searchParams.get("wallet");
  const quizId = searchParams.get("quizId");

  const result =
    await sql`SELECT answered FROM "quizzes_answered" WHERE wallet = ${
      wallet as Address
    } AND quiz_id = ${quizId}`;

  if (result[0] && "answered" in result[0]) {
    return new NextResponse(JSON.stringify(result[0].answered), {
      status: 200,
    });
  } else {
    return new NextResponse(
      JSON.stringify({ error: "Something went wrong." }),
      { status: 500 }
    );
  }
}
