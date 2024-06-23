import { Lang } from "@/types/language/lang";
import React, { useEffect, useState, useContext } from "react";
import Tilt from "react-parallax-tilt";
import * as Popover from "@radix-ui/react-popover";
import { InformationCircleIcon } from "@heroicons/react/24/solid";
import type { ItemTypeFinal } from "@/types/items/items";
import BlueButton from "@/app/[lang]/components/buttons/blue";
import Image from "next/image";
import {
  useAccount,
  useBlockNumber,
  useChainId,
  useReadContract,
  useSwitchChain,
  useTransactionConfirmations,
  useWriteContract
} from "wagmi";
import { contracts } from "@/data/web3/addresses";
import trotelCoinShopABI from "@/abi/polygon/shop/trotelCoinShop";
import trotelCoinABI from "@/abi/polygon/trotelcoin/trotelCoin";
import { formatEther, Hash, parseEther } from "viem";
import Fail from "@/app/[lang]/components/modals/fail";
import Success from "@/app/[lang]/components/modals/success";
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
  const chainId = useChainId();
  const { switchChainAsync } = useSwitchChain();

  const { trotelPrice, showTrotelInUsdc } = useContext(TrotelPriceContext);
  const { chain } = useContext(ChainContext);

  useEffect(() => {
    if (chainId !== chain.id) {
      setDisabled(true);
      const switchChain = async () => {
        await switchChainAsync({
          chainId: chain.id
        });
      };

      switchChain();
    } else {
      setDisabled(false);
    }
  }, [chainId, switchChainAsync, chain]);

  const { data: blockNumber } = useBlockNumber({
    chainId: chain.id,
    watch: true
  });

  const { data: allowanceData, refetch: refetchAllowance } = useReadContract({
    address: contracts[chain.id].trotelCoinAddress,
    abi: trotelCoinABI,
    functionName: "allowance",
    chainId: chain.id,
    account: address,
    args: [address, contracts[chain.id].trotelCoinShop]
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
            <div className="w-full px-4 py-5 sm:p-6">
              <div className="flex w-full items-center justify-between">
                <div
                  className={`text-2xl font-semibold text-gray-900 dark:text-gray-100`}
                >
                  <Skeleton loading={!shopItem.name}>{shopItem.name}</Skeleton>
                </div>
                <Popover.Trigger asChild>
                  <InformationCircleIcon className="h-6 w-6 cursor-pointer text-gray-900 hover:text-gray-700 dark:text-gray-100 dark:hover:text-gray-300" />
                </Popover.Trigger>
                <Popover.Portal>
                  <Popover.Content
                    className="focus:outline-none"
                    side="bottom"
                    align="center"
                    sideOffset={5}
                  >
                    <div className="flex max-w-xs flex-col rounded-xl bg-blue-500 p-2 text-center text-xs text-gray-100 shadow-lg backdrop-blur-xl">
                      <Skeleton loading={!shopItem.description}>
                        {shopItem.description}
                      </Skeleton>
                    </div>
                    <Popover.Arrow className="fill-blue-500" />
                  </Popover.Content>
                </Popover.Portal>
              </div>
              <div className="inline-flex items-center gap-1">
                <Skeleton loading={!shopItem.price || !shopItem.quantity}>
                  <span className="text-sm text-gray-700 dark:text-gray-300">
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
                <span className="text-6xl">
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
                        String(shopItem.price * (shopItem.quantity ?? 1))
                      );
                      approve({
                        address: contracts[chain.id].trotelCoinAddress,
                        abi: trotelCoinABI,
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
                        abi: trotelCoinShopABI,
                        functionName: "buyItem",
                        chainId: chain.id,
                        args: [shopItem.id, shopItem.quantity],
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
