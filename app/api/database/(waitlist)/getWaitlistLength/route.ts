import { supabase } from "@/lib/supabase/db";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const { data } = await supabase.from("waitlist").select("*");

    let length: number = 0;

    if (data && data.length > 0) {
      length = data.filter((entry) => !entry.granted).length;
    }

    return NextResponse.json(length, {
      status: 200,
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(0, { status: 500 });
  }
}
