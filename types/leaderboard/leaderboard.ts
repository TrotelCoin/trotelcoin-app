export type LeaderboardCategories =
  | "rewards"
  | "learningTime"
  | "marks"
  | "numberOfQuizzesAnswered"
  | "streaks";

export type LeaderboardItem = {
  average_marks: number;
  name: string;
  href: string;
  id: number;
  wallet: string;
  ens: string;
  number_of_quizzes_answered: number;
  iconOutline: React.JSX.Element;
  iconSolid: React.JSX.Element;
  total_rewards_pending: number;
  learning_time: number;
  streak: number;
};
