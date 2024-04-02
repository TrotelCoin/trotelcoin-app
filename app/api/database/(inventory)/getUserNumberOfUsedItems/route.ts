import { supabase } from "@/lib/supabase/db";
import { Items } from "@/types/inventory/inventory";
import { NextRequest, NextResponse } from "next/server";
import { Address } from "viem";

export async function GET(req: NextRequest, res: NextResponse) {
  const searchParams = new URL(req.url);
  const address: Address = searchParams.searchParams.get("address") as Address;
  const item: Items = searchParams.searchParams.get("item") as Items;

  if (!address || !item) {
    return NextResponse.json("Missing address or item", { status: 400 });
  }

  const { data, error } = await supabase
    .from("items")
    .select("number_of_use")
    .eq("wallet", address)
    .eq("name", item);

  if (error) {
    console.error(error);
    return NextResponse.json(error, { status: 500 });
  }

  if (data) {
    return NextResponse.json(data[0].number_of_use, { status: 200 });
  }

  return NextResponse.json(0, { status: 200 });
}
