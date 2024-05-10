import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/utils/supabase/db";
import { StatisticsType } from "@/types/statistics/statistics";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const { data } = await supabase.from("statistics_evolution").select("*");

    return NextResponse.json(data, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
        "Access-Control-Allow-Headers": "Content-Type",
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(null, { status: 500 });
  }
}

export async function POST(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const stats: StatisticsType = searchParams.get("stats") as StatisticsType;
  const value: number = Number(searchParams.get("value"));

  try {
    const { data: stat } = await supabase
      .from("statistics_evolution")
      .select("statistics")
      .eq("statistics", stats);

    if (stat && stat.length > 0) {
      const { data: updated_at } = await supabase
        .from("statistics_evolution")
        .select("updated_at")
        .eq("statistics", stats)
        .single();

      if (!updated_at) {
        return NextResponse.json(null, { status: 404 });
      }

      const lastUpdate = new Date(updated_at.updated_at).getTime();
      const now = new Date().getTime();
      const differenceMs = now - lastUpdate;
      const diffDays = differenceMs / (1000 * 60 * 60 * 24);

      if (diffDays > 7) {
        // update stats
        await supabase
          .from("statistics_evolution")
          .update({
            statistics_number: value,
            updated_at: new Date().toISOString(),
          })
          .eq("statistics", stats);

        return NextResponse.json("Statistics updated", {
          status: 200,
          headers: { "Cache-Control": "no-store" },
        });
      } else {
        return NextResponse.json("No need to update", {
          status: 200,
          headers: { "Cache-Control": "no-store" },
        });
      }
    } else {
      await supabase.from("statistics_evolution").insert({
        statistics: stats,
        statistics_number: value,
        updated_at: new Date().toISOString(),
      });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(null, { status: 500 });
  }
}
