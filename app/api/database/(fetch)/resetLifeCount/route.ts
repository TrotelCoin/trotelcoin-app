import { supabase } from "@/lib/supabase/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const wallet = searchParams.get("wallet");

  try {
    // get reset life countdown
    const response = await supabase
      .from("life")
      .select("last_reset_at")
      .eq("wallet", wallet as string);

    if (response.error) {
      console.error(response.error);
      return NextResponse.json(
        { error: "Something went wrong." },
        { status: 500 }
      );
    }

    if (response.data.length > 0) {
      const lastResetAt = response.data[0].last_reset_at;
      return NextResponse.json(lastResetAt, { status: 200 });
    } else {
      return NextResponse.json(
        { error: "User doesn't exists." },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
