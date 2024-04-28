"use client";

import type { Lang } from "@/types/lang";
import React, { useEffect, useState } from "react";
import {
  useAccount,
  useBalance,
  useBlockNumber,
  useSwitchChain,
  useWriteContract,
} from "wagmi";
import { trotelCoinAddress, trotelCoinStakingV2 } from "@/data/web3/addresses";
import trotelCoinABI from "@/abi/trotelCoin";
import Fail from "@/app/[lang]/components/modals/fail";
import { parseEther } from "viem";
import "animate.css";
import { polygon } from "viem/chains";
import BlueButton from "@/app/[lang]/components/blueButton";

const ApproveButton = ({
  lang,
  amount,
  chainError,
  setChainError,
  isMax,
}: {
  lang: Lang;
  amount: number;
  chainError: boolean;
  setChainError: React.Dispatch<React.SetStateAction<boolean>>;
  isMax: boolean;
}) => {
  const [disabled, setDisabled] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<boolean>(false);

  const { switchChain } = useSwitchChain();
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
        setIsLoading(true);
      },
      onMutate: () => {
        setIsLoading(true);
      },
      onError: () => {
        setErrorMessage(true);
        setIsLoading(false);
      },
    },
  });

  const approve = async (amount: number) => {
    if (!amount || amount <= 0) {
      setErrorMessage(true);
      return;
    }

    let approveAmount;

    if (isMax && balance) {
      approveAmount = parseEther(balance?.formatted);
    } else {
      approveAmount = parseEther(String(amount));
    }

    await writeContractAsync({
      args: [trotelCoinStakingV2, approveAmount],
      address: trotelCoinAddress,
      functionName: "approve",
      chainId: polygon.id,
      abi: trotelCoinABI,
    });
  };

  useEffect(() => {
    if (!amount || isLoading) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [amount, isLoading]);

  useEffect(() => {
    refetchBalance();
  }, [blockNumber]);

  return (
    <>
      <BlueButton
        lang={lang}
        onClick={() => approve(amount)}
        disabled={disabled}
        text={lang === "en" ? "Approve" : "Approuver"}
        isLoading={isLoading}
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
