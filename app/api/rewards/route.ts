import { supabase } from "@/utils/supabase/db";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const { data } = await supabase
      .from("learners")
      .select("total_rewards_pending");

    if (!data) {
      return NextResponse.json(0, { status: 404 });
    }

    const total_rewards_pending_sum = data.reduce(
      (acc, curr) => acc + curr.total_rewards_pending,
      0
    );
    return NextResponse.json(total_rewards_pending_sum, {
      status: 200,
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    return NextResponse.json(0, { status: 500 });
  }
}
