import React from "react";
import type { Dispatch } from "react";
import { Address } from "viem";

const StreakContext = React.createContext({
  streak: 0 as number,
  setStreak: {} as Dispatch<React.SetStateAction<number>>,
  disabled: false as boolean,
  setDisabled: {} as Dispatch<React.SetStateAction<boolean>>,
  lastUpdatedStreak: "" as string,
  setLastUpdatedStreak: {} as Dispatch<React.SetStateAction<string>>,
  cooldown: "00:00:00" as string,
  setCooldown: {} as Dispatch<React.SetStateAction<string>>,
  updateStreak: {} as (address: Address) => void,
  maxStreak: 0 as number,
  setMaxStreak: {} as Dispatch<React.SetStateAction<number>>,
  isStreakLoading: false as boolean,
  setIsStreakLoading: {} as Dispatch<React.SetStateAction<boolean>>,
  streakResetMessage: false as boolean,
  streakMessage: false as boolean,
});

export default StreakContext;
