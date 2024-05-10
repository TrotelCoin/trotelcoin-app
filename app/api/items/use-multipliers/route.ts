import { supabase } from "@/utils/supabase/db";
import { NextRequest, NextResponse } from "next/server";
import { Address } from "viem";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const wallet: Address = searchParams.get("wallet") as Address;
  const multipliersName = searchParams.get("multipliersName");

  let multipliers: number = 1;

  switch (multipliersName) {
    case "x2":
      multipliers = 2;
      break;
    case "x5":
      multipliers = 5;
      break;
    case "x10":
      multipliers = 10;
      break;
    case "x25":
      multipliers = 25;
      break;
    default:
      break;
  }

  try {
    const { data: walletData } = await supabase
      .from("multipliers")
      .select("wallet")
      .eq("wallet", wallet)
      .eq("multipliers", multipliers);

    if (walletData && walletData.length === 0) {
      await supabase.from("multipliers").insert({
        wallet: wallet,
        multipliers: multipliers,
        start_time: new Date().toISOString(),
      });
    }

    await supabase
      .from("multipliers")
      .update({
        multipliers: multipliers,
        start_time: new Date().toISOString(),
      })
      .eq("wallet", wallet)
      .eq("multipliers", multipliers);

    return NextResponse.json(`Multipliers ${multipliers} has been activated`, {
      status: 200,
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(null, { status: 500 });
  }
}
