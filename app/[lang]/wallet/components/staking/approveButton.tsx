"use client";

import { Lang } from "@/types/types";
import React, { useEffect, useState } from "react";
import { useAccount, useWriteContract, useSwitchChain } from "wagmi";
import { trotelCoinAddress, trotelCoinStakingV1 } from "@/data/web3/addresses";
import trotelCoinV1ABI from "@/abi/trotelCoinV1";
import Fail from "@/app/[lang]/components/modals/fail";
import { parseEther } from "viem";
import "animate.css";
import Success from "@/app/[lang]/components/modals/success";
import FailNotification from "@/app/[lang]/components/modals/failNotification";
import { polygon } from "viem/chains";
import BlueButton from "@/app/[lang]/components/blueButton";

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

  const { switchChain } = useSwitchChain();
  const { address } = useAccount();

  const { writeContractAsync, isSuccess, isPending, isError } =
    useWriteContract();

  const approve = async (amount: number) => {
    if (!amount || amount <= 0) {
      setAmountMessage(true);
      return;
    }

    const approveAmount = parseEther(amount.toString());

    try {
      await writeContractAsync({
        args: [trotelCoinStakingV1, approveAmount],
        address: trotelCoinAddress,
        functionName: "approve",
        chainId: polygon.id,
        abi: trotelCoinV1ABI,
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
      <BlueButton
        lang={lang}
        onClick={() => approve(amount)}
        text={lang === "en" ? "Approve" : "Approuver"}
        isLoading={isPending}
      />

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
      <FailNotification
        display={errorMessage}
        lang={lang}
        title={lang === "en" ? "Error" : "Erreur"}
        message={
          lang === "en" ? "An error occurred" : "Une erreur s'est produite"
        }
      />
      <Fail
        show={chainError && Boolean(address)}
        onClose={() => {
          switchChain({ chainId: polygon.id });
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
