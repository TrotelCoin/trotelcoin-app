"use client";

import React, { useEffect, useMemo, useState } from "react";
import TrotelPriceContext from "@/contexts/trotelPrice";
import { useReadContract, useBlockNumber } from "wagmi";
import { polygon } from "viem/chains";
import {
  trotelCoinPolygonUniswapV3Pool,
  usdcPolygonUniswapV3Pool
} from "@/data/web3/addresses";
import trotelCoinPolygonUniswapV3PoolABI from "@/abi/uniswap/trotelCoinPolygonUniswapV3Pool";
import usdcPolygonUniswapV3PoolABI from "@/abi/uniswap/usdcPolygonUniswapV3Pool";
import { roundPrice } from "@/utils/price/roundPrice";

const TrotelPriceProvider = ({ children }: { children: React.ReactNode }) => {
  const [trotelPrice, setTrotelPrice] = useState<number | null>(null);
  const [trotelPriceLoading, setTrotelPriceLoading] = useState<boolean>(true);
  const [showTrotelInUsdc, setShowTrotelInUsdc] = useState<boolean>(false);
  const [trotelPriceRounded, setTrotelPriceRounded] = useState<number | null>(
    null
  );
  const [storedTrotelPrice, setStoredTrotelPrice] = useState<number | null>(
    null
  );

  useEffect(() => {
    const timer = setTimeout(
      () => {
        setStoredTrotelPrice(trotelPrice);
      },
      5 * 60 * 1000
    ); // 5 minutes

    return () => clearTimeout(timer);
  }, [trotelPrice]);

  const { data: blockNumber } = useBlockNumber({
    chainId: polygon.id,
    watch: true
  });

  const { data: trotelSlot0, refetch: refetchTrotelSlot0 } = useReadContract({
    abi: trotelCoinPolygonUniswapV3PoolABI,
    address: trotelCoinPolygonUniswapV3Pool,
    functionName: "slot0",
    chainId: polygon.id
  });

  const { data: usdcSlot0, refetch: refetchUsdcSlot0 } = useReadContract({
    abi: usdcPolygonUniswapV3PoolABI,
    address: usdcPolygonUniswapV3Pool,
    functionName: "slot0",
    chainId: polygon.id
  });

  function returnPrice(
    sqrtPriceX96: number,
    token0Decimals: number,
    token1Decimals: number
  ) {
    const price = (sqrtPriceX96 / 2 ** 96) ** 2;
    return price * 10 ** (token0Decimals - token1Decimals);
  }

  useEffect(() => {
    refetchTrotelSlot0();
    refetchUsdcSlot0();
  }, [blockNumber]);

  useEffect(() => {
    if (trotelSlot0 && usdcSlot0) {
      const trotelSqrtPriceX96 = Number((trotelSlot0 as any[])[0]); // 1 matic = trotelSqrtPriceX96 trotel (uint160)
      const trotelPriceAgainstMatic = returnPrice(trotelSqrtPriceX96, 18, 18);

      const usdcSqrtPriceX96 = Number((usdcSlot0 as any[])[0]); // 1 matic = usdcSqrtPriceX96 usdc (uint160)
      const maticPriceAgainstUsdc = returnPrice(usdcSqrtPriceX96, 18, 6);

      const trotelPriceAgainstUsdc =
        maticPriceAgainstUsdc / trotelPriceAgainstMatic;

      const trotelPriceRounded = roundPrice(trotelPriceAgainstUsdc);

      setTrotelPrice(trotelPriceAgainstUsdc);
      setTrotelPriceRounded(trotelPriceRounded);
      setTrotelPriceLoading(false);
    }
  }, [trotelSlot0, usdcSlot0]);

  useEffect(() => {
    const showTrotelInUsdc = localStorage.getItem("showTrotelInUsdc");

    if (showTrotelInUsdc) {
      setShowTrotelInUsdc(JSON.parse(showTrotelInUsdc));
    } else {
      setShowTrotelInUsdc(false);
    }
  }, []);

  const toggleShowInUsdc = () => {
    setShowTrotelInUsdc((prev) => {
      localStorage.setItem("showTrotelInUsdc", JSON.stringify(!prev));
      return !prev;
    });
  };

  const contextValue = useMemo(
    () => ({
      trotelPrice,
      trotelPriceLoading,
      showTrotelInUsdc,
      setTrotelPrice,
      setTrotelPriceLoading,
      setShowTrotelInUsdc,
      toggleShowInUsdc,
      trotelPriceRounded,
      setTrotelPriceRounded,
      storedTrotelPrice,
      setStoredTrotelPrice
    }),
    [trotelPrice, trotelPriceLoading, showTrotelInUsdc, trotelPriceRounded, storedTrotelPrice]
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
