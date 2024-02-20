import { DictType } from "@/types/types";
import React, { useEffect, useState } from "react";

const TrotelCoinsPending = ({ dict }: { dict: DictType }) => {
  const [trotelCoinsPending, setTrotelCoinsPending] = useState<number | null>(
    null
  );

  useEffect(() => {
    const fetchTrotelCoinsPending = async () => {
      const response = await fetch("/api/database/trotelCoinsPending", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });
      const trotelCoinsPending = await response?.json();
      if (trotelCoinsPending) {
        setTrotelCoinsPending(trotelCoinsPending);
      } else {
        setTrotelCoinsPending(0);
      }
    };

    fetchTrotelCoinsPending();

    const interval = setInterval(fetchTrotelCoinsPending, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div
        className={`bg-gray-50 flex flex-col border backdrop-blur-xl border-gray-900/20 dark:border-gray-100/40 text-center rounded-lg px-2 py-10 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
      >
        <span className="font-semibold text-2xl md:text-4xl">
          {trotelCoinsPending ? (
            <>
              {Math.floor(trotelCoinsPending)}{" "}
              <span className="hidden md:inline">💰</span>
            </>
          ) : (
            <span className="animate__animated animate__flash animate__slower animate__infinite">
              0 <span className="hidden md:inline">💰</span>
            </span>
          )}
        </span>

        <span>
          {typeof dict?.algorithm !== "string" && (
            <>{dict?.algorithm.trotelCoinsPending}</>
          )}
        </span>
      </div>
    </>
  );
};

export default TrotelCoinsPending;
