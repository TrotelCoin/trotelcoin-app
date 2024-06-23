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

const PendingRewardsMobile = ({ lang }: { lang: Lang }) => {
  const [chainError, setChainError] = useState<boolean>(false);
  const [centralWalletAddress, setCentralWalletAddress] =
    useState<Address | null>(null);

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
          />
        </div>
      </div>
    </>
  );
};

export default PendingRewardsMobile;
