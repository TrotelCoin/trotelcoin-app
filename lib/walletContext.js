"use client";

import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  useMemo,
  useEffect,
} from "react";
import { InjectedConnector } from "wagmi/connectors/injected";
import { useConnect, useDisconnect } from "wagmi";
import { bsc } from "wagmi/chains";

const WalletContext = createContext();

export const useWallet = () => {
  return useContext(WalletContext);
};

export const WalletProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const { connectAsync } = useConnect({ chainId: bsc.id });
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

  const handleBeforeUnload = useCallback(() => {
    disconnectWallet();
  }, [disconnectWallet]);

  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [handleBeforeUnload]);

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
