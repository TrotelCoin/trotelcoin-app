import BlueButton from "@/app/[lang]/components/blueButton";
import type { Lang } from "@/types/lang";
import React from "react";
import { Address } from "viem";
import Wallet from "@/app/[lang]/components/header/wallet";

const SwapButton = ({
  lang,
  userAddress,
  disabled,
  needApproval,
  isLoading,
  swappingAsync,
  approvalTransactionData,
  setTxHash,
  fromChainId,
  apiReturnData,
  approvingAsync,
  isPendingApproving,
}: {
  lang: Lang;
  userAddress: Address;
  disabled: boolean;
  needApproval: boolean;
  isLoading: boolean;
  swappingAsync: any;
  setTxHash: React.Dispatch<React.SetStateAction<string>>;
  fromChainId: number;
  approvalTransactionData: any;
  apiReturnData: any;
  approvingAsync: any;
  isPendingApproving: boolean;
}) => {
  return (
    <>
      {userAddress ? (
        needApproval || isPendingApproving ? (
          <BlueButton
            isFull={true}
            disabled={disabled}
            lang={lang}
            isLoading={isLoading || isPendingApproving}
            text={lang === "en" ? "Approve" : "Approuver"}
            onClick={async () => {
              await approvingAsync({
                to: approvalTransactionData.result?.to,
                data: approvalTransactionData.result?.data,
                chainId: fromChainId,
              });
            }}
          />
        ) : (
          <BlueButton
            isFull={true}
            disabled={disabled}
            lang={lang}
            isLoading={isLoading}
            text={lang === "en" ? "Swap" : "Échanger"}
            onClick={async () => {
              const txHash = await swappingAsync({
                account: userAddress,
                to: apiReturnData.result.txTarget,
                value: apiReturnData.result.value,
                data: apiReturnData.result.txData,
              });

              setTxHash(txHash);
            }}
          />
        )
      ) : (
        <Wallet lang={lang} isFull={true} isCentered={true} />
      )}
    </>
  );
};

export default SwapButton;
