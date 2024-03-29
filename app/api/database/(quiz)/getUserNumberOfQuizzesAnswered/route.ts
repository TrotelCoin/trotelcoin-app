import { supabase } from "@/lib/supabase/db";
import { NextRequest, NextResponse } from "next/server";
import { Address } from "viem";

export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const wallet = searchParams.get("wallet");

  try {
    const { data: result, error } = await supabase
      .from("learners")
      .select("number_of_quizzes_answered")
      .eq("wallet", wallet as Address);

    if (error) {
      console.error(error);
      return NextResponse.json(0, { status: 500 });
    }

    if (result.length > 0) {
      return NextResponse.json(result[0].number_of_quizzes_answered, {
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
