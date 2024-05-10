"use client";

import React, { useEffect, useState } from "react";
import Item from "@/app/[lang]/shop/components/items/item";
import { Lang } from "@/types/lang";
import type {
  ShopCategories,
  Category,
  ItemType,
  ItemTypeFinal,
} from "@/types/shop/shop";
import { useAccount, useBalance, useBlockNumber, useReadContract } from "wagmi";
import { polygon } from "viem/chains";
import { trotelCoinAddress, trotelCoinShop } from "@/data/web3/addresses";
import trotelCoinShopABI from "@/abi/trotelCoinShop";
import { formatEther } from "viem";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { loadingFlashClass } from "@/utils/tailwind/loading";

const potions: ItemTypeFinal[] = [
  {
    name: "3 Potions",
    price: 100,
    discount: 10,
    emoji: "🧪",
    description: "Restores 3 life points",
    id: 1,
    categoryId: 1,
    quantity: 3,
    disabled: false,
  },
  {
    name: "10 Potions",
    price: 100,
    discount: 10,
    emoji: "🧪",
    description: "Restores 10 life points",
    id: 1,
    categoryId: 1,
    quantity: 10,
    disabled: false,
  },
];

const Shop = ({ params: { lang } }: { params: { lang: Lang } }) => {
  const [category, setCategory] = useState<ShopCategories>({
    name: "potions",
    id: 1,
  });
  const [balance, setBalance] = useState<number | null>(null);
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [items, setItems] = useState<ItemTypeFinal[] | null>(null);
  const [refreshing, setRefreshing] = useState<boolean>(true);

  const { address } = useAccount();

  const { data: blockNumber } = useBlockNumber({
    watch: true,
    chainId: polygon.id,
  });

  const { data: allCategories, refetch: refetchCategories } = useReadContract({
    chainId: polygon.id,
    address: trotelCoinShop,
    functionName: "getAllCategories",
    abi: trotelCoinShopABI,
  });

  const { data: allItems, refetch: refetchItems } = useReadContract({
    chainId: polygon.id,
    address: trotelCoinShop,
    abi: trotelCoinShopABI,
    functionName: "getAllItems",
  });

  const handleRefresh = async () => {
    setRefreshing(true);

    await refetchCategories();
    await refetchItems();

    setRefreshing(false);
  };

  useEffect(() => {
    setRefreshing(true);

    if (allCategories && allItems) {
      const updatedCategories: Category[] = (allCategories as Category[]).map(
        (category: Category, index: number) => ({
          name: category.name,
          id: index + 1,
          categoryItems: category.categoryItems?.map((id) => Number(id)),
          disabled: category.disabled,
        })
      );
      setCategories(updatedCategories);

      const updatedItems = (allItems as ItemType[]).map(
        (item: ItemType, index: number) => {
          const categoryId =
            updatedCategories.find((category) =>
              category.categoryItems?.includes(index + 1)
            )?.id ?? 1;

          return {
            ...item,
            price: Number(formatEther(item.price)),
            discount: Number(item.discount),
            id: index + 1,
            categoryId: categoryId,
            quantity: 1,
          };
        }
      );
      const allItemsWithPotions = [...updatedItems, ...potions];
      setItems(allItemsWithPotions);
    }

    setRefreshing(false);
  }, [allCategories, allItems]);

  const { data: balanceData, refetch: refetchBalance } = useBalance({
    chainId: polygon.id,
    address: address,
    token: trotelCoinAddress,
  });

  useEffect(() => {
    if (address && balanceData) {
      const balance = Number(balanceData?.formatted);
      setBalance(balance);
    } else {
      setBalance(null);
    }
  }, [address, balanceData]);

  useEffect(() => {
    refetchBalance();
  }, [blockNumber]);

  return (
    <>
      <div className="mx-auto max-w-4xl flex flex-col gap-2">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
              {lang === "en" ? "Shop" : "Boutique"}
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
        </div>

        {!refreshing ? (
          <>
            <div className="flex md:items-center md:justify-between gap-2 flex-col md:flex-row">
              <ul className="flex items-center flex-wrap gap-2">
                {categories &&
                  categories
                    .filter((category) => !category.disabled)
                    .map((cat, index) => (
                      <li key={index}>
                        <button
                          onClick={() => setCategory(cat as ShopCategories)}
                          className={`${
                            category.id === cat.id
                              ? "bg-gray-900 hover:bg-gray-900 dark:bg-gray-50 dark:hover:bg-gray-50 text-gray-300 dark:text-gray-700"
                              : "bg-gray-100 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300"
                          } inline-flex items-center rounded-xl px-2 py-1 text-xs font-medium ring-1 ring-inset ring-gray-500/10`}
                        >
                          {cat.name}
                        </button>
                      </li>
                    ))}
              </ul>
              <span className="text-gray-700 dark:text-gray-300 text-sm">
                {balance?.toLocaleString("en-US") ?? "0"} TROTEL
              </span>
            </div>
            <div className="flex flex-col gap-1 mt-2">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {items &&
                  items
                    .filter(
                      (item) =>
                        item.categoryId === category.id && !item.disabled
                    )
                    .map((item, index) => (
                      <Item key={index} lang={lang} shopItem={item} />
                    ))}
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-center items-center text-center py-32 md:px-32">
              <span
                className={`text-gray-700 dark:text-gray-300 ${
                  refreshing && loadingFlashClass
                }`}
              >
                {lang === "en"
                  ? "Items are loading..."
                  : "Les objets sont en cours de chargement..."}
              </span>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Shop;
