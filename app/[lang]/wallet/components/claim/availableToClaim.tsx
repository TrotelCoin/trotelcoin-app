"use client";

import { Lang } from "@/types/types";
import { useAddress } from "@thirdweb-dev/react";
import React, { useEffect, useState } from "react";

const AvailableToClaim = ({
  lang,
  availableToClaim,
}: {
  lang: Lang;
  availableToClaim: number;
}) => {
  return (
    <>
      <div className="flex justify-between">
        <span>{lang === "en" ? "Pending" : "En attente"}</span>
        <div>
          {availableToClaim && typeof availableToClaim === "number"
            ? availableToClaim.toFixed(2).toLocaleString()
            : "0"}{" "}
          <span className="font-semibold">TROTEL</span>
        </div>
      </div>
    </>
  );
};

export default AvailableToClaim;
