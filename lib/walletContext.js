"use client";

import React, { createContext, useContext } from "react";
import { useConnect, useDisconnect } from "wagmi";
import { bsc } from "wagmi/chains";

const WalletContext = createContext();

export const useWallet = () => {
  return useContext(WalletContext);
};

export const WalletProvider = ({ children }) => {
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect({ chainId: bsc.id });

  return (
    <WalletContext.Provider value={contextValue}>
      {children}
    </WalletContext.Provider>
  );
};
