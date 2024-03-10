import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/db";

export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const wallet = searchParams.get("wallet");

  try {
    const { data: result, error } = await supabase
      .from("learners")
      .select("username")
      .eq("wallet", wallet);

    if (error) {
      console.error(error);
      return NextResponse.json(wallet, {
        status: 500,
      });
    }

    return new NextResponse(JSON.stringify(result[0].username), {
      status: 200,
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    return NextResponse.json(wallet, {
      status: 500,
    });
  }
}
