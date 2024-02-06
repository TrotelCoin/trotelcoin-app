import sql from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);

  const satisfaction = searchParams.get("satisfaction");

  try {
    await sql`INSERT INTO "satisfaction" (net_promoter_score, answered_at) VALUES (${satisfaction}, now())`;
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
