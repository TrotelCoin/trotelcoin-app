import React from "react";

const LifeContext = React.createContext({
  updateLife: () => {},
  life: null as number | null,
  setLife: (value: number) => {},
  lifeCooldown: "00:00:00" as string,
  setLifeCooldown: (value: string) => {},
  lastReset: "" as string,
  setLastReset: (value: string) => {},
  lifeResetMessage: false as boolean,
});

export default LifeContext;
