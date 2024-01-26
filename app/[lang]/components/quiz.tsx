"use client";

import React, { useEffect, useRef, useState } from "react";
import { unstable_noStore as noStore } from "next/cache";
import trotelCoinLearningABI from "@/abi/trotelCoinLearning";
import ReCAPTCHA from "react-google-recaptcha";
import { trotelCoinLearningAddress } from "@/data/addresses";
import { polygon } from "viem/chains";
import {
  useAccount,
  useContractRead,
  usePrepareContractWrite,
  useContractWrite,
} from "wagmi";
import Confetti from "react-dom-confetti";
import Fail from "@/app/[lang]/ui/modals/fail";
import Success from "@/app/[lang]/ui/modals/success";
import { useSession } from "next-auth/react";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { DictType, Lang } from "@/types/types";

interface QuizProps {
  quizId: number;
  lang: Lang;
}

const loadQuizData = async (
  quizId: number,
  setQuestions: Function,
  setCorrectAnswers: Function,
  lang: Lang
) => {
  noStore();
  try {
    const quizResponse = await fetch(
      `/api/quizzes/${lang}/${quizId.toString()}`
    );
    const answersResponse = await fetch(
      `/api/answers/${lang}/${quizId.toString()}`
    );

    if (quizResponse.ok && answersResponse.ok) {
      const quizData = await quizResponse.json();
      const answersData = await answersResponse.json();

      setQuestions(shuffleArray(quizData));
      setCorrectAnswers(answersData);
    } else {
      console.error("Failed to fetch quiz data or answers data");
    }
  } catch (error) {
    console.error("An error occurred while fetching data:", error);
  }
};

