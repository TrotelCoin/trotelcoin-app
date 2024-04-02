"use client";

import BlueButton from "@/app/[lang]/components/blueButton";
import Fail from "@/app/[lang]/components/modals/fail";
import { fetcher, refreshIntervalTime } from "@/lib/axios/fetcher";
import { InventoryItemTypeFinal, Items } from "@/types/inventory/inventory";
import { Lang } from "@/types/lang";
import React, { useContext, useEffect, useState } from "react";
import Tilt from "react-parallax-tilt";
import useSWR from "swr";
import { useAccount } from "wagmi";
import { translateItemsName, useItem } from "@/lib/inventory/inventory";
import { Address } from "viem";
import Success from "@/app/[lang]/components/modals/success";
import StreakContext from "@/app/[lang]/contexts/streakContext";

const InventoryItem = ({
  lang,
  item,
}: {
  lang: Lang;
  item: InventoryItemTypeFinal;
}) => {
  const [emoji, setEmoji] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number | null>(null);
  const [numberOfUsedItems, setNumberOfUsedItems] = useState<number | null>(
    null
  );
  const [errorMessage, setErrorMessage] = useState<boolean>(false);
  const [notConnectedMessage, setNotConnectedMessage] =
    useState<boolean>(false);
  const [itemsUsedMessage, setItemsUsedMessage] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [displayedName, setDisplayedName] = useState<string | null>(null);
  const [hourglassDisabled, setHourglassDisabled] = useState<boolean>(false);

  const { address } = useAccount();
  const { lostStreakAt } = useContext(StreakContext);

  const { data: numberOfUsedItemsData } = useSWR(
    address && item
      ? `/api/database/getUserNumberOfUsedItems?address=${address}&item=${item.name}`
      : null,
    fetcher,
    {
      refreshInterval: refreshIntervalTime,
      revalidateIfStale: true,
      revalidateOnMount: true,
      revalidateOnReconnect: true,
    }
  );

  useEffect(() => {
    if (numberOfUsedItemsData) {
      setNumberOfUsedItems(numberOfUsedItemsData);
    } else {
      setNumberOfUsedItems(null);
    }
  }, [numberOfUsedItemsData]);

  useEffect(() => {
    if (item && numberOfUsedItems) {
      setQuantity(item.quantity - numberOfUsedItems);
    } else {
      setQuantity(item.quantity);
    }
  }, [item, numberOfUsedItems]);

  useEffect(() => {
    if (item) {
      switch (item.name) {
        case "Potion":
          setEmoji("🧪");
          break;
        case "Hourglass":
          setEmoji("⏳");
          break;
        case "Clock":
          setEmoji("⏰");
          break;
        case "Closed Lock":
          setEmoji("🔒");
          break;
        case "Shield":
          setEmoji("🛡️");
          break;
        case "Castle":
          setEmoji("🏰");
          break;
        case "King":
          setEmoji("🤴");
          break;
      }
    }
  }, [item]);

  useEffect(() => {
    if (item) {
      translateItemsName(item.name, lang, setDisplayedName);
    }
  }, [item, lang]);

  useEffect(() => {
    if (item.name === "Hourglass") {
      if (lostStreakAt) {
        const now = new Date();

        const differenceInMs = now.getTime() - lostStreakAt.getTime();
        const differenceInDays = differenceInMs / (1000 * 60 * 60 * 24);

        console.log("diff", differenceInDays);

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
      <Tilt
        glareEnable={true}
        tiltMaxAngleX={5}
        tiltMaxAngleY={5}
        glareMaxOpacity={0.15}
        perspective={800}
      >
        <div
          className={`overflow-hidden rounded-xl bg-gray-50 dark:bg-gray-800 rainbow-border backdrop-blur-xl`}
        >
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center justify-between">
              <div className={`font-semibold rainbow-text text-2xl`}>
                {displayedName}
              </div>
              <div className="w-6 h-6 rounded-full bg-blue-500 text-gray-100 flex justify-center items-center text-sm">
                {quantity}
              </div>
            </div>
            <div className="flex items-center justify-center my-8">
              <span className="text-6xl">{emoji}</span>
            </div>
            <div className="flex flex-col">
              <BlueButton
                lang={lang}
                isLoading={isLoading}
                disabled={
                  !address || isLoading || quantity === 0 || hourglassDisabled
                }
                onClick={() => {
                  useItem(
                    item.name,
                    address as Address,
                    setErrorMessage,
                    setItemsUsedMessage,
                    setIsLoading,
                    setQuantity
                  );
                }}
                text={lang === "en" ? "Use" : "Utiliser"}
              />
            </div>
          </div>
        </div>
      </Tilt>

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
          lang === "en" ? "You have used the item" : "Vous avez utilisé l'objet"
        }
      />
    </>
  );
};

export default InventoryItem;
