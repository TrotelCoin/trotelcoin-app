import { supabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { Address } from "viem";

export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const wallet = searchParams.get("wallet");
  const quizId = searchParams.get("quizId");

  try {
    // select answered from "quizzes_answered"
    const { data: result, error } = await supabase
      .from("quizzes_answered")
      .select("answered")
      .eq("wallet", wallet as Address)
      .eq("quiz_id", quizId);

    if (error) {
      console.error(error);
      return new NextResponse(
        JSON.stringify({ error: "Something went wrong." }),
        { status: 500 }
      );
    }

    if (result[0] && "answered" in result[0]) {
      return new NextResponse(JSON.stringify(result[0].answered), {
        status: 200,
      });
    } else {
      return new NextResponse(
        JSON.stringify({ error: "Something went wrong." }),
        { status: 500 }
      );
    }
  } catch (error) {
    console.error(error);
    return new NextResponse(
      JSON.stringify({ error: "Something went wrong." }),
      { status: 500 }
    );
  }
}
