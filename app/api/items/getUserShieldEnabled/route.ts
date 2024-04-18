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
    .from("shields")
    .select("start_time, wallet, shield_name")
    .eq("wallet", wallet);

  if (error) {
    console.error(error);
    return NextResponse.json(error, { status: 500 });
  }

  if (data.length > 0) {
    let shieldEnabled: boolean = false;
    let timeLeft: number = 0;

    data.forEach((shieldItem) => {
      const now = new Date();
      const shieldStartTime = new Date(shieldItem.start_time);

      const differenceInMs = now.getTime() - shieldStartTime.getTime();
      const differenceInHours = differenceInMs / (1000 * 60 * 60);

      let hours: number = 0;

      switch (shieldItem.shield_name) {
        case "Closed Lock":
          hours = 1;
          break;
        case "Shield":
          hours = 24;
          break;
        case "Castle":
          hours = 72;
          break;
        case "King":
          hours = 168;
          break;
        default:
          break;
      }

      if (differenceInHours <= hours) {
        shieldEnabled = true;
        timeLeft += hours * 60 - Math.floor(differenceInMs / (1000 * 60));
      }
    });

    return NextResponse.json(
      { shieldEnabled: shieldEnabled, timeLeft: timeLeft },
      { status: 200, headers: { "Cache-Control": "no-store" } }
    );
  } else {
    return NextResponse.json(false, {
      status: 200,
      headers: { "Cache-Control": "no-store" },
    });
  }
}
