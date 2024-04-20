import { supabase } from "@/lib/supabase/db";
import { NextRequest, NextResponse } from "next/server";
import { Address } from "viem";

export async function POST(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const quizId: number = Number(searchParams.get("quizId"));
  const wallet: Address = searchParams.get("wallet") as Address;
  const diffTime: number = Number(searchParams.get("diffTime"));

  try {
    const { data } = await supabase
      .from("quizzes_times")
      .select("diffTime")
      .eq("quiz_id", quizId)
      .eq("wallet", wallet);

    if (data && data.length > 0) {
      return NextResponse.json("Already exists", {
        status: 200,
        headers: { "Cache-Control": "no-store" },
      });
    } else {
      const { error } = await supabase.from("quizzes_times").insert({
        quiz_id: quizId,
        wallet: wallet,
        diffTime: diffTime,
      });

      if (error) {
        console.error(error);
        return NextResponse.json(error, { status: 500 });
      }

      return NextResponse.json("Time computed", {
        status: 200,
        headers: { "Cache-Control": "no-store" },
      });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json("Something went wrong", { status: 500 });
  }
}
