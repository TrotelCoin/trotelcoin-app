"use client";

import type { Lang } from "@/types/language/lang";
import React, { useContext } from "react";
import { Skeleton } from "@radix-ui/themes";
import { roundPrice } from "@/utils/price/roundPrice";
import TrotelPriceContext from "@/contexts/trotelPrice";

const UsdcBalance = ({
  lang,
  availableToClaim
}: {
  lang: Lang;
  availableToClaim: number;
}) => {
  const { trotelPrice, showTrotelInUsdc } = useContext(TrotelPriceContext);

  return (
    <>
      <div className="flex justify-between">
        <span>{lang === "en" ? "Value" : "Valeur"}</span>
        <div>
          <Skeleton loading={!availableToClaim}>
            {trotelPrice && availableToClaim
              ? roundPrice(
                  Number(availableToClaim) * trotelPrice
                ).toLocaleString("en-US")
              : "0"}{" "}
            <span className="font-semibold">USDC</span>
          </Skeleton>
        </div>
      </div>
    </>
  );
};

export default UsdcBalance;
