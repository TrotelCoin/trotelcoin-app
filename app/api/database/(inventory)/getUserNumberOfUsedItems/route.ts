import { supabase } from "@/lib/supabase/db";
import { NextRequest, NextResponse } from "next/server";
import { Address } from "viem";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const address: Address = searchParams.get("address") as Address;
  const item = searchParams.get("item");

  const { data, error } = await supabase
    .from("items")
    .select("number_of_use")
    .eq("wallet", address)
    .eq("name", item);

  if (error) {
    console.error(error);
    return NextResponse.json(error, { status: 500 });
  }

  if (data.length > 0) {
    return NextResponse.json(data[0]?.number_of_use, {
      status: 200,
      headers: { "Cache-Control": "no-store" },
    });
  }

  return NextResponse.json(0, {
    status: 200,
    headers: { "Cache-Control": "no-store" },
  });
}
