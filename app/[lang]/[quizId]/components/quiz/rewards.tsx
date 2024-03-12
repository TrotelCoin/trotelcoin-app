"use client";

import { Lang } from "@/types/types";
import { useAddress, useUser } from "@thirdweb-dev/react";
import React, { useContext, useEffect, useRef, useState } from "react";
import Success from "@/app/[lang]/components/modals/success";
import Fail from "@/app/[lang]/components/modals/fail";
import { fetcher } from "@/lib/axios/fetcher";
import useSWR from "swr";
import axios from "axios";
import "animate.css";
import BlueButton from "@/app/[lang]/components/blueButton";
import AudioContext from "@/app/[lang]/contexts/audioContext";
import Wallet from "@/app/[lang]/components/header/wallet";

const Rewards = ({
  lang,
  quizId,
  isTotallyCorrect,
}: {
  lang: Lang;
  quizId: number;
  isTotallyCorrect: boolean;
}) => {
  const [claimedRewards, setClaimedRewards] = useState<boolean>(false);
  const [claimingError, setClaimingError] = useState<boolean>(false);
  const [claimingLoading, setClaimingLoading] = useState<boolean>(false);
  const [isLearnerDisconnected, setIsLearnerDisconnected] =
    useState<boolean>(false);
  const [claimedRewardsMessage, setClaimedRewardsMessage] =
    useState<boolean>(false);

  const { audioEnabled } = useContext(AudioContext);

  const audioRef = useRef<HTMLAudioElement>(null);

  const address = useAddress();
  const { isLoggedIn } = useUser();

  const handleClaimRewards = async () => {
    if (!address && !isLoggedIn) {
      setIsLearnerDisconnected(true);
      return;
    }

    setClaimingLoading(true);

    // update database rewards by calling api and if success
    await axios
      .post(
        `/api/database/postUpdateRewards?wallet=${address}&quizId=${quizId}`
      )
      .then(() => {
        setClaimedRewards(true);
        setClaimedRewardsMessage(true);
      })
      .catch((error) => {
        console.error(error);
        setClaimingError(true);
      });

    if (audioEnabled && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }

    setClaimingLoading(false);
  };

  const { data: hasAlreadyAnswered } = useSWR(
    address && quizId
      ? `/api/database/getUserAlreadyAnsweredQuiz?wallet=${address}&quizId=${quizId}`
      : null,
    fetcher
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
      <audio ref={audioRef} src="/audio/sounds/claimed-rewards.wav" />
      {isTotallyCorrect &&
        !hasAlreadyAnswered &&
        address &&
        isLoggedIn &&
        !claimedRewards &&
        !claimingLoading && (
          <div className="mx-auto border-t border-gray-900/10 dark:border-gray-100/10 pt-10 animate__animated animate__FadeIn">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {lang === "en"
                ? "Claim your rewards."
                : "Récupérez vos récompenses."}
            </h3>
            <div className="mt-6 items-center">
              <BlueButton
                onClick={handleClaimRewards}
                lang={lang}
                text={
                  lang === "en" ? "Claim rewards" : "Réclamez vos récompenses"
                }
              />
            </div>
          </div>
        )}
      {(!address || !isLoggedIn) && !hasAlreadyAnswered && (
        <div className="mx-auto border-t border-gray-900/10 dark:border-gray-100/10 pt-10 animate__animated animate__FadeIn">
          <h2 className="text-gray-900 dark:text-gray-100">
            {lang === "en"
              ? "Sign in to claim rewards."
              : "Connectez-vous pour réclamer vos récompenses."}
          </h2>
          <Wallet lang={lang} />
        </div>
      )}
      {claimingLoading && !claimingError && (
        <div className="mx-auto border-t border-gray-900/10 dark:border-gray-100/10 pt-10 animate__animated animate__FadeIn">
          <span className="font-semibold text-gray-900 dark:text-gray-100 animate__animated animate__flash animate__slower animate__infinite">
            {lang === "en" ? "Loading..." : "Chargement..."}
          </span>
        </div>
      )}
      {(hasAlreadyAnswered || claimedRewards) && (
        <div className="mx-auto border-t border-gray-900/10 dark:border-gray-100/10 pt-10 animate__animated animate__FadeIn">
          <h2 className="text-gray-900 dark:text-gray-100">
            {lang === "en"
              ? "You have already claimed your rewards."
              : "Vous avez déjà réclamé vos récompenses."}
          </h2>
        </div>
      )}
      {claimingError && (
        <div className="mx-auto border-t border-gray-900/10 dark:border-gray-100/10 pt-10 animate__animated animate__FadeIn">
          <h2 className="text-red-500 dark:text-red-300">
            {lang === "en"
              ? "An error occured while claiming your rewards."
              : "Une erreur est survenue lors de la réclamation de vos récompenses."}
          </h2>
        </div>
      )}
      <Fail
        title={lang === "en" ? "Sign in" : "Connectez-vous"}
        message={
          lang === "en" ? "You need to sign in." : "Vous devez vous connecter."
        }
        show={isLearnerDisconnected}
        onClose={() => setIsLearnerDisconnected(false)}
        lang={lang}
      />
      <Success
        title={lang === "en" ? "Claimed rewards" : "Récompenses réclamées"}
        message={
          lang === "en"
            ? "You have successfully claimed your rewards."
            : "Vous avez réclamé vos récompenses avec succès."
        }
        show={claimedRewardsMessage}
        onClose={() => setClaimedRewardsMessage(false)}
        lang={lang}
      />
    </>
  );
};

export default Rewards;
