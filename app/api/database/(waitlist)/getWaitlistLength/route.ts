import { supabase } from "@/lib/supabase/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const { data, error: learnerWaitlistErrorLength } = await supabase
    .from("waitlist")
    .select("*");

  if (learnerWaitlistErrorLength) {
    console.error(learnerWaitlistErrorLength);
    return NextResponse.json(learnerWaitlistErrorLength, { status: 500 });
  }

  let length: number = 0;

  if (data.length > 0) {
    length = data.filter((entry) => !entry.granted).length;
  }

  return NextResponse.json(length, { status: 200, headers: { "Cache-Control": "no-store" } });
}
