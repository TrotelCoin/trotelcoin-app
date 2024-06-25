import { Lang } from "@/types/language/lang";
import React, { useEffect, useState, useContext } from "react";
import Tilt from "react-parallax-tilt";
import * as Popover from "@radix-ui/react-popover";
import type { ItemTypeFinal } from "@/types/items/items";
import BlueButton from "@/app/[lang]/components/buttons/blue";
import Image from "next/image";
import {
  useAccount,
  useBlockNumber,
  useReadContract,
  useTransactionConfirmations,
  useWriteContract
} from "wagmi";
import contracts from "@/data/web3/addresses";
import abis from "@/abis/abis";
import { formatEther, Hash, parseEther, Address } from "viem";
import FailNotification from "@/app/[lang]/components/modals/notifications/fail";
import SuccessNotification from "@/app/[lang]/components/modals/notifications/success";
import { Skeleton } from "@radix-ui/themes";
import TrotelPriceContext from "@/contexts/trotelPrice";
import { roundPrice } from "@/utils/price/roundPrice";
import ChainContext from "@/contexts/chain";

const Item = ({ lang, shopItem }: { lang: Lang; shopItem: ItemTypeFinal }) => {
  const [allowance, setAllowance] = useState<number | null>(null);
  const [needApproval, setNeedApproval] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [approveMessage, setApproveMessage] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<boolean>(false);
  const [buyMessage, setBuyMessage] = useState<boolean>(false);
  const [priceAfterDiscount, setPriceAfterDiscount] = useState<number | null>(
    null
  );
  const [approveConfirmed, setApproveConfirmed] = useState<boolean>(false);
  const [purchaseConfirmed, setPurchaseConfirmed] = useState<boolean>(false);

  const { address } = useAccount();

  const { trotelPrice, showTrotelInUsdc } = useContext(TrotelPriceContext);
  const { chain } = useContext(ChainContext);

  const { data: blockNumber } = useBlockNumber({
    chainId: chain.id,
    watch: true
  });

  const { data: allowanceData, refetch: refetchAllowance } = useReadContract({
    address: contracts[chain.id].trotelCoinAddress,
    abi: abis[chain.id].trotelCoin,
    functionName: "allowance",
    chainId: chain.id,
    account: address,
    args: [address as Address, contracts[chain.id].trotelCoinShop]
  });

  useEffect(() => {
    if (allowanceData) {
      const allowance = Number(formatEther(allowanceData as bigint));
      setAllowance(allowance);
    } else {
      setAllowance(null);
    }
  }, [allowanceData]);

  useEffect(() => {
    if (allowance) {
      const quantity = shopItem.quantity ? shopItem.quantity : 1;
      if (allowance >= shopItem.price * quantity) {
        setNeedApproval(false);
      } else {
        setNeedApproval(true);
      }
    } else {
      setNeedApproval(true);
    }
  }, [allowance, shopItem]);

  const { writeContractAsync: approve, data: approveHash } = useWriteContract({
    mutation: {
      onSuccess: () => {
        setApproveConfirmed(false);
      },
      onMutate: () => {
        setIsLoading(true);
      },
      onError: () => {
        setIsLoading(false);
        setErrorMessage(true);
      }
    }
  });

  const { data: approveConfirmation, refetch: refetchApprovedConfirmation } =
    useTransactionConfirmations({
      chainId: chain.id,
      hash: approveHash as Hash
    });

  useEffect(() => {
    if (
      approveConfirmation &&
      Number(approveConfirmation) > 0 &&
      !approveConfirmed
    ) {
      setApproveMessage(true);
      setIsLoading(false);
      setApproveConfirmed(true);
    }
  }, [approveConfirmation, approveConfirmed]);

  useEffect(() => {
    if (isLoading || !address) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [isLoading, address]);

  const { writeContractAsync: buyItem, data: purchaseHash } = useWriteContract({
    mutation: {
      onSuccess: () => {
        setPurchaseConfirmed(false);
      },
      onMutate: () => {
        setIsLoading(true);
      },
      onError: () => {
        setIsLoading(false);
        setErrorMessage(true);
      }
    }
  });

  const { data: purchaseConfirmation, refetch: refetchPurchaseConfirmation } =
    useTransactionConfirmations({
      chainId: chain.id,
      hash: purchaseHash as Hash
    });

  useEffect(() => {
    if (
      purchaseConfirmation &&
      Number(purchaseConfirmation) > 0 &&
      !purchaseConfirmed
    ) {
      setIsLoading(false);
      setBuyMessage(true);
      setPurchaseConfirmed(true);
    }
  }, [purchaseConfirmation, purchaseConfirmed]);

  useEffect(() => {
    if (
      shopItem &&
      shopItem.discount &&
      shopItem.quantity &&
      shopItem.quantity > 1
    ) {
      const discountAmount = shopItem.discount * (shopItem.quantity - 1);
      const totalAmount = shopItem.price * shopItem.quantity;
      const priceAfterDiscount = totalAmount - discountAmount;

      setPriceAfterDiscount(priceAfterDiscount);
    } else {
      setPriceAfterDiscount(null);
    }
  }, [shopItem]);

  useEffect(() => {
    refetchAllowance();
    refetchApprovedConfirmation();
    refetchPurchaseConfirmation();
  }, [
    blockNumber,
    refetchAllowance,
    refetchApprovedConfirmation,
    refetchPurchaseConfirmation
  ]);

  return (
    <>
      <Tilt
        glareEnable={true}
        tiltMaxAngleX={5}
        tiltMaxAngleY={5}
        glareMaxOpacity={0.15}
        perspective={800}
        className="h-full"
      >
        <Popover.Root>
          <div
            className={`flex h-full w-full items-center justify-center overflow-hidden rounded-xl border border-gray-900/10 bg-white backdrop-blur-xl dark:border-gray-100/10 dark:bg-gray-800`}
          >
            <div className="w-full h-full p-4 sm:p-6">
              <div className="flex w-full h-full items-center justify-between">
                <div className="flex flex-col">
                  <div
                    className={`text-xl font-semibold text-gray-900 dark:text-gray-100`}
                  >
                    <Skeleton loading={!shopItem.name}>
                      {shopItem.name}
                    </Skeleton>
                  </div>

                  <div className="text-xs text-gray-900 dark:text-gray-100">
                    <Skeleton loading={!shopItem.description}>
                      {shopItem.description}
                    </Skeleton>
                  </div>
                </div>
              </div>

              <div className="inline-flex items-center gap-1">
                <Skeleton loading={!shopItem.price || !shopItem.quantity}>
                  <span className="text-xs text-gray-700 dark:text-gray-300">
                    <span className={`${priceAfterDiscount && "line-through"}`}>
                      {showTrotelInUsdc && "$"}
                      {!showTrotelInUsdc &&
                        shopItem.price * (shopItem.quantity as number)}
                      {showTrotelInUsdc &&
                        roundPrice(
                          (trotelPrice as number) *
                            shopItem.price *
                            (shopItem.quantity as number)
                        )}
                    </span>{" "}
                    {priceAfterDiscount && showTrotelInUsdc && (
                      <>
                        <span className="rainbow-text font-semibold">
                          $
                          {roundPrice(
                            priceAfterDiscount * (trotelPrice as number)
                          ) ?? null}
                        </span>
                      </>
                    )}
                    {priceAfterDiscount && !showTrotelInUsdc && (
                      <>
                        <span className="rainbow-text font-semibold">
                          {priceAfterDiscount ?? null}
                        </span>
                      </>
                    )}
                  </span>
                  <div className="block h-3 w-3 dark:hidden">
                    <Image
                      width={16}
                      height={16}
                      className="rounded-full"
                      aria-hidden="true"
                      alt="Token logo"
                      src="/assets/logo/trotelcoin.svg"
                    />
                  </div>
                  <div className="hidden h-3 w-3 dark:block">
                    <Image
                      width={16}
                      height={16}
                      className="rounded-full"
                      aria-hidden="true"
                      alt="Token logo"
                      src="/assets/logo/trotelcoin-dark.jpg"
                    />
                  </div>{" "}
                </Skeleton>
              </div>

              <div className="my-8 flex items-center justify-center">
                <span className="text-4xl">
                  <Skeleton loading={!shopItem.emoji}>
                    {shopItem.emoji}
                  </Skeleton>
                </span>
              </div>

              <div className="flex flex-col">
                {needApproval ? (
                  <BlueButton
                    lang={lang}
                    text={lang === "en" ? "Approve" : "Approuver"}
                    onClick={() => {
                      const amount = parseEther(
                        Number(
                          shopItem.price * (shopItem.quantity ?? 1)
                        ).toFixed(18)
                      );
                      approve({
                        address: contracts[chain.id].trotelCoinAddress,
                        abi: abis[chain.id].trotelCoin,
                        functionName: "approve",
                        chainId: chain.id,
                        args: [contracts[chain.id].trotelCoinShop, amount]
                      });
                    }}
                    isLoading={isLoading}
                    disabled={disabled}
                  />
                ) : (
                  <BlueButton
                    lang={lang}
                    text={lang === "en" ? `Buy` : `Acheter`}
                    onClick={() => {
                      buyItem({
                        address: contracts[chain.id].trotelCoinShop,
                        abi: abis[chain.id].trotelCoinShop,
                        functionName: "buyItem",
                        chainId: chain.id,
                        args: [shopItem.id, shopItem.quantity as number],
                        account: address
                      });
                    }}
                    isLoading={isLoading}
                    disabled={disabled || needApproval}
                  />
                )}
              </div>
            </div>
          </div>
        </Popover.Root>
      </Tilt>

      <SuccessNotification
        lang={lang}
        title={lang === "en" ? "Approved" : "Approuvé"}
        message={
          lang === "en"
            ? "You approved the transaction"
            : "Vous avez approuvé la transaction"
        }
        display={approveMessage}
        onClose={() => setApproveMessage(false)}
      />
      <FailNotification
        lang={lang}
        display={errorMessage}
        onClose={() => setErrorMessage(false)}
        title={lang === "en" ? "Error" : "Erreur"}
        message={
          lang === "en" ? "An error occurred" : "Une erreur s'est produite"
        }
      />
      <SuccessNotification
        lang={lang}
        display={buyMessage}
        onClose={() => setBuyMessage(false)}
        title={lang === "en" ? "Success" : "Succès"}
        message={
          lang === "en" ? "You bought the item" : "Vous avez acheté l'article"
        }
      />
    </>
  );
};

export default Item;
