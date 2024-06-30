import { Lang } from "@/types/language/lang";
import React, { useState } from "react";
import { BoltIcon, QuestionMarkCircleIcon } from "@heroicons/react/24/solid";
import { Skeleton } from "@radix-ui/themes";
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
  bridgeSlippage
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
            <div className="flex w-full flex-col items-start justify-center gap-2">
              <button
                onClick={() => setShowMore(false)}
                className="text-xs text-gray-700 dark:text-gray-300"
              >
                <div className="flex items-center gap-1 font-semibold">
                  {lang === "en" ? "See less" : "Voir moins"}{" "}
                  <ChevronUpIcon className="h-4 w-4 text-gray-900 dark:text-gray-100" />
                </div>
              </button>

              <Tooltip.Provider>
                <Tooltip.Root delayDuration={0}>
                  <div className="relative w-full">
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Tooltip.Trigger asChild>
                          <div className="inline-flex items-center gap-1">
                            <span
                              className={`cursor-help text-xs text-gray-700 dark:text-gray-300`}
                            >
                              {lang === "en"
                                ? "Network fee"
                                : "Frais de réseau"}{" "}
                            </span>
                            <QuestionMarkCircleIcon className="h-3 w-3 text-gray-700 dark:text-gray-300" />
                          </div>
                        </Tooltip.Trigger>
                      </div>
                      <Skeleton loading={isLoading}>
                        <span
                          className={`flex items-center gap-1 text-xs text-gray-700 dark:text-gray-300`}
                        >
                          <BoltIcon className="h-3 w-3 text-gray-700 dark:text-gray-300" />
                          <span>
                            ${gasPrice ? Number(gasPrice.toFixed(3)) : 0}
                          </span>{" "}
                        </span>
                      </Skeleton>
                    </div>

                    <Tooltip.Portal>
                      <Tooltip.Content
                        sideOffset={5}
                        side="left"
                        align="center"
                        className="relative max-w-xs"
                      >
                        <div className="z-10 flex rounded-xl bg-blue-500 p-2 text-xs text-gray-100 shadow-lg backdrop-blur-xl">
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
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Tooltip.Trigger asChild>
                          <div className="inline-flex items-center gap-1">
                            <span
                              className={`cursor-help text-xs text-gray-700 dark:text-gray-300`}
                            >
                              {lang === "en"
                                ? "Swap slippage"
                                : "Glissement de swap"}{" "}
                            </span>
                            <QuestionMarkCircleIcon className="h-3 w-3 text-gray-700 dark:text-gray-300" />
                          </div>
                        </Tooltip.Trigger>
                      </div>
                      <Skeleton loading={isLoading}>
                        <span
                          className={`flex items-center gap-1 text-xs text-gray-700 dark:text-gray-300`}
                        >
                          <span>{slippage}%</span>
                        </span>
                      </Skeleton>
                    </div>

                    <Tooltip.Portal>
                      <Tooltip.Content
                        sideOffset={5}
                        side="left"
                        align="center"
                        className="relative max-w-xs"
                      >
                        <div className="z-10 flex rounded-xl bg-blue-500 p-2 text-xs text-gray-100 shadow-lg backdrop-blur-xl">
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
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Tooltip.Trigger asChild>
                          <div className="inline-flex items-center gap-1">
                            <span
                              className={`cursor-help text-xs text-gray-700 dark:text-gray-300`}
                            >
                              {lang === "en"
                                ? "Bridge slippage"
                                : "Glissement de pont"}{" "}
                            </span>
                            <QuestionMarkCircleIcon className="h-3 w-3 text-gray-700 dark:text-gray-300" />
                          </div>
                        </Tooltip.Trigger>
                      </div>
                      <Skeleton loading={isLoading}>
                        <span
                          className={`flex items-center gap-1 text-xs text-gray-700 dark:text-gray-300`}
                        >
                          <span>
                            {bridgeSlippage
                              ? Number(bridgeSlippage.toFixed(3))
                              : 0}
                            %
                          </span>
                        </span>
                      </Skeleton>
                    </div>

                    <Tooltip.Portal>
                      <Tooltip.Content
                        sideOffset={5}
                        side="left"
                        align="center"
                        className="relative max-w-xs"
                      >
                        <div className="z-10 flex rounded-xl bg-blue-500 p-2 text-xs text-gray-100 shadow-lg backdrop-blur-xl">
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
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Tooltip.Trigger asChild>
                          <div className="inline-flex items-center gap-1">
                            <span
                              className={`cursor-help text-xs text-gray-700 dark:text-gray-300`}
                            >
                              {lang === "en"
                                ? "Minimum Amount"
                                : "Montant minimum"}{" "}
                            </span>
                            <QuestionMarkCircleIcon className="h-3 w-3 text-gray-700 dark:text-gray-300" />
                          </div>
                        </Tooltip.Trigger>
                      </div>
                      <Skeleton loading={isLoading}>
                        <span
                          className={`flex items-center gap-1 text-xs text-gray-700 dark:text-gray-300`}
                        >
                          <span>
                            {minimumAmountOut
                              ? Number(
                                  minimumAmountOut * 10 ** -toToken.decimals
                                ).toFixed(2)
                              : "0"}
                          </span>
                        </span>
                      </Skeleton>
                    </div>

                    <Tooltip.Portal>
                      <Tooltip.Content
                        sideOffset={5}
                        side="left"
                        align="center"
                        className="relative max-w-xs"
                      >
                        <div className="z-10 flex rounded-xl bg-blue-500 p-2 text-xs text-gray-100 shadow-lg backdrop-blur-xl">
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
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Tooltip.Trigger asChild>
                          <div className="inline-flex items-center gap-1">
                            <span
                              className={`cursor-help text-xs text-gray-700 dark:text-gray-300`}
                            >
                              {lang === "en" ? "Protocol" : "Protocole"}{" "}
                            </span>
                            <QuestionMarkCircleIcon className="h-3 w-3 text-gray-700 dark:text-gray-300" />
                          </div>
                        </Tooltip.Trigger>
                      </div>
                      <Skeleton loading={isLoading}>
                        <span
                          className={`flex items-center gap-1 text-xs text-gray-700 dark:text-gray-300`}
                        >
                          <span>{protocolName ?? "Unknown"}</span>

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
                      </Skeleton>
                    </div>

                    <Tooltip.Portal>
                      <Tooltip.Content
                        sideOffset={5}
                        side="left"
                        align="center"
                        className="relative max-w-xs"
                      >
                        <div className="z-10 flex rounded-xl bg-blue-500 p-2 text-xs text-gray-100 shadow-lg backdrop-blur-xl">
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
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Tooltip.Trigger asChild>
                          <div className="inline-flex items-center gap-1">
                            <span
                              className={`cursor-help text-xs text-gray-700 dark:text-gray-300`}
                            >
                              {lang === "en" ? "Refuel" : "Refuel"}{" "}
                            </span>
                            <QuestionMarkCircleIcon className="h-3 w-3 text-gray-700 dark:text-gray-300" />
                          </div>
                        </Tooltip.Trigger>
                      </div>
                      <Skeleton loading={isLoading}>
                        <span
                          className={`flex items-center gap-1 text-xs text-gray-700 dark:text-gray-300`}
                        >
                          <span>
                            {enableRefuel
                              ? lang === "en"
                                ? "Enabled"
                                : "Activé"
                              : lang === "en"
                                ? "Disabled"
                                : "Désactivé"}
                          </span>
                        </span>
                      </Skeleton>
                    </div>

                    <Tooltip.Portal>
                      <Tooltip.Content
                        sideOffset={5}
                        side="left"
                        align="center"
                        className="relative max-w-xs"
                      >
                        <div className="z-10 flex rounded-xl bg-blue-500 p-2 text-xs text-gray-100 shadow-lg backdrop-blur-xl">
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
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Tooltip.Trigger asChild>
                          <div className="inline-flex items-center gap-1">
                            <span
                              className={`cursor-help text-xs text-gray-700 dark:text-gray-300`}
                            >
                              {lang === "en" ? "Sort by" : "Trier par"}{" "}
                            </span>
                            <QuestionMarkCircleIcon className="h-3 w-3 text-gray-700 dark:text-gray-300" />
                          </div>
                        </Tooltip.Trigger>
                      </div>
                      <Skeleton loading={isLoading}>
                        <span
                          className={`flex items-center gap-1 text-xs text-gray-700 dark:text-gray-300`}
                        >
                          <span>
                            {sort.charAt(0).toUpperCase() + sort.slice(1)}
                          </span>
                        </span>
                      </Skeleton>
                    </div>

                    <Tooltip.Portal>
                      <Tooltip.Content
                        sideOffset={5}
                        side="left"
                        align="center"
                        className="relative max-w-xs"
                      >
                        <div className="z-10 flex rounded-xl bg-blue-500 p-2 text-xs text-gray-100 shadow-lg backdrop-blur-xl">
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
            <div className="flex w-full items-center justify-between">
              <button
                onClick={() => setShowMore(true)}
                className="text-xs text-gray-700 dark:text-gray-300"
              >
                <div className="flex items-center gap-1 font-semibold">
                  {lang === "en" ? "See more" : "Voir plus"}{" "}
                  <ChevronDownIcon className="h-4 w-4 text-gray-900 dark:text-gray-100" />
                </div>
              </button>
              <Tooltip.Provider>
                <Tooltip.Root delayDuration={0}>
                  <div className="relative">
                    <Tooltip.Trigger asChild>
                      <Skeleton loading={isLoading}>
                        <span
                          className={`flex cursor-help items-center gap-1 text-xs text-gray-700 dark:text-gray-300`}
                        >
                          <BoltIcon className="h-3 w-3 text-gray-700 dark:text-gray-300" />
                          <span>
                            ${gasPrice ? Number(gasPrice.toFixed(3)) : 0}
                          </span>
                        </span>
                      </Skeleton>
                    </Tooltip.Trigger>

                    <Tooltip.Portal>
                      <Tooltip.Content
                        sideOffset={5}
                        side="right"
                        align="center"
                        className="relative max-w-xs"
                      >
                        <div className="z-10 flex rounded-xl bg-blue-500 p-2 text-xs text-gray-100 shadow-lg backdrop-blur-xl">
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
