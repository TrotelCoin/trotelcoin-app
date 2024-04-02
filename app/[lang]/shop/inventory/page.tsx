"use client";

import React, { useContext, useEffect, useState } from "react";
import { Lang } from "@/types/lang";
import { useAccount, useBlockNumber, useReadContract } from "wagmi";
import { polygon } from "viem/chains";
import { trotelCoinShopV1 } from "@/data/web3/addresses";
import trotelCoinShopV1ABI from "@/abi/trotelCoinShopV1";
import { readContract } from "@wagmi/core";
import { config } from "@/config/Web3ModalConfig";
import { formatEther } from "viem";
import type {
  InventoryItemType,
  InventoryItemTypeFinal,
  Items,
} from "@/types/inventory/inventory";
import InventoryItem from "@/app/[lang]/shop/components/inventory/inventoryItem";
import { loadingFlashClass } from "@/lib/tailwind/loading";
import Wallet from "@/app/[lang]/components/header/wallet";
import UserContext from "@/app/[lang]/contexts/userContext";
import useSWR from "swr";
import { fetcher, refreshIntervalTime } from "@/lib/axios/fetcher";

const Inventory = ({ params: { lang } }: { params: { lang: Lang } }) => {
  const [totalItems, setTotalItems] = useState<number | null>(null);
  const [inventories, setInventories] = useState<
    InventoryItemTypeFinal[] | null
  >(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hide, setHide] = useState<boolean>(false);

  const { address } = useAccount();
  const { isLoggedIn } = useContext(UserContext);

  const { data: numberOfUsedItemsData } = useSWR(
    address ? `/api/database/getUserAllUsedItems?wallet=${address}` : null,
    fetcher,
    {
      revalidateIfStale: true,
      revalidateOnMount: true,
      revalidateOnReconnect: true,
      refreshInterval: refreshIntervalTime,
    }
  );

  useEffect(() => {
    if (numberOfUsedItemsData && inventories) {
      let numberOfAllUsed: number = 0;
      let allQuantity: number = 0;

      numberOfUsedItemsData.forEach((item: { number_of_use: number }) => {
        numberOfAllUsed += item.number_of_use;
      });

      inventories.forEach((item) => {
        allQuantity += item.quantity;
      });

      if (numberOfAllUsed === allQuantity) {
        setHide(true);
      } else {
        setHide(false);
      }
    } else {
      setHide(false);
    }
  }, [numberOfUsedItemsData, inventories]);

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
        setIsLoading(true);
        let newInventories = [];

        for (
          let item = inventories ? inventories.length : 0;
          item < totalItems;
          item++
        ) {
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
              name: itemInfo.name as Items,
              price: price,
              discount: discount,
              quantity: itemQuantity,
            };

            newInventories.push(itemFormatted);
          } catch (error) {
            break;
          }
        }

        setIsLoading(false);
        return newInventories;
      };

      fetchInventory().then((newInventories) =>
        setInventories(
          inventories
            ? [...inventories, ...newInventories]
            : [...newInventories]
        )
      );
    } else {
      setInventories(null);
      setIsLoading(false);
    }
  }, [totalItems, address, inventories]);

  return (
    <>
      <div className="mx-auto max-w-4xl flex flex-col gap-4">
        <div className="flex flex-col">
          <span className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            {lang === "en" ? "Inventory" : "Inventaire"}
          </span>
          {inventories && inventories.length > 0 && !hide && (
            <>
              <span className="text-gray-700 dark:text-gray-300 text-sm">
                {lang === "en"
                  ? "Use your items to improve your learning experience."
                  : "Utilisez vos objets pour améliorer votre expérience d'apprentissage."}
              </span>
            </>
          )}
        </div>

        {inventories && inventories.length > 0 && !hide ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {inventories.map(
                (item: InventoryItemTypeFinal, index: number) => (
                  <div key={index}>
                    <InventoryItem lang={lang} item={item} />
                  </div>
                )
              )}
            </div>
          </>
        ) : isLoading ? (
          <>
            <div className="flex justify-center items-center text-center p-32">
              <span
                className={`text-gray-700 dark:text-gray-300 ${
                  isLoading && loadingFlashClass
                }`}
              >
                {lang === "en"
                  ? "Your items are loading..."
                  : "Vos objets sont en cours de chargement..."}
              </span>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col justify-center gap-4 text-center items-center p-32">
              <span className="text-gray-700 dark:text-gray-300">
                {lang === "en"
                  ? "You don't have any items."
                  : "Vous n'avez aucun objet."}
              </span>
              {!isLoggedIn && <Wallet lang={lang} isCentered={true} />}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Inventory;
