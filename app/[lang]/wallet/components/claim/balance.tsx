"use client";

import { trotelCoinAddress } from "@/data/web3/addresses";
import { Lang } from "@/types/types";
import { useAddress } from "@thirdweb-dev/react";
import React, { useEffect, useState } from "react";
import { polygon } from "viem/chains";
import { useBalance } from "wagmi";
import { Address } from "viem";

const Balance = ({ lang }: { lang: Lang }) => {
  const [balance, setBalance] = useState<number | null>(null);

  const address = useAddress();

  const { data } = useBalance({
    token: trotelCoinAddress,
    chainId: polygon.id,
    address: address as Address,
  });

  useEffect(() => {
    if (data) {
      setBalance(parseFloat(data.formatted));
    } else {
      setBalance(0);
    }
  }, [data]);

  return (
    <>
      <div className="flex justify-between">
        <span>{lang === "en" ? "Balance" : "Solde"}</span>
        <div>
          {parseFloat(balance?.toFixed(0) as string) ?? 0}{" "}
          <span className="font-semibold">TROTEL</span>
        </div>
      </div>
    </>
  );
};

export default Balance;
