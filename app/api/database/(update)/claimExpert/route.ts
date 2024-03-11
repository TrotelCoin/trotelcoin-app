import { supabase } from "@/lib/supabase/db";
import { NextRequest, NextResponse } from "next/server";
import { Address } from "viem";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { searchParams } = new URL(req.url);
    const wallet = searchParams.get("wallet");

    const { data, error } = await supabase
      .from("subscriptions")
      .select("wallet")
      .eq("wallet", wallet as Address);

    if (error) {
      console.error(error);
      return NextResponse.json(
        { error: "Something went wrong." },
        { status: 500 }
      );
    }

    if (data.length > 0) {
      return NextResponse.json(
        { claimed: "You have already claimed this." },
        { status: 200 }
      );
    } else {
      const { data, error } = await supabase.from("subscriptions").upsert([
        {
          wallet: wallet as Address,
          claimed_expert_at: new Date().toISOString(),
        },
      ]);

      if (error) {
        console.error(error);
        return NextResponse.json(
          { error: "Something went wrong." },
          { status: 500 }
        );
      }

      if (data) {
        return NextResponse.json(
          { claimed: "Claimed successfully." },
          { status: 200 }
        );
      }
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
