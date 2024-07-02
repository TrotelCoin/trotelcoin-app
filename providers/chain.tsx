"use client";

import ChainContext from "@/contexts/chain";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { isAddressEqual, Address } from "viem";
import { ExtendedChain } from "@/types/web3/chain";
import { polygon, polygonAmoy } from "viem/chains";
import { useAccount, useSwitchChain } from "wagmi";

const testnetAddresses: Address[] = [
  "0x8333c1B5131CC694c3A238E41e50cbc236e73DbC",
  "0x747923D9eC6c94521aCccc6F3d065C3772f3fa6b",
  "0x184aBB8CaA01E856228773889ab832DcC9884FE1",
  "0xA9Ddd1a0856051554f89C09B39B7bB7fAcB61538",
  "0xBa2aDDf6DD24E88Fdd404e3c22cCd50ed1A3ae40"
];

const ChainProvider = ({ children }: { children: React.ReactNode }) => {
  const [chain, setChain] = useState<ExtendedChain>(polygon);

  const { switchChainAsync } = useSwitchChain();
  const { address, isConnected } = useAccount();

  useEffect(() => {
    const switchingChain = async () => {
      await switchChainAsync({ chainId: chain.id }).catch((error) => {
        console.error(error);
      });
    };

    if (chain && isConnected) {
      switchingChain();
    }
  }, [chain, switchChainAsync, isConnected]);

  const handleTestnet = useCallback(() => {
    setChain((currentChain) => {
      return currentChain.testnet ? polygon : polygonAmoy;
    });
  }, []);

  const contextValue = useMemo(() => {
    return {
      chain,
      setChain,
      handleTestnet,
      showTestnet:
        !!address &&
        testnetAddresses.some((testnetAddress) =>
          isAddressEqual(address, testnetAddress)
        )
    };
  }, [chain, setChain, handleTestnet, address]);

  return (
    <>
      <ChainContext.Provider value={contextValue}>
        {children}
      </ChainContext.Provider>
    </>
  );
};

export default ChainProvider;
