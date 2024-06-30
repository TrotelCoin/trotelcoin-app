"use client";

import React, { useEffect, useState, useContext } from "react";
import Item from "@/app/[lang]/shop/components/item";
import { Lang } from "@/types/language/lang";
import type { ShopCategories, Category } from "@/types/shop/shop";
import { useAccount, useBalance, useBlockNumber, useReadContract } from "wagmi";
import contracts from "@/data/web3/addresses";
import abis from "@/abis/abis";
import { formatEther } from "viem";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import ItemSkeleton from "@/app/[lang]/shop/components/itemSkeleton";
import { ItemType, ItemTypeFinal } from "@/types/items/items";
import { loadingFlashClass } from "@/style/loading";
import TrotelPriceContext from "@/contexts/trotelPrice";
import { roundPrice } from "@/utils/price/roundPrice";
import ChainContext from "@/contexts/chain";
import { Skeleton } from "@radix-ui/themes";

const potions: ItemTypeFinal[] = [
  {
    name: "3 Life Potions",
    price: 1000,
    discount: 10,
    emoji: "💙",
    description: "Restores 3 life points",
    id: 1,
    categoryId: 1,
    quantity: 3,
    disabled: false
  },
  {
    name: "10 Life Potions",
    price: 1000,
    discount: 10,
    emoji: "💙",
    description: "Restores 10 life points",
    id: 1,
    categoryId: 1,
    quantity: 10,
    disabled: false
  }
];

const Shop = ({ params: { lang } }: { params: { lang: Lang } }) => {
  const [category, setCategory] = useState<ShopCategories>({
    name: "lifePotions",
    id: 1
  });
  const [balance, setBalance] = useState<number | null>(null);
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [items, setItems] = useState<ItemTypeFinal[] | null>(null);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [fetching, setFetching] = useState<boolean>(true);

  const { address } = useAccount();

  const { trotelPrice, showTrotelInUsdc } = useContext(TrotelPriceContext);
  const { chain } = useContext(ChainContext);

  const { data: blockNumber } = useBlockNumber({
    watch: true,
    chainId: chain.id
  });

  const { data: allCategories, refetch: refetchCategories } = useReadContract({
    chainId: chain.id,
    address: contracts[chain.id].trotelCoinShop,
    functionName: "getAllCategories",
    abi: abis[chain.id].trotelCoinShop
  });

  const { data: allItems, refetch: refetchItems } = useReadContract({
    chainId: chain.id,
    address: contracts[chain.id].trotelCoinShop,
    abi: abis[chain.id].trotelCoinShop,
    functionName: "getAllItems"
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
          disabled: category.disabled
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
            quantity: 1
          };
        }
      );
      const allItemsWithPotions = [...updatedItems, ...potions];
      setItems(allItemsWithPotions);
      setFetching(false);
    }

    setRefreshing(false);
  }, [allCategories, allItems]);

  const {
    data: balanceData,
    refetch: refetchBalance,
    isLoading: isLoadingBalance
  } = useBalance({
    chainId: chain.id,
    address: address,
    token: contracts[chain.id].trotelCoinAddress
  });

  useEffect(() => {
    if (address && balanceData) {
      const balance = Math.floor(Number(balanceData?.formatted));
      setBalance(balance);
    } else {
      setBalance(null);
    }
  }, [address, balanceData]);

  useEffect(() => {
    refetchBalance();
  }, [blockNumber, refetchBalance]);

  return (
    <>
      <div className="mx-auto flex max-w-5xl flex-col gap-8">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
              {lang === "en" ? "Shop" : "Boutique"}
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

          {fetching && (
            <>
              <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                <ul className="flex flex-wrap items-center gap-2">
                  {Array.from(Array(4).keys()).map((index) => (
                    <li key={index}>
                      <Skeleton>
                        <button className="inline-flex items-center rounded-xl bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700 ring-1 ring-inset ring-gray-500/10 hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">
                          Category
                        </button>
                      </Skeleton>
                    </li>
                  ))}
                </ul>

                <Skeleton loading={isLoadingBalance}>
                  <span className="hidden text-sm font-semibold text-gray-700 dark:text-gray-300 md:block">
                    {!showTrotelInUsdc &&
                      roundPrice(balance as number).toLocaleString("en-US")}
                    {showTrotelInUsdc &&
                      `$${roundPrice(
                        (trotelPrice as number) * (balance as number)
                      ).toLocaleString("en-US")}`}{" "}
                    <span>TROTEL</span>
                  </span>
                </Skeleton>
              </div>
            </>
          )}

          {!fetching && (
            <>
              {!refreshing ? (
                <>
                  <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                    <ul className="hide-scrollbar flex items-center gap-2 overflow-x-auto whitespace-nowrap md:flex-wrap md:overflow-x-visible">
                      {categories &&
                        categories
                          .filter((category) => !category.disabled)
                          .map((cat, index) => (
                            <li key={index}>
                              <button
                                onClick={() =>
                                  setCategory(cat as ShopCategories)
                                }
                                className={`${
                                  category.id === cat.id
                                    ? "bg-gray-900 text-gray-300 hover:bg-gray-900 dark:bg-white dark:text-gray-700 dark:hover:bg-white"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                                } inline-flex items-center rounded-xl px-2 py-1 text-xs font-medium ring-1 ring-inset ring-gray-500/10`}
                              >
                                {cat.name}
                              </button>
                            </li>
                          ))}
                    </ul>

                    <span className="hidden text-sm font-semibold text-gray-700 dark:text-gray-300 md:block">
                      {!showTrotelInUsdc &&
                        balance &&
                        roundPrice(balance).toLocaleString("en-US")}
                      {showTrotelInUsdc &&
                        balance &&
                        `$${roundPrice(
                          (trotelPrice as number) * balance
                        ).toLocaleString("en-US")}`}{" "}
                      <span>TROTEL</span>
                    </span>
                  </div>

                  <div className="mt-2 flex flex-col gap-1">
                    <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
                      {items &&
                        items
                          .filter(
                            (item) =>
                              item.categoryId === category.id && !item.disabled
                          )
                          .sort((a, b) => a.price - b.price)
                          .map((item, index) => (
                            <Item key={index} lang={lang} shopItem={item} />
                          ))}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center justify-center py-32 text-center md:px-32">
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
            </>
          )}

          {fetching && (
            <>
              <div className="mt-2 flex flex-col gap-1">
                <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
                  {Array.from({ length: 8 }).map((_, index) => (
                    <ItemSkeleton key={index} />
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Shop;
