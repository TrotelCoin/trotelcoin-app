import { supabase } from "@/lib/supabase/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const { count, error: learnerWaitlistErrorLength } = await supabase
    .from("waitlist")
    .select("*", { count: "exact", head: true });

  if (learnerWaitlistErrorLength) {
    console.error(learnerWaitlistErrorLength);
    return NextResponse.json(learnerWaitlistErrorLength, { status: 500 });
  }

  return NextResponse.json(count ?? 0, { status: 200 });
}
