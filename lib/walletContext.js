"use client";

import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  useMemo,
} from "react";
import { InjectedConnector } from "wagmi/connectors/injected";
import { useConnect, useDisconnect } from "wagmi";

const WalletContext = createContext();

export const useWallet = () => {
  return useContext(WalletContext);
};

export const WalletProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const { connectAsync } = useConnect();
  const { disconnectAsync } = useDisconnect();

  const connectWallet = useCallback(async () => {
    await connectAsync({
      connector: new InjectedConnector(),
    });

    setIsConnected(true);
  }, [setIsConnected, connectAsync]);

  const disconnectWallet = useCallback(async () => {
    await disconnectAsync();
    setIsConnected(false);
  }, [setIsConnected, disconnectAsync]);

  const contextValue = useMemo(
    () => ({ isConnected, connectWallet, disconnectWallet }),
    [connectWallet, disconnectWallet, isConnected]
  );

  return (
    <WalletContext.Provider value={contextValue}>
      {children}
    </WalletContext.Provider>
  );
};
