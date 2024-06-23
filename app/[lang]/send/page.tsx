"use client";

import { contracts } from "@/data/web3/addresses";
import { Lang } from "@/types/language/lang";
import React, { useEffect, useState, useContext } from "react";
import {
  useAccount,
  useBalance,
  useBlockNumber,
  useTransactionConfirmations,
  useWriteContract
} from "wagmi";
import BlueSimpleButton from "@/app/[lang]/components/buttons/blueSimple";
import Wallet from "@/app/[lang]/components/header/wallet";
import { Hash, isAddress, parseEther, formatEther } from "viem";
import trotelCoinABI from "@/abi/polygon/trotelcoin/trotelCoin";
import { loadingFlashClass } from "@/style/loading";
import FailNotification from "@/app/[lang]/components/modals/notifications/fail";
import SuccessNotification from "@/app/[lang]/components/modals/notifications/success";
import { CameraIcon } from "@heroicons/react/24/solid";
import ScannerComponent from "./components/scanner";
import { roundPrice } from "@/utils/price/roundPrice";
import TrotelPriceContext from "@/contexts/trotelPrice";
import { Skeleton } from "@radix-ui/themes";
import ChainContext from "@/contexts/chain";
import maxParameter from "@/data/web3/maxParameter";

const Send = ({ params: { lang } }: { params: { lang: Lang } }) => {
  const [amount, setAmount] = useState<number | undefined>(undefined);
  const [isMax, setIsMax] = useState<boolean>(false);
  const [isPaste, setIsPaste] = useState<boolean>(false);
  const [recipient, setRecipient] = useState<string | undefined>(undefined);
  const [disabled, setDisabled] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<boolean>(false);
  const [showScanner, setShowScanner] = useState<boolean>(false);
  const [sendConfirmed, setSendConfirmed] = useState<boolean>(false);

  const { address } = useAccount();
  const { chain } = useContext(ChainContext);
  const { trotelPrice } = useContext(TrotelPriceContext);

  const { data: blockNumber } = useBlockNumber({
    watch: true,
    chainId: chain.id
  });

  const {
    data: balance,
    refetch: refetchBalance,
    isLoading: isLoadingBalance
  } = useBalance({
    chainId: chain.id,
    token: contracts[chain.id].trotelCoinAddress,
    address: address
  });

  const { writeContractAsync, data: sendHash } = useWriteContract({
    mutation: {
      onSuccess: () => {
        setSendConfirmed(false);
      },
      onMutate: () => {
        setIsLoading(true);
      },
      onError: () => {
        setIsLoading(false);
        setErrorMessage(true);
      }
    }
  });

  const { data: sendConfirmation, refetch: refetchSendConfirmation } =
    useTransactionConfirmations({
      chainId: chain.id,
      hash: sendHash as Hash
    });

  useEffect(() => {
    if (sendConfirmation && Number(sendConfirmation) > 0 && !sendConfirmed) {
      setIsLoading(false);
      setSuccessMessage(true);
      setSendConfirmed(true);
    }
  }, [sendConfirmation, sendConfirmed]);

  useEffect(() => {
    if (amount && address) {
      const max = Number(formatEther(balance?.value as bigint)) * maxParameter;

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
    const max = Number(formatEther(balance?.value as bigint)) * maxParameter;
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
  }, [recipient, amount, balance, isLoading]);

  useEffect(() => {
    refetchBalance();
    refetchSendConfirmation();
  }, [blockNumber, refetchBalance, refetchSendConfirmation]);

  return (
    <>
      <div className="mx-auto flex max-w-md flex-col gap-4">
        <div className="flex w-full flex-col flex-wrap divide-y divide-gray-900/10 rounded-xl border border-gray-900/10 bg-white py-4 text-gray-900 backdrop-blur-xl dark:divide-gray-100/10 dark:border-gray-100/10 dark:bg-gray-800 dark:text-gray-100">
          <div className="flex flex-col gap-2 px-4 pb-4">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">
                {lang === "en" ? "Send" : "Envoyer"}
              </span>
              <button
                type="button"
                className="inline-flex rounded-full p-2 text-gray-700 hover:bg-gray-100 focus:outline-none dark:text-gray-300 dark:hover:bg-gray-800"
                onClick={() => {
                  setShowScanner(true);
                }}
              >
                <CameraIcon className="h-5 w-5 text-gray-900 dark:text-gray-100" />
              </button>
            </div>

            <div className="flex items-end gap-2">
              <div className="flex flex-col gap-1">
                <span className="text-sm">{lang === "en" ? "To" : "Vers"}</span>
                <input
                  type="text"
                  className={`w-full rounded-xl border-transparent bg-transparent px-2 py-0 text-4xl font-semibold text-gray-900 [appearance:textfield] focus:border-transparent focus:outline-none focus:ring-transparent dark:text-gray-100 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none`}
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
                    className="cursor-pointer text-sm text-blue-500 hover:text-blue-400 dark:text-blue-300 dark:hover:text-blue-400"
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
                {lang === "en" ? "Amount" : "Montant"}{" "}
                {trotelPrice && (
                  <>• ${roundPrice(trotelPrice * (amount as number))}</>
                )}
              </span>
              <input
                type="number"
                className={`w-full rounded-xl border-transparent bg-transparent px-2 py-0 text-4xl font-semibold text-gray-900 [appearance:textfield] focus:border-transparent focus:outline-none focus:ring-transparent dark:text-gray-100 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none ${
                  !address && "cursor-not-allowed"
                }`}
                value={amount ?? ""}
                onChange={(e) => setAmount(parseFloat(e.target.value))}
                onWheel={(e) => (e.target as HTMLInputElement).blur()}
                placeholder={lang === "en" ? "1000" : "1000"}
                disabled={!address}
              />
            </div>

            <span className="font-semibold text-gray-900 dark:text-gray-100">
              TROTEL
            </span>

            {!isMax && Number(balance?.value as bigint) > 0 && (
              <button
                onClick={() => setMax()}
                className="cursor-pointer text-sm text-blue-500 hover:text-blue-400 dark:text-blue-300 dark:hover:text-blue-400"
              >
                {lang === "en" ? "Max" : "Max"}
              </button>
            )}
          </div>
        </div>

        <div className="flex w-full flex-col flex-wrap divide-y divide-gray-900/10 rounded-xl border border-gray-900/10 bg-white py-4 text-gray-900 backdrop-blur-xl dark:divide-gray-100/10 dark:border-gray-100/10 dark:bg-gray-800 dark:text-gray-100">
          <div className="flex flex-col gap-2 px-4">
            <span className="text-2xl font-bold">
              {lang === "en" ? "Statistics" : "Statistiques"}
            </span>

            <div className="flex items-center justify-between">
              {lang === "en" ? "Balance" : "Solde"}
              <Skeleton loading={isLoadingBalance}>
                <span>
                  <span>
                    {balance
                      ? Number(
                          Number(balance?.formatted).toFixed(0)
                        ).toLocaleString("en-US")
                      : 0}
                  </span>{" "}
                  <span className="font-semibold">TROTEL</span>
                </span>
              </Skeleton>
            </div>
          </div>
        </div>

        {address ? (
          <BlueSimpleButton
            disabled={disabled || isLoading}
            onClick={async () => {
              const amountDecimals = parseEther(Number(amount).toFixed(18));

              await writeContractAsync({
                address: contracts[chain.id].trotelCoinAddress,
                abi: trotelCoinABI,
                functionName: "transfer",
                args: [recipient, amountDecimals],
                chainId: chain.id
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

      {showScanner && (
        <div className="flex h-screen items-center justify-center">
          <ScannerComponent
            lang={lang}
            setRecipient={setRecipient}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
            showScanner={showScanner}
            setShowScanner={setShowScanner}
          />
        </div>
      )}

      <SuccessNotification
        display={successMessage}
        onClose={() => setSuccessMessage(false)}
        lang={lang}
        title={lang === "en" ? "Sent" : "Envoyé"}
        message={
          lang === "en"
            ? "The transaction has been sent to the blockchain"
            : "La transaction a bien été envoyée à la blockchain"
        }
      />
      <FailNotification
        display={errorMessage}
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
