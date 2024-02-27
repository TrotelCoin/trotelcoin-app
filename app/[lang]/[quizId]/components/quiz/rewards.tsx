"use client";

import { DictType, Lang } from "@/types/types";
import { useAddress, useUser } from "@thirdweb-dev/react";
import React, { useEffect, useState } from "react";
import Success from "@/app/[lang]/components/modals/success";
import Fail from "@/app/[lang]/components/modals/fail";

const Rewards = ({
  lang,
  dict,
  quizId,
  isCorrect,
}: {
  lang: Lang;
  dict: DictType;
  quizId: number;
  isCorrect: boolean;
}) => {
  const [claimedRewards, setClaimedRewards] = useState<boolean>(false);
  const [claimingError, setClaimingError] = useState<boolean>(false);
  const [claimingLoading, setClaimingLoading] = useState<boolean>(false);
  const [isLearnerDisconnected, setIsLearnerDisconnected] =
    useState<boolean>(false);
  const [claimedRewardsMessage, setClaimedRewardsMessage] =
    useState<boolean>(false);
  const [hasAlreadyAnswered, setHasAlreadyAnswered] = useState<boolean>(false);

  const address = useAddress();
  const { isLoggedIn } = useUser();

  const handleClaimRewards = async () => {
    if (!address && !isLoggedIn) {
      setIsLearnerDisconnected(true);
      return;
    }

    setClaimingLoading(true);

    try {
      // update database rewards by calling api and if success
      const responseUpdate = await fetch(
        `/api/database/updateRewards?wallet=${address}&quizId=${quizId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-store",
          },
          cache: "no-store",
        }
      );
      const dataUpdate = await responseUpdate.json();
      setClaimingLoading(false);
      if (dataUpdate.success) {
        setClaimedRewards(true);
        setClaimedRewardsMessage(true);
      }
    } catch (error) {
      console.error("Error:", error);
      setClaimingError(true);
    }

    setClaimingLoading(false);
  };

  useEffect(() => {
    const fetchAlreadyAnsweredQuiz = async () => {
      await fetch(
        `/api/database/alreadyAnsweredQuiz?wallet=${address}&quizId=${quizId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-store",
          },
          cache: "no-store",
        }
      )
        .then((response) => response.json())
        .then((data) => {
          if (data === true) {
            setHasAlreadyAnswered(true);
          } else {
            setHasAlreadyAnswered(false);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    };

    if (address && quizId) {
      fetchAlreadyAnsweredQuiz();
    } else {
      setHasAlreadyAnswered(false);
    }
  }, [address, quizId]);

  return (
    <>
      {isCorrect &&
        !hasAlreadyAnswered &&
        address &&
        isLoggedIn &&
        !claimedRewards &&
        !claimingLoading && (
          <div className="mt-10 mx-auto border-t border-gray-900/10 dark:border-gray-100/10 pt-10 animate__animated animate__FadeIn">
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
        <div className="mt-10 mx-auto border-t border-gray-900/10 dark:border-gray-100/10 pt-10 animate__animated animate__FadeIn">
          <h2 className="text-gray-900 dark:text-gray-100">
            {typeof dict?.quiz !== "string" && <>{dict?.quiz.connectWallet}</>}
          </h2>
        </div>
      )}
      {claimingLoading && (
        <div className="mt-10 mx-auto border-t border-gray-900/10 dark:border-gray-100/10 pt-10 animate__animated animate__FadeIn">
          <h2 className="text-gray-900 dark:text-gray-100">
            {lang === "en" ? "Loading..." : "Chargement..."}
          </h2>
        </div>
      )}
      {(hasAlreadyAnswered || claimedRewards) && (
        <div className="mt-10 mx-auto border-t border-gray-900/10 dark:border-gray-100/10 pt-10 animate__animated animate__FadeIn">
          <h2 className="text-gray-900 dark:text-gray-100">
            {typeof dict?.quiz !== "string" && <>{dict?.quiz.alreadyClaimed}</>}
          </h2>
        </div>
      )}
      {claimingError && (
        <div className="mt-10 mx-auto border-t border-gray-900/10 dark:border-gray-100/10 pt-10 animate__animated animate__FadeIn">
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
