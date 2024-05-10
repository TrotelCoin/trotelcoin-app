import trotelCoinShopABI from "@/abi/shop/trotelCoinShop";
import { config } from "@/config/Web3ModalConfig";
import { trotelCoinShop } from "@/data/web3/addresses";
import { readContract } from "@wagmi/core";
import { Address, formatEther } from "viem";
import { polygon } from "wagmi/chains";

export const fetchInventory = async (totalItems: number, address: Address) => {
  let newInventories: {
    name: string;
    price: number;
    discount: number;
    quantity: number;
    emoji: string;
    disabled: boolean;
  }[] = [];

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
      const name: string = userItem?.name;
      const price: number = Number(formatEther(userItem?.price));
      const discount: number = Number(formatEther(userItem?.discount));
      const emoji: string = userItem?.emoji;
      const disabled: boolean = userItem?.disabled;

      const itemFormatted = {
        name: name,
        price: price,
        discount: discount,
        quantity: itemQuantity,
        emoji: emoji,
        disabled: disabled,
      };

      newInventories.push(itemFormatted);
    } catch (error) {
      console.error(error);
      break;
    }
  }

  return newInventories;
};
