import { supabase } from "@/lib/supabase/db";
import type { StatisticsType } from "@/types/statistics/statistics";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const stats = searchParams.get("stats");
  const value = searchParams.get("value");

  if (!stats || !value) {
    return NextResponse.json("Invalid statistics type or value", {
      status: 400,
    });
  }

  const { data: updated_at, error: updatedAtError } = await supabase
    .from("statistics_evolution")
    .select("updated_at")
    .eq("statistics", stats)
    .single();

  if (updatedAtError) {
    return NextResponse.json(updatedAtError, { status: 500 });
  }

  const lastUpdate = new Date(updated_at.updated_at).getTime();
  const now = new Date().getTime();
  const differenceMs = now - lastUpdate;
  const diffDays = differenceMs / (1000 * 60 * 60 * 24);

  if (diffDays > 7) {
    switch (stats as StatisticsType) {
      case "distributed_trotelcoins":
        // update distributed_trotelcoins
        const { error: distributedTrotelCoinsError } = await supabase
          .from("statistics_evolution")
          .update({
            statistics_number: value,
            updated_at: new Date().toISOString(),
          })
          .eq("statistics", "distributed_trotelcoins");

        if (distributedTrotelCoinsError) {
          console.error(distributedTrotelCoinsError);
          return NextResponse.json(distributedTrotelCoinsError, {
            status: 500,
          });
        }
        break;
      case "pending_trotelcoins":
        // update pending_trotelcoins
        const { error: pendingTrotelCoinsError } = await supabase
          .from("statistics_evolution")
          .update({
            statistics_number: value,
            updated_at: new Date().toISOString(),
          })
          .eq("statistics", "pending_trotelcoins");

        if (pendingTrotelCoinsError) {
          console.error(pendingTrotelCoinsError);
          return NextResponse.json(pendingTrotelCoinsError, { status: 500 });
        }
        break;
      case "number_of_quizzes_answered":
        // update number_of_quizzes_answered
        const { error: numberOfQuizzesAnsweredError } = await supabase
          .from("statistics_evolution")
          .update({
            statistics_number: value,
            updated_at: new Date().toISOString(),
          })
          .eq("statistics", "number_of_quizzes_answered");

        if (numberOfQuizzesAnsweredError) {
          console.error(numberOfQuizzesAnsweredError);
          return NextResponse.json(numberOfQuizzesAnsweredError, {
            status: 500,
          });
        }
        break;
      case "max_streak":
        // update max_streak
        const { error: maxStreakError } = await supabase
          .from("statistics_evolution")
          .update({
            statistics_number: value,
            updated_at: new Date().toISOString(),
          })
          .eq("statistics", "max_streak");

        if (maxStreakError) {
          console.error(maxStreakError);
          return NextResponse.json(maxStreakError, { status: 500 });
        }
        break;
      case "learners":
        // update learners
        const { error: learnersError } = await supabase
          .from("statistics_evolution")
          .update({
            statistics_number: value,
            updated_at: new Date().toISOString(),
          })
          .eq("statistics", "learners");

        if (learnersError) {
          console.error(learnersError);
          return NextResponse.json(learnersError, { status: 500 });
        }
        break;
      case "remaining_rewards":
        // update remaining_rewards
        const { error: remainingRewardsError } = await supabase
          .from("statistics_evolution")
          .update({
            statistics_number: value,
            updated_at: new Date().toISOString(),
          })
          .eq("statistics", "remaining_rewards");

        if (remainingRewardsError) {
          console.error(remainingRewardsError);
          return NextResponse.json(remainingRewardsError, { status: 500 });
        }
        break;
      case "expert":
        // update expert
        const { error: expertError } = await supabase
          .from("statistics_evolution")
          .update({
            statistics_number: value,
            updated_at: new Date().toISOString(),
          })
          .eq("statistics", "expert");

        if (expertError) {
          console.error(expertError);
          return NextResponse.json(expertError, { status: 500 });
        }
        break;
      case "intermediate":
        // update intermediate
        const { error: intermediateError } = await supabase
          .from("statistics_evolution")
          .update({
            statistics_number: value,
            updated_at: new Date().toISOString(),
          })
          .eq("statistics", "intermediate");

        if (intermediateError) {
          console.error(intermediateError);
          return NextResponse.json(intermediateError, { status: 500 });
        }
        break;
      case "early":
        // update early
        const { error: earlyError } = await supabase
          .from("statistics_evolution")
          .update({
            statistics_number: value,
            updated_at: new Date().toISOString(),
          })
          .eq("statistics", "early");

        if (earlyError) {
          console.error(earlyError);
          return NextResponse.json(earlyError, { status: 500 });
        }
        break;
      case "courses_count":
        // update courses_count
        const { error: coursesCountError } = await supabase
          .from("statistics_evolution")
          .update({
            statistics_number: value,
            updated_at: new Date().toISOString(),
          })
          .eq("statistics", "courses_count");

        if (coursesCountError) {
          console.error(coursesCountError);
          return NextResponse.json(coursesCountError, { status: 500 });
        }
        break;
      case "average_mark":
        // update average_mark
        const { error: averageMarkError } = await supabase
          .from("statistics_evolution")
          .update({
            statistics_number: value,
            updated_at: new Date().toISOString(),
          })
          .eq("statistics", "average_mark");

        if (averageMarkError) {
          console.error(averageMarkError);
          return NextResponse.json(averageMarkError, { status: 500 });
        }
        break;
      case "net_promoter_score":
        // update net_promoter_score
        const { error: netPromoterScoreError } = await supabase
          .from("statistics_evolution")
          .update({
            statistics_number: value,
            updated_at: new Date().toISOString(),
          })
          .eq("statistics", "net_promoter_score");

        if (netPromoterScoreError) {
          console.error(netPromoterScoreError);
          return NextResponse.json(netPromoterScoreError, { status: 500 });
        }
        break;
      default:
        console.error("Invalid statistics type");
        return NextResponse.json("Invalid statistics type", { status: 400 });
    }

    return NextResponse.json("Statistics updated", { status: 200 });
  } else {
    return NextResponse.json("No need to update", {
      status: 200,
    });
  }
}
