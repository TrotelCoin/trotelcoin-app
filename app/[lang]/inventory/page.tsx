"use client";

import React, { useContext, useEffect, useState } from "react";
import { Lang } from "@/types/language/lang";
import { useAccount, useBlockNumber, useReadContract } from "wagmi";
import { polygon } from "viem/chains";
import { trotelCoinShop } from "@/data/web3/addresses";
import trotelCoinShopABI from "@/abi/shop/trotelCoinShop";
import { fetchInventory } from "@/utils/inventory/fetchInventory";
import type { InventoryItemTypeFinal } from "@/types/inventory/inventory";
import InventoryItem from "@/app/[lang]/inventory/components/inventoryItem";
import InventoryItemSkeleton from "@/app/[lang]/inventory/components/inventoryItemSkeleton";
import Wallet from "@/app/[lang]/components/header/wallet";
import UserContext from "@/contexts/user";
import useSWR from "swr";
import { fetcher, refreshIntervalTime } from "@/utils/axios/fetcher";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { loadingFlashClass } from "@/style/loading";

const Inventory = ({ params: { lang } }: { params: { lang: Lang } }) => {
  const [totalItems, setTotalItems] = useState<number | null>(null);
  const [inventories, setInventories] = useState<
    InventoryItemTypeFinal[] | null
  >(null);
  const [hide, setHide] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [fetching, setFetching] = useState<boolean>(true);

  const { address } = useAccount();
  const { isLoggedIn } = useContext(UserContext);

  const { data: blockNumber } = useBlockNumber({
    watch: true,
    chainId: polygon.id
  });

  const { data: numberOfUsedItemsData } = useSWR(
    address ? `/api/user/items/all-used-items?wallet=${address}` : null,
    fetcher,
    {
      revalidateIfStale: true,
      revalidateOnMount: true,
      revalidateOnReconnect: true,
      refreshInterval: refreshIntervalTime
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

  const { data: totalItemsData, refetch: refetchTotalItems } = useReadContract({
    address: trotelCoinShop,
    abi: trotelCoinShopABI,
    functionName: "getTotalItems",
    chainId: polygon.id,
    account: address
  });

  useEffect(() => {
    refetchTotalItems();
  }, [blockNumber, refetchTotalItems]);

  useEffect(() => {
    if (totalItemsData) {
      const totalItems = Number(totalItemsData);
      setTotalItems(totalItems);
    } else {
      setTotalItems(null);
    }
  }, [totalItemsData]);

  const handleRefresh = async () => {
    if (!refreshing && address && totalItems) {
      setRefreshing(true);
      setInventories(null);

      await fetchInventory(totalItems, address).then((newInventories) => {
        setInventories(newInventories);
      });

      setFetching(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    const handleRefresh = async () => {
      if (!refreshing && address && totalItems) {
        setRefreshing(true);
        setInventories(null);

        await fetchInventory(totalItems, address).then((newInventories) => {
          setInventories(newInventories);
        });

        setFetching(false);
        setRefreshing(false);
      }
    };

    if (totalItems && address) {
      handleRefresh();
    }
  }, [address, totalItems, refreshing]);

  return (
    <>
      <div className="mx-auto flex max-w-4xl flex-col gap-4">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
              {lang === "en" ? "Inventory" : "Inventaire"}
            </span>
            <button
              onClick={() => handleRefresh()}
              className="rounded-full p-2 hover:bg-white dark:hover:bg-gray-800"
            >
              <ArrowPathIcon
                className={`h-5 w-5 text-gray-900 dark:text-gray-100 ${
                  refreshing && "animate-spin"
                }`}
              />
            </button>
          </div>
          {((inventories && inventories.length > 0 && !hide) || fetching) && (
            <>
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {lang === "en"
                  ? "Use your items to improve your learning experience."
                  : "Utilisez vos objets pour améliorer votre expérience d'apprentissage."}
              </span>
            </>
          )}
        </div>

        {!fetching && (
          <>
            {inventories && inventories.length > 0 && !hide ? (
              <>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {inventories.map(
                    (item: InventoryItemTypeFinal, index: number) => (
                      <InventoryItem lang={lang} item={item} key={index} />
                    )
                  )}
                </div>
              </>
            ) : refreshing ? (
              <>
                <div className="flex items-center justify-center py-32 text-center md:px-32">
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
                <div className="flex flex-col items-center justify-center gap-4 py-32 text-center md:px-32">
                  <span className="text-gray-700 dark:text-gray-300">
                    {lang === "en"
                      ? "You don't have any items."
                      : "Vous n'avez aucun objet."}
                  </span>
                  {!isLoggedIn && <Wallet lang={lang} isCentered={true} />}
                </div>
              </>
            )}
          </>
        )}

        {fetching && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <InventoryItemSkeleton key={index} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Inventory;
