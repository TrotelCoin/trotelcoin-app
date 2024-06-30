"use client";

import BlueButton from "@/app/[lang]/components/buttons/blue";
import FailNotification from "@/app/[lang]/components/modals/notifications/fail";
import { InventoryItemTypeFinal } from "@/types/inventory/inventory";
import { Lang } from "@/types/language/lang";
import React, { useContext, useEffect, useState } from "react";
import Tilt from "react-parallax-tilt";
import {
  useAccount,
  useBlockNumber,
  useTransactionConfirmations,
  useWriteContract
} from "wagmi";
import { usingItem } from "@/utils/inventory/useItem";
import { Address, Hash } from "viem";
import SuccessNotification from "@/app/[lang]/components/modals/notifications/success";
import StreakContext from "@/contexts/streak";
import WarningConfirmation from "@/app/[lang]/components/modals/confirmation/warning";
import { Skeleton } from "@radix-ui/themes";
import ChainContext from "@/contexts/chain";
import contracts from "@/data/web3/addresses";
import abis from "@/abis/abis";

const InventoryItem = ({
  lang,
  item
}: {
  lang: Lang;
  item: InventoryItemTypeFinal;
}) => {
  const [errorMessage, setErrorMessage] = useState<boolean>(false);
  const [notConnectedMessage, setNotConnectedMessage] =
    useState<boolean>(false);
  const [itemsUsedMessage, setItemsUsedMessage] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hourglassDisabled, setHourglassDisabled] = useState<boolean>(false);
  const [watchDisabled, setWatchDisabled] = useState<boolean>(false);
  const [useItemConfirmation, setUseItemConfirmation] =
    useState<boolean>(false);
  const [useItemConfirmed, setUseItemConfirmed] = useState<boolean>(false);

  const { address } = useAccount();
  const { lostStreakAt } = useContext(StreakContext);
  const { chain } = useContext(ChainContext);

  const { data: blockNumber } = useBlockNumber({
    chainId: chain.id,
    watch: true
  });

  const {
    writeContractAsync,
    isPending,
    data: useItemHash
  } = useWriteContract({
    mutation: {
      onError: () => {
        setErrorMessage(true);
      },
      onMutate() {
        setIsLoading(true);
      },
      onSuccess: () => {
        setIsLoading(true);
      }
    }
  });

  const { data: useItemConfirmationData, refetch: refetchUseItemConfirmation } =
    useTransactionConfirmations({
      hash: useItemHash as Hash,
      chainId: chain.id
    });

  useEffect(() => {
    if (
      useItemConfirmationData &&
      Number(useItemConfirmationData) > 0 &&
      !useItemConfirmed
    ) {
      setUseItemConfirmation(true);
      setUseItemConfirmed(true);
    }
  }, [useItemConfirmationData, useItemConfirmed]);

  useEffect(() => {
    refetchUseItemConfirmation();
  }, [useItemConfirmationData, blockNumber, refetchUseItemConfirmation]);

  useEffect(() => {
    if (item.name === "Hourglass" || item.name === "Watch") {
      if (lostStreakAt) {
        const now = new Date();

        const differenceInMs = now.getTime() - lostStreakAt.getTime();
        const differenceInDays = differenceInMs / (1000 * 60 * 60 * 24);

        if (differenceInDays > 3) {
          setHourglassDisabled(true);
        } else {
          setHourglassDisabled(false);
        }

        if (differenceInDays > 7) {
          setWatchDisabled(true);
        } else {
          setWatchDisabled(false);
        }
      } else {
        setHourglassDisabled(true);
        setWatchDisabled(true);
      }
    } else {
      setHourglassDisabled(false);
      setWatchDisabled(false);
    }
  }, [lostStreakAt, item]);

  const handleItemUse = async () => {
    await writeContractAsync({
      abi: abis[chain.id].trotelCoinShop,
      address: contracts[chain.id].trotelCoinShop,
      chainId: chain.id,
      functionName: "useItem",
      args: [item.id]
    })
      .then(() => {
        setItemsUsedMessage(true);
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage(true);
      });

    setIsLoading(false);
  };

  return (
    <>
      <>
        <Tilt
          glareEnable={true}
          tiltMaxAngleX={5}
          tiltMaxAngleY={5}
          glareMaxOpacity={0.15}
          perspective={800}
          className="h-full"
        >
          <div
            className={`flex h-full w-full items-center justify-center overflow-hidden rounded-xl border border-gray-900/10 bg-white backdrop-blur-xl dark:border-gray-100/10 dark:bg-gray-800`}
          >
            <div className="flex h-full w-full flex-col justify-between p-4 sm:p-6">
              <div className="flex flex-col">
                <div className="flex w-full items-center gap-2">
                  <div
                    className={`flex items-center gap-1 text-xl font-semibold text-black dark:text-white`}
                  >
                    <Skeleton loading={!item.name}>
                      <span>
                        {item.name}{" "}
                        <span className="text-xs text-gray-900 dark:text-gray-100">
                          <>
                            ({Math.max(0, item.quantity)}{" "}
                            {lang === "en" ? "left" : "restant"})
                          </>
                        </span>
                      </span>
                    </Skeleton>{" "}
                  </div>
                </div>
                <Skeleton loading={!item.description}>
                  <div className="text-xs text-gray-900 dark:text-gray-100">
                    {item.description}
                  </div>
                </Skeleton>
              </div>

              <div className="my-8 flex items-center justify-center">
                <Skeleton loading={!item.emoji}>
                  <span className="text-4xl">{item.emoji}</span>
                </Skeleton>
              </div>

              <div className="flex flex-col">
                <BlueButton
                  lang={lang}
                  isLoading={isLoading || isPending}
                  disabled={
                    !address ||
                    isLoading ||
                    item.quantity <= 0 ||
                    hourglassDisabled ||
                    isPending ||
                    watchDisabled
                  }
                  onClick={() => {
                    setUseItemConfirmation(true);
                  }}
                  text={lang === "en" ? "Use" : "Utiliser"}
                />
              </div>
            </div>
          </div>
        </Tilt>

        <WarningConfirmation
          lang={lang}
          show={useItemConfirmation}
          title={lang === "en" ? "Use the item" : "Utiliser l'objet"}
          message={
            lang === "en"
              ? "You will use the selected item. Refund is not possible so make sure that you want to use it"
              : "Vous allez utiliser l'objet sélectionné. Le remboursement n'est pas possible donc soyez sûr de vouloir l'utiliser"
          }
          onClose={() => setUseItemConfirmation(false)}
          onConfirm={handleItemUse}
        />
        <FailNotification
          display={errorMessage}
          onClose={() => setErrorMessage(false)}
          lang={lang}
          title={lang === "en" ? "Error" : "Erreur"}
          message={
            lang === "en"
              ? "An error occured, please try again"
              : "Une erreur est survenue, veuillez réessayer"
          }
        />
        <FailNotification
          display={notConnectedMessage}
          onClose={() => setNotConnectedMessage(false)}
          lang={lang}
          title={lang === "en" ? "Error" : "Erreur"}
          message={
            lang === "en"
              ? "Please connect your wallet"
              : "Veuillez connecter votre portefeuille"
          }
        />
        <SuccessNotification
          display={itemsUsedMessage}
          onClose={() => setItemsUsedMessage(false)}
          lang={lang}
          title={lang === "en" ? "Success" : "Succès"}
          message={
            lang === "en"
              ? "You have used the item"
              : "Vous avez utilisé l'objet"
          }
        />
      </>
    </>
  );
};

export default InventoryItem;
