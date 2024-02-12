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
      .select("answered, quiz_id")
      .eq("wallet", wallet as Address);

    if (error) {
      console.error(error);
      return new NextResponse(
        JSON.stringify({ error: "Something went wrong." }),
        { status: 500 }
      );
    }

    if (!Array.isArray(result)) {
      console.error("Result is not an array.");
      return new NextResponse(
        JSON.stringify({ error: "Invalid result format." }),
        { status: 500 }
      );
    }

    const matchingResult = result.find(
      (object) => object.quiz_id === parseFloat(quizId as string)
    );

    let answeredValue = false;

    if (matchingResult) {
      answeredValue = matchingResult.answered;
    }

    return new NextResponse(JSON.stringify(answeredValue), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new NextResponse(
      JSON.stringify({ error: "Something went wrong." }),
      { status: 500 }
    );
  }
}
