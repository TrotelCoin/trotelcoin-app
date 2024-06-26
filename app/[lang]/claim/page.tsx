"use client";

import React, { useState, useEffect, useContext } from "react";
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
import UsdcBalance from "@/app/[lang]/claim/components/usdcBalance";
import { Skeleton } from "@radix-ui/themes";
import ChainContext from "@/contexts/chain";
import Fee from "@/app/[lang]/claim/components/fee";

const Claim = ({ params: { lang } }: { params: { lang: Lang } }) => {
  const [centralWalletAddress, setCentralWalletAddress] =
    useState<Address | null>(null);
  const [availableToClaim, setAvailableToClaim] = useState<number | null>(null);
  const [chainError, setChainError] = useState<boolean>(false);

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
              <UsdcBalance
                lang={lang}
                availableToClaim={availableToClaim as number}
                isLoading={isLoadingUserTotalRewardsPending}
              />
            </div>
            <div>
              <Balance lang={lang} />
            </div>
            <div>
              <Fee lang={lang} />
            </div>
            <div>
              <Status
                lang={lang}
                availableToClaim={availableToClaim}
                isLoading={isLoadingUserTotalRewardsPending}
              />
            </div>
            <div>
              <AddToken lang={lang} />
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
