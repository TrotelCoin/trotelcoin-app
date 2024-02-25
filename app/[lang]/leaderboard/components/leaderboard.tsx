import { Lang } from "@/types/types";
import { useAddress } from "@thirdweb-dev/react";
import React, { useEffect, useState } from "react";
import { isAddress, Address } from "viem";
import shortenAddress from "@/utils/shortenAddress";
import { fetchEnsName, mainnet } from "@wagmi/core";

const Leaderboard = ({ lang }: { lang: Lang }) => {
  const [leaderboard, setLeaderboard] = useState<Array<any> | null>(null);

  const [isLoadingLeaderboard, setIsLoadingLeaderboard] =
    useState<boolean>(true);

  const address = useAddress();

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setIsLoadingLeaderboard(true);
      const leaderboard = await fetch(`/api/database/leaderboard`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store",
        },
        cache: "no-store",
      }).then((response) => response.json());

      if (leaderboard) {
        setLeaderboard(leaderboard.updatedLeaderboard);
      } else {
        setLeaderboard(null);
      }
      setIsLoadingLeaderboard(false);
    };

    fetchLeaderboard();
  }, [address]);

  useEffect(() => {
    const fetchEns = async (address: Address) => {
      const result = await fetchEnsName({
        address: address,
        chainId: mainnet.id,
      });

      return result ?? address;
    };

    const fetchLeaderboard = async (leaderboard: any) => {
      const promises = leaderboard.map(async (entry: any) => {
        if (entry.wallet && isAddress(entry.wallet)) {
          entry.wallet = await fetchEns(entry.wallet);
        }
        return entry;
      });

      const updatedLeaderboard = await Promise.all(promises);
      setLeaderboard(updatedLeaderboard);
    };

    if (leaderboard) {
      fetchLeaderboard(leaderboard);
    }
  }, [leaderboard]);

  return (
    <>
      <React.Suspense fallback={null}>
        <ul className="mt-4">
          {!isLoadingLeaderboard ? (
            <>
              {leaderboard &&
                Array.isArray(leaderboard) &&
                leaderboard.map((entry, index) => (
                  <li key={index}>
                    <div
                      className={`mt-2 bg-gray-100 flex items-center justify-between ${
                        index < 3
                          ? "rainbow-border"
                          : "border-gray-900/20 dark:border-gray-100/20"
                      } border backdrop-blur-xl text-center rounded-full p-4 dark:bg-gray-800 text-gray-900 dark:text-gray-100`}
                    >
                      <div className="w-10 h-10 flex items-center justify-center rounded-full text-gray-900 dark:text-gray-100 bg-gray-300 dark:bg-gray-700">
                        {index + 1}
                      </div>
                      <div className="hidden md:block">{entry.wallet}</div>
                      <div className="block md:hidden">
                        {entry.wallet && isAddress(entry.wallet)
                          ? shortenAddress(entry.wallet)
                          : entry.wallet}
                      </div>
                      <div className="flex items-center gap-2 text-lg">
                        <span>
                          {leaderboard &&
                          leaderboard[index].number_of_quizzes_answered
                            ? leaderboard[index].number_of_quizzes_answered
                            : 0}{" "}
                          📚
                        </span>
                        <span>
                          {leaderboard && leaderboard[index].current_streak
                            ? leaderboard[index].current_streak
                            : 0}{" "}
                          🔥
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
            </>
          ) : (
            <>
              <p className="mt-2 text-gray-700 dark:text-gray-300 animate__animated animate__slower animate__flash animate__infinite">
                {lang === "en" ? <>Loading...</> : <>Chargement...</>}
              </p>
            </>
          )}
        </ul>
      </React.Suspense>
    </>
  );
};

export default Leaderboard;
