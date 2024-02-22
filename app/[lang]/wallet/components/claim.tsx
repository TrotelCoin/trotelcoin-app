"use client";

import React, { useState, useEffect } from "react";
import { Lang } from "@/types/types";
import RewardsButton from "@/app/[lang]/wallet/components/rewardsButton";
import AvailableToClaim from "@/app/[lang]/wallet/components/availableToClaim";
import Balance from "@/app/[lang]/wallet/components/balance";
import { Address } from "viem";

const Claim = ({ lang }: { lang: Lang }) => {
  const [centralWalletAddress, setCentralWalletAddress] =
    useState<Address | null>(null);

  useEffect(() => {
    const fetchCentralWalletAddress = async () => {
      const response = await fetch("/api/getCentralWalletAddress", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });

      const data = await response.json();

      setCentralWalletAddress(data);
    };

    fetchCentralWalletAddress();
  }, []);

  return (
    <>
      <div className="mt-4 w-full flex flex-col flex-wrap gap-4 bg-gray-100 border backdrop-blur-xl divide-y divide-gray-900/20 dark:divide-gray-100/20 border-gray-900/20 dark:border-gray-100/20 rounded-lg py-4 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
        <div className="flex flex-col flex-wrap gap-4 px-4">
          <span className="font-bold text-xl">
            {lang === "en" ? <>Claim</> : <>Récupérer</>}
          </span>

          <div className="flex flex-col gap-2">
            <div>
              <AvailableToClaim lang={lang} />
            </div>
            <div>
              <Balance lang={lang} />
            </div>
          </div>
          <div>
            <RewardsButton
              centralWalletAddress={centralWalletAddress as Address}
              lang={lang}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Claim;
