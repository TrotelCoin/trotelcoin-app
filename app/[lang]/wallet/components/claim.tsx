"use client";

import React, { useState, useEffect } from "react";
import type { Lang } from "@/types/lang";
import RewardsButton from "@/app/[lang]/wallet/components/claim/rewardsButton";
import AvailableToClaim from "@/app/[lang]/wallet/components/claim/availableToClaim";
import Balance from "@/app/[lang]/wallet/components/claim/balance";
import { Address } from "viem";
import { useAccount } from "wagmi";
import Status from "@/app/[lang]/wallet/components/claim/status";
import AddToken from "@/app/[lang]/wallet/components/claim/addToken";
import { fetcher } from "@/lib/axios/fetcher";
import useSWR from "swr";
import Wallet from "@/app/[lang]/components/header/wallet";
import "animate.css";
import WidgetTitle from "@/app/[lang]/wallet/components/widgetTitle";

const Claim = ({
  lang,
  chainError,
  setChainError,
}: {
  lang: Lang;
  chainError: boolean;
  setChainError: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [centralWalletAddress, setCentralWalletAddress] =
    useState<Address | null>(null);
  const [availableToClaim, setAvailableToClaim] = useState<number | null>(null);
  const [claimed, setClaimed] = useState<boolean>(false);

  const { address } = useAccount();

  const { data: userTotalRewardsPendingData } = useSWR(
    address
      ? `/api/database/getUserTotalRewardsPending?wallet=${address}`
      : null,
    fetcher
  );

  useEffect(() => {
    if (userTotalRewardsPendingData) {
      setAvailableToClaim(userTotalRewardsPendingData);
    } else {
      setAvailableToClaim(0);
    }
  }, [userTotalRewardsPendingData]);

  const { data: centralWalletAddressData } = useSWR(
    "/api/getCentralWalletAddress",
    fetcher
  );

  useEffect(() => {
    if (centralWalletAddressData) {
      setCentralWalletAddress(centralWalletAddressData);
    }
  }, [centralWalletAddressData]);

  return (
    <>
      <div className="mt-8 w-full flex flex-col flex-wrap bg-gray-100 border backdrop-blur-xl divide-y divide-gray-900/10 dark:divide-gray-100/10 border-gray-900/10 dark:border-gray-100/10 rounded-xl py-4 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
        <div className="flex flex-col px-4 pb-4">
          <WidgetTitle
            title={lang === "en" ? "Claim" : "Récupérer"}
            lang={lang}
          />
        </div>

        <div className="flex flex-col gap-2 py-4 px-4">
          <div>
            <AvailableToClaim
              lang={lang}
              availableToClaim={availableToClaim as number}
              claimed={claimed as boolean}
            />
          </div>
          <div>
            <Balance lang={lang} />
          </div>
          <div>
            <AddToken lang={lang} />
          </div>
          <div>
            <Status lang={lang} availableToClaim={availableToClaim as number} />
          </div>
        </div>

        <div className="pt-4 px-4">
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
