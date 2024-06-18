"use client";

import React, { useState, useEffect } from "react";
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
import { polygon } from "viem/chains";
import UsdcBalance from "@/app/[lang]/claim/components/usdcBalance";

const Claim = ({ params: { lang } }: { params: { lang: Lang } }) => {
  const [centralWalletAddress, setCentralWalletAddress] =
    useState<Address | null>(null);
  const [availableToClaim, setAvailableToClaim] = useState<number | null>(null);
  const [claimed, setClaimed] = useState<boolean>(false);
  const [chainError, setChainError] = useState<boolean>(false);

  const { address } = useAccount();

  const chainId = useChainId();

  const { data: userTotalRewardsPendingData } = useSWR(
    address ? `/api/user/rewards?wallet=${address}` : null,
    fetcher,
    {
      revalidateOnMount: true,
      revalidateIfStale: true,
      revalidateOnReconnect: true,
      refreshInterval: refreshIntervalTime
    }
  );

  useEffect(() => {
    if (userTotalRewardsPendingData) {
      setAvailableToClaim(userTotalRewardsPendingData);
    } else {
      setAvailableToClaim(0);
    }
  }, [userTotalRewardsPendingData]);

  useEffect(() => {
    if (chainId !== polygon.id) {
      setChainError(true);
    }
  }, [chainId]);

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
                claimed={claimed}
              />
            </div>
            <div>
              <UsdcBalance
                lang={lang}
                availableToClaim={availableToClaim as number}
              />
            </div>
            <div>
              <Balance lang={lang} />
            </div>
            <div>
              <Status lang={lang} availableToClaim={availableToClaim} />
            </div>
            <div>
              <AddToken lang={lang} />
            </div>
          </div>
        </div>

        <div className="mt-4 w-full">
          {address ? (
            <RewardsButton
              centralWalletAddress={centralWalletAddress as Address}
              lang={lang}
              chainError={chainError}
              setChainError={setChainError}
              setClaimed={setClaimed}
            />
          ) : (
            <Wallet lang={lang} isFull={true} isCentered={true} />
          )}
        </div>
      </div>
    </>
  );
};

export default Claim;
