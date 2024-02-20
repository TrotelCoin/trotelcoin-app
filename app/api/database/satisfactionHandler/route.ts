import { supabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const satisfaction = searchParams.get("number");

  try {
    const { error } = await supabase.from("satisfaction").insert([
      {
        net_promoter_score: parseFloat(satisfaction as string),
        answered_at: new Date().toISOString(),
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
      { success: "Satisfaction recorded." },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
