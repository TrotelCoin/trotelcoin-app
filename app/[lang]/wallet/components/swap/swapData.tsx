import { Lang } from "@/types/lang";
import React, { useEffect, useState } from "react";
import { BoltIcon } from "@heroicons/react/24/solid";
import { loadingFlashClass } from "@/lib/tailwind/loading";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";
import { Token } from "@/types/web3/token";
import Image from "next/image";
import { Popover, Transition } from "@headlessui/react";

const SwapData = ({
  lang,
  isLoading,
  gasPrice,
  swapSlippage,
  protocolName,
  protocolIcon,
  minimumAmountOut,
  toToken,
  enableRefuel,
}: {
  lang: Lang;
  isLoading: boolean;
  gasPrice: number;
  swapSlippage: number;
  protocolName: string;
  protocolIcon: string;
  minimumAmountOut: number;
  toToken: Token;
  enableRefuel: boolean;
}) => {
  const [showMore, setShowMore] = useState<boolean>(false);
  const [openGasPrice, setOpenGasPrice] = useState<boolean>(false);
  const [openSlippage, setOpenSlippage] = useState<boolean>(false);
  const [openMinimumAmount, setOpenMinimumAmount] = useState<boolean>(false);
  const [openProtocol, setOpenProtocol] = useState<boolean>(false);
  const [openRefuel, setOpenRefuel] = useState<boolean>(false);

  return (
    <>
      <div className="mt-2 flex items-center px-4">
        {showMore ? (
          <>
            <div className="flex flex-col gap-2 items-start justify-center w-full">
              <button
                onClick={() => setShowMore(false)}
                className="text-gray-700 dark:text-gray-300 text-xs"
              >
                <div className="flex items-center gap-1 font-semibold">
                  {lang === "en" ? "See less" : "Voir moins"}{" "}
                  <ChevronUpIcon className="w-4 h-4 text-gray-900 dark:text-gray-100" />
                </div>
              </button>

              <Popover className="relative w-full" as="div">
                <>
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-1">
                      <span
                        onMouseEnter={() => setOpenGasPrice(true)}
                        onMouseLeave={() => setOpenGasPrice(false)}
                        className={`text-gray-700 dark:text-gray-300 text-xs`}
                      >
                        {lang === "en" ? "Network fee" : "Frais de réseau"}{" "}
                      </span>
                    </div>
                    <span
                      className={`text-gray-700 dark:text-gray-300 text-xs flex items-center gap-1`}
                    >
                      <BoltIcon className="w-3 h-3 text-gray-700 dark:text-gray-300" />
                      <span className={`${isLoading && loadingFlashClass}`}>
                        ${gasPrice ? Number(gasPrice.toFixed(3)) : 0}
                      </span>
                    </span>
                  </div>

                  <Transition
                    as="div"
                    show={openGasPrice}
                    enter="transition-opacity duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Popover.Panel
                      static
                      className="absolute max-w-xs z-10 mt-2 flex text-xs p-2 rounded-xl text-gray-700 dark:text-gray-300 dark:bg-gray-800 bg-gray-200 border border-gray-900/10 dark:border-gray-100/10 backdrop-blur-xl"
                      as="div"
                    >
                      {lang === "en"
                        ? "Token payment for transactions on the network."
                        : "Paiement en jeton natif pour les transactions sur le réseau."}
                    </Popover.Panel>
                  </Transition>
                </>
              </Popover>

              <Popover className="relative w-full" as="div">
                <>
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-1">
                      <span
                        onMouseEnter={() => setOpenSlippage(true)}
                        onMouseLeave={() => setOpenSlippage(false)}
                        className={`text-gray-700 dark:text-gray-300 text-xs`}
                      >
                        {lang === "en" ? "Swap slippage" : "Glissement de swap"}{" "}
                      </span>
                    </div>
                    <span
                      className={`text-gray-700 dark:text-gray-300 text-xs ${
                        isLoading && loadingFlashClass
                      }`}
                    >
                      {swapSlippage ? Number(swapSlippage.toFixed(3)) : 0}
                    </span>
                  </div>

                  <Transition
                    as="div"
                    show={openSlippage}
                    enter="transition-opacity duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Popover.Panel
                      static
                      className="absolute max-w-xs z-10 mt-2 flex text-xs p-2 rounded-xl text-gray-700 dark:text-gray-300 dark:bg-gray-800 bg-gray-200 border border-gray-900/10 dark:border-gray-100/10 backdrop-blur-xl"
                      as="div"
                    >
                      {lang === "en"
                        ? "Difference between expected and executed price."
                        : "Différence entre le prix attendu et exécuté."}
                    </Popover.Panel>
                  </Transition>
                </>
              </Popover>

              <Popover className="relative w-full" as="div">
                <>
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-1">
                      <span
                        onMouseEnter={() => setOpenMinimumAmount(true)}
                        onMouseLeave={() => setOpenMinimumAmount(false)}
                        className={`text-gray-700 dark:text-gray-300 text-xs`}
                      >
                        {lang === "en" ? "Minimum Amount" : "Montant minimum"}{" "}
                      </span>
                    </div>
                    <span
                      className={`text-gray-700 dark:text-gray-300 text-xs ${
                        isLoading && loadingFlashClass
                      }`}
                    >
                      {minimumAmountOut
                        ? Number(
                            minimumAmountOut * 10 ** -toToken.decimals
                          ).toFixed(2)
                        : "0"}
                    </span>
                  </div>

                  <Transition
                    as="div"
                    show={openMinimumAmount}
                    enter="transition-opacity duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Popover.Panel
                      static
                      className="absolute max-w-xs z-10 mt-2 flex text-xs p-2 rounded-xl text-gray-700 dark:text-gray-300 dark:bg-gray-800 bg-gray-200 border border-gray-900/10 dark:border-gray-100/10 backdrop-blur-xl"
                      as="div"
                    >
                      {lang === "en"
                        ? "Minimum amount of token to expect."
                        : "Montant minimum de token espéré."}
                    </Popover.Panel>
                  </Transition>
                </>
              </Popover>

              <Popover className="relative w-full" as="div">
                <>
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-1">
                      <span
                        onMouseEnter={() => setOpenProtocol(true)}
                        onMouseLeave={() => setOpenProtocol(false)}
                        className={`text-gray-700 dark:text-gray-300 text-xs`}
                      >
                        {lang === "en" ? "Protocol" : "Protocole"}{" "}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span
                        className={`text-gray-700 dark:text-gray-300 text-xs ${
                          isLoading && loadingFlashClass
                        }`}
                      >
                        {protocolName ?? "Unknown"}
                      </span>
                      {protocolIcon && (
                        <Image
                          className="rounded-full"
                          width={12}
                          height={12}
                          alt={"Protocol logo"}
                          src={protocolIcon}
                        />
                      )}
                    </div>
                  </div>

                  <Transition
                    as="div"
                    show={openProtocol}
                    enter="transition-opacity duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Popover.Panel
                      static
                      className="absolute max-w-xs z-10 mt-2 flex text-xs p-2 rounded-xl text-gray-700 dark:text-gray-300 dark:bg-gray-800 bg-gray-200 border border-gray-900/10 dark:border-gray-100/10 backdrop-blur-xl"
                      as="div"
                    >
                      {lang === "en"
                        ? "Protocol used for the transaction."
                        : "Protocole utilisé pour la transaction."}
                    </Popover.Panel>
                  </Transition>
                </>
              </Popover>

              <Popover className="relative w-full" as="div">
                <>
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-1">
                      <span
                        onMouseEnter={() => setOpenRefuel(true)}
                        onMouseLeave={() => setOpenRefuel(false)}
                        className={`text-gray-700 dark:text-gray-300 text-xs`}
                      >
                        {lang === "en" ? "Refuel" : "Refuel"}{" "}
                      </span>
                    </div>
                    <span
                      className={`text-gray-700 dark:text-gray-300 text-xs ${
                        isLoading && loadingFlashClass
                      }`}
                    >
                      {enableRefuel
                        ? lang === "en"
                          ? "Enabled"
                          : "Activé"
                        : lang === "en"
                        ? "Disabled"
                        : "Désactivé"}
                    </span>
                  </div>

                  <Transition
                    as="div"
                    show={openRefuel}
                    enter="transition-opacity duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Popover.Panel
                      static
                      className="absolute max-w-xs z-10 mt-2 flex text-xs p-2 rounded-xl text-gray-700 dark:text-gray-300 dark:bg-gray-800 bg-gray-200 border border-gray-900/10 dark:border-gray-100/10 backdrop-blur-xl"
                      as="div"
                    >
                      {lang === "en"
                        ? "When you move tokens to a new chain, you may not have the native token for transactions. Refuel allows to request funds or bridge the token from another chain."
                        : "Lorsque vous transférez des jetons vers une nouvelle chaîne, vous pourriez ne pas détenir le jeton natif pour les transactions. Refuel permet de demander des fonds ou transférer le jeton depuis une autre chaîne."}
                    </Popover.Panel>
                  </Transition>
                </>
              </Popover>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center justify-between w-full">
              <button
                onClick={() => setShowMore(true)}
                className="text-gray-700 dark:text-gray-300 text-xs"
              >
                <div className="flex items-center gap-1 font-semibold">
                  {lang === "en" ? "See more" : "Voir plus"}{" "}
                  <ChevronDownIcon className="w-4 h-4 text-gray-900 dark:text-gray-100" />
                </div>
              </button>
              <Popover className="relative" as="div">
                <>
                  <span
                    onMouseEnter={() => setOpenGasPrice(true)}
                    onMouseLeave={() => setOpenGasPrice(false)}
                    className={`text-gray-700 dark:text-gray-300 text-xs flex items-center gap-1`}
                  >
                    <BoltIcon className="w-3 h-3 text-gray-700 dark:text-gray-300" />
                    <span className={`${isLoading && loadingFlashClass}`}>
                      ${gasPrice ? Number(gasPrice.toFixed(3)) : 0}
                    </span>
                  </span>

                  <Transition
                    as="div"
                    show={openGasPrice}
                    enter="transition-opacity duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Popover.Panel
                      static
                      className="absolute max-w-xs z-10 mt-2 flex text-xs p-2 rounded-xl text-gray-700 dark:text-gray-300 dark:bg-gray-800 bg-gray-200 border border-gray-900/10 dark:border-gray-100/10 backdrop-blur-xl"
                      as="div"
                    >
                      {lang === "en"
                        ? "Token payment for transactions on the network."
                        : "Paiement en jeton natif pour les transactions sur le réseau."}
                    </Popover.Panel>
                  </Transition>
                </>
              </Popover>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default SwapData;
