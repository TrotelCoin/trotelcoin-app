"use client";

import React, { useState, useEffect } from "react";
import { Lang } from "@/types/types";
import RewardsButton from "@/app/[lang]/wallet/components/claim/rewardsButton";
import AvailableToClaim from "@/app/[lang]/wallet/components/claim/availableToClaim";
import Balance from "@/app/[lang]/wallet/components/claim/balance";
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
          "Cache-Control": "no-store",
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
      <div className="mt-4 w-full flex flex-col flex-wrap gap-4 bg-gray-100 border backdrop-blur-xl divide-y divide-gray-900/10 dark:divide-gray-100/10 border-gray-900/10 dark:border-gray-100/10 rounded-xl py-4 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
        <span className="font-bold text-xl px-4">
          {lang === "en" ? <>Claim</> : <>Récupérer</>}
        </span>

        <div className="flex flex-col gap-2 pt-4 px-4">
          <div>
            <AvailableToClaim lang={lang} />
          </div>
          <div>
            <Balance lang={lang} />
          </div>
        </div>
        <div className="pt-4 px-4">
          <RewardsButton
            centralWalletAddress={centralWalletAddress as Address}
            lang={lang}
          />
        </div>
      </div>
    </>
  );
};

export default Claim;
