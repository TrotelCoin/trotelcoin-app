import React from "react";

const StreakContext = React.createContext({
  streak: 0 as number,
  setStreak: (value: number) => {},
  disabled: false as boolean,
  setDisabled: (value: boolean) => {},
  lastUpdatedStreak: "" as string,
  setLastUpdatedStreak: (value: string) => {},
  cooldown: "00:00:00" as string,
  setCooldown: (value: string) => {},
});

export default StreakContext;
