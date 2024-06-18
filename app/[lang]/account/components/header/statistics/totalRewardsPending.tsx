import type { Lang } from "@/types/language/lang";
import { useAccount } from "wagmi";
import React, { useContext } from "react";
import { fetcher, refreshIntervalTime } from "@/utils/axios/fetcher";
import CountUp from "react-countup";
import useSWR from "swr";
import TrotelPriceContext from "@/contexts/trotelPrice";
import { roundPrice } from "@/utils/price/roundPrice";

const TotalRewardsPending = ({ lang }: { lang: Lang }) => {
  const { address } = useAccount();

  const { storedTrotelPrice, showTrotelInUsdc } =
    useContext(TrotelPriceContext);

  const { data: totalRewardsPending } = useSWR(
    `/api/user/rewards?wallet=${address}`,
    fetcher,
    {
      revalidateOnMount: true,
      revalidateIfStale: true,
      revalidateOnReconnect: true,
      refreshInterval: refreshIntervalTime
    }
  );

  return (
    <>
      <div
        className={`flex h-full items-center justify-center rounded-xl border border-gray-900/10 bg-white px-2 py-10 text-center text-gray-900 backdrop-blur-xl dark:border-gray-100/10 dark:bg-gray-800 dark:text-gray-100`}
      >
        <div className="mx-auto flex flex-col text-center">
          <span className="text-2xl md:text-4xl">
            <>
              <span className="font-semibold">
                {totalRewardsPending && !showTrotelInUsdc && (
                  <span>
                    <CountUp
                      start={0}
                      end={roundPrice(totalRewardsPending)}
                      suffix=" 💰"
                    />
                  </span>
                )}
                {totalRewardsPending && showTrotelInUsdc && (
                  <span>
                    <CountUp
                      start={0}
                      prefix="$"
                      decimals={2}
                      end={roundPrice(
                        totalRewardsPending * Number(storedTrotelPrice ?? "0")
                      )}
                      suffix=" 💰"
                    />
                  </span>
                )}
              </span>
            </>
          </span>
          <span>{lang === "en" ? "To claim" : "À réclamer"}</span>
        </div>
      </div>
    </>
  );
};

export default TotalRewardsPending;
