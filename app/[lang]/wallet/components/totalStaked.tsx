import { Lang } from "@/types/types";
import React, { useEffect, useState } from "react";
import { trotelCoinAddress, trotelCoinStakingV1 } from "@/data/web3/addresses";
import { useBalance } from "wagmi";
import { Address } from "viem";
import { polygon } from "viem/chains";

const TotalStaked = ({ lang }: { lang: Lang }) => {
  const [totalStaked, setTotalStaked] = useState<number>(0);

  const { data: balance } = useBalance({
    address: trotelCoinStakingV1 as Address,
    chainId: polygon.id,
    token: trotelCoinAddress,
  });

  useEffect(() => {
    if (balance) {
      setTotalStaked(
        parseFloat(parseFloat(balance.value.toString()).toFixed(2))
      );
    }
  }, [balance]);

  return (
    <>
      <div className="flex flex-col flex-wrap gap-2">
        <div className="flex justify-between">
          <span>{lang === "en" ? "Total locked" : "Total verrouillé"}</span>
          <div>
            {totalStaked} <span className="font-semibold">TROTEL</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default TotalStaked;
