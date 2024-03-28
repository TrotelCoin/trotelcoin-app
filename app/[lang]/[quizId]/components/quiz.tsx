"use client";

import React, { useContext, useState } from "react";
import type { Lang } from "@/types/lang";
import LifeContext from "@/app/[lang]/contexts/lifeContext";
import Rewards from "@/app/[lang]/[quizId]/components/quiz/rewards";
import QuizComponent from "@/app/[lang]/[quizId]/components/quiz/quizComponent";
import PremiumContext from "@/app/[lang]/contexts/premiumContext";
import UserContext from "@/app/[lang]/contexts/userContext";

interface QuizProps {
  quizId: number;
  lang: Lang;
}

const Quiz: React.FC<QuizProps> = ({ quizId, lang }) => {
  const [isTotallyCorrect, setIsTotallyCorrect] = useState<boolean>(false);

  const { life } = useContext(LifeContext);
  const { isLoggedIn } = useContext(UserContext);
  const { isIntermediate, isExpert } = useContext(PremiumContext);

  if (life === 0 && !isIntermediate && !isExpert) {
    return (
      <div className="mx-auto border-t border-gray-900/10 dark:border-gray-100/10 py-10">
        <p className="text-red-500 dark:text-red-300">
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

      {isLoggedIn && (
        <>
          <div className="mx-auto border-t border-gray-900/10 dark:border-gray-100/10 py-10">
            <QuizComponent
              lang={lang}
              isTotallyCorrect={isTotallyCorrect}
              setIsTotallyCorrect={setIsTotallyCorrect}
              quizId={quizId}
            />
          </div>
        </>
      )}

      {/* Reward */}
      <Rewards
        lang={lang}
        quizId={quizId}
        isTotallyCorrect={isTotallyCorrect}
      />
    </>
  );
};

export default Quiz;
