"use client";

import type { Lang } from "@/types/language/lang";
import React, { useContext, useEffect, useState } from "react";
import {
  useAccount,
  useBalance,
  useBlockNumber,
  useSwitchChain,
  useWriteContract
} from "wagmi";
import { contracts } from "@/data/web3/addresses";
import trotelCoinABI from "@/abi/polygon/trotelcoin/trotelCoin";
import FailNotification from "@/app/[lang]/components/modals/notifications/fail";
import { parseEther } from "viem";
import "animate.css";
import BlueButton from "@/app/[lang]/components/buttons/blue";
import ChainContext from "@/contexts/chain";

const ApproveButton = ({
  lang,
  amount,
  chainError,
  setChainError,
  isMax
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
  const { chain } = useContext(ChainContext);

  const { data: blockNumber } = useBlockNumber({
    watch: true,
    chainId: chain.id
  });

  const { data: balance, refetch: refetchBalance } = useBalance({
    chainId: chain.id,
    token: contracts[chain.id].trotelCoinAddress,
    address: address
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
      }
    }
  });

  const approve = async (amount: number) => {
    if (!amount || amount <= 0) {
      setErrorMessage(true);
      return;
    }

    let approveAmount;

    if (isMax && balance) {
      approveAmount = parseEther(formatEther(balance?.value).toFixed(18));
    } else {
      approveAmount = parseEther(Number(amount).toFixed(18));
    }

    await writeContractAsync({
      args: [contracts[chain.id].trotelCoinStakingV2, approveAmount],
      address: contracts[chain.id].trotelCoinAddress,
      functionName: "approve",
      chainId: chain.id,
      abi: trotelCoinABI
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
  }, [blockNumber, refetchBalance]);

  return (
    <>
      <BlueButton
        lang={lang}
        onClick={() => approve(amount)}
        disabled={disabled}
        text={lang === "en" ? "Approve" : "Approuver"}
        isLoading={isLoading}
      />

      <FailNotification
        show={errorMessage}
        onClose={() => setErrorMessage(false)}
        lang={lang}
        title={lang === "en" ? "Error" : "Erreur"}
        message={
          lang === "en" ? "An error occurred" : "Une erreur s'est produite"
        }
      />
      <FailNotification
        show={chainError && Boolean(address)}
        onClose={() => {
          switchChain({ chainId: chain.id });
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
