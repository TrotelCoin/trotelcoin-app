"use client";

import React, { useEffect, useMemo, useState } from "react";
import TrotelPriceContext from "@/contexts/trotelPrice";
import { getTrotelPrice } from "@/utils/socket/getTrotelPrice";
import { parseUnits } from "viem";
import { trotelCoinPolygon, usdcPolygonBridged } from "@/data/web3/tokens";
import { polygonChain } from "@/data/web3/chains";

const TrotelPriceProvider = ({ children }: { children: React.ReactNode }) => {
  const [trotelPrice, setTrotelPrice] = useState<number>(0);
  const [trotelPriceLoading, setTrotelPriceLoading] = useState<boolean>(false);

  const fromAmount = 100;

  const fetchPrice = async () => {
    const data = await getTrotelPrice(
      fromAmount,
      trotelCoinPolygon,
      usdcPolygonBridged,
      polygonChain,
      polygonChain,
      "0x8333c1B5131CC694c3A238E41e50cbc236e73DbC",
      true,
      "output",
      true,
      false,
      "2",
      setTrotelPrice,
      setTrotelPriceLoading
    );
  };

  useEffect(() => {
    fetchPrice();
  }, []);

  const contextValue = useMemo(
    () => ({
      trotelPrice,
      trotelPriceLoading,
      setTrotelPrice,
      setTrotelPriceLoading,
    }),
    [setTrotelPrice, setTrotelPriceLoading]
  );

  return (
    <>
      <TrotelPriceContext.Provider value={contextValue}>
        {children}
      </TrotelPriceContext.Provider>
    </>
  );
};

export default TrotelPriceProvider;
