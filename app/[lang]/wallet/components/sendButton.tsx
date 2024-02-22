"use client";

import { Lang } from "@/types/types";
import React, { use, useEffect, useState } from "react";
import Fail from "@/app/[lang]/components/fail";
import Success from "@/app/[lang]/components/success";
import {
  useTransferNativeToken,
  useContractWrite,
  useContract,
} from "@thirdweb-dev/react";
import { Address, parseEther } from "viem";
import { trotelCoinAddress } from "@/data/web3/addresses";
import trotelCoinV1ABI from "@/abi/trotelCoinV1";
import { usdcAddress } from "@/data/web3/addresses";
import usdcABI from "@/abi/usdc";
import { BigNumber } from "ethers";

const SendButton = ({
  lang,
  token,
  balance,
  amount,
  receiverAddress,
}: {
  lang: Lang;
  token: string;
  balance: number;
  amount: number;
  receiverAddress: Address;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [balanceError, setBalanceError] = useState<boolean>(false);
  const [noTokenMessage, setNoTokenMessage] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<boolean>(false);

  const { contract: trotelContract } = useContract(
    trotelCoinAddress,
    trotelCoinV1ABI
  );

  const { contract: usdcContract } = useContract(usdcAddress, usdcABI);

  const {
    mutateAsync: mutateAsyncMatic,
    isSuccess: isSuccessMatic,
    isError: isErrorMatic,
  } = useTransferNativeToken();

  const {
    mutateAsync: mutateAsyncTrotel,
    isSuccess: isSuccessTrotel,
    isError: isErrorTrotel,
  } = useContractWrite(trotelContract, "transfer");

  const {
    mutateAsync: mutateAsyncUsdc,
    isSuccess: isSuccessUsdc,
    isError: isErrorUsdc,
  } = useContractWrite(usdcContract, "transfer");

  const send = async (amount: number) => {
    setIsLoading(true);
    if (balance < amount) {
      setBalanceError(true);
      setIsLoading(false);
      return;
    }

    if (token === "MATIC") {
      await mutateAsyncMatic({
        to: receiverAddress,
        amount: amount,
      });
    } else if (token === "TROTEL") {
      const trotelAmount = BigNumber.from(
        parseEther(amount.toString()).toString()
      );
      await mutateAsyncTrotel({
        args: [receiverAddress, trotelAmount],
      });
    } else if (token === "USDC") {
      const usdcAmount = BigNumber.from(
        parseEther(amount.toString()).toString()
      );
      await mutateAsyncUsdc({
        args: [receiverAddress, usdcAmount],
      });
    } else {
      setNoTokenMessage(true);
      return;
    }

    setIsLoading(false);
  };

  useEffect(() => {
    if (isSuccessMatic || isSuccessTrotel || isSuccessUsdc) {
      setSuccessMessage(true);
    }
  }, [isSuccessMatic, isSuccessTrotel, isSuccessUsdc]);

  useEffect(() => {
    if (isErrorMatic || isErrorTrotel || isErrorUsdc) {
      setErrorMessage(true);
      setIsLoading(false);
    }
  }, [isErrorMatic, isErrorTrotel, isErrorUsdc]);

  return (
    <>
      <button
        onClick={() => send(amount)}
        className="w-full bg-blue-500 hover:bg-blue-400 dark:bg-blue-300 dark:hover:bg-blue-400 focus:border-blue-500 dark:focus:border-blue-300 text-sm px-6 py-2 text-gray-100 dark:text-gray-900 rounded-lg font-semibold"
      >
        {isLoading ? (
          <span className="animate__animated animate__slower animate__flash animate__infinite">
            {lang === "en" ? "Loading..." : "Chargement..."}
          </span>
        ) : (
          <>{lang === "en" ? "Send" : "Envoyer"}</>
        )}
      </button>
      <Success
        show={successMessage}
        lang={lang}
        onClose={() => setSuccessMessage(false)}
        title={lang === "en" ? "Success" : "Succès"}
        message={
          lang === "en"
            ? "Your transaction was successful"
            : "Ta transaction a été un succès"
        }
      />
      <Fail
        show={balanceError}
        onClose={() => setBalanceError(false)}
        lang={lang}
        title={lang === "en" ? "Error" : " Erreur"}
        message={
          lang === "en"
            ? "Your balance is not enough"
            : "Ton solde n'est pas suffisant"
        }
      />
      <Fail
        show={noTokenMessage}
        onClose={() => setNoTokenMessage(false)}
        lang={lang}
        title={lang === "en" ? "Error" : "Erreur"}
        message={
          lang === "en"
            ? "You can't send this token"
            : "Tu ne peux pas envoyer ce token"
        }
      />
      <Fail
        show={errorMessage}
        onClose={() => setErrorMessage(false)}
        lang={lang}
        title={lang === "en" ? "Error" : "Erreur"}
        message={
          lang === "en" ? "Your transaction failed" : "Ta transaction a échoué"
        }
      />
    </>
  );
};

export default SendButton;
