import React from "react";

const UserContext = React.createContext({
  userTotalRewards: 0 as number,
  userNumberOfQuizzesAnswered: 0 as number,
  username: "" as string | null,
  setUsername: (username: string | null) => {},
  isUsernameLoading: false as boolean,
});

export default UserContext;
