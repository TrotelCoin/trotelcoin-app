"use client";

import type { Lang } from "@/types/language/lang";
import React from "react";
import { Skeleton } from "@radix-ui/themes";

const AvailableToClaim = ({
  lang,
  availableToClaim,
  claimed,
}: {
  lang: Lang;
  availableToClaim: number | null;
  claimed: boolean;
}) => {
  return (
    <>
      <div className="flex justify-between">
        <span>{lang === "en" ? "Pending" : "En attente"}</span>
        <div>
          <Skeleton loading={!availableToClaim}>
            {availableToClaim &&
            !claimed &&
            typeof availableToClaim === "number"
              ? availableToClaim.toFixed(0).toLocaleString()
              : "0"}{" "}
            <span className="font-semibold">TROTEL</span>
          </Skeleton>
        </div>
      </div>
    </>
  );
};

export default AvailableToClaim;
