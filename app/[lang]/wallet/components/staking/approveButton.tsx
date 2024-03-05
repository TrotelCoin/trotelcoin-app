"use client";

import { Lang } from "@/types/types";
import React, { useEffect, useState } from "react";
import {
  useAddress,
  useContract,
  useContractWrite,
  useSwitchChain,
} from "@thirdweb-dev/react";
import { trotelCoinAddress, trotelCoinStakingV1 } from "@/data/web3/addresses";
import trotelCoinV1ABI from "@/abi/trotelCoinV1";
import Fail from "@/app/[lang]/components/modals/fail";
import { parseEther } from "viem";
import "animate.css";
import Success from "@/app/[lang]/components/modals/success";
import { BigNumber } from "ethers";
import { polygon } from "viem/chains";

const ApproveButton = ({
  lang,
  amount,
  chainError,
  setChainError,
}: {
  lang: Lang;
  amount: number;
  chainError: boolean;
  setChainError: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [amountMessage, setAmountMessage] = useState<boolean>(false);
  const [approveMessage, setApproveMessage] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<boolean>(false);

  const { contract } = useContract(trotelCoinAddress, trotelCoinV1ABI);

  const switchChain = useSwitchChain();
  const address = useAddress();

  const { mutateAsync, isSuccess, isLoading, isError } = useContractWrite(
    contract,
    "approve"
  );

  const approve = async (amount: number) => {
    if (!amount || amount <= 0) {
      setAmountMessage(true);
      return;
    }

    const approveAmount = BigNumber.from(
      parseEther(amount.toString()).toString()
    );

    try {
      await mutateAsync({
        args: [trotelCoinStakingV1, approveAmount],
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setApproveMessage(true);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      setErrorMessage(true);
    }
  }, [isError]);

  return (
    <>
      <button
        onClick={() => approve(amount)}
        className="!bg-blue-500 hover:!bg-blue-400 focus-visible:!outline-blue-500 dark:focus-visible:!outline-blue-300 !text-sm !px-6 !py-2 !text-gray-100 !rounded-xl !font-semibold"
        style={{}}
      >
        {isLoading ? (
          <span className="animate__animated animate__slower animate__flash animate__infinite">
            {lang === "en" ? "Loading..." : "Chargement..."}
          </span>
        ) : (
          <>{lang === "en" ? "Approve" : "Approuver"}</>
        )}
      </button>
      <Success
        show={approveMessage}
        onClose={() => setApproveMessage(false)}
        lang={lang}
        title={lang === "en" ? "Success" : "Succès"}
        message={
          lang === "en"
            ? "You approved the amount"
            : "Vous avez approuvé le montant"
        }
      />
      <Fail
        show={amountMessage}
        onClose={() => setAmountMessage(false)}
        lang={lang}
        title={lang === "en" ? "Error" : "Erreur"}
        message={
          lang === "en"
            ? "The amount must be positive"
            : "Le montant doit être positif"
        }
      />
      <Fail
        show={errorMessage}
        onClose={() => setErrorMessage(false)}
        lang={lang}
        title={lang === "en" ? "Error" : "Erreur"}
        message={
          lang === "en" ? "An error occurred" : "Une erreur s'est produite"
        }
      />
      <Fail
        show={chainError && Boolean(address)}
        onClose={() => {
          switchChain(polygon.id);
          setChainError(false);
        }}
        lang={lang}
        title={lang === "en" ? "Error" : "Erreur"}
        message={
          lang === "en"
            ? "You are on the wrong network"
            : "Vous êtes sur le mauvais réseau"
        }
      />
    </>
  );
};

export default ApproveButton;
