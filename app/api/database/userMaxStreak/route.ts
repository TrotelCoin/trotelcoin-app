import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/db";
import { Address } from "viem";

export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const wallet = searchParams.get("wallet");

  try {
    const { data: result, error } = await supabase
      .from("streak")
      .select("max_streak")
      .eq("wallet", wallet as Address);

    if (error) {
      console.error(error);
      return NextResponse.json(
        { error: "Something went wrong." },
        { status: 500 }
      );
    }

    if (result.length > 0) {
      return NextResponse.json(result[0].max_streak);
    } else {
      console.error("No result found");
      return NextResponse.json({ error: "No result found." }, { status: 404 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
