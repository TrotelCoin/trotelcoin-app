"use client";

import React, { useContext, useState } from "react";
import type { Lang } from "@/types/lang";
import LifeContext from "@/app/[lang]/contexts/lifeContext";
import Rewards from "@/app/[lang]/[quizId]/components/quiz/rewards";
import QuizComponent from "@/app/[lang]/[quizId]/components/quiz/quizComponent";
import PremiumContext from "@/app/[lang]/contexts/premiumContext";
import UserContext from "@/app/[lang]/contexts/userContext";
import { loadingFlashClass } from "@/lib/tailwind/loading";
import Success from "@/app/[lang]/components/modals/success";
import Wallet from "@/app/[lang]/components/header/wallet";

const Quiz = ({
  quizId,
  lang,
  startTime,
}: {
  quizId: number;
  lang: Lang;
  startTime: number;
}) => {
  const [isTotallyCorrect, setIsTotallyCorrect] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [showCorrectMessage, setShowCorrectMessage] = useState<boolean>(false);

  const { life, lifeCooldown } = useContext(LifeContext);
  const { isLoggedIn } = useContext(UserContext);
  const { isIntermediate, isExpert } = useContext(PremiumContext);

  if (life === 0 && !isIntermediate && !isExpert) {
    return (
      <div className="mx-auto flex flex-col border-t text-center md:px-12 border-gray-900/10 dark:border-gray-100/10 py-10">
        <span className={`text-4xl ${loadingFlashClass}`}>💔</span>
        <span className="font-semibold mt-2">{lifeCooldown}</span>
        <p className={`text-gray-900 dark:text-gray-100`}>
          {lang === "en"
            ? "You can't take the quiz because you don't have any life left. Comeback tomorrow or buy some lives."
            : "Vous ne pouvez pas passer le quiz car vous n'avez plus de vie. Revenez demain ou achetez des vies."}
        </p>
      </div>
    );
  }

  return (
    <>
      {/* QuizComponent */}
      {!isTotallyCorrect && isLoggedIn && (
        <>
          <div className="mx-auto border-t border-gray-900/10 dark:border-gray-100/10 py-10">
            <QuizComponent
              lang={lang}
              isTotallyCorrect={isTotallyCorrect}
              setIsTotallyCorrect={setIsTotallyCorrect}
              quizId={quizId}
              isCorrect={isCorrect}
              setIsCorrect={setIsCorrect}
              setShowCorrectMessage={setShowCorrectMessage}
              startTime={startTime}
            />
          </div>
        </>
      )}

      {/* Reward */}
      {isTotallyCorrect && isLoggedIn && (
        <Rewards
          lang={lang}
          quizId={quizId}
          isTotallyCorrect={isTotallyCorrect}
        />
      )}

      {!isLoggedIn && (
        <div className="mx-auto border-t border-gray-900/10 dark:border-gray-100/10 py-10 animate__animated animate__FadeIn">
          <h2 className="text-gray-900 dark:text-gray-100">
            {lang === "en"
              ? "Sign in to claim rewards"
              : "Connectez-vous pour réclamer vos récompenses"}
          </h2>
          <div className="mt-4">
            <Wallet isFull={false} lang={lang} />
          </div>
        </div>
      )}

      <Success
        show={isTotallyCorrect && showCorrectMessage}
        onClose={() => setShowCorrectMessage(false)}
        lang={lang}
        title={lang === "en" ? "Congratulations!" : "Félicitations !"}
        message={
          lang === "en"
            ? "You answered correctly to all the questions!"
            : "Vous avez répondu correctement à toutes les questions !"
        }
      />
    </>
  );
};

export default Quiz;
