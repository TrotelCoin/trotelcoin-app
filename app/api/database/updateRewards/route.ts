import sql from "@/lib/db";
import { calculateRewards } from "@/lib/calculateRewards";
import remainingRewards from "@/data/remainingRewards";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);

  const wallet = searchParams.get("wallet");
  const quizId = searchParams.get("quizId");

  try {
    // reset rewards if 24h has passed
    try {
      await sql`UPDATE "algorithm" SET remaining_rewards = ${remainingRewards} WHERE updated_at < now() - interval '1 day' RETURNING *`;
    } catch (error) {
      console.error(error);
      return new NextResponse(
        JSON.stringify({ error: "Something went wrong." }),
        { status: 500 }
      );
    }

    await sql.begin(async (sql) => {
      const remainingRewards =
        await sql`SELECT remaining_rewards FROM "algorithm"`;
      const rewards = calculateRewards(remainingRewards[0].remaining_rewards);
      await sql`INSERT INTO "learners" (wallet, total_rewards_pending) VALUES (${wallet}, ${rewards}) ON CONFLICT (wallet) DO UPDATE SET total_rewards_pending = "learners".total_rewards_pending + ${rewards}`;
      await sql`INSERT INTO "quizzes_answered" (wallet, quiz_id, answered, answered_at) VALUES (${wallet}, ${quizId}, true, now()) ON CONFLICT (id) DO UPDATE SET answered = true`;
      await sql`ALTER TABLE "algorithm" REPLICA IDENTITY FULL`;
      await sql`UPDATE "algorithm" SET remaining_rewards = remaining_rewards - ${
        rewards / 50
      }`;
      await sql`UPDATE "quizzes" SET number_of_answers = number_of_answers + 1 WHERE quiz_id = ${quizId}`;
      await sql`INSERT INTO "quizzes" (quiz_id, last_answered_at) VALUES (${quizId}, now()) ON CONFLICT (quiz_id) DO UPDATE SET last_answered_at = now()`;
      await sql`INSERT INTO "learners" (wallet, number_of_quizzes_answered) VALUES (${wallet}, 1) ON CONFLICT (wallet) DO UPDATE SET number_of_quizzes_answered = "learners".number_of_quizzes_answered + 1`;
    });

    return new NextResponse(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse(JSON.stringify({ success: false }), {
      status: 500,
    });
  }
}
