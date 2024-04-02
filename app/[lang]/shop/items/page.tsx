"use client";

import React, { useEffect, useState } from "react";
import Item from "@/app/[lang]/shop/components/items/item";
import { Lang } from "@/types/lang";
import type { ShopItemType, ShopCategories } from "@/types/shop/shop";
import { useAccount, useBalance, useBlockNumber } from "wagmi";
import { polygon } from "viem/chains";
import { trotelCoinAddress } from "@/data/web3/addresses";

const potions: ShopItemType[] = [
  {
    id: 1,
    name: "Potion",
    description: "Restores 1 life point.",
    price: 100,
    emoji: "🧪",
    quantity: 1,
  },
  {
    id: 1,
    name: "3 Potions",
    description: "Restores 3 life points.",
    price: 100,
    emoji: "🧪",
    quantity: 3,
    discount: 10,
  },
  {
    id: 1,
    name: "10 Potions",
    description: "Restores 10 life points.",
    price: 100,
    emoji: "🧪",
    quantity: 10,
    discount: 10,
  },
];

const clocks: ShopItemType[] = [
  {
    id: 2,
    name: "Hourglass",
    description: "Restores max streak within 72 hours after lost.",
    price: 250,
    emoji: "⏳",
    quantity: 1,
  },
  {
    id: 3,
    name: "Clock",
    description: "Restores max streak anytime you want.",
    price: 5000,
    emoji: "⏰",
    quantity: 1,
  },
];

const shields: ShopItemType[] = [
  {
    id: 4,
    name: "Closed Lock",
    description: "Protects from losing lives during 1 hour.",
    price: 100,
    emoji: "🔒",
    quantity: 1,
  },
  {
    id: 5,
    name: "Shield",
    description: "Protects from losing lives during 24 hours.",
    price: 500,
    emoji: "🛡️",
    quantity: 1,
  },
  {
    id: 6,
    name: "Castle",
    description: "Protects from losing lives during 72 hours.",
    price: 1000,
    emoji: "🏰",
    quantity: 1,
  },
  {
    id: 7,
    name: "King",
    description: "Protects from losing lives during 1 week.",
    price: 5000,
    emoji: "🤴",
    quantity: 1,
  },
];

const Shop = ({ params: { lang } }: { params: { lang: Lang } }) => {
  const [category, setCategory] = useState<ShopCategories>("potions");
  const [balance, setBalance] = useState<number | null>(null);

  const { address } = useAccount();

  const { data: blockNumber } = useBlockNumber({
    watch: true,
    chainId: polygon.id,
  });

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
          <span className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            {lang === "en" ? "Shop" : "Boutique"}
          </span>
          <span className="text-gray-700 dark:text-gray-300 text-sm">
            {lang === "en" ? "Balance:" : "Solde:"}{" "}
            {balance?.toLocaleString("en-US") ?? "0"} TROTEL
          </span>
        </div>
        <div>
          <ul className="flex items-center flex-wrap gap-2">
            <li>
              <button
                onClick={() => setCategory("potions")}
                className={`${
                  category === "potions"
                    ? "bg-gray-900 hover:bg-gray-900 dark:bg-gray-50 dark:hover:bg-gray-50 text-gray-300 dark:text-gray-700"
                    : "bg-gray-100 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300"
                } inline-flex items-center rounded-xl px-2 py-1 text-xs font-medium ring-1 ring-inset ring-gray-500/10`}
              >
                {lang === "en" ? "Potions" : "Potions"}
              </button>
            </li>
            <li>
              <button
                onClick={() => setCategory("clocks")}
                className={`${
                  category === "clocks"
                    ? "bg-gray-900 hover:bg-gray-900 dark:bg-gray-50 dark:hover:bg-gray-50 text-gray-300 dark:text-gray-700"
                    : "bg-gray-100 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300"
                } inline-flex items-center rounded-xl px-2 py-1 text-xs font-medium ring-1 ring-inset ring-gray-500/10`}
              >
                {lang === "en" ? "Clocks" : "Horloges"}
              </button>
            </li>
            <li>
              <button
                onClick={() => setCategory("shields")}
                className={`${
                  category === "shields"
                    ? "bg-gray-900 hover:bg-gray-900 dark:bg-gray-50 dark:hover:bg-gray-50 text-gray-300 dark:text-gray-700"
                    : "bg-gray-100 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300"
                } inline-flex items-center rounded-xl px-2 py-1 text-xs font-medium ring-1 ring-inset ring-gray-500/10`}
              >
                {lang === "en" ? "Shields" : "Boucliers"}
              </button>
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-1 mt-2">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {category === "potions" && (
              <>
                {potions.map((item) => (
                  <Item key={item.id} lang={lang} shopItem={item} />
                ))}
              </>
            )}
            {category === "clocks" && (
              <>
                {clocks.map((item) => (
                  <Item key={item.id} lang={lang} shopItem={item} />
                ))}
              </>
            )}
            {category === "shields" && (
              <>
                {shields.map((item) => (
                  <Item key={item.id} lang={lang} shopItem={item} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
