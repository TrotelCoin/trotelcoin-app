"use client";

import React, { useContext, useEffect, useState } from "react";
import { Lang } from "@/types/lang";
import { useAccount, useBlockNumber, useReadContract } from "wagmi";
import { polygon } from "viem/chains";
import { trotelCoinShop } from "@/data/web3/addresses";
import trotelCoinShopABI from "@/abi/trotelCoinShop";
import { fetchInventory } from "@/lib/inventory/inventory";
import type { InventoryItemTypeFinal } from "@/types/inventory/inventory";
import InventoryItem from "@/app/[lang]/shop/components/inventory/inventoryItem";
import { loadingFlashClass } from "@/lib/tailwind/loading";
import Wallet from "@/app/[lang]/components/header/wallet";
import UserContext from "@/app/[lang]/contexts/userContext";
import useSWR from "swr";
import { fetcher, refreshIntervalTime } from "@/lib/axios/fetcher";
import { ArrowPathIcon } from "@heroicons/react/24/solid";

const Inventory = ({ params: { lang } }: { params: { lang: Lang } }) => {
  const [totalItems, setTotalItems] = useState<number | null>(null);
  const [inventories, setInventories] = useState<
    InventoryItemTypeFinal[] | null
  >(null);
  const [hide, setHide] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const { address } = useAccount();
  const { isLoggedIn } = useContext(UserContext);

  const { data: blockNumber } = useBlockNumber({
    watch: true,
    chainId: polygon.id,
  });

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

  const handleRefresh = async () => {
    if (!refreshing && address && totalItems) {
      setRefreshing(true);
      setInventories(null);

      await fetchInventory(totalItems, address).then((newInventories) => {
        setInventories(newInventories);
      });

      setRefreshing(false);
    }
  };

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

  const { data: totalItemsData, refetch: refetchTotalItems } = useReadContract({
    address: trotelCoinShop,
    abi: trotelCoinShopABI,
    functionName: "getTotalItems",
    chainId: polygon.id,
    account: address,
  });

  useEffect(() => {
    refetchTotalItems();
  }, [blockNumber]);

  useEffect(() => {
    if (totalItemsData) {
      const totalItems = Number(totalItemsData);
      setTotalItems(totalItems);
    } else {
      setTotalItems(null);
    }
  }, [totalItemsData]);

  useEffect(() => {
    if (totalItems && address) {
      handleRefresh();
    }
  }, [address, totalItems]);

  return (
    <>
      <div className="mx-auto max-w-4xl flex flex-col gap-4">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
              {lang === "en" ? "Inventory" : "Inventaire"}
            </span>
            <button
              onClick={() => handleRefresh()}
              className="p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-full"
            >
              <ArrowPathIcon
                className={`w-5 h-5 text-gray-900 dark:text-gray-100 ${
                  refreshing && "animate-spin"
                }`}
              />
            </button>
          </div>
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
                  <InventoryItem lang={lang} item={item} key={index} />
                )
              )}
            </div>
          </>
        ) : refreshing ? (
          <>
            <div className="flex justify-center items-center text-center py-32 md:px-32">
              <span
                className={`text-gray-700 dark:text-gray-300 ${
                  refreshing && loadingFlashClass
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
            <div className="flex flex-col justify-center gap-4 text-center items-center py-32 md:px-32">
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
