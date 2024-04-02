import { supabase } from "@/lib/supabase/db";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const { count, error } = await supabase
      .from("learners")
      .select("*", { count: "exact", head: true });

    if (error) {
      console.error(error);
      return NextResponse.json(0, { status: 500 });
    }

    if (count) {
      return NextResponse.json(count, {
        status: 200,
        headers: { "Cache-Control": "no-store" },
      });
    } else {
      return NextResponse.json(0, { status: 500 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(0, { status: 500 });
  }
}
