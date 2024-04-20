import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/db";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const { data } = await supabase.from("statistics_evolution").select("*");

    return NextResponse.json(data, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
        "Access-Control-Allow-Headers": "Content-Type",
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(null, { status: 500 });
  }
}
