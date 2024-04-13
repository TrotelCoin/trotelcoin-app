export type Badge = {
  id: number;
  name: string;
  image: string;
  condition: boolean | null;
  progress: number;
  maxProgress: number;
};

export type Badges = Badge[];

export type BadgesNames =
  | "ranks"
  | "quizzes"
  | "streaks"
  | "trotelCoins"
  | "staking"
  | "timeStaked"
  | "stakingDuration"
  | "marks"
  | "learningTime";
