import React from "react";
import type { Dispatch } from "react";
import { Address } from "viem";

const StreakContext = React.createContext({
  streak: null as number | null,
  setStreak: {} as Dispatch<React.SetStateAction<number | null>>,
  disabled: false as boolean,
  setDisabled: {} as Dispatch<React.SetStateAction<boolean>>,
  lastUpdatedStreak: "" as string,
  setLastUpdatedStreak: {} as Dispatch<React.SetStateAction<string>>,
  cooldown: null as string | null,
  setCooldown: {} as Dispatch<React.SetStateAction<string | null>>,
  updateStreak: {} as (address: Address) => void,
  maxStreak: null as number | null,
  setMaxStreak: {} as Dispatch<React.SetStateAction<number | null>>,
  isStreakLoading: false as boolean,
  setIsStreakLoading: {} as Dispatch<React.SetStateAction<boolean>>,
  streakResetMessage: false as boolean,
  streakMessage: false as boolean,
  lostStreakAt: null as Date | null,
  lostStreak: false as boolean
});

export default StreakContext;
