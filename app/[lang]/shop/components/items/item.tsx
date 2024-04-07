import { Lang } from "@/types/lang";
import React, { useEffect, useState } from "react";
import Tilt from "react-parallax-tilt";
import * as Popover from "@radix-ui/react-popover";
import { InformationCircleIcon } from "@heroicons/react/24/solid";
import type { ItemTypeFinal } from "@/types/shop/shop";
import BlueButton from "@/app/[lang]/components/blueButton";
import Image from "next/image";
import {
  useAccount,
  useBlockNumber,
  useChainId,
  useReadContract,
  useSwitchChain,
  useTransactionConfirmations,
  useWriteContract,
} from "wagmi";
import { trotelCoinAddress, trotelCoinShop } from "@/data/web3/addresses";
import { polygon } from "viem/chains";
import trotelCoinShopABI from "@/abi/trotelCoinShop";
import trotelCoinABI from "@/abi/trotelCoin";
import { formatEther, Hash, parseEther } from "viem";
import Fail from "@/app/[lang]/components/modals/fail";
import Success from "@/app/[lang]/components/modals/success";

const Item = ({ lang, shopItem }: { lang: Lang; shopItem: ItemTypeFinal }) => {
  const [allowance, setAllowance] = useState<number | null>(null);
  const [needApproval, setNeedApproval] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [approveMessage, setApproveMessage] = useState<boolean>(false);
  const [approved, setApproved] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<boolean>(false);
  const [buyMessage, setBuyMessage] = useState<boolean>(false);
  const [priceAfterDiscount, setPriceAfterDiscount] = useState<number | null>(
    null
  );
  const [approveConfirmed, setApproveConfirmed] = useState<boolean>(false);
  const [purchaseConfirmed, setPurchaseConfirmed] = useState<boolean>(false);

  const { address } = useAccount();
  const chainId = useChainId();
  const { switchChainAsync } = useSwitchChain();

  useEffect(() => {
    if (chainId !== polygon.id) {
      setDisabled(true);
      const switchChain = async () => {
        await switchChainAsync({
          chainId: polygon.id,
        });
      };

      switchChain();
    } else {
      setDisabled(false);
    }
  }, [chainId]);

  const { data: blockNumber } = useBlockNumber({
    chainId: polygon.id,
    watch: true,
  });

  const { data: allowanceData, refetch: refetchAllowance } = useReadContract({
    address: trotelCoinAddress,
    abi: trotelCoinABI,
    functionName: "allowance",
    chainId: polygon.id,
    account: address,
    args: [address, trotelCoinShop],
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
    refetchAllowance();
  }, [address, blockNumber]);

  useEffect(() => {
    if (allowance) {
      if (allowance >= shopItem.price) {
        setNeedApproval(false);
      } else {
        setNeedApproval(true);
      }
    } else {
      setNeedApproval(true);
    }
  }, [allowance]);

  const { writeContractAsync: approve, data: approveHash } = useWriteContract({
    mutation: {
      onSuccess: () => {
        setApproveConfirmed(false);
      },
      onMutate: () => {
        setIsLoading(true);
      },
      onError: () => {
        setApproved(false);
        setIsLoading(false);
        setErrorMessage(true);
      },
    },
  });

  const { data: approveConfirmation, refetch: refetchApprovedConfirmation } =
    useTransactionConfirmations({
      chainId: polygon.id,
      hash: approveHash as Hash,
    });

  useEffect(() => {
    if (
      approveConfirmation &&
      Number(approveConfirmation) > 0 &&
      !approveConfirmed
    ) {
      setApproveMessage(true);
      setApproved(true);
      setIsLoading(false);
      setApproveConfirmed(true);
    }
  }, [approveConfirmation]);

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
      },
    },
  });

  const { data: purchaseConfirmation, refetch: refetchPurchaseConfirmation } =
    useTransactionConfirmations({
      chainId: polygon.id,
      hash: purchaseHash as Hash,
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
  }, [purchaseConfirmation]);

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
    refetchApprovedConfirmation();
    refetchPurchaseConfirmation();
  }, [blockNumber]);

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
            className={`overflow-hidden rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-900/10 dark:border-gray-100/10 backdrop-blur-xl`}
          >
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center justify-between">
                <div
                  className={`font-semibold text-gray-900 dark:text-gray-100 text-2xl`}
                >
                  {shopItem.name}
                </div>
                <Popover.Trigger asChild>
                  <InformationCircleIcon className="h-6 w-6 cursor-pointer text-gray-900 dark:text-gray-100 hover:text-gray-700 dark:hover:text-gray-300" />
                </Popover.Trigger>
                <Popover.Portal>
                  <Popover.Content
                    className="focus:outline-none"
                    side="bottom"
                    align="center"
                    sideOffset={5}
                  >
                    <div className="max-w-xs text-xs text-gray-100 text-center flex shadow-lg p-2 flex-col bg-blue-500 backdrop-blur-xl rounded-xl">
                      {shopItem.description}
                    </div>
                    <Popover.Arrow className="fill-blue-500" />
                  </Popover.Content>
                </Popover.Portal>
              </div>
              <div className="inline-flex items-center gap-1">
                <span className="text-gray-700 dark:text-gray-300 text-sm">
                  <span className={`${priceAfterDiscount && "line-through"}`}>
                    {shopItem.price * (shopItem.quantity as number)}
                  </span>{" "}
                  {priceAfterDiscount && (
                    <>
                      <span className="rainbow-text font-semibold">
                        {priceAfterDiscount ?? null}
                      </span>
                    </>
                  )}
                </span>
                <div className="block dark:hidden w-3 h-3">
                  <Image
                    width={16}
                    height={16}
                    className="rounded-full"
                    aria-hidden="true"
                    alt="Token logo"
                    src="/assets/logo/trotelcoin.svg"
                  />
                </div>
                <div className="hidden dark:block w-3 h-3">
                  <Image
                    width={16}
                    height={16}
                    className="rounded-full"
                    aria-hidden="true"
                    alt="Token logo"
                    src="/assets/logo/trotelcoin-dark.jpg"
                  />
                </div>
              </div>
              <div className="flex items-center justify-center my-8">
                <span className="text-6xl">{shopItem.emoji}</span>
              </div>
              <div className="flex flex-col">
                {needApproval ? (
                  <BlueButton
                    lang={lang}
                    text={lang === "en" ? "Approve" : "Approuver"}
                    onClick={() => {
                      const amount = parseEther(String(shopItem.price));
                      approve({
                        address: trotelCoinAddress,
                        abi: trotelCoinABI,
                        functionName: "approve",
                        chainId: polygon.id,
                        args: [trotelCoinShop, amount],
                      });
                    }}
                    isLoading={isLoading || approved}
                    disabled={disabled}
                  />
                ) : (
                  <BlueButton
                    lang={lang}
                    text={lang === "en" ? `Buy` : `Acheter`}
                    onClick={() => {
                      buyItem({
                        address: trotelCoinShop,
                        abi: trotelCoinShopABI,
                        functionName: "buyItem",
                        chainId: polygon.id,
                        args: [shopItem.id, shopItem.quantity],
                        account: address,
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

      <Success
        lang={lang}
        title={lang === "en" ? "Approved" : "Approuvé"}
        message={
          lang === "en"
            ? "You approved the transaction"
            : "Vous avez approuvé la transaction"
        }
        show={approveMessage}
        onClose={() => setApproveMessage(false)}
      />
      <Fail
        lang={lang}
        show={errorMessage}
        onClose={() => setErrorMessage(false)}
        title={lang === "en" ? "Error" : "Erreur"}
        message={
          lang === "en" ? "An error occurred" : "Une erreur s'est produite"
        }
      />
      <Success
        lang={lang}
        show={buyMessage}
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
