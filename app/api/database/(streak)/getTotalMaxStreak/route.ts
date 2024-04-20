import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/db";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const { data: result } = await supabase
      .from("streak")
      .select("max_streak")
      .order("max_streak", { ascending: false });

    if (!result) {
      return NextResponse.json(0, { status: 404 });
    }

    return NextResponse.json(result[0].max_streak, {
      status: 200,
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(0, { status: 500 });
  }
}
