import trotelCoinLearningABI from "@/abi/trotelCoinLearning";
import { trotelCoinLearningAddress } from "@/data/addresses";
import { DictType, Lang } from "@/types/types";
import { MegaphoneIcon, XMarkIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { polygon } from "viem/chains";
import { useContractEvent } from "wagmi";
import { Log } from "viem";
import { getDictionary } from "@/app/[lang]/dictionaries";

type MyLog = Log & {
  args: {
    learner: string;
    rewardsClaimed: string;
  };
};

export default function Events({ lang }: { lang: Lang }) {
  const [rewardsClaimed, setRewardsClaimed] = useState<Log[] | null>(null);
  const [user, setUser] = useState<string>("");
  const [amountClaimed, setAmountClaimed] = useState<number | null>(null);
  const [dict, setDict] = useState<DictType | null>(null);

  useEffect(() => {
    const fetchDictionary = async () => {
      const result = await getDictionary(lang);
      setDict(result);
    };

    fetchDictionary();
  }, [lang]);

  useContractEvent({
    chainId: polygon.id,
    address: trotelCoinLearningAddress,
    abi: trotelCoinLearningABI,
    eventName: "RewardsClaimed",
    listener(log) {
      setRewardsClaimed(log);
      console.log(log);

      const length = log.length;

      setUser((log[length - 1] as MyLog).args.learner);
      setAmountClaimed(
        parseFloat((log[length - 1] as MyLog).args.rewardsClaimed.toString()) /
          1e18
      );

      setTimeout(() => {
        setRewardsClaimed(null);
      }, 5000);
    },
  });

  return (
    <>
      <div
        className={`${
          rewardsClaimed ? "fixed" : "hidden"
        } inset-x-0 bottom-0 pb-2 sm:pb-5`}
      >
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="rounded-lg bg-blue-600 dark:bg-blue-200 p-2 shadow-lg sm:p-3">
            <div className="flex flex-wrap items-center justify-between">
              <div className="flex w-0 flex-1 items-center">
                <span className="flex rounded-lg bg-blue-800 dark:bg-blue-300 p-2">
                  <MegaphoneIcon
                    className="h-6 w-6 text-gray-100 dark:text-gray-900"
                    aria-hidden="true"
                  />
                </span>
                <p className="ml-3 truncate font-medium text-gray-100 dark:text-gray-900">
                  <span className="md:hidden">
                    {user}{" "}
                    {typeof dict?.events !== "string" && (
                      <>{dict?.events.claimed}</>
                    )}{" "}
                    {amountClaimed} TrotelCoins!
                  </span>
                  <span className="hidden md:inline">
                    {user}{" "}
                    {typeof dict?.events !== "string" && (
                      <>{dict?.events.claimed}</>
                    )}{" "}
                    {amountClaimed} TrotelCoins!
                  </span>
                </p>
              </div>
              <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-2">
                <button
                  type="button"
                  className="-mr-1 flex rounded-md p-2 hover:bg-blue-800 dark:hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:focus:ring-gray-900"
                >
                  <span className="sr-only">Dismiss</span>
                  <XMarkIcon
                    className="h-6 w-6 text-gray-100 dark:text-gray-900"
                    aria-hidden="true"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
