import type {
  LeaderboardItem,
  LeaderboardCategories,
  Positions
} from "@/types/leaderboard/leaderboard";
import type { Address } from "viem";
import { isAddressEqual } from "viem";

export const categorySuffix = (category: LeaderboardCategories) => {
  switch (category) {
    case "rewards":
      return " 💰";
    case "learningTime":
      return "m ⏳";
    case "marks":
      return "/20 🤓";
    case "numberOfQuizzesAnswered":
      return " 📚";
    case "streaks":
      return " 🔥";
    default:
      return "";
  }
};

export const valueToDisplay = (
  userLeaderboardItem: LeaderboardItem,
  category: LeaderboardCategories,
  showTrotelInUsdc: boolean,
  storedTrotelPrice: number
) => {
  switch (category) {
    case "rewards":
      const totalRewards = userLeaderboardItem?.total_rewards_pending ?? 0;
      if (showTrotelInUsdc) {
        return storedTrotelPrice * totalRewards;
      } else {
        return totalRewards;
      }
    case "learningTime":
      const learningTime = userLeaderboardItem?.learning_time ?? 0;
      return learningTime / 60000;
    case "marks":
      const averageMarks = userLeaderboardItem?.average_marks ?? 0;
      return averageMarks;
    case "numberOfQuizzesAnswered":
      const numberOfQuizzesAnswered =
        userLeaderboardItem?.number_of_quizzes_answered ?? 0;
      return numberOfQuizzesAnswered;
    case "streaks":
      const streak = userLeaderboardItem?.streak ?? 0;
      return streak;
    default:
      return 0;
  }
};

export const getUserLeaderboard = (
  leaderboard: LeaderboardItem[],
  address: Address
) => {
  return (
    leaderboard.find((entry) => isAddressEqual(entry.wallet, address)) || null
  );
};

export const getPositionsFromCategory = (
  leaderboard: LeaderboardItem[],
  address: Address
) => {
  let positions = {
    average_marks: -1,
    total_rewards_pending: -1,
    learning_time: -1,
    number_of_quizzes_answered: -1,
    streak: -1
  };

  const categorySortMap = {
    marks: (a: LeaderboardItem, b: LeaderboardItem) =>
      b.average_marks - a.average_marks,
    rewards: (a: LeaderboardItem, b: LeaderboardItem) =>
      b.total_rewards_pending - a.total_rewards_pending,
    learningTime: (a: LeaderboardItem, b: LeaderboardItem) =>
      b.learning_time - a.learning_time,
    numberOfQuizzesAnswered: (a: LeaderboardItem, b: LeaderboardItem) =>
      b.number_of_quizzes_answered - a.number_of_quizzes_answered,
    streaks: (a: LeaderboardItem, b: LeaderboardItem) => b.streak - a.streak
  };

  const positionKeyMap = {
    marks: "average_marks",
    rewards: "total_rewards_pending",
    learningTime: "learning_time",
    numberOfQuizzesAnswered: "number_of_quizzes_answered",
    streaks: "streak"
  };

  Object.keys(categorySortMap).forEach((category) => {
    const sortFunction =
      categorySortMap[category as keyof typeof categorySortMap];

    const sortedLeaderboard = leaderboard.sort(sortFunction);
    const position = sortedLeaderboard.findIndex((entry) =>
      isAddressEqual(entry.wallet, address)
    );

    const positionKey = positionKeyMap[category as keyof typeof positionKeyMap];
    positions[positionKey as keyof Positions] =
      position !== -1 ? position + 1 : 0;
  });

  return positions;
};

export const getCategoryPosition = (
  positions: Positions | null,
  category: LeaderboardCategories
) => {
  if (!positions) return null;

  switch (category) {
    case "marks":
      return positions.average_marks;
    case "rewards":
      return positions.total_rewards_pending;
    case "learningTime":
      return positions.learning_time;
    case "numberOfQuizzesAnswered":
      return positions.number_of_quizzes_answered;
    case "streaks":
      return positions.streak;
    default:
      return null;
  }
};
