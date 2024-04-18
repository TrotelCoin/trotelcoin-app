import { supabase } from "@/lib/supabase/db";
import type { StatisticsType } from "@/types/statistics/statistics";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const stats: StatisticsType = searchParams.get("stats") as StatisticsType;
  const value: number = Number(searchParams.get("value"));

  if (!stats || !value) {
    return NextResponse.json("Invalid statistics type or value", {
      status: 404,
    });
  }

  const { data: stat, error: statError } = await supabase
    .from("statistics_evolution")
    .select("statistics")
    .eq("statistics", stats);

  if (statError) {
    console.error(statError);
    return NextResponse.json(statError, { status: 500 });
  }

  if (stat.length > 0) {
    const { data: updated_at, error: updatedAtError } = await supabase
      .from("statistics_evolution")
      .select("updated_at")
      .eq("statistics", stats)
      .single();

    if (updatedAtError) {
      console.error(updatedAtError);
      return NextResponse.json(updatedAtError, { status: 500 });
    }

    const lastUpdate = new Date(updated_at.updated_at).getTime();
    const now = new Date().getTime();
    const differenceMs = now - lastUpdate;
    const diffDays = differenceMs / (1000 * 60 * 60 * 24);

    if (diffDays > 7) {
      // update stats
      const { error } = await supabase
        .from("statistics_evolution")
        .update({
          statistics_number: value,
          updated_at: new Date().toISOString(),
        })
        .eq("statistics", stats);

      if (error) {
        console.error(error);
        return NextResponse.json(error, {
          status: 500,
        });
      }

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
    const { error: insertError } = await supabase
      .from("statistics_evolution")
      .insert({
        statistics: stats,
        statistics_number: value,
        updated_at: new Date().toISOString(),
      });

    if (insertError) {
      console.error(insertError);
      return NextResponse.json(insertError, { status: 500 });
    }
  }
}
