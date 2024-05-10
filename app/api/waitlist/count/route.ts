import { supabase } from "@/utils/supabase/db";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/* GET /api/waitlist/count
 * Returns the number of entries in the waitlist that have not been granted.
 * @returns {number} count - The number of entries in the waitlist that have not been granted.
 * @security None
 * @example response - 200 - application/json
 */
export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const { data } = await supabase.from("waitlist").select("*");

    let length: number = 0;

    if (data && data.length > 0) {
      length = data.filter((entry) => !entry.granted).length;
    }

    return NextResponse.json(length, {
      status: 200,
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(0, { status: 500 });
  }
}
