"use client";

import type { Lang } from "@/types/language/lang";
import React from "react";
import { Skeleton } from "@radix-ui/themes";

const AvailableToClaim = ({
  lang,
  availableToClaim,
  isLoading
}: {
  lang: Lang;
  availableToClaim: number | null;
  isLoading: boolean;
}) => {
  return (
    <>
      <div className="flex justify-between">
        <span>{lang === "en" ? "Pending" : "En attente"}</span>
        <div>
          <Skeleton loading={isLoading}>
            {availableToClaim && typeof availableToClaim === "number"
              ? availableToClaim.toFixed(0).toLocaleString()
              : "0"}{" "}
            TROTEL
          </Skeleton>
        </div>
      </div>
    </>
  );
};

export default AvailableToClaim;
