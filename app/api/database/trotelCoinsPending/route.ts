import sql from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const result = await sql`
      SELECT SUM(total_rewards_pending) AS total_rewards_pending_sum FROM "learners"`;

  if (result[0] && "total_rewards_pending_sum" in result[0]) {
    return new NextResponse(
      JSON.stringify(result[0].total_rewards_pending_sum),
      { status: 200 }
    );
  } else {
    return new NextResponse(
      JSON.stringify({ error: "Something went wrong." }),
      { status: 500 }
    );
  }
}
