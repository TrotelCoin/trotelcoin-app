"use client";

import React from "react";
import type { Lang } from "@/types/lang";
import { polygon } from "viem/chains";
import { trotelCoinAddress } from "@/data/web3/addresses";

const trotelCoin = {
  name: "TrotelCoin",
  address: trotelCoinAddress,
  symbol: "TROTEL",
  decimals: 18,
  chainId: polygon.id,
  logoURI:
    "ipfs://Qmf2dXFJ5XjxUamA3SAnFamYGccEdjZmsVZxkkdDBRqhzd/trotelcoin.png",
};

const Buy = ({ lang }: { lang: Lang }) => {
  return (
    <>
      <div className="flex justify-center rounded-xl mx-auto">
        <iframe
          title="Buy"
          width="448"
          height="720"
          style={{ overflow: "hidden" }}
          className="block dark:hidden overflow-hidden border border-gray-900/10 dark:border-gray-100/10 rounded-xl bg-gray-100 dark:bg-gray-800"
          allow="clipboard-read *; clipboard-write *; web-share *; accelerometer *; autoplay *; camera *; gyroscope *; payment *; geolocation *"
          src="https://flooz.xyz/embed/trade?swapDisabled=false&onRampTokenAddress=0x85057d5a8d063f9075Ba963101D76352051675E5&swapToTokenAddress=0x85057d5a8d063f9075Ba963101D76352051675E5&swapLockToToken=true&onRampDisabled=false&onRampAsDefault=true&onRampTokenAddress=matic&onRampLockToken=true&stakeDisabled=true&network=polygon&lightMode=true&primaryColor=%23000000&backgroundColor=transparent&roundedCorners=12&padding=20"
        />
        <iframe
          title="Buy"
          width="448"
          height="720"
          style={{ overflow: "hidden" }}
          className="hidden dark:block overflow-hidden border border-gray-900/10 dark:border-gray-100/10 rounded-xl bg-gray-100 dark:bg-gray-800"
          allow="clipboard-read *; clipboard-write *; web-share *; accelerometer *; autoplay *; camera *; gyroscope *; payment *; geolocation *"
          src="https://flooz.xyz/embed/trade?swapDisabled=false&onRampTokenAddress=0x85057d5a8d063f9075Ba963101D76352051675E5&swapToTokenAddress=0x85057d5a8d063f9075Ba963101D76352051675E5&swapLockToToken=true&onRampDisabled=false&onRampAsDefault=true&onRampTokenAddress=matic&onRampLockToken=true&stakeDisabled=true&network=polygon&lightMode=false&primaryColor=%23000000&backgroundColor=transparent&roundedCorners=12&padding=20"
        />
      </div>
    </>
  );
};

export default Buy;
