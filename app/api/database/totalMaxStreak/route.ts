import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/db";

export async function GET(req: NextRequest, res: NextResponse) {
  const { data: result, error } = await supabase
    .from("streak")
    .select("max_streak")
    .order("max_streak", { ascending: false })
    .limit(1);

  if (error) {
    return new NextResponse(
      JSON.stringify({ error: "Something went wrong." }),
      { status: 500 }
    );
  } else {
    return new NextResponse(
      JSON.stringify({ maxStreak: result[0].max_streak }),
      {
        status: 200,
      }
    );
  }
}
