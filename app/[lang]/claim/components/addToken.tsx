"use client";

import ChainContext from "@/contexts/chain";
import contracts from "@/data/web3/addresses";
import type { Lang } from "@/types/language/lang";
import React, { useContext, useState } from "react";
import { createWalletClient, custom } from "viem";
import { polygon } from "viem/chains";
import FailNotification from "@/app/[lang]/components/modals/notifications/fail";
import "viem/window";

const options = {
  address: contracts[polygon.id].trotelCoinAddress,
  decimals: 18,
  symbol: "TROTEL",
  image: "ipfs://Qmf2dXFJ5XjxUamA3SAnFamYGccEdjZmsVZxkkdDBRqhzd/trotelcoin.png"
};

const AddToken = ({ lang }: { lang: Lang }) => {
  const [errorMessage, setErrorMessage] = useState<boolean>(false);

  const { chain } = useContext(ChainContext);

  const client = createWalletClient({
    chain: chain,
    transport: custom(window.ethereum!)
  });

  const switchToPolygon = async () => {
    // only support polygon for now
    await client
      .switchChain({
        id: polygon.id
      })
      .catch((error) => {
        console.error(error);
        throw new Error("Failed to switch chain");
      });
  };

  const addToken = async () => {
    await switchToPolygon();

    const success = await client
      .watchAsset({
        type: "ERC20",
        options: options
      })
      .catch((error) => {
        console.error(error);
        throw new Error("Failed to add token");
      });

    if (!success) {
      setErrorMessage(true);
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

      <FailNotification
        display={errorMessage}
        onClose={() => setErrorMessage(false)}
        lang={lang}
        title={lang === "en" ? "Error" : "Erreur"}
        message={
          lang === "en"
            ? "We couldn't add the token to your wallet"
            : "Nous n'avons pas pu ajouter le token à votre portefeuille"
        }
      />
    </>
  );
};

export default AddToken;
