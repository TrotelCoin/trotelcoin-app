import { supabase } from "@/utils/supabase/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const { data } = await supabase
      .from("net_promoter_scores")
      .select("net_promoter_score");

    if (data && data.length > 0) {
      const total: number = data.length;
      let promoters: number = 0;
      let detractors: number = 0;

      data.forEach((dataScore) => {
        const score = dataScore.net_promoter_score;

        if (score > 8) {
          promoters++;
        }

        if (score < 7) {
          detractors++;
        }
      });

      const netPromoterScore: number = Math.floor(
        (promoters / total - detractors / total) * 100
      );

      return NextResponse.json(netPromoterScore, {
        status: 200,
        headers: { "Cache-Control": "no-store" },
      });
    } else {
      return NextResponse.json("Not found", { status: 404 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, { status: 500 });
  }
}