function shuffleArray(array: any) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const Quiz: React.FC<QuizProps> = ({ quizId, lang }) => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [isCaptchaVerified, setIsCaptchaVerified] = useState<boolean>(false);
  const [questions, setQuestions] = useState<any>(null);
  const [correctAnswers, setCorrectAnswers] = useState<string[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [isLearnerDisconnected, setIsLearnerDisconnected] =
    useState<boolean>(false);
  const [claimedRewards, setClaimedRewards] = useState<boolean>(false);
  const [audio, setAudio] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dict, setDict] = useState<DictType | null>(null);
  const [wrongAnswers, setWrongAnswers] = useState<number[]>([]);

  useEffect(() => {
    const fetchDictionary = async () => {
      const result = await getDictionary(lang);
      setDict(result);
    };

    fetchDictionary();
  }, [lang]);

  const { address, isDisconnected } = useAccount();
  const { data: session } = useSession();

  const { data: remainingTokensBalance } = useContractRead({
    chainId: polygon.id,
    address: trotelCoinLearningAddress,
    abi: trotelCoinLearningABI,
    functionName: "remainingTokens",
    watch: true,
  });
  const { config: claimRewardsConfig } = usePrepareContractWrite({
    chainId: polygon.id,
    address: trotelCoinLearningAddress,
    abi: trotelCoinLearningABI,
    account: address,
    enabled: Boolean(address),
    args: [address, parseFloat(quizId.toString())],
    functionName: "claimRewards",
  });
  const { data: alreadyAnswered } = useContractRead({
    chainId: polygon.id,
    address: trotelCoinLearningAddress,
    abi: trotelCoinLearningABI,
    account: address,
    args: [address, parseFloat(quizId.toString())],
    enabled: Boolean(address),
    functionName: "quizzesIdAnsweredPerLearner",
    watch: true,
  });
  const { write: claimRewards, isSuccess: claimedRewardsSuccess } =
    useContractWrite(claimRewardsConfig);

  const remainingTokens = parseFloat(
    (parseFloat(remainingTokensBalance as string) / 1e18).toFixed(0)
  );

  const handleClaimRewards = async () => {
    if (isDisconnected && !session) {
      setIsLearnerDisconnected(true);
      return;
    }
    if (claimRewards) {
      claimRewards();
    }
  };

  useEffect(() => {
    if (claimedRewardsSuccess) {
      setClaimedRewards(true);
    }
  }, [claimedRewardsSuccess]);

  useEffect(() => {
    loadQuizData(quizId, setQuestions, setCorrectAnswers, lang);
  }, []);

  useEffect(() => {
    const shuffledQuestions = questions?.map((question: any, index: number) => ({
      ...question,
      originalIndex: index,
    }));
  
    shuffledQuestions?.forEach((question: any) => {
      question.options = shuffleArray(question.options);
    });
  
    setQuestions(shuffledQuestions);
  }, [questions]);  

  useEffect(() => {
    if (audio) {
      audioRef.current?.play();
    }
  }, [audio]);

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);
  };

  const goToPrevious = () => {
    setCurrentQuestion((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const goToNext = () => {
    setCurrentQuestion((prev) =>
      prev < questions.length - 1 ? prev + 1 : prev
    );
  };

  const handleCaptchaVerify = () => {
    setIsCaptchaVerified(true);
  };

  const handleSubmit = () => {
    let correctCount = 0;
    let newWrongAnswers: number[] = [];
    
    questions.forEach((question: any) => {
      answers.forEach((answer, optionIndex) => {
        const correctAnswer = question.options.indexOf(
          correctAnswers[question.originalIndex][optionIndex]
        );
        const selectedAnswer = question.options.indexOf(answer);
        if (selectedAnswer === correctAnswer) {
          correctCount++;
        } else {
          newWrongAnswers.push(optionIndex + 1);
        }
      });
    });

    if (correctCount === correctAnswers.length) {
      setIsCorrect(true);
      setShowConfetti(true);
      setAudio(true);
    } else {
      setIsCorrect(false);
      setShowConfetti(false);
      setAudio(false);
    }
    setWrongAnswers(newWrongAnswers);
    setShowMessage(true);
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/audio/correct-answer.mp3"
        className="hidden"
      ></audio>
      {/* Quiz */}
      <div className="mt-10 mx-auto border-t border-gray-900/20 dark:border-gray-100/20 pt-10">
        {questions && questions[currentQuestion] && (
          <h3 className="text-lg font-semibold text-gray-900 flex justify-between dark:text-gray-100">
            <span>{questions[currentQuestion].question}</span>
            <span>
              {currentQuestion + 1}/{questions.length}
            </span>
          </h3>
        )}
        {questions && questions[currentQuestion] ? (
          <ul className="mt-3 py-6 space-y-4">
            {questions[currentQuestion].options.map(
              (option: string, index: number) => (
                <li key={index} className="items-center">
                  <div
                    className={`cursor-pointer px-4 py-2 rounded-lg ${
                      answers[currentQuestion] === option
                        ? "bg-yellow-500 text-gray-900 hover:bg-yellow-500 hover:text-gray-900"
                        : "bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-800"
                    }`}
                    onClick={() => handleAnswer(option)}
                  >
                    {option}
                  </div>
                </li>
              )
            )}
          </ul>
        ) : (
          <span className="font-semibold mt-3 py-6 text-gray-900 dark:text-gray-100">
            {typeof dict?.quiz !== "string" && <>{dict?.quiz.loading}</>}
          </span>
        )}
        {!isCorrect && questions && (
          <ReCAPTCHA
            sitekey={
              process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY as string
            }
            onChange={handleCaptchaVerify}
          />
        )}
        <div className="mt-6 flex justify-between items-center">
          <button
            className={`${
              currentQuestion !== 0
                ? "cursor-pointer"
                : "disabled cursor-not-allowed"
            } bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200 px-6 py-2 text-sm text-gray-100 dark:text-gray-900 dark:hover:text-gray-900 hover:text-gray-100 rounded-full font-semibold`}
            onClick={goToPrevious}
          >
            {typeof dict?.quiz !== "string" && <>{dict?.quiz.previous}</>}
          </button>
          {questions && currentQuestion < questions.length - 1 && (
            <button
              className="cursor-pointer bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200 px-6 py-2 text-sm text-gray-100 dark:text-gray-900 dark:hover:text-gray-900 hover:text-gray-100 rounded-full font-semibold"
              onClick={goToNext}
            >
              {typeof dict?.quiz !== "string" && <>{dict?.quiz.next}</>}
            </button>
          )}
          {questions && currentQuestion === questions.length - 1 ? (
            isCaptchaVerified ? (
              <button
                onClick={handleSubmit}
                className="cursor-pointer bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200 px-6 py-2 text-sm text-gray-100 dark:text-gray-900 dark:hover:text-gray-900 hover:text-gray-100 rounded-full font-semibold"
              >
                {typeof dict?.quiz !== "string" && <>{dict?.quiz.submit}</>}
                <Confetti active={showConfetti} />
              </button>
            ) : (
              <span className="text-sm px-6 py-2 font-semibold text-gray-700 dark:text-gray-300">
                {typeof dict?.quiz !== "string" && <>{dict?.quiz.captcha}</>}
              </span>
            )
          ) : (
            <></>
          )}
        </div>
        {showMessage && (
          <div
            className={`mt-6 animate__animated animate__fadeIn ${
              isCorrect
                ? "text-green-600 dark:text-green-200"
                : "text-red-600 dark:text-red-200"
            }`}
          >
            {isCorrect
              ? `${typeof dict?.quiz !== "string" && dict?.quiz.correct}`
              : `${
                  typeof dict?.quiz !== "string" && dict?.quiz.incorrect
                } ${wrongAnswers.join(", ")}`}
          </div>
        )}
      </div>
      {/* Reward */}
      {isCorrect && !alreadyAnswered && !isDisconnected && session && (
        <div className="mt-10 mx-auto border-t border-gray-900/20 dark:border-gray-100/20 pt-10 animate__animated animate__FadeIn">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {typeof dict?.quiz !== "string" && <>{dict?.quiz.youWillGet}</>}{" "}
            {remainingTokens / 10} & {remainingTokens / 4} TrotelCoins.
          </h3>
          <div className="mt-6 items-center">
            <button
              onClick={handleClaimRewards}
              className="bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200 px-6 py-2 text-sm text-gray-100 dark:text-gray-900 dark:hover:text-gray-900 hover:text-gray-100 rounded-full font-semibold"
            >
              {typeof dict?.quiz !== "string" && (
                <>{dict?.quiz.receiveCrypto}</>
              )}
            </button>
          </div>
        </div>
      )}
      {(isDisconnected || !session) && !alreadyAnswered && (
        <div className="mt-10 mx-auto border-t border-gray-900/20 dark:border-gray-100/20 pt-10 animate__animated animate__FadeIn">
          <h2 className="text-gray-900 dark:text-gray-100">
            {typeof dict?.quiz !== "string" && <>{dict?.quiz.connectWallet}</>}
          </h2>
        </div>
      )}
      {alreadyAnswered && (
        <div className="mt-10 mx-auto border-t border-gray-900/20 dark:border-gray-100/20 pt-10 animate__animated animate__FadeIn">
          <h2 className="text-gray-900 dark:text-gray-100">
            {typeof dict?.quiz !== "string" && <>{dict?.quiz.alreadyClaimed}</>}
          </h2>
        </div>
      )}
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
        show={claimedRewards}
        onClose={() => setClaimedRewards(false)}
      />
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
      />
    </>
  );
};

export default Quiz;
