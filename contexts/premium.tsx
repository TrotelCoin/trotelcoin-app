import React from "react";

const PremiumContext = React.createContext({
  isPremium: false as boolean,
  intermediateBalance: 0 as number,
  expertBalance: 0 as number,
  earlyBalance: 0 as number,
  isEarly: false as boolean,
  isNotPremium: true as boolean,
  isIntermediate: false as boolean,
  isExpert: false as boolean,
});

export default PremiumContext;
