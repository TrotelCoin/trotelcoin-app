import { supabase } from "@/lib/supabase/db";
import { Items } from "@/types/inventory/inventory";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const wallet = searchParams.get("wallet");

  if (!wallet) {
    return NextResponse.json("No wallet", { status: 400 });
  }

  const { data, error } = await supabase
    .from("shields")
    .select("*")
    .eq("wallet", wallet);

  if (error) {
    console.error(error);
    return NextResponse.json(error, { status: 500 });
  }

  if (data.length > 0) {
    let shieldEnabled: boolean = false;

    data.forEach((shieldItem) => {
      const now = new Date();
      const shieldStartTime = new Date(shieldItem.start_time);

      const differenceInMs = now.getTime() - shieldStartTime.getTime();
      const differenceInHours = differenceInMs / (1000 * 60 * 60);

      let hours: number = 0;

      switch (shieldItem.shield_name as Items) {
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
      }
    });

    return NextResponse.json(shieldEnabled, { status: 200 });
  } else {
    return NextResponse.json(false, { status: 200 });
  }
}
