import type { Items } from "@/types/inventory/inventory";
import { Lang } from "@/types/lang";
import axios from "axios";
import React, { SetStateAction } from "react";
import { Address } from "viem";

export const useItem = async (
  item: Items,
  address: Address,
  setErrorMessage: React.Dispatch<React.SetStateAction<boolean>>,
  setItemsUsedMessage: React.Dispatch<React.SetStateAction<boolean>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setQuantity: React.Dispatch<React.SetStateAction<number | null>>
) => {
  setIsLoading(true);

  if (address) {
    await axios.post(
      `/api/database/postUserUpdateNumberOfUsedItems?address=${address}&item=${item}`
    );

    setItemsUsedMessage(true);
    setQuantity((prev) => (prev ? prev - 1 : null));
  } else {
    setErrorMessage(true);
  }

  setIsLoading(false);
};

export const translateItemsName = (
  name: Items,
  lang: Lang,
  setDisplayedName: React.Dispatch<SetStateAction<string | null>>
) => {
  switch (name) {
    case "Potion":
      const potion = lang === "en" ? "Potion" : "Potion";
      setDisplayedName(potion);
      break;
    case "Hourglass":
      const hourglass = lang === "en" ? "Hourglass" : "Sablier";
      setDisplayedName(hourglass);
      break;
    case "Clock":
      const clock = lang === "en" ? "Clock" : "Horloge";
      setDisplayedName(clock);
      break;
    case "Closed Lock":
      const closedLock = lang === "en" ? "Closed Lock" : "Serrure";
      setDisplayedName(closedLock);
      break;
    case "Shield":
      const shield = lang === "en" ? "Shield" : "Bouclier";
      setDisplayedName(shield);
      break;
    case "Castle":
      const castle = lang === "en" ? "Castle" : "Château";
      setDisplayedName(castle);
      break;
    case "King":
      const king = lang === "en" ? "King" : "Roi";
      setDisplayedName(king);
      break;
  }
};
