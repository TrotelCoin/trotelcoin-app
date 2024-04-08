import { supabase } from "@/lib/supabase/db";
import { NextRequest, NextResponse } from "next/server";
import { Address } from "viem";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { searchParams } = new URL(req.url);
    const wallet: Address = searchParams.get("wallet") as Address;

    if (!wallet) {
      return NextResponse.json("Parameters not found", { status: 400 });
    }

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
        { status: 200, headers: { "Cache-Control": "no-store" } }
      );
    } else {
      const { data, error } = await supabase.from("subscriptions").upsert([
        {
          wallet: wallet as Address,
          claimed_intermediate_at: new Date().toISOString(),
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
          { status: 200, headers: { "Cache-Control": "no-store" } }
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
