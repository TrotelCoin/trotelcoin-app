import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/db";

export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const wallet = searchParams.get("wallet");

  try {
    const { data: result, error } = await supabase
      .from("learners")
      .select("username")
      .eq("wallet", wallet);

    if (error) {
      console.error(error);
      return new NextResponse(
        JSON.stringify({ error: "Something went wrong." }),
        {
          status: 500,
        }
      );
    }

    return new NextResponse(JSON.stringify(result[0].username), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse(JSON.stringify(error), {
      status: 500,
    });
  }
}
