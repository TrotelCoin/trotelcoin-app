import type { Lang } from "@/types/lang";
import { useAccount, useEnsName } from "wagmi";
import React, { useEffect, useState } from "react";
import { Address, isAddress } from "viem";
import shortenAddress from "@/utils/shortenAddress";
import { mainnet } from "viem/chains";
import { fetcher } from "@/lib/axios/fetcher";
import useSWR from "swr";

const UserLeaderboard = ({ lang }: { lang: Lang }) => {
  const [position, setPosition] = useState<number | null>(null);
  const [numberOfQuizzesAnswered, setNumberOfQuizzesAnswered] = useState<
    number | null
  >(null);
  const [streak, setStreak] = useState<number | null>(null);
  const [ensName, setEnsName] = useState<string | null>(null);

  const { address } = useAccount();

  const { data: userLeaderboard, isLoading: isLoadingUserLeaderboard } = useSWR(
    address ? `/api/database/getUserLeaderboard?wallet=${address}` : null,
    fetcher
  );

  const { data: result } = useEnsName({
    address: address as Address,
    chainId: mainnet.id,
  });

  useEffect(() => {
    if (result) {
      setEnsName(result);
    } else {
      setEnsName(null);
    }
  }, [result]);

  useEffect(() => {
    if (userLeaderboard) {
      setPosition(userLeaderboard.position);
      setNumberOfQuizzesAnswered(userLeaderboard.numberOfQuizzesAnswered);
      setStreak(userLeaderboard.streak);
    } else {
      setPosition(null);
      setNumberOfQuizzesAnswered(null);
      setStreak(null);
    }
  }, [address, userLeaderboard]);

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
                        : "border-gray-900/10 dark:border-gray-100/10"
                    } border backdrop-blur-xl text-center rounded-2xl p-4 dark:bg-gray-800 text-gray-900 dark:text-gray-100`}
                  >
                    <div className="w-10 h-10 flex items-center justify-center rounded-full text-gray-100 bg-blue-500">
                      {position ?? 0}
                    </div>
                    <div className="hidden md:block">
                      {address && isAddress(address) && !ensName
                        ? address
                        : ensName ??
                          (lang === "en"
                            ? "Connect your wallet"
                            : "Connectez votre portefeuille")}
                    </div>
                    <div className="block md:hidden">
                      {address
                        ? shortenAddress(address)
                        : lang === "en"
                        ? "Connect your wallet"
                        : "Connectez votre portefeuille"}
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
                    <>Connectez votre portefeuille</>
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
