import { supabase } from "@/utils/supabase/db";
import { NextRequest, NextResponse } from "next/server";
import { Address } from "viem";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest, res: NextResponse) {
  const searchParams = new URL(req.url);
  const address: Address = searchParams.searchParams.get("wallet") as Address;

  try {
    const { data } = await supabase
      .from("items")
      .select("*")
      .eq("wallet", address);

    if (data && data.length > 0) {
      return NextResponse.json(data, {
        status: 200,
        headers: { "Cache-Control": "no-store" },
      });
    }

    return NextResponse.json(null, {
      status: 200,
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(null, { status: 500 });
  }
}
