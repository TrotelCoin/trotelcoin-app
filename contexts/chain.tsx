import React from "react";
import type { Chain } from "viem";

const ChainContext = React.createContext({
  chain: {} as Chain,
  setChain: {} as React.Dispatch<React.SetStateAction<Chain>>,
  handleTestnet: () => {},
  showTestnet: false as boolean
});

export default ChainContext;
