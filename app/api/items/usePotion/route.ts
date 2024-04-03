import { supabase } from "@/lib/supabase/db";
import { NextRequest, NextResponse } from "next/server";
import { Address } from "viem";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const wallet: Address = searchParams.get("wallet") as Address;

  if (!wallet) {
    return NextResponse.json("No wallet", { status: 400 });
  }

  const { data: life, error: errorGetLife } = await supabase
    .from("life")
    .select("life")
    .eq("wallet", wallet);

  if (errorGetLife) {
    console.error(errorGetLife);
    return NextResponse.json(errorGetLife, { status: 500 });
  }

  if (life.length > 0) {
    const { error } = await supabase
      .from("life")
      .update({
        life: life[0].life + 1,
      })
      .eq("wallet", wallet);

    if (error) {
      console.error(error);
      return NextResponse.json(error, { status: 500 });
    }
  } else {
    return NextResponse.json("Learner not found", { status: 400 });
  }

  return NextResponse.json("Life updated", { status: 200 });
}
