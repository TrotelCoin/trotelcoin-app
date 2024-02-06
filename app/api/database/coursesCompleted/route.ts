import sql from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { Address } from "viem";

export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);

  const wallet = searchParams.get("wallet");

  // get courses completed by user
  const courses =
    await sql`SELECT quiz_id, answered FROM "quizzes_answered" WHERE wallet = ${
      wallet as Address
    } AND answered = true`;

  // return courses
  if (courses) {
    return new NextResponse(JSON.stringify(courses), { status: 200 });
  } else {
    return new NextResponse(
      JSON.stringify({ error: "Something went wrong." }),
      { status: 500 }
    );
  }
}
