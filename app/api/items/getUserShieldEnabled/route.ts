import { supabase } from "@/lib/supabase/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const wallet = searchParams.get("wallet");

  if (!wallet) {
    return NextResponse.json("No wallet", { status: 400 });
  }

  const { data, error } = await supabase
    .from("shields")
    .select("*")
    .eq("wallet", wallet);

  if (error) {
    console.error(error);
    return NextResponse.json(error, { status: 500 });
  }

  if (data.length > 0) {
    data.map((shieldItem) => {
      const now = new Date();
      const 
    });

    return NextResponse.json(, {status:200})
  } else {
    return NextResponse.json(false, { status: 200 });
  }
}
