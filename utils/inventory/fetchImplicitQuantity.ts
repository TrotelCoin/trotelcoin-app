import axios from "axios";
import { InventoryItemTypeFinal } from "@/types/inventory/inventory";
import { Address } from "viem";

export const fetchImplicitQuantity = (
  address: Address,
  inventories: InventoryItemTypeFinal[]
) => {
  inventories.forEach(async (item) => {
    const numberOfUsedItem = await axios
      .get(`/api/user/items/count?address=${address}&item=${item.name}`, {
        headers: {
          method: "GET",
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
      .then((res) => res.data)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.error(error);
      });

    item.implicitQuantity = item.quantity - numberOfUsedItem;

    return item;
  });
};
