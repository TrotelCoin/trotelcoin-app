import type { Address } from "viem";

export type LeaderboardCategories =
  | "rewards"
  | "learningTime"
  | "marks"
  | "numberOfQuizzesAnswered"
  | "streaks";

export type LeaderboardItem = {
  average_marks: number;
  wallet: Address;
  ens: string | undefined;
  number_of_quizzes_answered: number;
  total_rewards_pending: number;
  learning_time: number;
  streak: number;
};

export type Positions = {
  average_marks: number;
  number_of_quizzes_answered: number;
  total_rewards_pending: number;
  learning_time: number;
  streak: number;
};
