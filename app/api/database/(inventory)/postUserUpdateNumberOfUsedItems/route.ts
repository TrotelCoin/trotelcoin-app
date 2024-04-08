import { supabase } from "@/lib/supabase/db";
import { NextRequest, NextResponse } from "next/server";
import { Address } from "viem";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const address: Address = searchParams.get("address") as Address;
  const item = searchParams.get("item");

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

  if (alreadyUsedData.length === 0) {
    await supabase.from("items").insert([
      {
        wallet: address,
        name: item,
        number_of_use: 1,
      },
    ]);

    return NextResponse.json(1, {
      status: 200,
      headers: { "Cache-Control": "no-store" },
    });
  } else {
    alreadyUsed = alreadyUsedData[0].number_of_use;
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

  return NextResponse.json(data, {
    status: 200,
    headers: { "Cache-Control": "no-store" },
  });
}
