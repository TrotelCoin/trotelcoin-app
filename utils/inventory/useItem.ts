import type { ItemName } from "@/types/items/items";
import axios from "axios";
import { Address } from "viem";

export const usingItem = async (
  item: string,
  address: Address,
  setErrorMessage: React.Dispatch<React.SetStateAction<boolean>>,
  setItemsUsedMessage: React.Dispatch<React.SetStateAction<boolean>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setIsLoading(true);

  if (address && item) {
    try {
      switch (item as ItemName) {
        case "Life Potion":
          await axios.post(`/api/user/items/use-life-potion`, {
            wallet: address
          });
          break;
        case "1h Shield":
          await axios.post(`/api/user/items/use-life-shields`, {
            wallet: address,
            shieldName: item
          });
          break;
        case "1w Lost Backup":
          await axios.post(`/api/user/items/use-1w-lost-backup`, {
            wallet: address
          });
          break;
        case "Ultimate Lost Backup":
          await axios.post(`/api/user/items/use-ultimate-lost-backup`, {
            wallet: address
          });
          break;
        case "72h Shield":
          await axios.post(`/api/user/items/use-life-shields`, {
            wallet: address,
            shieldName: item
          });
          break;
        case "72h Lost Backup":
          await axios.post(`/api/user/items/use-72h-lost-backup`, {
            wallet: address
          });
          break;
        case "1w Shield":
          await axios.post(`/api/user/items/use-life-shields`, {
            wallet: address,
            shieldName: item
          });
          break;
        case "24h Shield":
          await axios.post(`/api/user/items/use-life-shields`, {
            wallet: address,
            shieldName: item
          });
          break;
        case "x2":
          await axios.post(`/api/user/items/use-reward-multipliers`, {
            wallet: address,
            multipliersName: item
          });
          break;
        case "x5":
          await axios.post(`/api/user/items/use-reward-multipliers`, {
            wallet: address,
            multipliersName: item
          });
          break;
        case "x10":
          await axios.post(`/api/user/items/use-reward-multipliers`, {
            wallet: address,
            multipliersName: item
          });
          break;
        case "x25":
          await axios.post(`/api/user/items/use-reward-multipliers`, {
            wallet: address,
            multipliersName: item
          });
          break;
        default:
          break;
      }

      await axios.post(`/api/user/item/number-of-used`, {
        address: address,
        item: item
      });

      setItemsUsedMessage(true);
    } catch (error) {
      console.error(error);
      setErrorMessage(true);
    } finally {
      setIsLoading(false);
    }
  } else {
    setErrorMessage(true);
  }

  setIsLoading(false);
};
