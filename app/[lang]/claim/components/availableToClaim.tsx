"use client";

import type { Lang } from "@/types/language/lang";
import React from "react";

const AvailableToClaim = ({
  lang,
  availableToClaim,
  claimed,
}: {
  lang: Lang;
  availableToClaim: number;
  claimed: boolean;
}) => {
  return (
    <>
      <div className="flex justify-between">
        <span>{lang === "en" ? "Pending" : "En attente"}</span>
        <div>
          {availableToClaim && !claimed && typeof availableToClaim === "number"
            ? availableToClaim.toFixed(0).toLocaleString()
            : "0"}{" "}
          <span className="font-semibold">TROTEL</span>
        </div>
      </div>
    </>
  );
};

export default AvailableToClaim;
