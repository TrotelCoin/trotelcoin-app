import {
  LeaderboardItem,
  LeaderboardCategories
} from "@/types/leaderboard/leaderboard";

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
      if (showTrotelInUsdc) {
        return storedTrotelPrice * userLeaderboardItem.total_rewards_pending;
      } else {
        return userLeaderboardItem.total_rewards_pending;
      }
    case "learningTime":
      return userLeaderboardItem.learning_time / 60000;
    case "marks":
      return userLeaderboardItem.average_marks;
    case "numberOfQuizzesAnswered":
      return userLeaderboardItem.number_of_quizzes_answered;
    case "streaks":
      return userLeaderboardItem.streak;
    default:
      return 0;
  }
};

export const sortLeaderboardFromCategory = (
  leaderboard: LeaderboardItem[],
  category: LeaderboardCategories
) => {
  return leaderboard.sort((a, b) => {
    if (category === "rewards") {
      return b.total_rewards_pending - a.total_rewards_pending;
    }
    if (category === "learningTime") {
      return b.learning_time - a.learning_time;
    }
    if (category === "numberOfQuizzesAnswered") {
      return b.number_of_quizzes_answered - a.number_of_quizzes_answered;
    }
    if (category === "marks") {
      return b.average_marks - a.average_marks;
    }
    if (category === "streaks") {
      return b.streak - a.streak;
    }
    return 0;
  });
};
