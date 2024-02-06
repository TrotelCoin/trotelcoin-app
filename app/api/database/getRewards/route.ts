import sql from "@/lib/db";
import { calculateRewards } from "@/lib/calculateRewards";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  // get remaining rewards
  const result = await sql`SELECT remaining_rewards FROM "algorithm"`;
  const remainingRewards = result[0]?.remaining_rewards;

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

  // calculate rewards
  const calculatedRewards = calculateRewards(remainingRewards);

  if (result[0] && "remaining_rewards" in result[0]) {
    return new NextResponse(JSON.stringify(calculatedRewards), { status: 200 });
  } else {
    return new NextResponse(
      JSON.stringify({ error: "Something went wrong." }),
      { status: 500 }
    );
  }
}
