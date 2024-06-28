import type { Lang } from "@/types/language/lang";
import React, { useContext, useState, useEffect } from "react";
import UserContext from "@/contexts/user";
import RewardsButton from "@/app/[lang]/claim/components/buttons/rewardsButton";
import Image from "next/image";
import { fetcher, refreshIntervalTime } from "@/utils/axios/fetcher";
import useSWR from "swr";
import { Address } from "viem";
import TrotelPriceContext from "@/contexts/trotelPrice";
import { roundPrice } from "@/utils/price/roundPrice";
import TrotelCoinLogo from "@/app/[lang]/components/trotelCoinLogo";
import { useAccount } from "wagmi";

const PendingRewardsMobile = ({ lang }: { lang: Lang }) => {
  const [chainError, setChainError] = useState<boolean>(false);
  const [centralWalletAddress, setCentralWalletAddress] =
    useState<Address | null>(null);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [dateFetched, setDateFetched] = useState<boolean>(false);
  const [isWeeklyReserveEmpty, setIsWeeklyReserveEmpty] =
    useState<boolean>(true);
  const [lastMintedDate, setLastMintedDate] = useState<Date | null>(null);

  const { address } = useAccount();

  const { userTotalRewardsPending } = useContext(UserContext);
  const { trotelPrice, showTrotelInUsdc } = useContext(TrotelPriceContext);

  const { data: centralWalletAddressData } = useSWR(
    "/api/central-wallet/address",
    fetcher,
    {
      revalidateOnMount: true,
      revalidateIfStale: true,
      revalidateOnReconnect: true,
      refreshInterval: refreshIntervalTime
    }
  );

  const { data: lastMintedDateData, isLoading: isLoadingTimeLeft } = useSWR(
    address ? `/api/user/claim-rewards?wallet=${address}` : null,
    fetcher,
    {
      revalidateOnMount: true,
      revalidateIfStale: true,
      revalidateOnReconnect: true,
      refreshInterval: refreshIntervalTime
    }
  );

  const {
    data: weeklyDistributedAmountData,
    isLoading: isLoadingWeeklyDistributedAmount
  } = useSWR(`/api/rewards/distributed/this-week`, fetcher, {
    revalidateOnMount: true,
    revalidateIfStale: true,
    revalidateOnReconnect: true,
    refreshInterval: refreshIntervalTime
  });

  useEffect(() => {
    if (!isLoadingWeeklyDistributedAmount) {
      if (weeklyDistributedAmountData) {
        const weeklyDistributedAmount = Number(weeklyDistributedAmountData);

        if (weeklyDistributedAmountData > 100000) {
          setIsWeeklyReserveEmpty(true);
        }
      } else {
        setIsWeeklyReserveEmpty(false);
      }
    } else {
      setIsWeeklyReserveEmpty(true);
    }
  }, [weeklyDistributedAmountData, isLoadingWeeklyDistributedAmount]);

  useEffect(() => {
    if (lastMintedDateData && !dateFetched) {
      setLastMintedDate(lastMintedDateData);
      setDateFetched(true);
    } else if (!isLoadingTimeLeft) {
      setLastMintedDate(null);
      setTimeLeft(-1);
    } else {
      setLastMintedDate(null);
    }
  }, [lastMintedDateData, dateFetched, isLoadingTimeLeft]);

  useEffect(() => {
    if (lastMintedDate) {
      const currentDate = new Date();

      const diffTime = Math.abs(
        currentDate.getTime() - new Date(lastMintedDate).getTime()
      );

      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      const diffMins = Math.ceil(diffTime / (1000 * 60));

      if (diffDays < 7) {
        setTimeLeft(7 * 24 * 60 - diffMins);
      } else {
        setTimeLeft(-1);
      }
    }
  }, [lastMintedDate, dateFetched]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (timeLeft) {
        setTimeLeft(timeLeft - 1);
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  useEffect(() => {
    if (centralWalletAddressData) {
      setCentralWalletAddress(centralWalletAddressData);
    }
  }, [centralWalletAddressData]);

  return (
    <>
      <div className="flex flex-col divide-y divide-gray-900/10 rounded-xl border border-gray-900/10 bg-white text-gray-900 dark:divide-gray-100/10 dark:border-gray-100/10 dark:bg-gray-800 dark:text-gray-100">
        <div className="flex items-center justify-between gap-2 p-4">
          <h3>{lang === "en" ? "Your rewards" : "Vos récompenses"}</h3>
          <div className="flex items-center gap-2">
            {showTrotelInUsdc ? (
              <>
                $
                {roundPrice(
                  Number(
                    (trotelPrice as number) *
                      (userTotalRewardsPending as number)
                  )
                ).toLocaleString("en-US")}
              </>
            ) : (
              <>
                {roundPrice(
                  Number(userTotalRewardsPending as number)
                ).toLocaleString("en-US")}
              </>
            )}
            <TrotelCoinLogo />
          </div>
        </div>
        <div className="flex w-full items-center justify-center gap-4 p-4">
          <RewardsButton
            centralWalletAddress={centralWalletAddress as Address}
            lang={lang}
            chainError={chainError}
            setChainError={setChainError}
            timeLeft={timeLeft}
            isWeeklyReserveEmpty={isWeeklyReserveEmpty}
          />
        </div>
      </div>
    </>
  );
};

export default PendingRewardsMobile;
