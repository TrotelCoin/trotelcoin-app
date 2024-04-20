import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/db";
import { Address } from "viem";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get("name");
  const wallet: Address = searchParams.get("wallet") as Address;

  try {
    await supabase
      .from("learners")
      .update({ username: name })
      .eq("wallet", wallet);
    return new NextResponse(JSON.stringify(name), {
      status: 200,
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    console.error(error);
    return new NextResponse(new Date().toISOString(), { status: 500 });
  }
}
