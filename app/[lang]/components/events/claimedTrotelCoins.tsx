import trotelCoinLearningABI from "@/abi/trotelCoinLearning";
import { trotelCoinLearningAddress } from "@/data/web3/addresses";
import { DictType, Lang } from "@/types/types";
import { XMarkIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { mainnet, polygon } from "viem/chains";
import { useContractEvent, useEnsName } from "wagmi";
import { Address, Log } from "viem";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { Transition } from "@headlessui/react";
import "animate.css";
import shortenAddress from "@/utils/shortenAddress";

type MyLog = Log & {
  args: {
    learner: Address;
    rewardsClaimed: string;
  };
};

export default function Events({ lang }: { lang: Lang }) {
  const [user, setUser] = useState<string | null>(null);
  const [amountClaimed, setAmountClaimed] = useState<number | null>(null);
  const [dict, setDict] = useState<DictType | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

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
      setIsVisible(true);

      const length = log.length;

      setUser(shortenAddress((log[length - 1] as MyLog).args.learner));
      setAmountClaimed(
        parseFloat((log[length - 1] as MyLog).args.rewardsClaimed.toString()) /
          1e18
      );

      setTimeout(() => {
        setIsVisible(false);
      }, 10000);
    },
  });

  const { data: ensName, isSuccess: ensNameExists } = useEnsName({
    chainId: mainnet.id,
    address: user as Address,
    enabled: Boolean(user),
  });

  useEffect(() => {
    if (ensNameExists) {
      setUser(ensName as string);
    }
  }, [ensNameExists]);

  return (
    <>
      <Transition
        show={isVisible}
        enter="transition-opacity duration-500"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-500"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div
          className={`fixed inset-x-0 bottom-0 pb-2 sm:pb-5 animate__faster z-50`}
        >
          <div className="mx-auto max-w-4xl px-2 sm:px-6 lg:px-8">
            <div className="rounded-lg bg-green-600 dark:bg-green-200 p-2 shadow-lg sm:p-3">
              <div className="flex flex-wrap items-center justify-between">
                <div className="flex w-0 flex-1 items-center">
                  <span className="flex rounded-lg bg-green-800 dark:bg-green-300 p-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 text-gray-100 dark:text-gray-900"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
                      />
                    </svg>
                  </span>
                  <p className="ml-3 truncate font-medium text-gray-100 dark:text-gray-900">
                    <span className="md:hidden">
                      {user as Address}{" "}
                      {typeof dict?.events !== "string" && (
                        <>{dict?.events.claimed}</>
                      )}{" "}
                      {amountClaimed as number} TrotelCoins!
                    </span>
                    <span className="hidden md:inline">
                      {user as Address}{" "}
                      {typeof dict?.events !== "string" && (
                        <>{dict?.events.claimed}</>
                      )}{" "}
                      {amountClaimed as number} TrotelCoins!
                    </span>
                  </p>
                </div>
                <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-2">
                  <button
                    type="button"
                    className="-mr-1 flex rounded-md p-2 hover:bg-green-800 dark:hover:bg-green-300 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:focus:ring-gray-900"
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
      </Transition>
    </>
  );
}
