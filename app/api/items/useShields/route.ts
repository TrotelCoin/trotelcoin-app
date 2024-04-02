import { supabase } from "@/lib/supabase/db";
import { Items } from "@/types/inventory/inventory";
import { NextRequest, NextResponse } from "next/server";
import { Address } from "viem";

export async function POST(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const wallet: Address = searchParams.get("wallet") as Address;
  const shieldName: Items = searchParams.get("shieldName") as Items;

  if (!wallet || !shieldName) {
    return NextResponse.json("Parameters not found", { status: 400 });
  }

  const { data: walletData, error: walletError } = await supabase
    .from("shields")
    .select("wallet")
    .eq("wallet", wallet)
    .eq("shield_name", shieldName);

  if (walletError) {
    console.error(walletError);
    return NextResponse.json(walletError, { status: 500 });
  }

  if (walletData.length === 0) {
    const { error } = await supabase.from("shields").insert({
      wallet: wallet,
      shield_name: shieldName,
      start_time: new Date().toISOString(),
    });

    if (error) {
      console.error(error);
      return NextResponse.json(error, { status: 500 });
    }
  }

  const { error } = await supabase
    .from("shields")
    .update({
      shield_name: shieldName,
      start_time: new Date().toISOString(),
    })
    .eq("wallet", wallet)
    .eq("shield_name", shieldName);

  if (error) {
    console.error(error);
    return NextResponse.json(error, { status: 500 });
  }

  return NextResponse.json(`Shield ${shieldName} has been activated`, {
    status: 200,
  });
}
