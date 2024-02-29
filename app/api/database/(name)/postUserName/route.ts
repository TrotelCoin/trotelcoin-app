import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/db";

export async function POST(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get("name");
  const wallet = searchParams.get("wallet");

  try {
    await supabase
      .from("learners")
      .update({ username: name })
      .eq("wallet", wallet);
    return new NextResponse(JSON.stringify(name), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse(JSON.stringify(error), {
      status: 500,
    });
  }
}
