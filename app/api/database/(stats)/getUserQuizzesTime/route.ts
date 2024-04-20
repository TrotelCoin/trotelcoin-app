import { supabase } from "@/lib/supabase/db";
import { NextRequest, NextResponse } from "next/server";
import { Address } from "viem";

export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const wallet: Address = searchParams.get("wallet") as Address;

  try {
    const { data } = await supabase
      .from("quizzes_times")
      .select("diffTime")
      .eq("wallet", wallet);

    let time: number = 0; // in ms

    if (data && data.length > 0) {
      data.forEach((diffTime) => {
        time += diffTime.diffTime;
      });
    } else {
      return NextResponse.json(time, { status: 404 });
    }

    return NextResponse.json(time, {
      status: 200,
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(0, { status: 500 });
  }
}
