import { supabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const satisfaction = searchParams.get("satisfaction");

  try {
    const { data, error } = await supabase
      .from("satisfaction")
      .insert([
        {
          net_promoter_score: satisfaction,
          answered_at: new Date().toISOString(),
        },
      ]);

    if (error) {
      console.error(error);
      return new NextResponse(
        JSON.stringify({ error: "Something went wrong." }),
        { status: 500 }
      );
    }

    return new NextResponse(
      JSON.stringify({ success: "Satisfaction recorded." }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new NextResponse(
      JSON.stringify({ error: "Something went wrong." }),
      { status: 500 }
    );
  }
}
