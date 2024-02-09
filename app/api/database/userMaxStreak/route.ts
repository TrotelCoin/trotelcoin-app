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
      return new NextResponse("Something went wrong.", { status: 500 });
    }

    if (result.length > 0) {
      return new NextResponse(JSON.stringify({ maxStreak: result[0].max_streak }));
    } else {
      console.error("No result found");
      return new NextResponse("No result found.", { status: 404 });
    }
  } catch (error) {
    console.error(error);
    return new NextResponse("Something went wrong.", { status: 500 });
  }
}
