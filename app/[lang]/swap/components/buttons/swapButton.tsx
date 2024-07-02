import BlueButton from "@/app/[lang]/components/buttons/blue";
import type { Lang } from "@/types/language/lang";
import React from "react";
import { Address, parseUnits } from "viem";
import Wallet from "@/app/[lang]/components/header/wallet";
import type { Chain } from "viem";
import { Token } from "@/types/web3/token";
import { getAbi } from "@/abis/abis";
import { allowanceABI } from "@/abis/abis";
import { nativeAddress } from "@/data/web3/tokens";

const SwapButton = ({
  lang,
  userAddress,
  disabled,
  needApproval,
  isLoading,
  swappingAsync,
  setTxHash,
  fromChain,
  apiReturnData,
  approvingAsync,
  isPendingApproving,
  isApproved,
  quoteFetched,
  allowanceTarget,
  fromAmount,
  fromToken
}: {
  lang: Lang;
  userAddress: Address;
  disabled: boolean;
  needApproval: boolean;
  isLoading: boolean;
  swappingAsync: any;
  setTxHash: React.Dispatch<React.SetStateAction<string>>;
  fromChain: Chain;
  apiReturnData: any;
  approvingAsync: any;
  isPendingApproving: boolean;
  isApproved: boolean;
  quoteFetched: boolean;
  allowanceTarget: Address;
  fromAmount: number;
  fromToken: Token;
}) => {
  return (
    <>
      {userAddress ? (
        needApproval && fromToken.address !== nativeAddress ? (
          <BlueButton
            isFull={true}
            disabled={disabled}
            lang={lang}
            isLoading={isLoading || isPendingApproving || isApproved}
            text={
              quoteFetched
                ? lang === "en"
                  ? "Approve"
                  : "Approuver"
                : lang === "en"
                  ? "No quote"
                  : "Pas de devis"
            }
            onClick={async () => {
              await approvingAsync({
                address: fromToken.address,
                abi: allowanceABI,
                functionName: "approve",
                chainId: fromChain.id,
                args: [
                  allowanceTarget,
                  parseUnits(
                    Number(fromAmount).toFixed(fromToken.decimals),
                    fromToken.decimals
                  )
                ]
              }).catch((error: any) => console.error(error));
            }}
          />
        ) : (
          <BlueButton
            isFull={true}
            disabled={disabled}
            lang={lang}
            isLoading={isLoading}
            text={
              quoteFetched
                ? lang === "en"
                  ? "Swap"
                  : "Échanger"
                : lang === "en"
                  ? "No quote"
                  : "Pas de devis"
            }
            onClick={async () => {
              const txHash = await swappingAsync({
                account: userAddress,
                to: apiReturnData?.result?.txTarget,
                value: apiReturnData?.result?.value,
                data: apiReturnData?.result?.txData
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
