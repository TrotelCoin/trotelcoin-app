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
      refreshInterval: refreshIntervalTime,
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
      refreshInterval: refreshIntervalTime,
    }
  );

  useEffect(() => {
    if (centralWalletAddressData) {
      setCentralWalletAddress(centralWalletAddressData);
    }
  }, [centralWalletAddressData]);

  return (
    <>
      <div className="mx-auto flex flex-col max-w-md justify-center w-full items-center">
        <div className="w-full flex flex-col flex-wrap bg-white border backdrop-blur-xl divide-y divide-gray-900/10 dark:divide-gray-100/10 border-gray-900/10 dark:border-gray-100/10 rounded-xl py-4 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
          <div className="flex flex-col gap-2 px-4">
            <span className="text-2xl font-bold">
              {lang === "en" ? "Claim" : "Récupérer"}
            </span>
            <div>
              <AvailableToClaim
                lang={lang}
                availableToClaim={availableToClaim as number}
                claimed={claimed}
              />
            </div>
            <div>
              <Balance lang={lang} />
            </div>
            <div>
              <Status
                lang={lang}
                availableToClaim={availableToClaim as number}
              />
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
