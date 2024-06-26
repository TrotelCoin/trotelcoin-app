"use client";

import type { Lang } from "@/types/language/lang";
import React, { useContext } from "react";
import { Skeleton } from "@radix-ui/themes";
import TrotelPriceContext from "@/contexts/trotelPrice";
import { roundPrice } from "@/utils/price/roundPrice";

const AvailableToClaim = ({
  lang,
  availableToClaim,
  isLoading
}: {
  lang: Lang;
  availableToClaim: number | null;
  isLoading: boolean;
}) => {
  const { trotelPrice } = useContext(TrotelPriceContext);

  const formattedAvailableToClaim = availableToClaim
    ? Math.floor(Number(availableToClaim)).toLocaleString("en-US")
    : "0";

  const calculatedPrice =
    trotelPrice && availableToClaim
      ? `$${roundPrice(trotelPrice * availableToClaim)}`
      : "$0";

  return (
    <>
      <div className="flex justify-between">
        <span>{lang === "en" ? "Pending" : "En attente"}</span>
        <div>
          <Skeleton loading={isLoading}>
            <span>
              {formattedAvailableToClaim} TROTEL ≈ {calculatedPrice}
            </span>
          </Skeleton>
        </div>
      </div>
    </>
  );
};

export default AvailableToClaim;
