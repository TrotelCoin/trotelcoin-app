import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/db";

export async function GET(req: NextRequest, res: NextResponse) {
  const { data: result, error } = await supabase
    .from("streak")
    .select("max_streak")
    .order("max_streak", { ascending: false });

  if (error) {
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
  return NextResponse.json(result[0].max_streak, {
    status: 200,
    headers: { "Cache-Control": "no-store" },
  });
}
