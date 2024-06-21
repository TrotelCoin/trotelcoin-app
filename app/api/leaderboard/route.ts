import { supabase } from "@/utils/supabase/db";
import { NextRequest, NextResponse } from "next/server";
import { isAddress } from "viem";
import type { LeaderboardItem } from "@/types/leaderboard/leaderboard";

export const dynamic = "force-dynamic";

const fetchData = async (table: string, columns: string): Promise<any[]> => {
  const { data, error } = await supabase.from(table).select(columns);
  if (error) {
    throw new Error(error.message);
  }
  return data ?? [];
};

const mapAverageMarks = (
  averageMarks: any[]
): Record<string, { totalMarks: number; count: number }> => {
  const averageMarksMap: Record<string, { totalMarks: number; count: number }> =
    {};
  averageMarks.forEach((result) => {
    if (!averageMarksMap[result.wallet]) {
      averageMarksMap[result.wallet] = { totalMarks: 0, count: 0 };
    }
    averageMarksMap[result.wallet].totalMarks += result.marks;
    averageMarksMap[result.wallet].count++;
  });
  return averageMarksMap;
};

const updateLeaderboardWithAverageMarks = (
  leaderboard: any[],
  averageMarksMap: Record<string, { totalMarks: number; count: number }>
) => {
  return leaderboard
    .map((learner) => {
      if (
        learner.wallet !== "undefined" &&
        learner.wallet !== null &&
        isAddress(learner.wallet)
      ) {
        const learnerMarks = averageMarksMap[learner.wallet];
        const averageMarks =
          learnerMarks && learnerMarks.count > 0
            ? learnerMarks.totalMarks / learnerMarks.count
            : 0;
        return {
          ...learner,
          average_marks: averageMarks
        };
      }
      return null;
    })
    .filter(Boolean);
};

const mapLearningTime = (diffTime: any[]): Record<string, number> => {
  const learningTimeMap: Record<string, number> = {};
  diffTime.forEach((result) => {
    if (!learningTimeMap[result.wallet]) {
      learningTimeMap[result.wallet] = 0;
    }
    learningTimeMap[result.wallet] += result.diffTime;
  });
  return learningTimeMap;
};

const updateLeaderboardWithLearningTime = (
  leaderboard: any[],
  learningTimeMap: Record<string, number>
) => {
  return leaderboard.map((learner) => ({
    ...learner,
    learning_time: learningTimeMap[learner.wallet] || 0
  }));
};

const mapStreaks = (streaks: any[]): Record<string, number> => {
  const streaksMap: Record<string, number> = {};
  streaks.forEach((result) => {
    streaksMap[result.wallet] = result.current_streak || 0;
  });
  return streaksMap;
};

const updateLeaderboardWithStreaks = (
  leaderboard: any[],
  streaksMap: Record<string, number>
) => {
  return leaderboard.map((learner) => ({
    ...learner,
    streak: streaksMap[learner.wallet] || 0
  }));
};

/* GET /api/leaderboard
 * Returns the leaderboard of learners.
 * @returns {Array} updatedLeaderboard - The leaderboard of learners.
 * @example response - 200 - application/json
 */
export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const leaderboard = await fetchData(
      "learners",
      "wallet, number_of_quizzes_answered, total_rewards_pending"
    );
    const averageMarks = await fetchData("quizzes_results", "wallet, marks");
    const diffTime = await fetchData("quizzes_times", "wallet, diffTime");
    const streaks = await fetchData("streak", "wallet, current_streak");

    const averageMarksMap = mapAverageMarks(averageMarks);
    let updatedLeaderboard = updateLeaderboardWithAverageMarks(
      leaderboard,
      averageMarksMap
    );
    const learningTimeMap = mapLearningTime(diffTime);
    updatedLeaderboard = updateLeaderboardWithLearningTime(
      updatedLeaderboard,
      learningTimeMap
    );
    const streaksMap = mapStreaks(streaks);
    updatedLeaderboard = updateLeaderboardWithStreaks(
      updatedLeaderboard,
      streaksMap
    );

    return NextResponse.json(
      {
        updatedLeaderboard
      },
      { status: 200, headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, { status: 500 });
  }
}
