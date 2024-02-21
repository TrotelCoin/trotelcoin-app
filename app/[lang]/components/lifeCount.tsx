import trotelCoinExpertABI from "@/abi/trotelCoinExpert";
import trotelCoinIntermediateABI from "@/abi/trotelCoinIntermediate";
import {
  trotelCoinIntermediateAddress,
  trotelCoinExpertAddress,
} from "@/data/web3/addresses";
import { DictType, Lang } from "@/types/types";
import { Transition } from "@headlessui/react";
import { useAddress } from "@thirdweb-dev/react";
import Link from "next/link";
import React, { Fragment, useEffect, useState } from "react";
import { Address } from "viem";
import { polygon } from "viem/chains";
import { useContractRead } from "wagmi";

const LifeCount = ({
  dict,
  lang,
  life,
}: {
  dict: DictType;
  lang: Lang;
  life: number;
}) => {
  const [isHoveringLife, setIsHoveringLife] = useState<boolean>(false);
  const [cooldown, setCooldown] = useState<string | null>(null);
  const [isIntermediateBalance, setIsIntermediateBalance] =
    useState<boolean>(false);
  const [isExpertBalance, setIsExpertBalance] = useState<boolean>(false);
  const [resetLifeCountdown, setResetLifeCountdown] = useState<string | null>(
    null
  );

  const address = useAddress();

  const { data: intermediate } = useContractRead({
    chainId: polygon.id,
    abi: trotelCoinIntermediateABI,
    address: trotelCoinIntermediateAddress,
    functionName: "balanceOf",
    args: [address as Address],
    account: address as Address,
    enabled: Boolean(address),
    watch: true,
  });

  const { data: expert } = useContractRead({
    chainId: polygon.id,
    abi: trotelCoinExpertABI,
    address: trotelCoinExpertAddress,
    functionName: "balanceOf",
    args: [address as Address],
    account: address as Address,
    enabled: Boolean(address),
    watch: true,
  });

  useEffect(() => {
    const intermediateBalance: number = parseFloat(intermediate as string);
    const expertBalance: number = parseFloat(expert as string);

    if (intermediateBalance > 0) {
      setIsIntermediateBalance(true);
    }

    if (expertBalance > 0) {
      setIsExpertBalance(true);
    }
  }, [intermediate, expert]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (resetLifeCountdown) {
        const lastUpdated = new Date(resetLifeCountdown);
        const now = new Date();
        const difference = now.getTime() - lastUpdated.getTime();
        const cooldown = 86400000 - difference;
        const cooldownString = new Date(cooldown).toISOString();
        const time = cooldownString.split("T")[1].split(".")[0];
        setCooldown(time);
      } else {
        setCooldown("00:00:00");
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [resetLifeCountdown]);

  useEffect(() => {
    const fetchResetLifeCountdown = async () => {
      const result = await fetch(
        `/api/database/resetLifeCount?wallet=${address as Address}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          cache: "no-store",
        }
      );
      const data = await result.json();
      setResetLifeCountdown(data);
    };

    if (address) {
      fetchResetLifeCountdown();

      const interval = setInterval(fetchResetLifeCountdown, 1000);

      return () => clearInterval(interval);
    } else {
      setResetLifeCountdown(null);
    }
  }, [address]);

  return (
    <>
      <div
        className="relative flex justify-center gap-1 text-xl items-center text-gray-900 dark:text-gray-100 cursor-pointer"
        onMouseEnter={() => setIsHoveringLife(true)}
        onMouseLeave={() => setIsHoveringLife(false)}
      >
        {isExpertBalance || isIntermediateBalance ? (
          <span className="font-semibold text-2xl">&infin;</span>
        ) : life ? (
          <>{life}</>
        ) : (
          <span className="font-semibold">0</span>
        )}{" "}
        💙
        <Transition
          as={Fragment}
          show={isHoveringLife}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <div
            className="absolute flex justify-center bg-white dark:bg-gray-900 z-10 mt-3 text-sm text-gray-900 dark:text-gray-100"
            style={{ width: "300px" }}
          >
            <div className="absolute flex flex-col gap-4 bg-white dark:bg-gray-900 justify-center items-center top-5 z-50 border border-gray-900/20 dark:border-gray-100/20 p-4 rounded-xl">
              <p>
                {typeof dict?.header !== "string" && (
                  <>{dict?.header.lifeMessage}</>
                )}
              </p>
              {cooldown && (
                <p>
                  {lang === "en" ? "Reset in:" : "Réinitialisation dans:"}{" "}
                  {cooldown}
                </p>
              )}
              <Link href={`/${lang}/premium`}>
                <button className="bg-blue-500 hover:bg-blue-400 dark:bg-blue-300 dark:hover:bg-blue-400 hover:border-gray-900/50 dark:hover:border-gray-100/50 focus:border-blue-500 dark:focus:border-blue-300 text-sm px-6 py-2 text-gray-100 dark:text-gray-900 rounded-lg font-semibold">
                  {typeof dict?.header !== "string" && (
                    <>{dict?.header.lifeButton}</>
                  )}
                </button>
              </Link>
            </div>
          </div>
        </Transition>
      </div>
    </>
  );
};

export default LifeCount;
