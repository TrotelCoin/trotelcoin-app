"use client";

import React, { useState, useEffect, useContext, use } from "react";
import type { Lang } from "@/types/language/lang";
import RewardsButton from "@/app/[lang]/claim/components/buttons/rewardsButton";
import AvailableToClaim from "@/app/[lang]/claim/components/availableToClaim";
import Balance from "@/app/[lang]/claim/components/balance";
import { Address } from "viem";
import { useAccount, useChainId } from "wagmi";
import Status from "@/app/[lang]/claim/components/status";
import AddToken from "@/app/[lang]/claim/components/addToken";
import { fetcher, refreshIntervalTime } from "@/utils/axios/fetcher";
import useSWR from "swr";
import Wallet from "@/app/[lang]/components/header/wallet";
import "animate.css";
import { Skeleton } from "@radix-ui/themes";
import ChainContext from "@/contexts/chain";
import Fee from "@/app/[lang]/claim/components/fee";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import TimeLeft from "@/app/[lang]/claim/components/timeLeft";

const Claim = ({ params: { lang } }: { params: { lang: Lang } }) => {
  const [centralWalletAddress, setCentralWalletAddress] =
    useState<Address | null>(null);
  const [availableToClaim, setAvailableToClaim] = useState<number | null>(null);
  const [chainError, setChainError] = useState<boolean>(false);
  const [lastMintedDate, setLastMintedDate] = useState<Date | null>(null);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [dateFetched, setDateFetched] = useState<boolean>(false);
  const [isWeeklyReserveEmpty, setIsWeeklyReserveEmpty] =
    useState<boolean>(true);

  const { address } = useAccount();
  const { chain } = useContext(ChainContext);

  const chainId = useChainId();

  const {
    data: userTotalRewardsPendingData,
    isLoading: isLoadingUserTotalRewardsPending
  } = useSWR(address ? `/api/user/rewards?wallet=${address}` : null, fetcher, {
    revalidateOnMount: true,
    revalidateIfStale: true,
    revalidateOnReconnect: true,
    refreshInterval: refreshIntervalTime
  });

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
    if (userTotalRewardsPendingData) {
      setAvailableToClaim(userTotalRewardsPendingData);
    } else {
      setAvailableToClaim(0);
    }
  }, [userTotalRewardsPendingData]);

  useEffect(() => {
    if (chainId !== chain.id) {
      setChainError(true);
    }
  }, [chainId, chain]);

  const {
    data: centralWalletAddressData,
    isLoading: isLoadingCentralWalletAddress
  } = useSWR("/api/central-wallet/address", fetcher, {
    revalidateOnMount: true,
    revalidateIfStale: true,
    revalidateOnReconnect: true,
    refreshInterval: refreshIntervalTime
  });

  useEffect(() => {
    if (centralWalletAddressData) {
      setCentralWalletAddress(centralWalletAddressData);
    }
  }, [centralWalletAddressData]);

  return (
    <>
      <div className="mx-auto flex w-full max-w-md flex-col items-center justify-center">
        <div className="flex w-full flex-col flex-wrap divide-y divide-gray-900/10 rounded-xl border border-gray-900/10 bg-white py-4 text-gray-900 backdrop-blur-xl dark:divide-gray-100/10 dark:border-gray-100/10 dark:bg-gray-800 dark:text-gray-100">
          <div className="flex flex-col gap-2 px-4">
            <span className="text-2xl font-bold">
              {lang === "en" ? "Claim" : "Récupérer"}
            </span>
            <div>
              <AvailableToClaim
                lang={lang}
                availableToClaim={availableToClaim}
                isLoading={isLoadingUserTotalRewardsPending}
              />
            </div>
            <div>
              <Balance lang={lang} />
            </div>
            <div>
              <TimeLeft
                lang={lang}
                timeLeft={timeLeft as number}
                isLoadingTimeLeft={isLoadingTimeLeft}
              />
            </div>
            <div>
              <Fee lang={lang} />
            </div>
            <div>
              <Status
                lang={lang}
                availableToClaim={availableToClaim}
                isLoading={isLoadingUserTotalRewardsPending}
                timeLeft={timeLeft}
                isWeeklyReserveEmpty={isWeeklyReserveEmpty}
              />
            </div>
            <div>
              <AddToken lang={lang} />
            </div>
            <div>
              <span className="inline-flex items-center gap-1 text-sm text-gray-900 dark:text-gray-100">
                <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500" />
                {lang === "en"
                  ? "You can't claim more than 1,000 TROTEL per week."
                  : "Vous ne pouvez pas réclamer plus de 1,000 TROTEL par semaine."}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-4 w-full">
          <Skeleton loading={isLoadingCentralWalletAddress}>
            {address ? (
              <RewardsButton
                centralWalletAddress={centralWalletAddress as Address}
                lang={lang}
                chainError={chainError}
                setChainError={setChainError}
                timeLeft={timeLeft}
                isWeeklyReserveEmpty={isWeeklyReserveEmpty}
              />
            ) : (
              <Wallet lang={lang} isFull={true} isCentered={true} />
            )}
          </Skeleton>
        </div>
      </div>
    </>
  );
};

export default Claim;
