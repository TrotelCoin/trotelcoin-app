import { supabase } from "@/lib/supabase/db";
import { NextRequest, NextResponse } from "next/server";
import { Address } from "viem";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const wallet: Address = searchParams.get("wallet") as Address;

  if (!wallet) {
    return NextResponse.json("No wallet", { status: 404 });
  }

  const { data, error } = await supabase
    .from("multipliers")
    .select("multipliers, wallet, start_time")
    .eq("wallet", wallet);

  if (error) {
    console.error(error);
    return NextResponse.json(error, { status: 500 });
  }

  if (data.length > 0) {
    let multipliersEnabled: boolean = false;
    let multipliers: number = 1;
    let timeLeft: number = 0;

    data.forEach((multiplier) => {
      const now = new Date();
      const multipliersStartTime = new Date(multiplier.start_time);

      const differenceInMs = now.getTime() - multipliersStartTime.getTime();
      const differenceInHours = differenceInMs / (1000 * 60 * 60);

      let hours: number = 24;

      if (differenceInHours <= hours) {
        multipliersEnabled = true;
        multipliers = Math.max(multiplier.multipliers, multipliers);
        timeLeft += hours * 60 - Math.floor(differenceInMs / (1000 * 60));
      }
    });

    return NextResponse.json(
      {
        multipliersEnabled: multipliersEnabled,
        timeLeft: timeLeft * 60 * 1000, // in ms
        multipliers: multipliers,
      },
      { status: 200, headers: { "Cache-Control": "no-store" } }
    );
  } else {
    return NextResponse.json(false, {
      status: 200,
      headers: { "Cache-Control": "no-store" },
    });
  }
}
