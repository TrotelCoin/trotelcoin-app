"use client";

import { DictType, Lang } from "@/types/types";
import { useAddress, useUser } from "@thirdweb-dev/react";
import React, { useEffect, useState } from "react";
import Success from "@/app/[lang]/components/modals/success";
import Fail from "@/app/[lang]/components/modals/fail";
import { fetcher } from "@/lib/axios/fetcher";
import useSWR from "swr";
import axios from "axios";
import "animate.css";

const Rewards = ({
  lang,
  dict,
  quizId,
  isTotallyCorrect,
}: {
  lang: Lang;
  dict: DictType;
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

  const address = useAddress();
  const { isLoggedIn } = useUser();

  const handleClaimRewards = async () => {
    if (!address && !isLoggedIn) {
      setIsLearnerDisconnected(true);
      return;
    }

    setClaimingLoading(true);

    // update database rewards by calling api and if success
    const responseUpdate = await axios
      .post(
        `/api/database/postUpdateRewards?wallet=${address}&quizId=${quizId}`
      )
      .then((response) => response.data)
      .catch((error) => {
        console.error(error);
        setClaimingError(true);
      });

    if (responseUpdate.success) {
      setClaimedRewards(true);
      setClaimedRewardsMessage(true);
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
      {isTotallyCorrect &&
        !hasAlreadyAnswered &&
        address &&
        isLoggedIn &&
        !claimedRewards &&
        !claimingLoading && (
          <div className="mx-auto border-t border-gray-900/10 dark:border-gray-100/10 pt-10 animate__animated animate__FadeIn">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {typeof dict?.quiz !== "string" && <>{dict?.quiz.youWillGet}</>}
            </h3>
            <div className="mt-6 items-center">
              <button
                onClick={handleClaimRewards}
                className="bg-gray-900 dark:bg-white hover:bg-gray-700 dark:hover:bg-gray-300 px-6 py-2 text-sm text-gray-100 dark:text-gray-900 dark:hover:text-gray-900 hover:text-gray-100 rounded-full font-semibold"
              >
                {typeof dict?.quiz !== "string" && (
                  <>{dict?.quiz.receiveCrypto}</>
                )}
              </button>
            </div>
          </div>
        )}
      {(!address || !isLoggedIn) && !hasAlreadyAnswered && (
        <div className="mx-auto border-t border-gray-900/10 dark:border-gray-100/10 pt-10 animate__animated animate__FadeIn">
          <h2 className="text-gray-900 dark:text-gray-100">
            {typeof dict?.quiz !== "string" && <>{dict?.quiz.connectWallet}</>}
          </h2>
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
            {typeof dict?.quiz !== "string" && <>{dict?.quiz.alreadyClaimed}</>}
          </h2>
        </div>
      )}
      {claimingError && (
        <div className="mx-auto border-t border-gray-900/10 dark:border-gray-100/10 pt-10 animate__animated animate__FadeIn">
          <h2 className="text-red-500 dark:text-red-300">
            {typeof dict?.quiz !== "string" && <>{dict?.quiz.claimingError}</>}
          </h2>
        </div>
      )}
      <Fail
        title={
          typeof dict?.modals !== "string" &&
          typeof dict?.modals.connectWallet !== "string" &&
          dict?.modals.connectWallet.title === "string"
            ? dict?.modals.connectWallet.title
            : ""
        }
        message={
          typeof dict?.modals !== "string" &&
          typeof dict?.modals.connectWallet !== "string" &&
          typeof dict?.modals.connectWallet.message === "string"
            ? dict?.modals.connectWallet.message
            : ""
        }
        show={isLearnerDisconnected}
        onClose={() => setIsLearnerDisconnected(false)}
        lang={lang}
      />
      <Success
        title={
          typeof dict?.modals !== "string" &&
          typeof dict?.modals.claimedTrotelCoin !== "string" &&
          dict?.modals.claimedTrotelCoin.title === "string"
            ? dict?.modals.claimedTrotelCoin.title
            : ""
        }
        message={
          typeof dict?.modals !== "string" &&
          typeof dict?.modals.claimedTrotelCoin !== "string" &&
          typeof dict?.modals.claimedTrotelCoin.message === "string"
            ? dict?.modals.claimedTrotelCoin.message
            : ""
        }
        show={claimedRewardsMessage}
        onClose={() => setClaimedRewardsMessage(false)}
        lang={lang}
      />
    </>
  );
};

export default Rewards;
