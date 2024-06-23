"use client";

import ChainContext from "@/contexts/chain";
import { Switch } from "@nextui-org/switch";
import React, { useEffect, useMemo, useState } from "react";
import { Chain } from "viem";
import { polygon, polygonAmoy } from "viem/chains";
import { useSwitchChain } from "wagmi";

const testnetEnabled =
  process.env.NODE_ENV !== "production" ||
  process.env.VERCEL_ENV !== "production";

const ChainProvider = ({ children }: { children: React.ReactNode }) => {
  const [chain, setChain] = useState<Chain>(polygon);

  const { switchChain } = useSwitchChain();

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

        {testnetEnabled && (
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
