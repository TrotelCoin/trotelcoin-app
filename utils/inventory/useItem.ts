import { ItemName } from "@/types/items/items";
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
        case "Potion":
          await axios.post(`/api/user/items/use-potion`, {
            wallet: address
          });
          break;
        case "Castle":
          await axios.post(`/api/user/items/use-shields`, {
            wallet: address,
            shieldName: item
          });
          break;
        case "Watch":
          await axios.post(`/api/user/items/use-watch`, {
            wallet: address
          });
          break;
        case "Clock":
          await axios.post(`/api/user/items/use-clock`, {
            wallet: address
          });
          break;
        case "Closed Lock":
          await axios.post(`/api/user/items/use-shields`, {
            wallet: address,
            shieldName: item
          });
          break;
        case "Hourglass":
          await axios.post(`/api/user/items/use-hourglass`, {
            wallet: address
          });
          break;
        case "King":
          await axios.post(`/api/user/items/use-shields`, {
            wallet: address,
            shieldName: item
          });
          break;
        case "Shield":
          await axios.post(`/api/user/items/use-shields`, {
            wallet: address,
            shieldName: item
          });
          break;
        case "x2":
          await axios.post(`/api/user/items/use-multipliers`, {
            wallet: address,
            multipliersName: item
          });
          break;
        case "x5":
          await axios.post(`/api/user/items/use-multipliers`, {
            wallet: address,
            multipliersName: item
          });
          break;
        case "x10":
          await axios.post(`/api/user/items/use-multipliers`, {
            wallet: address,
            multipliersName: item
          });
          break;
        case "x25":
          await axios.post(`/api/user/items/use-multipliers`, {
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
