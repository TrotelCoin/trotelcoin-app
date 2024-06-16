import React from "react";

const UserContext = React.createContext({
  userTotalRewardsPending: null as number | null,
  userNumberOfQuizzesAnswered: null as number | null,
  alreadyAnsweredSatisfaction: false as boolean,
  setAlreadyAnsweredSatisfaction: {} as React.Dispatch<
    React.SetStateAction<boolean>
  >,
  isLoggedIn: false as boolean,
  multipliers: null as number | null,
  learningTime: null as number | null,
  averageMark: null as number | null,
  multipliersItem: null as number | null,
  multipliersItemTimeLeft: null as number | null,
  userLevel: null as number | null,
  multipliersEnabled: false as boolean,
  quizzesLeft: null as number | null,
});

export default UserContext;
