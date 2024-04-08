import { supabase } from "@/lib/supabase/db";
import { NextRequest, NextResponse } from "next/server";
import { Address } from "viem";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const { searchParams } = new URL(req.url);
    const wallet: Address = searchParams.get("wallet") as Address;
    const quizId: number = Number(searchParams.get("quizId"));

    if (!wallet || !quizId) {
      return NextResponse.json("Parameters not found", { status: 400 });
    }

    const { data, error } = await supabase
      .from("courses_satisfaction")
      .select("*")
      .eq("quiz_id", quizId)
      .eq("wallet", wallet as Address);

    if (error) {
      console.error(error);
      return NextResponse.json({ answered: false }, { status: 500 });
    }

    if (data.length > 0) {
      return NextResponse.json(
        { answered: "You have already answered this." },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { answered: false },
        {
          status: 200,
          headers: { "Cache-Control": "no-store" },
        }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ answered: false }, { status: 500 });
  }
}
