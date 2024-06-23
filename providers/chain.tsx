"use client";

import ChainContext from "@/contexts/chain";
import React, { useEffect, useMemo, useState } from "react";
import { Chain, isAddressEqual } from "viem";
import { polygon, polygonAmoy } from "viem/chains";
import { useAccount, useSwitchChain } from "wagmi";
import { contracts } from "@/data/web3/addresses";

const ChainProvider = ({ children }: { children: React.ReactNode }) => {
  const [chain, setChain] = useState<Chain>(polygon);
  const [showTestnet, setShowTestnet] = useState(false);

  const { switchChain } = useSwitchChain();
  const { address } = useAccount();

  const handleTestnet = () => {
    if (chain.id !== polygonAmoy.id) {
      setChain(polygonAmoy);
    } else {
      setChain(polygon);
    }
  };

  useEffect(() => {
    if (chain) {
      switchChain({ chainId: chain.id });

      if (
        address &&
        isAddressEqual(address, contracts[polygonAmoy.id].trotelCoinDAOAddress)
      ) {
        setShowTestnet(true);
      } else {
        setShowTestnet(false);
      }
    }
  }, [chain, switchChain]);

  const contextValue = useMemo(
    () => ({
      chain,
      setChain,
      handleTestnet,
      showTestnet
    }),
    [chain, setChain, handleTestnet, showTestnet]
  );

  return (
    <>
      <ChainContext.Provider value={contextValue}>
        {children}
      </ChainContext.Provider>
    </>
  );
};

export default ChainProvider;
