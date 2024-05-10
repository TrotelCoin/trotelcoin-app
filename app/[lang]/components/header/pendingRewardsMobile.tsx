import type { Lang } from "@/types/lang";
import React, { useContext, useState, useEffect } from "react";
import UserContext from "@/app/[lang]/contexts/userContext";
import RewardsButton from "@/app/[lang]/wallet/components/claim/rewardsButton";
import Image from "next/image";
import { fetcher, refreshIntervalTime } from "@/utils/axios/fetcher";
import useSWR from "swr";
import { Address } from "viem";

const PendingRewardsMobile = ({ lang }: { lang: Lang }) => {
  const [chainError, setChainError] = useState<boolean>(false);
  const [centralWalletAddress, setCentralWalletAddress] =
    useState<Address | null>(null);
  const [claimed, setClaimed] = useState<boolean>(false);

  const { userTotalRewardsPending } = useContext(UserContext);

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
      <div className="flex flex-col border border-gray-900/10 dark:border-gray-100/10 bg-gray-50 dark:bg-gray-800 rounded-xl text-gray-900 dark:text-gray-100 divide-y divide-gray-900/10 dark:divide-gray-100/10">
        <div className="flex gap-2 items-center justify-between p-4">
          <h3>{lang === "en" ? "Your rewards" : "Vos récompenses"}</h3>
          <div className="flex gap-2 items-center">
            {!claimed
              ? Number(userTotalRewardsPending.toFixed(3)).toLocaleString(
                  "en-US"
                )
              : "0"}
            <div className="block dark:hidden w-4 h-4">
              <Image
                width={16}
                height={16}
                className="rounded-full"
                aria-hidden="true"
                alt="Token logo"
                src="/assets/logo/trotelcoin.svg"
              />
            </div>
            <div className="hidden dark:block w-4 h-4">
              <Image
                width={16}
                height={16}
                className="rounded-full"
                aria-hidden="true"
                alt="Token logo"
                src="/assets/logo/trotelcoin-dark.jpg"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center gap-4 p-4 w-full">
          <RewardsButton
            centralWalletAddress={centralWalletAddress as Address}
            lang={lang}
            chainError={chainError}
            setChainError={setChainError}
            setClaimed={setClaimed}
          />
        </div>
      </div>
    </>
  );
};

export default PendingRewardsMobile;
