import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/utils/supabase/db";
import { Address } from "viem";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const wallet: Address = searchParams.get("wallet") as Address;

  try {
    const { data: result } = await supabase
      .from("learners")
      .select("username")
      .eq("wallet", wallet);

    if (!result) {
      return new NextResponse("No username for this user", {
        status: 404,
        headers: { "Cache-Control": "no-store" },
      });
    }

    return new NextResponse(JSON.stringify(result[0].username), {
      status: 200,
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    console.error(error);
    return new NextResponse(new Date().toISOString(), { status: 500 });
  }
}

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
