"use client";

import React, { useContext, useEffect, useState, useCallback } from "react";
import { Lang } from "@/types/language/lang";
import { useAccount, useBlockNumber, useReadContract } from "wagmi";
import { getContractAddress } from "@/data/web3/addresses";
import { getAbi } from "@/abis/abis";
import { fetchInventory } from "@/utils/inventory/fetchInventory";
import type { InventoryItemTypeFinal } from "@/types/inventory/inventory";
import InventoryItem from "@/app/[lang]/inventory/components/inventoryItem";
import InventoryItemSkeleton from "@/app/[lang]/inventory/components/inventoryItemSkeleton";
import Wallet from "@/app/[lang]/components/header/wallet";
import UserContext from "@/contexts/user";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { loadingFlashClass } from "@/style/loading";
import ChainContext from "@/contexts/chain";

const Inventory = ({ params: { lang } }: { params: { lang: Lang } }) => {
  const [totalItems, setTotalItems] = useState<number | null>(null);
  const [inventories, setInventories] = useState<
    InventoryItemTypeFinal[] | null
  >(null);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [fetching, setFetching] = useState<boolean>(true);

  const { address } = useAccount();
  const { isLoggedIn } = useContext(UserContext);
  const { chain } = useContext(ChainContext);

  const { data: blockNumber } = useBlockNumber({
    watch: true,
    chainId: chain.id
  });

  const { data: totalItemsData, refetch: refetchTotalItems } = useReadContract({
    address: getContractAddress(chain.id, "trotelCoinShop"),
    abi: getAbi(chain.id, "trotelCoinShop"),
    functionName: "getTotalItems",
    chainId: chain.id,
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

  const handleRefresh = useCallback(async () => {
    if (address && totalItems) {
      setRefreshing(true);
      setInventories(null);

      try {
        const newInventories = await fetchInventory(totalItems, address, chain);
        setInventories(newInventories);
      } catch (error) {
        console.error(error);
      } finally {
        setFetching(false);
        setRefreshing(false);
      }
    }
  }, [address, totalItems, chain]);

  useEffect(() => {
    if (totalItems && address) {
      handleRefresh();
    }
  }, [address, totalItems, handleRefresh]);

  return (
    <>
      <div className="mx-auto flex max-w-5xl flex-col gap-4">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
              {lang === "en" ? "Inventory" : "Inventaire"}
            </span>
            <button
              onClick={() => {
                if (!refreshing) {
                  handleRefresh();
                }
              }}
              disabled={refreshing}
              className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <ArrowPathIcon
                className={`h-5 w-5 text-gray-900 dark:text-gray-100 ${
                  refreshing && "animate-spin"
                }`}
              />
            </button>
          </div>
          {((inventories && inventories.length > 0) || fetching) && (
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
            {inventories && inventories.length > 0 ? (
              <>
                <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
                  {inventories
                    .sort((a, b) => b.quantity - a.quantity)
                    .map((item: InventoryItemTypeFinal, index: number) => (
                      <InventoryItem lang={lang} item={item} key={index} />
                    ))}
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
          <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <InventoryItemSkeleton key={index} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Inventory;
