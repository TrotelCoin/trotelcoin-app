import { Lang } from "@/types/types";
import { useAddress } from "@thirdweb-dev/react";
import React, { useEffect, useState } from "react";
import { Address, isAddress } from "viem";
import shortenAddress from "@/utils/shortenAddress";
import { mainnet, useEnsName } from "wagmi";

const UserLeaderboard = ({ lang }: { lang: Lang }) => {
  const [position, setPosition] = useState<number | null>(null);
  const [numberOfQuizzesAnswered, setNumberOfQuizzesAnswered] = useState<
    number | null
  >(null);
  const [streak, setStreak] = useState<number | null>(null);
  const [isLoadingUserLeaderboard, setIsLoadingUserLeaderboard] =
    useState<boolean>(true);
  const [ensName, setEnsName] = useState<string | null>(null);

  const address = useAddress();

  const { data: result } = useEnsName({
    address: address as Address,
    chainId: mainnet.id,
    enabled: Boolean(address),
  });

  useEffect(() => {
    if (result) {
      setEnsName(result as string);
    } else {
      setEnsName(null);
    }
  }, [result]);

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
                    className={`mt-4 bg-gray-100 flex items-center justify-between ${
                      position < 4
                        ? "rainbow-border"
                        : "border-gray-900/20 dark:border-gray-100/20"
                    } border backdrop-blur-xl text-center rounded-full p-4 dark:bg-gray-800 text-gray-900 dark:text-gray-100`}
                  >
                    <div className="w-10 h-10 flex items-center justify-center rounded-full text-gray-900 dark:text-gray-100 bg-gray-300 dark:bg-gray-700">
                      {position ?? 0}
                    </div>
                    <div className="hidden md:block">
                      {address && isAddress(address) && !ensName
                        ? address
                        : ensName ??
                          (lang === "en"
                            ? "Connect your wallet"
                            : "Connecte ton portefeuille")}
                    </div>
                    <div className="block md:hidden">
                      {address
                        ? shortenAddress(address as Address)
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
