"use client";

import type { Lang } from "@/types/language/lang";
import React, { useContext, useEffect, useState } from "react";
import {
  useAccount,
  useBalance,
  useBlockNumber,
  useWriteContract
} from "wagmi";
import { getContractAddress } from "@/data/web3/addresses";
import { getAbi } from "@/abis/abis";
import FailNotification from "@/app/[lang]/components/modals/notifications/fail";
import { parseEther, formatEther } from "viem";
import "animate.css";
import BlueButton from "@/app/[lang]/components/buttons/blue";
import ChainContext from "@/contexts/chain";

const ApproveButton = ({
  lang,
  amount,
  isMax
}: {
  lang: Lang;
  amount: number;
  isMax: boolean;
}) => {
  const [disabled, setDisabled] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<boolean>(false);

  const { address } = useAccount();
  const { chain } = useContext(ChainContext);

  const { data: blockNumber } = useBlockNumber({
    watch: true,
    chainId: chain.id
  });

  const { data: balance, refetch: refetchBalance } = useBalance({
    chainId: chain.id,
    token: getContractAddress(chain.id, "trotelCoinAddress"),
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
      approveAmount = parseEther(
        Number(formatEther(balance?.value)).toFixed(18)
      );
    } else {
      approveAmount = parseEther(Number(amount).toFixed(18));
    }

    await writeContractAsync({
      args: [getContractAddress(chain.id, "trotelCoinStakingV2"), approveAmount],
      address: getContractAddress(chain.id, "trotelCoinAddress"),
      functionName: "approve",
      chainId: chain.id,
      abi: getAbi(chain.id, "trotelCoin")
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
        display={errorMessage}
        onClose={() => setErrorMessage(false)}
        lang={lang}
        title={lang === "en" ? "Error" : "Erreur"}
        message={
          lang === "en" ? "An error occurred" : "Une erreur s'est produite"
        }
      />
    </>
  );
};

export default ApproveButton;
