"use client";

import React, { useEffect, useState } from "react";
import ComingSoon from "@/app/[lang]/components/comingSoon/comingSoon";
import { Lang } from "@/types/lang";
import { useAccount, useBlockNumber, useReadContract } from "wagmi";
import { polygon } from "viem/chains";
import { trotelCoinShopV1 } from "@/data/web3/addresses";
import trotelCoinShopV1ABI from "@/abi/trotelCoinShopV1";
import { readContract } from "@wagmi/core";
import { config } from "@/config/Web3ModalConfig";
import { formatEther } from "viem";
import type { InventoryItemType } from "@/types/inventory/inventory";

const Inventory = ({ params: { lang } }: { params: { lang: Lang } }) => {
  const [totalItems, setTotalItems] = useState<number | null>(null);
  const [inventories, setInventories] = useState<any[] | null>(null);

  const { address } = useAccount();

  const { data: blockNumber } = useBlockNumber({
    chainId: polygon.id,
    watch: true,
  });

  const { data: totalItemsData, refetch: refetchTotalItems } = useReadContract({
    address: trotelCoinShopV1,
    abi: trotelCoinShopV1ABI,
    functionName: "totalItems",
    chainId: polygon.id,
    account: address,
  });

  useEffect(() => {
    if (totalItemsData) {
      const totalItems = Number(totalItemsData);
      setTotalItems(totalItems);
    } else {
      setTotalItems(null);
    }
  }, [totalItemsData]);

  useEffect(() => {
    if (blockNumber) {
      refetchTotalItems();
    }
  }, [blockNumber]);

  useEffect(() => {
    if (totalItems && address) {
      const fetchInventory = async () => {
        let inventories = [];

        for (let item = 0; item < totalItems; item++) {
          try {
            const userItem = (await readContract(config, {
              address: trotelCoinShopV1,
              abi: trotelCoinShopV1ABI,
              functionName: "inventories",
              chainId: polygon.id,
              account: address,
              args: [address, item],
            })) as InventoryItemType;

            const itemInfo = userItem[0];
            const itemQuantity = Number(userItem[1]);
            const price = Number(formatEther(itemInfo.price));
            const discount = Number(itemInfo.discount);
            const itemFormatted = {
              name: itemInfo.name,
              price: price,
              discount: discount,
              quantity: itemQuantity,
            };

            inventories.push(itemFormatted);
          } catch (error) {
            break;
          }
        }

        return inventories;
      };

      fetchInventory().then((inventories) => setInventories(inventories));
    } else {
      setInventories(null);
    }
  }, [totalItems, address]);

  return (
    <>
      <div className="mx-auto max-w-md flex flex-col gap-4">
        <span className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          {lang === "en" ? "Inventory" : "Inventaire"}
        </span>

        <ComingSoon lang={lang} />
      </div>
    </>
  );
};

export default Inventory;
