import { supabase } from "@/lib/supabase/db";
import { Items } from "@/types/inventory/inventory";
import { NextRequest, NextResponse } from "next/server";
import { Address } from "viem";

export async function POST(req: NextRequest, res: NextResponse) {
  const searchParams = new URL(req.url);
  const address: Address = searchParams.searchParams.get("address") as Address;
  const item: Items = searchParams.searchParams.get("item") as Items;

  if (!address || !item) {
    return NextResponse.json("Missing address or item", { status: 400 });
  }

  let alreadyUsed = 0;

  const { data: alreadyUsedData, error: alreadyUsedError } = await supabase
    .from("items")
    .select("number_of_use")
    .eq("wallet", address)
    .eq("name", item);

  if (alreadyUsedError) {
    console.error(alreadyUsedError);
    return NextResponse.json(alreadyUsedError, { status: 500 });
  }

  if (
    alreadyUsedData &&
    alreadyUsedData.length > 0 &&
    alreadyUsedData[0].number_of_use
  ) {
    alreadyUsed = alreadyUsedData[0].number_of_use;
  } else {
    await supabase.from("items").insert([
      {
        wallet: address,
        name: item,
        number_of_use: 1,
      },
    ]);

    return NextResponse.json(1, { status: 200 });
  }

  const { data, error } = await supabase
    .from("items")
    .update({ number_of_use: alreadyUsed + 1 })
    .eq("wallet", address)
    .eq("name", item);

  if (error) {
    console.error(error);
    return NextResponse.json(error, { status: 500 });
  }

  return NextResponse.json(data, { status: 200 });
}
