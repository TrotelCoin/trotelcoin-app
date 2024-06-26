"use client";

import type { Lang } from "@/types/language/lang";
import React, { useContext } from "react";
import { Skeleton } from "@radix-ui/themes";
import { roundPrice } from "@/utils/price/roundPrice";
import TrotelPriceContext from "@/contexts/trotelPrice";

const UsdcBalance = ({
  lang,
  availableToClaim,
  isLoading
}: {
  lang: Lang;
  availableToClaim: number;
  isLoading: boolean;
}) => {
  const { trotelPrice, showTrotelInUsdc } = useContext(TrotelPriceContext);

  return (
    <>
      <div className="flex justify-between">
        <span>{lang === "en" ? "USD Value" : "Valeur USD"}</span>
        <div>
          <Skeleton loading={isLoading || (!trotelPrice && showTrotelInUsdc)}>
            {trotelPrice && availableToClaim
              ? `$${roundPrice(
                  Number(availableToClaim) * trotelPrice
                ).toLocaleString("en-US")}`
              : "$0"}{" "}
          </Skeleton>
        </div>
      </div>
    </>
  );
};

export default UsdcBalance;
