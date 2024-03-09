"use client";

import React, { useContext, useEffect, useState } from "react";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { DictType, Lang } from "@/types/types";
import { useAddress, useUser } from "@thirdweb-dev/react";
import LifeContext from "@/app/[lang]/contexts/lifeContext";
import Rewards from "@/app/[lang]/[quizId]/components/quiz/rewards";
import QuizComponent from "@/app/[lang]/[quizId]/components/quiz/quizComponent";
import PremiumContext from "@/app/[lang]/contexts/premiumContext";

interface QuizProps {
  quizId: number;
  lang: Lang;
}

const Quiz: React.FC<QuizProps> = ({ quizId, lang }) => {
  const [isTotallyCorrect, setIsTotallyCorrect] = useState<boolean>(false);
  const [dict, setDict] = useState<DictType | null>(null);

  const { life } = useContext(LifeContext);
  const address = useAddress();

  useEffect(() => {
    const fetchDictionary = async () => {
      const result = await getDictionary(lang);
      setDict(result);
    };

    fetchDictionary();
  }, [lang]);

  const { isLoggedIn } = useUser();

  const { isIntermediate, isExpert } = useContext(PremiumContext);

  if (life === 0 && !isIntermediate && !isExpert) {
    return (
      <div className="mt-10 mx-auto border-t border-gray-900/10 dark:border-gray-100/10 py-10">
        <p className="text-red-500 dark:text-red-300">
          {typeof dict?.quiz !== "string" && <>{dict?.quiz.life}</>}
        </p>
      </div>
    );
  }

  return (
    <>
      {/* QuizComponent */}

      {isLoggedIn && address && (
        <>
          <div className="mx-auto border-t border-gray-900/10 dark:border-gray-100/10 py-10">
            <QuizComponent
              dict={dict as DictType}
              lang={lang}
              setIsTotallyCorrect={setIsTotallyCorrect}
              quizId={quizId}
            />
          </div>
        </>
      )}

      {/* Reward */}
      <Rewards
        lang={lang}
        dict={dict as DictType}
        quizId={quizId}
        isTotallyCorrect={isTotallyCorrect}
      />
    </>
  );
};

export default Quiz;
