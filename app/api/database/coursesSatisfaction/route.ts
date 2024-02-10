import { supabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { Address } from "viem";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { searchParams } = new URL(req.url);
    const wallet = searchParams.get("wallet");
    const rating = searchParams.get("rating");
    const quizId = searchParams.get("quizId");

    const { data: verification, error: verificationError } = await supabase
      .from("courses_satisfaction")
      .select("*")
      .eq("quiz_id", quizId)
      .eq("wallet", wallet as Address);

    if (verificationError) {
      console.error(verificationError);
      return new NextResponse(
        JSON.stringify({ error: "Something went wrong." }),
        { status: 500 }
      );
    }

    if (verification.length > 0) {
      return new NextResponse(
        JSON.stringify({ answered: "You have already answered this." }),
        { status: 200 }
      );
    }

    const { error } = await supabase.from("courses_satisfaction").insert([
      {
        wallet: wallet as Address,
        rating: rating,
        timestamp: new Date().toISOString(),
        quiz_id: quizId,
      },
    ]);

    if (error) {
      console.error(error);
      return new NextResponse(
        JSON.stringify({ error: "Something went wrong." }),
        { status: 500 }
      );
    }

    return new NextResponse(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse(
      JSON.stringify({ error: "Something went wrong." }),
      { status: 500 }
    );
  }
}
