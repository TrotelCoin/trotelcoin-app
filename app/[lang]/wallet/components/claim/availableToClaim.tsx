"use client";

import { Lang } from "@/types/types";
import { useAddress } from "@thirdweb-dev/react";
import React, { useEffect, useState } from "react";

const AvailableToClaim = ({ lang }: { lang: Lang }) => {
  const [availableToClaim, setAvailableToClaim] = useState<number | null>(null);

  const address = useAddress();

  useEffect(() => {
    const fetchAvailableToClaim = async () => {
      const result = await fetch(
        `/api/database/totalRewardsPending?wallet=${address}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-store",
          },
          cache: "no-store",
        }
      );
      const data = await result.json();
      console.log(data);
      if (data) {
        setAvailableToClaim(data);
      } else {
        setAvailableToClaim(0);
      }
    };

    if (address) {
      fetchAvailableToClaim();

      const interval = setInterval(fetchAvailableToClaim, 10000);

      return () => clearInterval(interval);
    } else {
      setAvailableToClaim(0);
    }
  }, [availableToClaim, address]);

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
