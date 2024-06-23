"use client";

import ChainContext from "@/contexts/chain";
import { Switch } from "@nextui-org/switch";
import React, { useEffect, useMemo, useState } from "react";
import { Address, Chain, isAddressEqual } from "viem";
import { polygon, polygonAmoy } from "viem/chains";
import { useAccount, useSwitchChain } from "wagmi";
import { contracts } from "@/data/web3/addresses";

const testnetEnabled =
  process.env.NODE_ENV !== "production" ||
  process.env.VERCEL_ENV !== "production";

const ChainProvider = ({ children }: { children: React.ReactNode }) => {
  const [chain, setChain] = useState<Chain>(polygon);

  const { switchChain } = useSwitchChain();
  const { address } = useAccount();

  const contextValue = useMemo(
    () => ({
      chain,
      setChain
    }),
    [chain, setChain]
  );

  const handleTestnet = () => {
    if (chain.id === polygon.id) {
      setChain(polygonAmoy);
      switchChain({ chainId: polygonAmoy.id });
    } else {
      setChain(polygon);
      switchChain({ chainId: polygon.id });
    }
  };

  useEffect(() => {
    if (chain && !testnetEnabled) {
      switchChain({ chainId: chain.id });
    }
  }, [chain, switchChain]);

  return (
    <>
      <ChainContext.Provider value={contextValue}>
        {children}

        {(testnetEnabled ||
          isAddressEqual(
            address as Address,
            contracts[polygonAmoy.id].trotelCoinDAOAddress
          )) && (
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
