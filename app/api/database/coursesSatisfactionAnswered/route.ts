import { supabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { Address } from "viem";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const { searchParams } = new URL(req.url);
    const wallet = searchParams.get("wallet");
    const quizId = searchParams.get("quizId");

    const { data, error } = await supabase
      .from("courses_satisfaction")
      .select("*")
      .eq("quiz_id", quizId)
      .eq("wallet", wallet as Address);

    if (error) {
      console.error(error);
      return new NextResponse(
        JSON.stringify({ error: "Something went wrong." }),
        { status: 500 }
      );
    }

    if (data.length > 0) {
      return new NextResponse(
        JSON.stringify({ answered: "You have already answered this." }),
        { status: 200 }
      );
    } else {
      return new NextResponse(JSON.stringify({ answered: false }), {
        status: 200,
      });
    }
  } catch (error) {
    console.error(error);
    return new NextResponse(
      JSON.stringify({ error: "Something went wrong." }),
      { status: 500 }
    );
  }
}
