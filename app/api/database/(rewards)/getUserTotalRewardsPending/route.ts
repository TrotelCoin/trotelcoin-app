import { supabase } from "@/lib/supabase/db";
import { Address } from "viem";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);

  const wallet = searchParams.get("wallet");

  const { data: result, error } = await supabase
    .from("learners")
    .select("total_rewards_pending")
    .eq("wallet", wallet as Address);

  if (error) {
    return NextResponse.json(0, { status: 500 });
  } else if (result[0] && "total_rewards_pending" in result[0]) {
    return NextResponse.json(result[0].total_rewards_pending, {
      status: 200,
      headers: { "Cache-Control": "no-store" },
    });
  } else {
    return NextResponse.json(0, {
      status: 404,
    });
  }
}
