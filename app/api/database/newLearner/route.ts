import sql from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);

  const wallet = searchParams.get("wallet");

  try {
    // check if the wallet exists in the database
    const userExists =
      await sql`SELECT * FROM "learners" WHERE wallet = ${wallet}`;

    if (!userExists.length) {
      // wallet does not exist in the database
      await sql`INSERT INTO "learners" (wallet, number_of_quizzes_answered, number_of_quizzes_created, total_rewards_pending, created_at, updated_at) VALUES (${wallet}, 0, 0, 0, now(), now())`;
      return new NextResponse(
        JSON.stringify({ success: "New learner added." }),
        { status: 200 }
      );
    }

    return new NextResponse(
      JSON.stringify({ success: "Learner already exists." }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new NextResponse(
      JSON.stringify({ error: "Something went wrong." }),
      { status: 500 }
    );
  }
}
