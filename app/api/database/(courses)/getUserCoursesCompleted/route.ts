import { supabase } from "@/lib/supabase/db";
import { NextRequest, NextResponse } from "next/server";
import { Address } from "viem";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const wallet = searchParams.get("wallet");

  try {
    // get courses completed by user
    const { data: courses, error } = await supabase
      .from("quizzes_answered")
      .select("quiz_id, answered")
      .eq("wallet", wallet as Address)
      .eq("answered", true);

    if (error) {
      console.error(error);
      return NextResponse.json([], { status: 500 });
    }

    // return courses
    if (courses) {
      return NextResponse.json(courses, {
        status: 200,
        headers: { "Cache-Control": "no-store" },
      });
    } else {
      return NextResponse.json([], {
        status: 500,
      });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json([], { status: 500 });
  }
}
