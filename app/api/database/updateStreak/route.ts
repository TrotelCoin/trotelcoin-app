import sql from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);

  const wallet = searchParams.get("wallet");

  try {
    const walletExists =
      await sql`SELECT * FROM "learners" WHERE wallet = ${wallet}`;

    if (!walletExists.length) {
      // wallet does not exist in the database
      await sql`INSERT INTO "learners" (wallet, number_of_quizzes_answered, number_of_quizzes_created, total_rewards_pending, created_at, updated_at) VALUES (${wallet}, 0, 0, 0, now(), now())`;
    }

    // check if the wallet exists in the database
    const streakExists =
      await sql`SELECT * FROM "streak" WHERE wallet = ${wallet}`;

    if (!streakExists.length) {
      // create a new streak if the wallet does not exist
      await sql`INSERT INTO "streak" (wallet, current_streak, max_streak) VALUES (${wallet}, 0, 0)`;

      // update current streak
      await sql`UPDATE "streak" SET current_streak = current_streak + 1, last_streak_at = now() WHERE wallet = ${wallet}`;

      // update max streak
      await sql`UPDATE "streak" SET max_streak = GREATEST(max_streak, current_streak) WHERE wallet = ${wallet}`;
      return new NextResponse(JSON.stringify({ success: "Streak updated" }), {
        status: 200,
      });
    }

    // check if one day has passed since the last streak
    const oneDay =
      await sql`SELECT * FROM "streak" WHERE wallet = ${wallet} AND last_streak_at < now() - interval '1 day'`;

    // update only if the last streak was more than 1 day ago
    if (oneDay.length) {
      await sql`UPDATE "streak" SET current_streak = current_streak + 1, last_streak_at = now() WHERE wallet = ${wallet}`;

      // update max streak
      await sql`UPDATE "streak" SET max_streak = GREATEST(max_streak, current_streak) WHERE wallet = ${wallet}`;

      return new NextResponse(JSON.stringify({ success: "Streak updated." }), {
        status: 200,
      });
    } else {
      return new NextResponse(
        JSON.stringify({ success: "Streak not updated." }),
        {
          status: 200,
        }
      );
    }
  } catch (error) {
    console.error(error);
    return new NextResponse(
      JSON.stringify({ error: "Something went wrong." }),
      {
        status: 200,
      }
    );
  }
}
