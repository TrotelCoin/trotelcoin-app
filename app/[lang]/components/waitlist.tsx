"use client";

import React, { useContext, useEffect, useState } from "react";
import PremiumContext from "@/app/[lang]/contexts/premiumContext";
import { Lang } from "@/types/lang";
import Image from "next/image";
import Wallet from "@/app/[lang]/components/header/wallet";
import ThemeContext from "@/app/[lang]/contexts/themeContext";
import { useAccount, useBlockNumber, useReadContract } from "wagmi";
import { polygon } from "viem/chains";
import trotelCoinEarlyABI from "@/abi/trotelCoinEarly";
import { trotelCoinEarlyAddress } from "@/data/web3/addresses";
import CountUp from "react-countup/";

const Waitlist = ({
  children,
  lang,
}: {
  children: React.ReactNode;
  lang: Lang;
}) => {
  const [early, setEarly] = useState<number>(0);

  const { address } = useAccount();
  const { data: blockNumber } = useBlockNumber({
    watch: true,
    chainId: polygon.id,
  });

  const { isEarly } = useContext(PremiumContext);
  const { theme } = useContext(ThemeContext);

  const { data: earlyData, refetch } = useReadContract({
    chainId: polygon.id,
    abi: trotelCoinEarlyABI,
    address: trotelCoinEarlyAddress,
    functionName: "totalSupply",
  });

  useEffect(() => {
    if (earlyData) {
      const totalEarly = Number(earlyData);
      setEarly(totalEarly);
    } else {
      setEarly(0);
    }
  }, [earlyData]);

  useEffect(() => {
    refetch();
  }, [blockNumber]);

  return (
    <>
      {isEarly ? (
        <>{children}</>
      ) : (
        <>
          <div className="flex justify-center items-center h-screen text-center bg-white dark:bg-gray-900">
            <div className="flex flex-col gap-4 max-w-4xl mx-8">
              <div className="flex justify-center">
                <div className="relative rounded-full px-3 py-1 text-xs sm:text-sm leading-6 text-gray-700 dark:text-gray-300 ring-1 ring-gray-900 hover:ring-gray-700 dark:ring-gray-100 dark:hover:ring-gray-300">
                  <span className="font-semibold">
                    {early ? (
                      <>
                        <CountUp start={0} end={early} />
                      </>
                    ) : (
                      <>0</>
                    )}
                  </span>
                  + {lang === "en" ? "people joined" : "participants"}
                </div>
              </div>
              <span className="font-semibold text-5xl lg:text-6xl text-gray-900 dark:text-gray-100">
                <>
                  <span className="text-blue-500 dark:text-blue-300">
                    Learn
                  </span>{" "}
                  &{" "}
                  <span className="text-yellow-500 dark:text-yellow-300">
                    earn
                  </span>{" "}
                  crypto.
                </>
              </span>
              <span className="text-gray-700 dark:text-gray-300 text-sm">
                {lang === "en"
                  ? "Join the waitlist now to start learning."
                  : "Rejoignez la liste d'attente maintenant pour commencer à apprendre."}
              </span>
              <div className="mt-4">
                <Wallet lang={lang} />
              </div>
            </div>
          </div>
          <div className="absolute top-5 left-5">
            {theme === "light" ? (
              <div className="block dark:hidden">
                <Image
                  src="/assets/logo/trotelcoin-white.png"
                  alt="TrotelCoin logo"
                  width={64}
                  height={64}
                />
              </div>
            ) : (
              <div className="hidden dark:block">
                <Image
                  src="/assets/logo/trotelcoin.png"
                  alt="TrotelCoin logo"
                  width={64}
                  height={64}
                />
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Waitlist;
