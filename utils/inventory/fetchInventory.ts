import trotelCoinShopABI from "@/abi/polygon/shop/trotelCoinShop";
import { config } from "@/config/Web3ModalConfig";
import { contracts } from "@/data/web3/addresses";
import { readContract } from "@wagmi/core";
import { Address, Chain, formatEther } from "viem";

export const fetchInventory = async (
  totalItems: number,
  address: Address,
  chain: Chain
) => {
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
        address: contracts[chain.id].trotelCoinShop,
        abi: trotelCoinShopABI,
        functionName: "getItemQuantity",
        chainId: chain.id,
        account: address,
        args: [address, item]
      })) as bigint;

      const userItem = (await readContract(config, {
        address: contracts[chain.id].trotelCoinShop,
        abi: trotelCoinShopABI,
        functionName: "getItemInformations",
        chainId: chain.id,
        account: address,
        args: [item]
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
        disabled: disabled
      };

      newInventories.push(itemFormatted);
    } catch (error) {
      console.error(error);
      break;
    }
  }

  return newInventories;
};
