import sql from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const result = await sql`SELECT COUNT(*) FROM "learners"`;
  if (result[0] && "count" in result[0]) {
    return new NextResponse(JSON.stringify(result[0].count), { status: 200 });
  } else {
    return new NextResponse(
      JSON.stringify({ error: "Something went wrong." }),
      { status: 500 }
    );
  }
}
