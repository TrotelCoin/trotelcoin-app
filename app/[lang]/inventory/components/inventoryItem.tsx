"use client";

import BlueButton from "@/app/[lang]/components/buttons/blue";
import Fail from "@/app/[lang]/components/modals/fail";
import { fetcher, refreshIntervalTime } from "@/utils/axios/fetcher";
import { InventoryItemTypeFinal } from "@/types/inventory/inventory";
import { Lang } from "@/types/language/lang";
import React, { useContext, useEffect, useState } from "react";
import Tilt from "react-parallax-tilt";
import useSWR from "swr";
import { useAccount } from "wagmi";
import { usingItem } from "@/utils/inventory/useItem";
import { Address } from "viem";
import Success from "@/app/[lang]/components/modals/success";
import StreakContext from "@/contexts/streak";
import WarningConfirmation from "@/app/[lang]/components/modals/confirmation/warning";
import { Skeleton } from "@radix-ui/themes";

const InventoryItem = ({
  lang,
  item
}: {
  lang: Lang;
  item: InventoryItemTypeFinal;
}) => {
  const [quantity, setQuantity] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<boolean>(false);
  const [notConnectedMessage, setNotConnectedMessage] =
    useState<boolean>(false);
  const [itemsUsedMessage, setItemsUsedMessage] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hourglassDisabled, setHourglassDisabled] = useState<boolean>(false);
  const [useItemConfirmation, setUseItemConfirmation] =
    useState<boolean>(false);

  const { address } = useAccount();
  const { lostStreakAt } = useContext(StreakContext);

  const { data: numberOfUsedItemsData } = useSWR(
    address && item
      ? `/api/user/items/count?address=${address}&item=${item.name}`
      : null,
    fetcher,
    {
      refreshInterval: refreshIntervalTime,
      revalidateIfStale: true,
      revalidateOnMount: true,
      revalidateOnReconnect: true
    }
  );

  useEffect(() => {
    if (item && numberOfUsedItemsData) {
      const numberOfUsedItems = numberOfUsedItemsData;
      setQuantity(item.quantity - numberOfUsedItems);
    } else {
      setQuantity(item.quantity);
    }
  }, [item, numberOfUsedItemsData]);

  useEffect(() => {
    if (item.name === "Hourglass") {
      if (lostStreakAt) {
        const now = new Date();

        const differenceInMs = now.getTime() - lostStreakAt.getTime();
        const differenceInDays = differenceInMs / (1000 * 60 * 60 * 24);

        if (differenceInDays > 3) {
          setHourglassDisabled(true);
        } else {
          setHourglassDisabled(false);
        }
      } else {
        setHourglassDisabled(true);
      }
    } else {
      setHourglassDisabled(false);
    }
  }, [lostStreakAt, item]);

  return (
    <>
      {quantity && quantity > 0 ? (
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
              <div className="w-full px-4 py-5 sm:p-6">
                <div className="flex w-full items-center justify-between">
                  <div className={`rainbow-text text-2xl font-semibold`}>
                    <Skeleton loading={!item.name}>{item.name}</Skeleton>
                  </div>
                  <Skeleton loading={!quantity}>
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-sm text-gray-100">
                      {quantity}
                    </div>
                  </Skeleton>
                </div>
                <div className="my-8 flex items-center justify-center">
                  <span className="text-6xl">
                    <Skeleton loading={!item.emoji}>{item.emoji}</Skeleton>
                  </span>
                </div>
                <div className="flex flex-col">
                  <BlueButton
                    lang={lang}
                    isLoading={isLoading}
                    disabled={
                      !address ||
                      isLoading ||
                      quantity === 0 ||
                      hourglassDisabled
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
            onConfirm={() => {
              usingItem(
                item.name,
                address as Address,
                setErrorMessage,
                setItemsUsedMessage,
                setIsLoading,
                setQuantity
              );
            }}
          />
          <Fail
            show={errorMessage}
            onClose={() => setErrorMessage(false)}
            lang={lang}
            title={lang === "en" ? "Error" : "Erreur"}
            message={
              lang === "en"
                ? "An error occured, please try again"
                : "Une erreur est survenue, veuillez réessayer"
            }
          />
          <Fail
            show={notConnectedMessage}
            onClose={() => setNotConnectedMessage(false)}
            lang={lang}
            title={lang === "en" ? "Error" : "Erreur"}
            message={
              lang === "en"
                ? "Please connect your wallet"
                : "Veuillez connecter votre portefeuille"
            }
          />
          <Success
            show={itemsUsedMessage}
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
      ) : null}
    </>
  );
};

export default InventoryItem;
