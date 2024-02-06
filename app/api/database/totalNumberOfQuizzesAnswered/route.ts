import sql from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const result =
    await sql`SELECT SUM(number_of_quizzes_answered) AS total_quizzes_answered FROM "learners"`;
  if (result[0] && "total_quizzes_answered" in result[0]) {
    return new NextResponse(JSON.stringify(result[0].total_quizzes_answered), {
      status: 200,
    });
  } else {
    return new NextResponse(
      JSON.stringify({ error: "Something went wrong." }),
      { status: 500 }
    );
  }
}
