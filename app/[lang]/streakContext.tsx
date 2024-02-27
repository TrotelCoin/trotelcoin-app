import React from "react";
import type { Dispatch } from "react";

const StreakContext = React.createContext({
  streak: 0 as number,
  setStreak: {} as Dispatch<React.SetStateAction<number>>,
  disabled: false as boolean,
  setDisabled: {} as Dispatch<React.SetStateAction<boolean>>,
  lastUpdatedStreak: "" as string,
  setLastUpdatedStreak: {} as Dispatch<React.SetStateAction<string>>,
  cooldown: "00:00:00" as string,
  setCooldown: {} as Dispatch<React.SetStateAction<string>>,
});

export default StreakContext;
