import { Lang } from "@/types/types";
import { useAddress } from "@thirdweb-dev/react";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/axios/fetcher";

const TotalRewards = ({ lang }: { lang: Lang }) => {
  const [tokensEarned, setTokensEarned] = useState<number>(0);

  const address = useAddress();

  const { data: totalRewardsPending } = useSWR(
    address
      ? `/api/database/getUserTotalRewardsPending?wallet=${address}`
      : null,
    fetcher
  );

  useEffect(() => {
    if (Boolean(totalRewardsPending)) {
      setTokensEarned(totalRewardsPending);
    } else {
      setTokensEarned(0);
    }
  }, [totalRewardsPending, address]);

  return (
    <>
      <div
        className={`bg-gray-100 flex items-center border backdrop-blur-xl border-gray-900/10 dark:border-gray-100/10 text-center rounded-xl px-2 py-10 dark:bg-gray-800 text-gray-900 dark:text-gray-100`}
      >
        <div className="flex flex-col mx-auto text-center">
          <span className="text-2xl md:text-4xl">
            <>
              <span className="font-semibold">
                {tokensEarned ? (
                  <span>
                    {Math.floor(tokensEarned).toLocaleString("en-US")}
                  </span>
                ) : (
                  <span className="animate__animated animate__flash animate__slower animate__infinite">
                    0
                  </span>
                )}
              </span>
            </>
          </span>
          <span>{lang === "en" ? "Total rewards" : "Récompenses totales"}</span>
        </div>
      </div>
    </>
  );
};

export default TotalRewards;
