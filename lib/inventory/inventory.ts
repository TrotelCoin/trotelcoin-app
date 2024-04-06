import trotelCoinShopABI from "@/abi/trotelCoinShop";
import { config } from "@/config/Web3ModalConfig";
import { trotelCoinShop } from "@/data/web3/addresses";
import { Lang } from "@/types/lang";
import { readContract } from "@wagmi/core";
import axios from "axios";
import React, { SetStateAction } from "react";
import { Address, formatEther } from "viem";
import { polygon } from "wagmi/chains";

export const useItem = async (
  item: string,
  address: Address,
  setErrorMessage: React.Dispatch<React.SetStateAction<boolean>>,
  setItemsUsedMessage: React.Dispatch<React.SetStateAction<boolean>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setQuantity: React.Dispatch<React.SetStateAction<number | null>>
) => {
  setIsLoading(true);

  let errorEncountered: boolean = false;

  if (address && item) {
    switch (item) {
      case "Potion":
        await axios
          .post(`/api/items/usePotion?wallet=${address}`)
          .catch((error) => {
            console.error(error);
            setErrorMessage(true);
            setIsLoading(false);
            errorEncountered = true;
          });
        break;
      case "Castle":
        await axios
          .post(`/api/items/useShields?wallet=${address}&shieldName=${item}`)
          .catch((error) => {
            console.error(error);
            setErrorMessage(true);
            setIsLoading(false);
            errorEncountered = true;
          });
        break;
      case "Clock":
        await axios
          .post(`/api/items/useClock?wallet=${address}`)
          .catch((error) => {
            console.error(error);
            setErrorMessage(true);
            setIsLoading(false);
            errorEncountered = true;
          });
        break;
      case "Closed Lock":
        await axios
          .post(`/api/items/useShields?wallet=${address}&shieldName=${item}`)
          .catch((error) => {
            console.error(error);
            setErrorMessage(true);
            setIsLoading(false);
            errorEncountered = true;
          });
        break;
      case "Hourglass":
        await axios
          .post(`/api/items/useHourglass?wallet=${address}`)
          .catch((error) => {
            console.error(error);
            setErrorMessage(true);
            setIsLoading(false);
            errorEncountered = true;
          });
        break;
      case "King":
        await axios
          .post(`/api/items/useShields?wallet=${address}&shieldName=${item}`)
          .catch((error) => {
            console.error(error);
            setErrorMessage(true);
            setIsLoading(false);
            errorEncountered = true;
          });
        break;
      case "Shield":
        await axios
          .post(`/api/items/useShields?wallet=${address}&shieldName=${item}`)
          .catch((error) => {
            console.error(error);
            setErrorMessage(true);
            setIsLoading(false);
            errorEncountered = true;
          });
        break;
      default:
        break;
    }

    await axios
      .post(
        `/api/database/postUserUpdateNumberOfUsedItems?address=${address}&item=${item}`
      )
      .catch((error) => {
        console.error(error);
        setErrorMessage(true);
        setIsLoading(false);
      });

    if (!errorEncountered) {
      setItemsUsedMessage(true);
      setQuantity((prev) => (prev ? prev - 1 : null));
    } else {
      setErrorMessage(true);
    }
  } else {
    setErrorMessage(true);
  }

  setIsLoading(false);
};

export const translateItemsName = (
  name: string,
  lang: Lang,
  setDisplayedName: React.Dispatch<SetStateAction<string | null>>,
  quantity: number
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
    default:
      setDisplayedName(name);
      break;
  }
};

export const fetchInventory = async (totalItems: number, address: Address) => {
  let newInventories = [];

  for (let item = 1; item <= totalItems; item++) {
    try {
      const userQuantity = (await readContract(config, {
        address: trotelCoinShop,
        abi: trotelCoinShopABI,
        functionName: "getItemQuantity",
        chainId: polygon.id,
        account: address,
        args: [address, item],
      })) as bigint;

      const userItem = (await readContract(config, {
        address: trotelCoinShop,
        abi: trotelCoinShopABI,
        functionName: "getItemInformations",
        chainId: polygon.id,
        account: address,
        args: [item],
      })) as any;

      const itemQuantity = Number(userQuantity);
      const name = userItem?.name;
      const price = Number(formatEther(userItem?.price));
      const discount = Number(formatEther(userItem?.discount));

      const itemFormatted = {
        name: name,
        price: price,
        discount: discount,
        quantity: itemQuantity,
      };

      console.log("items", itemFormatted);

      newInventories.push(itemFormatted);
    } catch (error) {
      console.error(error);
      break;
    }
  }

  return newInventories;
};
