"use client";

import ChainContext from "@/contexts/chain";
import { Switch } from "@nextui-org/switch";
import React, { useEffect, useMemo, useState } from "react";
import { Address, Chain, isAddressEqual } from "viem";
import { polygon, polygonAmoy } from "viem/chains";
import { useAccount, useSwitchChain } from "wagmi";
import { contracts } from "@/data/web3/addresses";

const ChainProvider = ({ children }: { children: React.ReactNode }) => {
  const [chain, setChain] = useState<Chain>(polygon);

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
    }
  }, [chain, switchChain]);

  const contextValue = useMemo(
    () => ({
      chain,
      setChain
    }),
    [chain, setChain]
  );

  return (
    <>
      <ChainContext.Provider value={contextValue}>
        {children}

        {isAddressEqual(
          address as Address,
          contracts[polygonAmoy.id].trotelCoinDAOAddress
        ) && (
          <div className="fixed bottom-0 left-0 p-4">
            <Switch
              isSelected={chain.id === polygonAmoy.id}
              onChange={handleTestnet}
              color="success"
              size="sm"
            >
              Testnet
            </Switch>
          </div>
        )}
      </ChainContext.Provider>
    </>
  );
};

export default ChainProvider;
