import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/db";

export async function GET(req: NextRequest, res: NextResponse) {
  const { data, error } = await supabase
    .from("statistics_evolution")
    .select("*");

  if (error) {
    return NextResponse.json(error, { status: 500 });
  }

  return NextResponse.json(data, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET",
      "Access-Control-Allow-Headers": "Content-Type",
      "Cache-Control": "no-store",
    },
  });
}
