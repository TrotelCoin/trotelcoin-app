import { supabase } from "@/lib/supabase/db";
import { NextRequest, NextResponse } from "next/server";
import { Address } from "viem";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { searchParams } = new URL(req.url);
    const wallet: Address = searchParams.get("wallet") as Address;
    const rating: number = Number(searchParams.get("rating"));
    const quizId: number = Number(searchParams.get("quizId"));

    if (!wallet || !rating || !quizId) {
      return NextResponse.json("Parameters not found", { status: 400 });
    }

    const { data: verification, error: verificationError } = await supabase
      .from("courses_satisfaction")
      .select("*")
      .eq("quiz_id", quizId)
      .eq("wallet", wallet as Address);

    if (verificationError) {
      console.error(verificationError);
      return NextResponse.json(
        { error: "Something went wrong." },
        { status: 500 }
      );
    }

    if (verification.length > 0) {
      return NextResponse.json(
        { answered: "You have already answered this." },
        { status: 200, headers: { "Cache-Control": "no-store" } }
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
      return NextResponse.json(
        { error: "Something went wrong." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true },
      { status: 200, headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
