"use client";

import React from "react";

const PremiumContext = React.createContext({
  isPremium: false as boolean,
  earlyBalance: 0 as number,
  isEarly: false as boolean,
  isNotPremium: true as boolean,
  isIntermediate: false as boolean,
  isExpert: false as boolean,
  totalStakingAmount: null as number | null
});

export default PremiumContext;
