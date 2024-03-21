import BlueButton from "@/app/[lang]/components/blueButton";
import type { Lang } from "@/types/lang";
import React from "react";
import { Address } from "viem";
import Wallet from "@/app/[lang]/components/header/wallet";
import { Switch } from "@headlessui/react";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const SwapButton = ({
  lang,
  userAddress,
  disabled,
  needApproval,
  isLoading,
  swappingAsync,
  approvalTransactionData,
  setTxHash,
  fromChainId,
  apiReturnData,
  approvingAsync,
  quoteFetched,
  toAmount,
  enableRefuel,
  setEnableRefuel,
}: {
  lang: Lang;
  userAddress: Address;
  disabled: boolean;
  needApproval: boolean;
  isLoading: boolean;
  swappingAsync: any;
  setTxHash: React.Dispatch<React.SetStateAction<string>>;
  fromChainId: number;
  approvalTransactionData: any;
  apiReturnData: any;
  approvingAsync: any;
  quoteFetched: boolean;
  toAmount: number;
  enableRefuel: boolean;
  setEnableRefuel: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <>
      <div className="flex justify-between items-center">
        <span className="text-gray-900 dark:text-gray-100 text-sm font-semibold">
          {lang === "en" ? "Refuel" : "Refuel"}
        </span>
        <Switch
          checked={enableRefuel}
          onChange={() => setEnableRefuel(!enableRefuel)}
          className={classNames(
            enableRefuel ? "bg-blue-500" : "bg-gray-300 dark:bg-gray-700",
            "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none"
          )}
        >
          <span className="sr-only">Use refuel</span>
          <span
            className={classNames(
              enableRefuel ? "translate-x-5" : "translate-x-0",
              "pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
            )}
          >
            <span
              className={classNames(
                enableRefuel
                  ? "opacity-0 duration-100 ease-out"
                  : "opacity-100 duration-200 ease-in",
                "absolute inset-0 flex h-full w-full items-center justify-center transition-opacity"
              )}
              aria-hidden="true"
            >
              <svg
                className="h-3 w-3 text-gray-400"
                fill="none"
                viewBox="0 0 12 12"
              >
                <path
                  d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span
              className={classNames(
                enableRefuel
                  ? "opacity-100 duration-200 ease-in"
                  : "opacity-0 duration-100 ease-out",
                "absolute inset-0 flex h-full w-full items-center justify-center transition-opacity"
              )}
              aria-hidden="true"
            >
              <svg
                className="h-3 w-3 text-blue-500"
                fill="currentColor"
                viewBox="0 0 12 12"
              >
                <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
              </svg>
            </span>
          </span>
        </Switch>
      </div>
      <div className="mt-4">
        {userAddress ? (
          needApproval ? (
            <BlueButton
              isFull={true}
              disabled={disabled || !quoteFetched}
              lang={lang}
              isLoading={isLoading}
              text={lang === "en" ? "Approve" : "Approuver"}
              onClick={async () => {
                await approvingAsync({
                  to: approvalTransactionData.result?.to,
                  data: approvalTransactionData.result?.data,
                  chainId: fromChainId,
                });
              }}
            />
          ) : (
            <BlueButton
              isFull={true}
              disabled={disabled || !quoteFetched || toAmount === 0}
              lang={lang}
              isLoading={isLoading}
              text={lang === "en" ? "Swap" : "Échanger"}
              onClick={async () => {
                const txHash = await swappingAsync({
                  account: userAddress,
                  to: apiReturnData.result.txTarget,
                  value: apiReturnData.result.value,
                  data: apiReturnData.result.txData,
                });

                setTxHash(txHash);
              }}
            />
          )
        ) : (
          <Wallet lang={lang} isFull={true} isCentered={true} />
        )}
      </div>
    </>
  );
};

export default SwapButton;
