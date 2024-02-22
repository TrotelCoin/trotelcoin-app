"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { DictType, Lang } from "@/types/types";
import { useAddress, useUser } from "@thirdweb-dev/react";
import { useContractRead, Address } from "wagmi";
import LifeContext from "@/app/[lang]/lifeProvider";
import trotelCoinExpertABI from "@/abi/trotelCoinExpert";
import trotelCoinIntermediateABI from "@/abi/trotelCoinIntermediate";
import {
  trotelCoinIntermediateAddress,
  trotelCoinExpertAddress,
} from "@/data/web3/addresses";
import { polygon } from "viem/chains";
import Rewards from "@/app/[lang]/[quizId]/components/quiz/rewards";
import QuizComponent from "@/app/[lang]/[quizId]/components/quiz/quizComponent";

interface QuizProps {
  quizId: number;
  lang: Lang;
}

const Quiz: React.FC<QuizProps> = ({ quizId, lang }) => {
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [audio, setAudio] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [dict, setDict] = useState<DictType | null>(null);
  const [isIntermediateBalance, setIsIntermediateBalance] =
    useState<boolean>(false);
  const [isExpertBalance, setIsExpertBalance] = useState<boolean>(false);

  const { life } = useContext(LifeContext);

  useEffect(() => {
    const fetchDictionary = async () => {
      const result = await getDictionary(lang);
      setDict(result);
    };

    fetchDictionary();
  }, [lang]);

  const address = useAddress();
  const { isLoggedIn } = useUser();

  useEffect(() => {
    if (audio) {
      audioRef.current?.play();
    }
  }, [audio]);

  const { data: intermediate } = useContractRead({
    chainId: polygon.id,
    abi: trotelCoinIntermediateABI,
    address: trotelCoinIntermediateAddress,
    functionName: "balanceOf",
    args: [address as Address],
    account: address as Address,
    enabled: Boolean(address),
    watch: true,
  });

  const { data: expert } = useContractRead({
    chainId: polygon.id,
    abi: trotelCoinExpertABI,
    address: trotelCoinExpertAddress,
    functionName: "balanceOf",
    args: [address as Address],
    account: address as Address,
    enabled: Boolean(address),
    watch: true,
  });

  useEffect(() => {
    const intermediateBalance: number = parseFloat(intermediate as string);
    const expertBalance: number = parseFloat(expert as string);

    if (intermediateBalance > 0) {
      setIsIntermediateBalance(true);
    }

    if (expertBalance > 0) {
      setIsExpertBalance(true);
    }
  }, [intermediate, expert]);

  if (life === 0 && !isIntermediateBalance && !isExpertBalance) {
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
      <div className="mt-10 mx-auto border-t border-gray-900/20 dark:border-gray-100/20 pt-10">
        {isLoggedIn && (
          <>
            <QuizComponent
              dict={dict as DictType}
              lang={lang}
              isCorrect={isCorrect}
              setIsCorrect={setIsCorrect}
              setAudio={setAudio}
              quizId={quizId}
            />
          </>
        )}
      </div>

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
