"use client";

import { trotelCoinAddress } from "@/data/web3/addresses";
import { Lang } from "@/types/lang";
import React, { useEffect, useState } from "react";
import { polygon } from "viem/chains";
import {
  useAccount,
  useBalance,
  useBlockNumber,
  useWriteContract,
} from "wagmi";
import BlueSimpleButton from "@/app/[lang]/components/blueSimpleButton";
import Wallet from "@/app/[lang]/components/header/wallet";
import { isAddress, parseEther } from "viem";
import trotelcoinV1ABI from "@/abi/trotelCoinV1";
import { loadingFlashClass } from "@/lib/tailwind/loading";
import Fail from "@/app/[lang]/components/modals/fail";
import Success from "@/app/[lang]/components/modals/success";

const Send = ({ params: { lang } }: { params: { lang: Lang } }) => {
  const [amount, setAmount] = useState<number | undefined>(undefined);
  const [isMax, setIsMax] = useState<boolean>(false);
  const [isPaste, setIsPaste] = useState<boolean>(false);
  const [recipient, setRecipient] = useState<string | undefined>(undefined);
  const [disabled, setDisabled] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<boolean>(false);

  const { address } = useAccount();

  const { data: blockNumber } = useBlockNumber({
    watch: true,
    chainId: polygon.id,
  });

  const { data: balance, refetch: refetchBalance } = useBalance({
    chainId: polygon.id,
    token: trotelCoinAddress,
    address: address,
  });

  const { writeContractAsync } = useWriteContract({
    mutation: {
      onSuccess: () => {
        setIsLoading(false);
        setSuccessMessage(true);
      },
      onMutate: () => {
        setIsLoading(true);
      },
      onError: () => {
        setIsLoading(false);
        setErrorMessage(true);
      },
    },
  });

  useEffect(() => {
    if (amount && address) {
      const max = Number(balance?.formatted) * 0.999999;

      if (amount === max) {
        setIsMax(true);
      } else {
        setIsMax(false);
      }
    } else {
      setIsMax(false);
    }
  }, [amount, balance, address]);

  const setMax = () => {
    const max = Number(balance?.formatted) * 0.999999;
    setAmount(max);
  };

  const setPaste = () => {
    if (navigator.clipboard) {
      navigator.clipboard.readText().then((text) => {
        setRecipient(text);
      });
    }
  };

  useEffect(() => {
    if (recipient) {
      if (recipient !== undefined) {
        setIsPaste(true);
      } else {
        setIsPaste(false);
      }
    } else {
      setIsPaste(false);
    }
  }, [recipient]);

  useEffect(() => {
    const disabled =
      !recipient &&
      !amount &&
      recipient === "" &&
      (amount as number) <= 0 &&
      Number(balance?.formatted) <= 0 &&
      !isAddress(recipient as string) &&
      isLoading;

    setDisabled(disabled);
  }, [recipient, amount, balance]);

  useEffect(() => {
    refetchBalance();
  }, [blockNumber, refetchBalance]);

  return (
    <>
      <div className="mx-auto max-w-md flex flex-col gap-4">
        <div className="w-full flex flex-col flex-wrap bg-gray-50 border backdrop-blur-xl divide-y divide-gray-900/10 dark:divide-gray-100/10 border-gray-900/10 dark:border-gray-100/10 rounded-xl py-4 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
          <div className="flex flex-col gap-2 px-4 pb-4">
            <span className="text-2xl font-bold">
              {lang === "en" ? "Send" : "Envoyer"}
            </span>

            <div className="flex items-end gap-2">
              <div className="flex flex-col gap-1">
                <span className="text-sm">{lang === "en" ? "To" : "Vers"}</span>
                <input
                  type="text"
                  className={`[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none bg-transparent text-4xl font-semibold text-gray-900 dark:text-gray-100 w-full px-2 py-0 border-transparent rounded-xl focus:outline-none focus:ring-transparent focus:border-transparent`}
                  value={recipient ?? ""}
                  onChange={(e) => setRecipient(e.target.value)}
                  onWheel={(e) => (e.target as HTMLInputElement).blur()}
                  placeholder={lang === "en" ? "0x..." : "0x..."}
                />
              </div>

              {!isPaste && (
                <>
                  <button
                    onClick={() => setPaste()}
                    className="text-sm text-blue-500 dark:text-blue-300 hover:text-blue-400 dark:hover:text-blue-400 cursor-pointer"
                  >
                    {lang === "en" ? "Paste" : "Coller"}
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="flex items-end gap-2 px-4 pt-4">
            <div className="flex flex-col gap-1">
              <span className="text-sm">
                {lang === "en" ? "Amount" : "Montant"}
              </span>
              <input
                type="number"
                className={`[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none bg-transparent text-4xl font-semibold text-gray-900 dark:text-gray-100 w-full px-2 py-0 border-transparent rounded-xl focus:outline-none focus:ring-transparent focus:border-transparent ${
                  !address && "cursor-not-allowed"
                }`}
                value={amount}
                onChange={(e) => setAmount(parseFloat(e.target.value))}
                onWheel={(e) => (e.target as HTMLInputElement).blur()}
                placeholder={lang === "en" ? "1000" : "1000"}
                disabled={!address}
              />
            </div>

            <span className="font-semibold text-gray-900 dark:text-gray-100">
              TROTEL
            </span>

            {!isMax && Number(balance?.formatted) > 0 && (
              <button
                onClick={() => setMax()}
                className="text-sm text-blue-500 dark:text-blue-300 hover:text-blue-400 dark:hover:text-blue-400 cursor-pointer"
              >
                {lang === "en" ? "Max" : "Max"}
              </button>
            )}
          </div>
        </div>

        <div className="w-full flex flex-col flex-wrap bg-gray-50 border backdrop-blur-xl divide-y divide-gray-900/10 dark:divide-gray-100/10 border-gray-900/10 dark:border-gray-100/10 rounded-xl py-4 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
          <div className="flex flex-col gap-2 px-4">
            <span className="text-2xl font-bold">
              {lang === "en" ? "Statistics" : "Statistiques"}
            </span>

            <div className="flex items-center justify-between">
              {lang === "en" ? "Balance" : "Solde"}
              <span>
                {balance ? (
                  <span>{Number(balance?.formatted).toFixed(2)}</span>
                ) : (
                  <span>0</span>
                )}{" "}
                <span className="font-semibold">TROTEL</span>
              </span>
            </div>
          </div>
        </div>

        {address ? (
          <BlueSimpleButton
            disabled={disabled}
            onClick={async () => {
              const amountDecimals = parseEther(String(amount));

              await writeContractAsync({
                address: trotelCoinAddress,
                abi: trotelcoinV1ABI,
                functionName: "transfer",
                args: [recipient, amountDecimals],
                chainId: polygon.id,
              });
            }}
          >
            <span className={`${isLoading && loadingFlashClass}`}>
              {isLoading
                ? lang === "en"
                  ? "Loading..."
                  : "Chargement..."
                : lang === "en"
                ? "Send"
                : "Envoyer"}
            </span>
          </BlueSimpleButton>
        ) : (
          <Wallet lang={lang} isFull={true} isCentered={true} />
        )}
      </div>

      <Success
        show={successMessage}
        onClose={() => setSuccessMessage(false)}
        lang={lang}
        title={lang === "en" ? "Sent" : "Envoyé"}
        message={
          lang === "en"
            ? "The transaction has been sent to the blockchain"
            : "La transaction a bien été envoyée à la blockchain"
        }
      />
      <Fail
        show={errorMessage}
        onClose={() => setErrorMessage(false)}
        lang={lang}
        title={lang === "en" ? "Error" : "Erreur"}
        message={
          lang === "en" ? "An error occurred" : "Une erreur est survenue"
        }
      />
    </>
  );
};

export default Send;
