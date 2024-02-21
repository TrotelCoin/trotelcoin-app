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
          },
          cache: "no-store",
        }
      );
      const data = await result.json();
      setAvailableToClaim(data);
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
        <div>
          <span className="text-4xl text-blue-500 dark:text-blue-300">
            test
            <span className="text-base text-gray-700 dark:text-gray-300">
              TROTEL
            </span>
          </span>
        </div>
        <div>{lang === "en" ? "pending" : "en attente"}</div>
      </div>
    </>
  );
};

export default AvailableToClaim;
