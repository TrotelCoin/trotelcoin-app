import type { Lang } from "@/types/language/lang";
import type { Question } from "@/types/courses/quiz";
import React, { SetStateAction, useContext, useEffect, useState } from "react";
import LifeContext from "@/contexts/life";
import { loadQuizData } from "@/app/[lang]/components/courses/quiz/loadQuizData";
import shuffleArray from "@/utils/shuffleArray";
import "animate.css";
import PremiumContext from "@/contexts/premium";
import AudioContext from "@/contexts/audio";
import UserContext from "@/contexts/user";
import { loadingFlashClass } from "@/style/loading";
import { CheckIcon, ShieldCheckIcon } from "@heroicons/react/24/solid";
import useSWR from "swr";
import { fetcher } from "@/utils/axios/fetcher";
import { useAccount } from "wagmi";
import FailNotification from "@/app/[lang]/components/modals/notifications/fail";
import { postQuizResult } from "@/utils/quizzes/postQuizResult";
import { postQuizTime } from "@/utils/quizzes/postQuizTime";
import { Address } from "viem";

const QuizComponent = ({
  lang,
  isTotallyCorrect,
  setIsTotallyCorrect,
  quizId,
  isCorrect,
  setIsCorrect,
  setShowCorrectMessage,
  startTime,
  setCourseMark,
  setCourseTime
}: {
  lang: Lang;
  isTotallyCorrect: boolean;
  setIsTotallyCorrect: React.Dispatch<SetStateAction<boolean>>;
  quizId: number;
  isCorrect: boolean;
  setIsCorrect: React.Dispatch<SetStateAction<boolean>>;
  setShowCorrectMessage: React.Dispatch<SetStateAction<boolean>>;
  startTime: number;
  setCourseMark: React.Dispatch<SetStateAction<number | null>>;
  setCourseTime: React.Dispatch<SetStateAction<number>>;
}) => {
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [correctAnswers, setCorrectAnswers] = useState<string[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [questions, setQuestions] = useState<Question[] | null>(null);
  const [shuffled, setShuffled] = useState<boolean>(false);
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[] | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [optionClass, setOptionClass] = useState<string>(
    "bg-gray-100 dark:bg-gray-800 border-b-4 border-gray-300 dark:border-gray-700 active:border-none active:my-1 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-700"
  );
  const [shieldEnabled, setShieldEnabled] = useState<boolean>(false);
  const [shieldTimeLeft, setShieldTimeLeft] = useState<number | null>(null);
  const [numberOfWrongAnswers, setNumberOfWrongAnswers] = useState<number>(0);
  const [wrongAnswers, setWrongAnswers] = useState<number[]>([]);

  const { address } = useAccount();

  const { updateLife, life } = useContext(LifeContext);
  const { isLoggedIn } = useContext(UserContext);
  const { isIntermediate, isExpert } = useContext(PremiumContext);
  const { playAudio } = useContext(AudioContext);

  const { data } = useSWR(
    address ? `/api/user/items/shield-enabled?wallet=${address}` : null,
    fetcher,
    {
      revalidateIfStale: true,
      revalidateOnMount: true,
      revalidateOnReconnect: true
    }
  );

  useEffect(() => {
    if (data) {
      setShieldEnabled(data.shieldEnabled);
      setShieldTimeLeft(data.timeLeft);
    } else {
      setShieldEnabled(false);
      setShieldTimeLeft(null);
    }
  }, [data]);

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (shieldTimeLeft && shieldTimeLeft > 0) {
      timer = setInterval(() => {
        setShieldTimeLeft((prevTime) => (prevTime ? prevTime - 1 : prevTime));
      }, 60000);
    } else {
      if (timer) {
        clearInterval(timer);
      }
      setShieldEnabled(false);
    }

    return () => clearInterval(timer);
  }, [shieldTimeLeft]);

  const handleAnswer = async (answer: string) => {
    if (isLoading) {
      return;
    }

    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);

    if (correctAnswers[currentQuestion] === answer) {
      setOptionClass(
        "bg-green-500 hover:bg-green-500 border-b-4 border-green-400 dark:border-green-600 active:border-none active:mt-1 text-gray-100 hover:text-gray-100"
      );
      setIsCorrect(true);
      setShowMessage(true);
      if (questions) {
        playAudio("goodAnswer");
        setIsLoading(true);
        setTimeout(() => {
          setCurrentQuestion((prev) =>
            prev < questions.length - 1 ? prev + 1 : prev
          );
          setIsLoading(false);
        }, 2000);
        if (currentQuestion === questions.length - 1) {
          setTimeout(() => {
            setIsTotallyCorrect(true);
            setShowCorrectMessage(true);
          }, 2000);

          const totalQuestions = questions.length;

          const numberOfGoodAnswers = Math.max(
            0,
            totalQuestions - numberOfWrongAnswers
          );

          const mark = Math.floor((numberOfGoodAnswers / totalQuestions) * 20);

          setCourseMark(mark);

          try {
            await postQuizResult(
              quizId,
              address as Address,
              numberOfWrongAnswers,
              totalQuestions
            );
          } catch (error) {
            console.error(error);
          } finally {
            const endTime = new Date().getTime();

            const diffTime = endTime - startTime; // in ms

            setCourseTime(diffTime);

            try {
              await postQuizTime(quizId, address as Address, diffTime);
            } catch (error) {
              console.error(error);
            }
          }
        }
      }
    } else {
      setOptionClass(
        "bg-red-500 hover:bg-red-500 border-b-4 border-red-400 dark:border-red-600 active:border-none active:mt-1 text-gray-100 hover:text-gray-100"
      );
      setIsCorrect(false);
      setShowMessage(true);
      if (!wrongAnswers.includes(currentQuestion)) {
        setNumberOfWrongAnswers((prev) => prev + 1);
        setWrongAnswers((prev) => [...prev, currentQuestion]);
      }
      if (!isIntermediate && !isExpert && life && life > 0 && !shieldEnabled) {
        updateLife();
      }
      playAudio("badAnswer");
    }
  };

  useEffect(() => {
    const fetchQuizData = async () => {
      const result = await loadQuizData(quizId, lang);

      const { quiz, answers } = JSON.parse(result as string);

      setQuestions(quiz);
      setCorrectAnswers(answers);
    };

    if (quizId && lang) {
      fetchQuizData();
    }
  }, [quizId, lang]);

  useEffect(() => {
    if (!shuffled && questions) {
      const shuffledQuestions = questions.map(
        (question: Question, index: number) => ({
          ...question,
          originalIndex: index
        })
      );

      shuffledQuestions.forEach((question) => {
        if (lang && question.options) {
          if (lang === "en") {
            question.options.en = shuffleArray(question.options.en);
          } else {
            question.options.fr = shuffleArray(question.options.fr);
          }
        }
      });

      setShuffledQuestions(shuffledQuestions);
      setShuffled(true);
    }
  }, [questions, shuffled, lang]);

  return (
    <>
      {!isTotallyCorrect && (
        <>
          {shuffledQuestions &&
            shuffledQuestions[currentQuestion] &&
            isLoggedIn && (
              <>
                <h3 className="flex justify-between gap-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
                  <span className="flex items-center gap-2">
                    {lang === "en"
                      ? shuffledQuestions[currentQuestion].question.en
                      : shuffledQuestions[currentQuestion].question.fr}
                  </span>
                  <span>
                    {currentQuestion + 1}/{shuffledQuestions.length}
                  </span>
                </h3>
                {shieldEnabled && shieldTimeLeft && (
                  <>
                    <div className="rainbow-text inline-flex items-center gap-1">
                      <ShieldCheckIcon className="h-4 w-4" />
                      <span className="text-sm">
                        {lang === "en" ? "Shield enabled" : "Bouclier activé"}{" "}
                        for {Math.floor(shieldTimeLeft)} mins left.
                      </span>
                    </div>
                  </>
                )}
              </>
            )}
          {shuffledQuestions &&
          shuffledQuestions[currentQuestion] &&
          shuffledQuestions[currentQuestion].options ? (
            <ul className="flex flex-col gap-4 pt-6">
              {lang === "en"
                ? shuffledQuestions[currentQuestion].options.en.map(
                    (option: string, index: number) => (
                      <li key={index} className="items-center">
                        <div
                          className={`flex cursor-pointer items-center justify-between rounded-xl px-4 py-2 ${
                            answers[currentQuestion] === option
                              ? optionClass
                              : "border-b-4 border-gray-400 bg-gray-100 text-gray-900 hover:bg-gray-300 active:mt-1 active:border-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700"
                          }`}
                          onClick={() => handleAnswer(option)}
                        >
                          {option}
                          {isLoading &&
                            option === correctAnswers[currentQuestion] && (
                              <CheckIcon
                                className={`h-5 w-5 text-gray-100 ${loadingFlashClass}`}
                              />
                            )}
                        </div>
                      </li>
                    )
                  )
                : shuffledQuestions[currentQuestion].options.fr.map(
                    (option: string, index: number) => (
                      <li key={index} className="items-center">
                        <div
                          className={`flex cursor-pointer items-center justify-between rounded-xl px-4 py-2 ${
                            answers[currentQuestion] === option
                              ? optionClass
                              : "border-b-4 border-gray-400 bg-gray-100 text-gray-900 hover:bg-gray-300 active:mt-1 active:border-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700"
                          }`}
                          onClick={() => handleAnswer(option)}
                        >
                          {option}
                          {isLoading &&
                            option === correctAnswers[currentQuestion] && (
                              <CheckIcon
                                className={`h-5 w-5 text-gray-100 ${loadingFlashClass}`}
                              />
                            )}
                        </div>
                      </li>
                    )
                  )}
            </ul>
          ) : (
            <span
              className={`font-semibold text-gray-900 dark:text-gray-100 ${loadingFlashClass}`}
            >
              {lang === "en" ? "Loading quiz..." : "Chargement du quiz..."}
            </span>
          )}
        </>
      )}

      <FailNotification
        display={
          showMessage &&
          !isCorrect &&
          !isIntermediate &&
          !isExpert &&
          Number(life) > 0
        }
        onClose={() => setShowMessage(false)}
        lang={lang}
        title={lang === "en" ? "Wrong answer!" : "Mauvaise réponse !"}
        message={
          lang === "en"
            ? `Oups! You answered incorrectly. Try again! ${
                Number(life) >= 0 &&
                Number(life) <= 3 &&
                !isIntermediate &&
                !isExpert
                  ? `You have ${life} HP left.`
                  : ""
              }`
            : `Mince ! Vous avez répondu incorrectement. Essayez encore ! ${
                Number(life) >= 0 &&
                Number(life) <= 3 &&
                !isIntermediate &&
                !isExpert
                  ? `Vous avez ${life ?? 3} HP restants.`
                  : ""
              }`
        }
      />
    </>
  );
};

export default QuizComponent;
