import React from "react";

const LifeContext = React.createContext({
  updateLife: () => {},
  life: 0 as number,
  setLife: (value: number) => {},
});

export default LifeContext;
