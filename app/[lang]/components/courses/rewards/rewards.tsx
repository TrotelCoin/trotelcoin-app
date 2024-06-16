"use client";

import type { Lang } from "@/types/language/lang";
import { useAccount } from "wagmi";
import React, { useContext, useEffect, useState } from "react";
import Fail from "@/app/[lang]/components/modals/fail";
import { fetcher, refreshIntervalTime } from "@/utils/axios/fetcher";
import useSWR from "swr";
import "animate.css";
import BlueButton from "@/app/[lang]/components/buttons/blue";
import AudioContext from "@/contexts/audio";
import { Skeleton } from "@radix-ui/themes";
import { handleClaimRewards } from "@/utils/rewards/handleClaimRewards";
import { Address } from "viem";
import UserContext from "@/contexts/user";
import { BoltIcon } from "@heroicons/react/24/solid";
import SeparatorVertical from "@/app/[lang]/components/separator/vertical";
import RewardsModal from "@/app/[lang]/components/modals/rewards";

const Rewards = ({
  lang,
  quizId,
  isTotallyCorrect,
  courseTime,
  courseMark,
}: {
  lang: Lang;
  quizId: number;
  isTotallyCorrect: boolean;
  courseTime: number;
  courseMark: number;
}) => {
  const [claimedRewards, setClaimedRewards] = useState<boolean>(false);
  const [claimingError, setClaimingError] = useState<boolean>(false);
  const [claimingLoading, setClaimingLoading] = useState<boolean>(false);
  const [isLearnerDisconnected, setIsLearnerDisconnected] =
    useState<boolean>(false);
  const [claimedRewardsMessage, setClaimedRewardsMessage] =
    useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [formattedTimeLeft, setFormattedTimeLeft] = useState<string | null>(
    null
  );
  const [rewards, setRewards] = useState<number>(0);

  const { address } = useAccount();
  const { playAudio } = useContext(AudioContext);
  const { multipliers, multipliersItemTimeLeft, multipliersEnabled } =
    useContext(UserContext);

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (multipliersItemTimeLeft && multipliersItemTimeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => (prevTime ? prevTime - 1 : prevTime));
      }, 1000);
    } else if (timer) {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [multipliersItemTimeLeft]);

  useEffect(() => {
    if (timeLeft) {
      const totalSeconds = Math.floor(timeLeft / 1000);
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      const formattedTimeLeft = `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

      setFormattedTimeLeft(formattedTimeLeft);
    } else {
      setFormattedTimeLeft("00:00:00");
    }
  }, [timeLeft]);

  const { data: hasAlreadyAnswered } = useSWR(
    address && quizId
      ? `/api/user/quiz/answered?wallet=${address}&quizId=${quizId}`
      : null,
    fetcher,
    {
      revalidateOnMount: true,
      revalidateIfStale: true,
      revalidateOnReconnect: true,
      refreshInterval: refreshIntervalTime,
    }
  );

  useEffect(() => {
    if (claimingError) {
      setTimeout(() => {
        setClaimingError(false);
      }, 5000);
    }
  }, [claimingError]);

  return (
    <>
      {isTotallyCorrect &&
        !hasAlreadyAnswered &&
        !claimedRewards &&
        !claimingLoading && (
          <div className="mx-auto border-t border-gray-900/10 dark:border-gray-100/10 py-10 animate__animated animate__FadeIn">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                {lang === "en"
                  ? "Claim your rewards"
                  : "Récupérez vos récompenses"}
              </h3>

              {Boolean(multipliers) && multipliers > 1 && (
                <>
                  <SeparatorVertical />
                  <div className="flex items-center gap-1 rainbow-text">
                    <BoltIcon className="w-4 h-4" />
                    <span>
                      {lang === "en" ? `x${multipliers}` : `x${multipliers}`}
                    </span>
                  </div>
                  {Boolean(formattedTimeLeft) && multipliersEnabled && (
                    <>
                      <SeparatorVertical />
                      <span>{formattedTimeLeft}</span>
                    </>
                  )}
                </>
              )}
            </div>
            <div className="mt-4 items-center">
              <BlueButton
                onClick={async () => {
                  const rewards: number = await handleClaimRewards(
                    address as Address,
                    quizId,
                    multipliers,
                    setIsLearnerDisconnected,
                    setClaimingLoading,
                    setClaimedRewards,
                    setClaimedRewardsMessage,
                    setClaimingError,
                    playAudio
                  );
                  setRewards(rewards);
                }}
                lang={lang}
                text={
                  lang === "en" ? "Claim rewards" : "Réclamez vos récompenses"
                }
              />
            </div>
          </div>
        )}

      {claimingLoading && !claimingError && (
        <div className="mx-auto border-t border-gray-900/10 dark:border-gray-100/10 py-10 animate__animated animate__FadeIn">
          <span className={`font-semibold text-gray-900 dark:text-gray-100`}>
            <Skeleton>
              {lang === "en" ? "Loading..." : "Chargement..."}
            </Skeleton>
          </span>
        </div>
      )}

      {(hasAlreadyAnswered || claimedRewards) && (
        <div className="mx-auto border-t border-gray-900/10 dark:border-gray-100/10 py-10 animate__animated animate__FadeIn">
          <h2 className="text-gray-900 dark:text-gray-100">
            {lang === "en"
              ? "You have already claimed your rewards."
              : "Vous avez déjà réclamé vos récompenses."}
          </h2>
        </div>
      )}

      <Fail
        title={lang === "en" ? "Error" : "Erreur"}
        message={
          lang === "en"
            ? "An error occured while claiming your rewards."
            : "Une erreur est survenue lors de la réclamation de vos récompenses."
        }
        show={claimingError}
        onClose={() => setClaimingError(false)}
        lang={lang}
      />
      <Fail
        title={lang === "en" ? "Sign in" : "Connectez-vous"}
        message={
          lang === "en" ? "You need to sign in." : "Vous devez vous connecter."
        }
        show={isLearnerDisconnected}
        onClose={() => setIsLearnerDisconnected(false)}
        lang={lang}
      />
      <RewardsModal
        show={claimedRewardsMessage}
        onClose={() => setClaimedRewardsMessage(false)}
        lang={lang}
        rewards={rewards}
        courseMark={courseMark}
        courseTime={courseTime}
      />
    </>
  );
};

export default Rewards;
