import sql from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { Address } from "viem";

export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);

  const wallet = searchParams.get("wallet");

  const result =
    await sql`SELECT number_of_quizzes_answered FROM "learners" WHERE wallet = ${
      wallet as Address
    }`;
  if (result[0] && "number_of_quizzes_answered" in result[0]) {
    return new NextResponse(
      JSON.stringify(result[0].number_of_quizzes_answered),
      { status: 200 }
    );
  } else {
    return new NextResponse(
      JSON.stringify({ error: "Something went wrong." }),
      { status: 500 }
    );
  }
}
