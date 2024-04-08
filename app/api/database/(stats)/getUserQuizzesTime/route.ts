import { supabase } from "@/lib/supabase/db";
import { NextRequest, NextResponse } from "next/server";
import { Address } from "viem";

export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const wallet: Address = searchParams.get("wallet") as Address;

  const { data, error } = await supabase
    .from("quizzes_times")
    .select("diffTime")
    .eq("wallet", wallet);

  if (error) {
    console.error(error);
    return NextResponse.json(error, { status: 500 });
  }

  let time: number = 0; // in ms

  if (data.length > 0) {
    data.forEach((diffTime) => {
      time += diffTime.diffTime;
    });
  } else {
    return NextResponse.json(time, { status: 400 });
  }

  return NextResponse.json(time, { status: 200 });
}
