import { Items } from "@/types/inventory/inventory";
import axios from "axios";
import React from "react";
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
