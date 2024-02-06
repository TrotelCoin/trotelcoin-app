import sql from "@/lib/db";
import remainingRewards from "@/data/remainingRewards";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    // reset rewards if 24h has passed
    await sql`UPDATE "algorithm" SET remaining_rewards = ${remainingRewards} WHERE updated_at < now() - interval '1 day' RETURNING *`;

    const result = await sql`SELECT remaining_rewards FROM "algorithm"`;

    if (result[0] && "remaining_rewards" in result[0]) {
      return new NextResponse(JSON.stringify(result[0].remaining_rewards), {
        status: 200,
      });
    } else {
      return new NextResponse(
        JSON.stringify({ error: "Something went wrong." }),
        { status: 500 }
      );
    }
  } catch (error) {
    console.error(error);
    return new NextResponse(
      JSON.stringify({ error: "Something went wrong." }),
      { status: 500 }
    );
  }
}
