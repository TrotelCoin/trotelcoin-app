"use client";

import { trotelCoinAddress } from "@/data/web3/addresses";
import type { Lang } from "@/types/language/lang";
import React from "react";
import { polygon } from "viem/chains";

const token = {
  address: trotelCoinAddress,
  decimals: 18,
  name: "TrotelCoin",
  symbol: "TROTEL",
  image: "ipfs://Qmf2dXFJ5XjxUamA3SAnFamYGccEdjZmsVZxkkdDBRqhzd/trotelcoin.png"
};

declare global {
  interface Window {
    ethereum: any;
  }
}

const switchToPolygon = async () => {
  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: polygon.id }]
    });
  } catch (switchError) {
    console.error(switchError);
  }
};

const AddToken = ({ lang }: { lang: Lang }) => {
  const addToken = async () => {
    try {
      if (window.ethereum) {
        await switchToPolygon();
      }

      await window.ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address: token.address,
            symbol: token.symbol,
            decimals: token.decimals,
            image: token.image
          }
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex justify-between">
        <span
          onClick={() => addToken()}
          className="cursor-pointer text-blue-500 hover:text-blue-400 dark:text-blue-300 dark:hover:text-blue-400"
        >
          {lang === "en"
            ? "Add token to your wallet"
            : "Ajouter le token à votre portefeuille"}
        </span>
      </div>
    </>
  );
};

export default AddToken;
