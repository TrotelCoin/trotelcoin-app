"use client";

import { Lang } from "@/types/types";
import React, { useEffect, useState } from "react";
import { Web3Button, useContract, useContractWrite } from "@thirdweb-dev/react";
import { trotelCoinAddress, trotelCoinStakingV1 } from "@/data/web3/addresses";
import trotelCoinABI from "@/abi/trotelCoin";
import Fail from "@/app/[lang]/components/fail";
import { parseEther } from "viem";
import "animate.css";
import Success from "@/app/[lang]/components/success";

const ApproveButton = ({ lang, amount }: { lang: Lang; amount: number }) => {
  const [amountMessage, setAmountMessage] = useState<boolean>(false);
  const [approveMessage, setApproveMessage] = useState<boolean>(false);

  const { contract } = useContract(trotelCoinAddress, trotelCoinABI);

  const { mutateAsync, isSuccess, isLoading } = useContractWrite(
    contract,
    "approve"
  );

  const approve = (amount: number) => {
    if (!amount || amount <= 0) {
      setAmountMessage(true);
      return;
    }

    const approveAmount = parseEther(amount.toString());

    mutateAsync({
      args: [trotelCoinStakingV1, approveAmount],
    });
  };

  useEffect(() => {
    if (isSuccess) {
      setApproveMessage(true);
    }
  }, [isSuccess]);

  return (
    <>
      <Web3Button
        contractAddress={trotelCoinAddress}
        action={() => approve(amount)}
        className="!bg-blue-500 hover:!bg-blue-400 dark:!bg-blue-300 dark:hover:!bg-blue-400 focus:!border-blue-500 dark:focus:!border-blue-300 !text-sm !px-6 !py-2 !text-gray-100 dark:!text-gray-900 !rounded-lg !font-semibold"
        style={{}}
      >
        {isLoading ? (
          <span className="animate__animated animate__slower animate__flash animate__infinite">
            {lang === "en" ? "Loading..." : "Chargement..."}
          </span>
        ) : (
          <>{lang === "en" ? "Approve" : "Approuver"}</>
        )}
      </Web3Button>
      <Success
        show={approveMessage}
        onClose={() => setApproveMessage(false)}
        lang={lang}
        title={lang === "en" ? "Success" : "Succès"}
        message={
          lang === "en"
            ? "You approved the amount"
            : "Tu as approuvé le montant"
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
    </>
  );
};

export default ApproveButton;
