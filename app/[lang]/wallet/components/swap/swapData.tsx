import { Lang } from "@/types/lang";
import React, { useState } from "react";
import { BoltIcon, QuestionMarkCircleIcon } from "@heroicons/react/24/solid";
import { loadingFlashClass } from "@/utils/tailwind/loading";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";
import { Token } from "@/types/web3/token";
import Image from "next/image";
import * as Tooltip from "@radix-ui/react-tooltip";
import { Slippage, Sort } from "@/types/web3/swap";

const SwapData = ({
  lang,
  isLoading,
  gasPrice,
  slippage,
  protocolName,
  protocolIcon,
  minimumAmountOut,
  toToken,
  enableRefuel,
  sort,
  bridgeSlippage,
}: {
  lang: Lang;
  isLoading: boolean;
  gasPrice: number;
  slippage: Slippage;
  protocolName: string;
  protocolIcon: string;
  minimumAmountOut: number;
  toToken: Token;
  enableRefuel: boolean;
  sort: Sort;
  bridgeSlippage: number;
}) => {
  const [showMore, setShowMore] = useState<boolean>(false);

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

              <Tooltip.Provider>
                <Tooltip.Root delayDuration={0}>
                  <div className="relative w-full">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-1">
                        <Tooltip.Trigger asChild>
                          <div className="inline-flex items-center gap-1">
                            <span
                              className={`text-gray-700 dark:text-gray-300 text-xs cursor-help`}
                            >
                              {lang === "en"
                                ? "Network fee"
                                : "Frais de réseau"}{" "}
                            </span>
                            <QuestionMarkCircleIcon className="w-3 h-3 text-gray-700 dark:text-gray-300" />
                          </div>
                        </Tooltip.Trigger>
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

                    <Tooltip.Portal>
                      <Tooltip.Content
                        sideOffset={5}
                        side="left"
                        align="center"
                        className="relative max-w-xs"
                      >
                        <div className="z-10 flex shadow-lg text-xs p-2 rounded-xl text-gray-100 bg-blue-500 backdrop-blur-xl">
                          {lang === "en"
                            ? "Native token fee for transactions on the network"
                            : "Frais en jeton natif pour les transactions sur le réseau"}
                        </div>
                        <Tooltip.Arrow className="fill-blue-500" />
                      </Tooltip.Content>
                    </Tooltip.Portal>
                  </div>
                </Tooltip.Root>
              </Tooltip.Provider>

              <Tooltip.Provider>
                <Tooltip.Root delayDuration={0}>
                  <div className="relative w-full">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-1">
                        <Tooltip.Trigger asChild>
                          <div className="inline-flex items-center gap-1">
                            <span
                              className={`text-gray-700 dark:text-gray-300 text-xs cursor-help`}
                            >
                              {lang === "en"
                                ? "Swap slippage"
                                : "Glissement de swap"}{" "}
                            </span>
                            <QuestionMarkCircleIcon className="w-3 h-3 text-gray-700 dark:text-gray-300" />
                          </div>
                        </Tooltip.Trigger>
                      </div>
                      <span
                        className={`text-gray-700 dark:text-gray-300 text-xs flex items-center gap-1`}
                      >
                        <span className={`${isLoading && loadingFlashClass}`}>
                          {slippage}%
                        </span>
                      </span>
                    </div>

                    <Tooltip.Portal>
                      <Tooltip.Content
                        sideOffset={5}
                        side="left"
                        align="center"
                        className="relative max-w-xs"
                      >
                        <div className="z-10 flex shadow-lg text-xs p-2 rounded-xl text-gray-100 bg-blue-500 backdrop-blur-xl">
                          {lang === "en"
                            ? "Maximum difference between expected and executed price"
                            : "Différence maximale entre le prix attendu et exécuté"}
                        </div>
                        <Tooltip.Arrow className="fill-blue-500" />
                      </Tooltip.Content>
                    </Tooltip.Portal>
                  </div>
                </Tooltip.Root>
              </Tooltip.Provider>

              <Tooltip.Provider>
                <Tooltip.Root delayDuration={0}>
                  <div className="relative w-full">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-1">
                        <Tooltip.Trigger asChild>
                          <div className="inline-flex items-center gap-1">
                            <span
                              className={`text-gray-700 dark:text-gray-300 text-xs cursor-help`}
                            >
                              {lang === "en"
                                ? "Bridge slippage"
                                : "Glissement de pont"}{" "}
                            </span>
                            <QuestionMarkCircleIcon className="w-3 h-3 text-gray-700 dark:text-gray-300" />
                          </div>
                        </Tooltip.Trigger>
                      </div>
                      <span
                        className={`text-gray-700 dark:text-gray-300 text-xs flex items-center gap-1`}
                      >
                        <span className={`${isLoading && loadingFlashClass}`}>
                          {bridgeSlippage
                            ? Number(bridgeSlippage.toFixed(3))
                            : 0}
                          %
                        </span>
                      </span>
                    </div>

                    <Tooltip.Portal>
                      <Tooltip.Content
                        sideOffset={5}
                        side="left"
                        align="center"
                        className="relative max-w-xs"
                      >
                        <div className="z-10 flex shadow-lg text-xs p-2 rounded-xl text-gray-100 bg-blue-500 backdrop-blur-xl">
                          {lang === "en"
                            ? "Maximum difference between expected and executed price"
                            : "Différence maximale entre le prix attendu et exécuté"}
                        </div>
                        <Tooltip.Arrow className="fill-blue-500" />
                      </Tooltip.Content>
                    </Tooltip.Portal>
                  </div>
                </Tooltip.Root>
              </Tooltip.Provider>

              <Tooltip.Provider>
                <Tooltip.Root delayDuration={0}>
                  <div className="relative w-full">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-1">
                        <Tooltip.Trigger asChild>
                          <div className="inline-flex items-center gap-1">
                            <span
                              className={`text-gray-700 dark:text-gray-300 text-xs cursor-help`}
                            >
                              {lang === "en"
                                ? "Minimum Amount"
                                : "Montant minimum"}{" "}
                            </span>
                            <QuestionMarkCircleIcon className="w-3 h-3 text-gray-700 dark:text-gray-300" />
                          </div>
                        </Tooltip.Trigger>
                      </div>
                      <span
                        className={`text-gray-700 dark:text-gray-300 text-xs flex items-center gap-1`}
                      >
                        <span className={`${isLoading && loadingFlashClass}`}>
                          {minimumAmountOut
                            ? Number(
                                minimumAmountOut * 10 ** -toToken.decimals
                              ).toFixed(2)
                            : "0"}
                        </span>
                      </span>
                    </div>

                    <Tooltip.Portal>
                      <Tooltip.Content
                        sideOffset={5}
                        side="left"
                        align="center"
                        className="relative max-w-xs"
                      >
                        <div className="z-10 flex shadow-lg text-xs p-2 rounded-xl text-gray-100 bg-blue-500 backdrop-blur-xl">
                          {lang === "en"
                            ? "Minimum amount of token to expect"
                            : "Montant minimum de token espéré"}
                        </div>
                        <Tooltip.Arrow className="fill-blue-500" />
                      </Tooltip.Content>
                    </Tooltip.Portal>
                  </div>
                </Tooltip.Root>
              </Tooltip.Provider>

              <Tooltip.Provider>
                <Tooltip.Root delayDuration={0}>
                  <div className="relative w-full">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-1">
                        <Tooltip.Trigger asChild>
                          <div className="inline-flex items-center gap-1">
                            <span
                              className={`text-gray-700 dark:text-gray-300 text-xs cursor-help`}
                            >
                              {lang === "en" ? "Protocol" : "Protocole"}{" "}
                            </span>
                            <QuestionMarkCircleIcon className="w-3 h-3 text-gray-700 dark:text-gray-300" />
                          </div>
                        </Tooltip.Trigger>
                      </div>
                      <span
                        className={`text-gray-700 dark:text-gray-300 text-xs flex items-center gap-1`}
                      >
                        <span className={`${isLoading && loadingFlashClass}`}>
                          {protocolName ?? "Unknown"}
                        </span>
                        {protocolIcon && (
                          <>
                            <Image
                              alt="Protocol logo"
                              className="rounded-full"
                              width={12}
                              height={12}
                              src={protocolIcon}
                            />
                          </>
                        )}
                      </span>
                    </div>

                    <Tooltip.Portal>
                      <Tooltip.Content
                        sideOffset={5}
                        side="left"
                        align="center"
                        className="relative max-w-xs"
                      >
                        <div className="z-10 flex shadow-lg text-xs p-2 rounded-xl text-gray-100 bg-blue-500 backdrop-blur-xl">
                          {lang === "en"
                            ? "Protocol used for the transaction"
                            : "Protocole utilisé pour la transaction"}
                        </div>
                        <Tooltip.Arrow className="fill-blue-500" />
                      </Tooltip.Content>
                    </Tooltip.Portal>
                  </div>
                </Tooltip.Root>
              </Tooltip.Provider>

              <Tooltip.Provider>
                <Tooltip.Root delayDuration={0}>
                  <div className="relative w-full">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-1">
                        <Tooltip.Trigger asChild>
                          <div className="inline-flex items-center gap-1">
                            <span
                              className={`text-gray-700 dark:text-gray-300 text-xs cursor-help`}
                            >
                              {lang === "en" ? "Refuel" : "Refuel"}{" "}
                            </span>
                            <QuestionMarkCircleIcon className="w-3 h-3 text-gray-700 dark:text-gray-300" />
                          </div>
                        </Tooltip.Trigger>
                      </div>
                      <span
                        className={`text-gray-700 dark:text-gray-300 text-xs flex items-center gap-1`}
                      >
                        <span className={`${isLoading && loadingFlashClass}`}>
                          {enableRefuel
                            ? lang === "en"
                              ? "Enabled"
                              : "Activé"
                            : lang === "en"
                            ? "Disabled"
                            : "Désactivé"}
                        </span>
                      </span>
                    </div>

                    <Tooltip.Portal>
                      <Tooltip.Content
                        sideOffset={5}
                        side="left"
                        align="center"
                        className="relative max-w-xs"
                      >
                        <div className="z-10 flex shadow-lg text-xs p-2 rounded-xl text-gray-100 bg-blue-500 backdrop-blur-xl">
                          {lang === "en"
                            ? "When you move tokens to a new chain, you may not have the native token for transactions. Refuel allows to request funds or bridge the token from another chain"
                            : "Lorsque vous transférez des jetons vers une nouvelle chaîne, vous pourriez ne pas détenir le jeton natif pour les transactions. Refuel permet de demander des fonds ou transférer le jeton depuis une autre chaîne"}
                        </div>
                        <Tooltip.Arrow className="fill-blue-500" />
                      </Tooltip.Content>
                    </Tooltip.Portal>
                  </div>
                </Tooltip.Root>
              </Tooltip.Provider>

              <Tooltip.Provider>
                <Tooltip.Root delayDuration={0}>
                  <div className="relative w-full">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-1">
                        <Tooltip.Trigger asChild>
                          <div className="inline-flex items-center gap-1">
                            <span
                              className={`text-gray-700 dark:text-gray-300 text-xs cursor-help`}
                            >
                              {lang === "en" ? "Sort by" : "Trier par"}{" "}
                            </span>
                            <QuestionMarkCircleIcon className="w-3 h-3 text-gray-700 dark:text-gray-300" />
                          </div>
                        </Tooltip.Trigger>
                      </div>
                      <span
                        className={`text-gray-700 dark:text-gray-300 text-xs flex items-center gap-1`}
                      >
                        <span className={`${isLoading && loadingFlashClass}`}>
                          {sort.charAt(0).toUpperCase() + sort.slice(1)}
                        </span>
                      </span>
                    </div>

                    <Tooltip.Portal>
                      <Tooltip.Content
                        sideOffset={5}
                        side="left"
                        align="center"
                        className="relative max-w-xs"
                      >
                        <div className="z-10 flex shadow-lg text-xs p-2 rounded-xl text-gray-100 bg-blue-500 backdrop-blur-xl">
                          {lang === "en"
                            ? "Sort the route by the best output amount, the lowest gas price, or fastest time"
                            : "Trier la route par le meilleur montant de sortie, le prix de gaz le plus faible ou le temps le plus rapide"}
                        </div>
                        <Tooltip.Arrow className="fill-blue-500" />
                      </Tooltip.Content>
                    </Tooltip.Portal>
                  </div>
                </Tooltip.Root>
              </Tooltip.Provider>
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
              <Tooltip.Provider>
                <Tooltip.Root delayDuration={0}>
                  <div className="relative">
                    <Tooltip.Trigger asChild>
                      <span
                        className={`text-gray-700 dark:text-gray-300 text-xs flex items-center gap-1 cursor-help`}
                      >
                        <BoltIcon className="w-3 h-3 text-gray-700 dark:text-gray-300" />
                        <span className={`${isLoading && loadingFlashClass}`}>
                          ${gasPrice ? Number(gasPrice.toFixed(3)) : 0}
                        </span>
                      </span>
                    </Tooltip.Trigger>

                    <Tooltip.Portal>
                      <Tooltip.Content
                        sideOffset={5}
                        side="right"
                        align="center"
                        className="relative max-w-xs"
                      >
                        <div className="z-10 flex shadow-lg text-xs p-2 rounded-xl text-gray-100 bg-blue-500 backdrop-blur-xl">
                          {lang === "en"
                            ? "Native token fee for transactions on the network"
                            : "Frais en jeton natif pour les transactions sur le réseau"}
                        </div>
                        <Tooltip.Arrow className="fill-blue-500" />
                      </Tooltip.Content>
                    </Tooltip.Portal>
                  </div>
                </Tooltip.Root>
              </Tooltip.Provider>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default SwapData;
