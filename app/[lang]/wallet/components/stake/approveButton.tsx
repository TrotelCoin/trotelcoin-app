"use client";

import type { Lang } from "@/types/lang";
import React, { useEffect, useState } from "react";
import { useAccount, useWriteContract, useSwitchChain } from "wagmi";
import { trotelCoinAddress, trotelCoinStakingV1 } from "@/data/web3/addresses";
import trotelCoinV1ABI from "@/abi/trotelCoinV1";
import Fail from "@/app/[lang]/components/modals/fail";
import { parseEther } from "viem";
import "animate.css";
import Success from "@/app/[lang]/components/modals/success";
import { polygon } from "viem/chains";
import BlueButton from "@/app/[lang]/components/blueButton";

const ApproveButton = ({
  lang,
  amount,
  chainError,
  setChainError,
  allowance,
  setDisabled,
  approvingAsync,
  approveMessage,
  setApproveMessage,
  errorApproveMessage,
  setErrorApproveMessage,
  isApproved,
  isPendingApproving,
}: {
  lang: Lang;
  amount: number;
  chainError: boolean;
  setChainError: React.Dispatch<React.SetStateAction<boolean>>;
  allowance: number;
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  approvingAsync: any;
  approveMessage: boolean;
  setApproveMessage: React.Dispatch<React.SetStateAction<boolean>>;
  errorApproveMessage: boolean;
  setErrorApproveMessage: React.Dispatch<React.SetStateAction<boolean>>;
  isPendingApproving: boolean;
  isApproved: boolean;
}) => {
  const [disabledApprove, setDisabledApprove] = useState<boolean>(true);

  const { switchChain } = useSwitchChain();
  const { address } = useAccount();

  const approve = async (amount: number) => {
    if (!amount || amount <= 0) {
      return;
    }

    const approveAmount = parseEther(amount.toString());

    try {
      await approvingAsync({
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
    if (amount && address && allowance < amount) {
      setDisabledApprove(false);
    } else {
      setDisabledApprove(true);
    }
  }, [amount, address, allowance]);

  useEffect(() => {
    if (chainError && isPendingApproving) {
      setDisabled(true);
    }
  }, [chainError, isPendingApproving]);

  return (
    <>
      <BlueButton
        lang={lang}
        onClick={() => approve(amount)}
        disabled={disabledApprove}
        text={lang === "en" ? "Approve" : "Approuver"}
        isLoading={isPendingApproving || isApproved}
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
        show={errorApproveMessage}
        onClose={() => setErrorApproveMessage(false)}
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
