import { Lang } from "@/types/types";
import shortenAddress from "@/utils/shortenAddress";
import React, { useEffect, useState } from "react";
import { Address, isAddress } from "viem";
import { useAccount } from "wagmi";

const UserLeaderboard = ({ lang }: { lang: Lang }) => {
  const [position, setPosition] = useState<number | null>(null);
  const [numberOfQuizzesAnswered, setNumberOfQuizzesAnswered] = useState<
    number | null
  >(null);
  const [streak, setStreak] = useState<number | null>(null);
  const [isLoadingUserLeaderboard, setIsLoadingUserLeaderboard] =
    useState<boolean>(true);

  const { address } = useAccount();

  useEffect(() => {
    const fetchUserLeaderboard = async () => {
      setIsLoadingUserLeaderboard(true);
      const userLeaderboard = await fetch(
        `/api/database/userLeaderboard?wallet=${address as Address}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          cache: "no-store",
        }
      ).then((response) => response.json());

      if (userLeaderboard) {
        setPosition(userLeaderboard.position);
        setNumberOfQuizzesAnswered(userLeaderboard.numberOfQuizzesAnswered);
        setStreak(userLeaderboard.streak);
      } else {
        setPosition(null);
        setNumberOfQuizzesAnswered(null);
        setStreak(null);
      }
      setIsLoadingUserLeaderboard(false);
    };

    if (address) {
      fetchUserLeaderboard();
    } else {
      setPosition(null);
      setNumberOfQuizzesAnswered(null);
      setStreak(null);
    }
  }, [address]);

  return (
    <>
      <React.Suspense fallback={null}>
        {isLoadingUserLeaderboard ? (
          <>
            <p className="mt-2 text-gray-700 dark:text-gray-300 animate__animated animate__slower animate__flash animate__infinite">
              {lang === "en" ? <>Loading...</> : <>Chargement...</>}
            </p>
          </>
        ) : (
          <>
            {address ? (
              <>
                {position && (
                  <div
                    className={`mt-4 bg-gray-50 flex items-center justify-between ${
                      position < 4
                        ? "rainbow-border"
                        : "border-gray-900/20 dark:border-gray-100/20"
                    } border backdrop-blur-xl text-center rounded-full p-4 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
                  >
                    <div className="w-10 h-10 flex items-center justify-center rounded-full text-gray-900 dark:text-gray-100 bg-gray-200 dark:bg-gray-800">
                      {position ?? 0}
                    </div>
                    <div className="hidden md:block">
                      {address &&
                      typeof address === "string" &&
                      isAddress(address)
                        ? address
                        : lang === "en"
                        ? "Connect your wallet"
                        : "Connecte ton portefeuille"}
                    </div>
                    <div className="block md:hidden">
                      {address
                        ? shortenAddress(address)
                        : lang === "en"
                        ? "Connect your wallet"
                        : "Connecte ton portefeuille"}
                    </div>

                    <div className="flex items-center gap-2 text-lg">
                      <span>{numberOfQuizzesAnswered ?? 0} 📚</span>
                      <span>{streak ?? 0} 🔥</span>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <>
                <p className="mt-2 text-gray-700 dark:text-gray-300">
                  {lang === "en" ? (
                    <>Connect your wallet</>
                  ) : (
                    <>Connecte ton portefeuille</>
                  )}
                </p>
              </>
            )}
          </>
        )}
      </React.Suspense>
    </>
  );
};

export default UserLeaderboard;
