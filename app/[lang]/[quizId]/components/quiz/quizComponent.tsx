import type { Lang } from "@/types/lang";
import type { Question } from "@/types/courses/quiz";
import React, { SetStateAction, useContext, useEffect, useState } from "react";
import LifeContext from "@/app/[lang]/contexts/lifeContext";
import { loadQuizData } from "@/app/[lang]/[quizId]/components/quiz/loadQuizData";
import shuffleArray from "@/utils/shuffleArray";
import "animate.css";
import PremiumContext from "@/app/[lang]/contexts/premiumContext";
import AudioContext from "@/app/[lang]/contexts/audioContext";
import UserContext from "@/app/[lang]/contexts/userContext";
import { loadingFlashClass } from "@/lib/tailwind/loading";
import ThemeContext from "@/app/[lang]/contexts/themeContext";
import ReCAPTCHA from "react-google-recaptcha";
import { CheckIcon, ShieldCheckIcon } from "@heroicons/react/24/solid";
import useSWR from "swr";
import { fetcher } from "@/lib/axios/fetcher";
import { useAccount } from "wagmi";
import Fail from "@/app/[lang]/components/modals/fail";
import Success from "@/app/[lang]/components/modals/success";

const debug = process.env.NODE_ENV !== "production";

const QuizComponent = ({
  lang,
  isTotallyCorrect,
  setIsTotallyCorrect,
  quizId,
  isCorrect,
  setIsCorrect,
  showCorrectMessage,
  setShowCorrectMessage,
}: {
  lang: Lang;
  isTotallyCorrect: boolean;
  setIsTotallyCorrect: React.Dispatch<SetStateAction<boolean>>;
  quizId: number;
  isCorrect: boolean;
  setIsCorrect: React.Dispatch<SetStateAction<boolean>>;
  showCorrectMessage: boolean;
  setShowCorrectMessage: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const [isCaptchaVerified, setIsCaptchaVerified] = useState<boolean>(false);
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
  const [captchaMessage, setCaptchaMessage] = useState<boolean>(false);
  const [correctAnswer, setCorrectAnswer] = useState<string>("");
  const [optionClass, setOptionClass] = useState<string>(
    "bg-gray-100 dark:bg-gray-800 border-b-4 border-gray-300 dark:border-gray-700 active:border-none active:my-1 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-700"
  );
  const [shieldEnabled, setShieldEnabled] = useState<boolean>(false);
  const [shieldTimeLeft, setShieldTimeLeft] = useState<number | null>(null);

  const { address } = useAccount();

  const { updateLife, life } = useContext(LifeContext);
  const { isLoggedIn } = useContext(UserContext);
  const { isIntermediate, isExpert } = useContext(PremiumContext);
  const { playAudio } = useContext(AudioContext);
  const { theme } = useContext(ThemeContext);

  const { data } = useSWR(
    address ? `/api/items/getUserShieldEnabled?wallet=${address}` : null,
    fetcher,
    {
      revalidateIfStale: true,
      revalidateOnMount: true,
      revalidateOnReconnect: true,
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

  const handleAnswer = (answer: string) => {
    if (isLoading) {
      return;
    }

    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);

    if (!isCaptchaVerified && !debug) {
      setCaptchaMessage(true);
      return;
    }

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
          setIsTotallyCorrect(true);
          setShowCorrectMessage(true);
        }
      }
    } else {
      setOptionClass(
        "bg-red-500 hover:bg-red-500 border-b-4 border-red-400 dark:border-red-600 active:border-none active:mt-1 text-gray-100 hover:text-gray-100"
      );
      setIsCorrect(false);
      setShowMessage(true);
      if (!isIntermediate && !isExpert && life > 0 && !shieldEnabled) {
        updateLife();
      }
      playAudio("badAnswer");
    }
  };

  const handleCaptchaVerify = () => {
    setIsCaptchaVerified(true);
    setCaptchaMessage(false);
  };

  useEffect(() => {
    const fetchQuizData = async () => {
      const result = await loadQuizData(quizId, lang);

      const { quiz, answers } = JSON.parse(result);

      setQuestions(quiz);
      setCorrectAnswers(answers);
      setCorrectAnswer(answers[currentQuestion]);
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
          originalIndex: index,
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
      {(isCaptchaVerified || debug) && !isTotallyCorrect && (
        <>
          {shuffledQuestions &&
            shuffledQuestions[currentQuestion] &&
            isLoggedIn && (
              <>
                <h3 className="text-lg font-semibold text-gray-900 flex justify-between gap-4 dark:text-gray-100">
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
                    <div className="inline-flex items-center gap-1 rainbow-text">
                      <ShieldCheckIcon className="w-4 h-4" />
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
            <ul className="pt-6 flex flex-col gap-4">
              {lang === "en"
                ? shuffledQuestions[currentQuestion].options.en.map(
                    (option: string, index: number) => (
                      <li key={index} className="items-center">
                        <div
                          className={`cursor-pointer justify-between flex items-center px-4 py-2 rounded-xl ${
                            answers[currentQuestion] === option
                              ? optionClass
                              : "bg-gray-100 border-b-4 border-gray-400 dark:border-gray-600 active:border-none active:mt-1 dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-700"
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
                          className={`cursor-pointer justify-between flex items-center px-4 py-2 rounded-xl ${
                            answers[currentQuestion] === option
                              ? optionClass
                              : "bg-gray-100 border-b-4 border-gray-400 dark:border-gray-600 active:border-none active:mt-1 dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-700"
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
      {!isTotallyCorrect && !isCaptchaVerified && questions && (
        <div className="mt-6">
          <ReCAPTCHA
            sitekey={
              process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY as string
            }
            onChange={handleCaptchaVerify}
            theme={theme}
          />
        </div>
      )}

      <Fail
        show={
          showMessage && !isCorrect && !isIntermediate && !isExpert && life > 0
        }
        onClose={() => setShowMessage(false)}
        lang={lang}
        title={lang === "en" ? "Wrong answer!" : "Mauvaise réponse !"}
        message={
          lang === "en"
            ? `Oups! You answered incorrectly. Try again! ${
                life >= 0 && life <= 3 && !isIntermediate && !isExpert
                  ? `You have ${life} HP left.`
                  : ""
              }`
            : `Mince ! Vous avez répondu incorrectement. Essayez encore ! ${
                life >= 0 && life <= 3 && !isIntermediate && !isExpert
                  ? `Vous avez ${life} HP restants.`
                  : ""
              }`
        }
      />
      <Fail
        show={captchaMessage}
        onClose={() => setCaptchaMessage(false)}
        lang={lang}
        title={lang === "en" ? "Missing captcha" : "Captcha manquant"}
        message={
          lang === "en"
            ? "The captcha is missing. You must complete it to continue."
            : "Le captcha est manquant. Vous devez le compléter pour continuer."
        }
      />
    </>
  );
};

export default QuizComponent;
