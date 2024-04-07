export type StatisticsType =
  | "distributed_trotelcoins"
  | "pending_trotelcoins"
  | "number_of_quizzes_answered"
  | "max_streak"
  | "learners"
  | "remaining_rewards"
  | "expert"
  | "intermediate"
  | "early"
  | "courses_count"
  | "net_promoter_score"
  | "average_mark";

export type StatisticsDataType = {
  id: number;
  statistics: string;
  statistics_number: number;
  updated_at: string;
};
