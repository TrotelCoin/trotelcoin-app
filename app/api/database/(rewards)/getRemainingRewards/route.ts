import { supabase } from "@/lib/supabase/db";
import remainingRewards from "@/data/constants/remainingRewards";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    // Reset rewards if 24h has passed
    const { error: updateError } = await supabase
      .from("algorithm")
      .update({ remaining_rewards: remainingRewards })
      .lte(
        "updated_at",
        new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
      );

    if (updateError) {
      console.error(updateError);
      return NextResponse.json(
        { error: "Something went wrong." },
        { status: 500 }
      );
    }

    const { data: result, error: selectError } = await supabase
      .from("algorithm")
      .select("remaining_rewards");

    if (selectError) {
      console.error(selectError);
      return NextResponse.json(
        { error: "Something went wrong." },
        { status: 500 }
      );
    }

    if (result[0] && "remaining_rewards" in result[0]) {
      return NextResponse.json(result[0].remaining_rewards, {
        status: 200,
        headers: { "Cache-Control": "no-store" },
      });
    } else {
      return NextResponse.json(
        { error: "Something went wrong." },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
