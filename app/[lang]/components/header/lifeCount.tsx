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
import React, { Fragment, useContext, useEffect, useState } from "react";
import { Address } from "viem";
import { polygon } from "viem/chains";
import { useContractRead } from "wagmi";
import LifeContext from "@/app/[lang]/lifeContext";

const LifeCount = ({ dict, lang }: { dict: DictType; lang: Lang }) => {
  const [isHoveringLife, setIsHoveringLife] = useState<boolean>(false);
  const [isIntermediateBalance, setIsIntermediateBalance] =
    useState<boolean>(false);
  const [isExpertBalance, setIsExpertBalance] = useState<boolean>(false);

  const address = useAddress();
  const { life, lifeCooldown } = useContext(LifeContext);

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
            className="absolute flex justify-center bg-white dark:bg-gray-800 z-10 mt-3 text-sm text-gray-900 dark:text-gray-100"
            style={{ width: "300px" }}
          >
            <div className="absolute flex flex-col gap-4 bg-white dark:bg-gray-800 justify-center items-center top-5 z-50 border border-gray-900/20 dark:border-gray-100/20 p-4 rounded-xl">
              <p>
                {typeof dict?.header !== "string" && (
                  <>{dict?.header.lifeMessage}</>
                )}
              </p>
              {lifeCooldown && (
                <p>
                  {lang === "en" ? "Reset in:" : "Réinitialisation dans:"}{" "}
                  {lifeCooldown}
                </p>
              )}
              <Link href={`/${lang}/shop`}>
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
