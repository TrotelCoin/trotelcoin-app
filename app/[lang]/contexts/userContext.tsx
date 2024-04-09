import React from "react";

const UserContext = React.createContext({
  userTotalRewardsPending: 0 as number,
  userNumberOfQuizzesAnswered: 0 as number,
  alreadyAnsweredSatisfaction: false as boolean,
  setAlreadyAnsweredSatisfaction: {} as React.Dispatch<
    React.SetStateAction<boolean>
  >,
  isLoggedIn: false as boolean,
  multipliers: 1 as number,
  learningTime: 0 as number,
  averageMark: 0 as number,
  multipliersItem: 1 as number,
  multipliersItemTimeLeft: 0 as number,
  userLevel: 1 as number,
});

export default UserContext;
