"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { DictType, Lang } from "@/types/types";
import { useUser } from "@thirdweb-dev/react";
import LifeContext from "@/app/[lang]/contexts/lifeContext";
import Rewards from "@/app/[lang]/[quizId]/components/quiz/rewards";
import QuizComponent from "@/app/[lang]/[quizId]/components/quiz/quizComponent";
import PremiumContext from "@/app/[lang]/contexts/premiumContext";

interface QuizProps {
  quizId: number;
  lang: Lang;
}

const Quiz: React.FC<QuizProps> = ({ quizId, lang }) => {
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [audio, setAudio] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [dict, setDict] = useState<DictType | null>(null);

  const { life } = useContext(LifeContext);

  useEffect(() => {
    const fetchDictionary = async () => {
      const result = await getDictionary(lang);
      setDict(result);
    };

    fetchDictionary();
  }, [lang]);

  const { isLoggedIn } = useUser();

  useEffect(() => {
    if (audio) {
      audioRef.current?.play();
    }
  }, [audio]);

  const { isIntermediate, isExpert } = useContext(PremiumContext);

  if (life === 0 && !isIntermediate && !isExpert) {
    return (
      <div className="mt-10 mx-auto border-t border-gray-900/20 dark:border-gray-100/20 pt-10">
        <p className="text-red-500 dark:text-red-300">
          {typeof dict?.quiz !== "string" && <>{dict?.quiz.life}</>}
        </p>
      </div>
    );
  }

  return (
    <>
      <audio
        ref={audioRef}
        src="/audio/correct-answer.mp3"
        className="hidden"
      ></audio>

      {/* QuizComponent */}

      {isLoggedIn && (
        <>
          <div className="mt-10 mx-auto border-t border-gray-900/20 dark:border-gray-100/20 pt-10">
            <QuizComponent
              dict={dict as DictType}
              lang={lang}
              isCorrect={isCorrect}
              setIsCorrect={setIsCorrect}
              setAudio={setAudio}
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
        isCorrect={isCorrect}
      />
    </>
  );
};

export default Quiz;
