import { supabase } from "@/lib/supabase/db";
import { NextRequest, NextResponse } from "next/server";
import { Address } from "viem";

export async function GET(req: NextRequest, res: NextResponse) {
  const searchParams = new URL(req.url);
  const address: Address = searchParams.searchParams.get("wallet") as Address;

  if (!address) {
    return NextResponse.json("Missing address", { status: 400 });
  }

  const { data, error } = await supabase
    .from("items")
    .select("*")
    .eq("wallet", address);

  if (error) {
    console.error(error);
    return NextResponse.json(error, { status: 500 });
  }

  if (data.length > 0) {
    return NextResponse.json(data, { status: 200 });
  }

  return NextResponse.json(null, { status: 200 });
}
