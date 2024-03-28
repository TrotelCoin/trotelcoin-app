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
import { CheckIcon } from "@heroicons/react/24/solid";

const debug = process.env.NODE_ENV !== "production";

const QuizComponent = ({
  lang,
  isTotallyCorrect,
  setIsTotallyCorrect,
  quizId,
}: {
  lang: Lang;
  isTotallyCorrect: boolean;
  setIsTotallyCorrect: React.Dispatch<SetStateAction<boolean>>;
  quizId: number;
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
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [optionClass, setOptionClass] = useState<string>(
    "bg-gray-100 dark:bg-gray-800 border-b-4 border-gray-300 dark:border-gray-700 active:border-none active:my-1 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-700"
  );

  const { updateLife, life } = useContext(LifeContext);
  const { isLoggedIn } = useContext(UserContext);
  const { isIntermediate, isExpert } = useContext(PremiumContext);
  const { playAudio } = useContext(AudioContext);
  const { theme } = useContext(ThemeContext);

  const handleAnswer = (answer: string) => {
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
        }
      }
    } else {
      setOptionClass(
        "bg-red-500 hover:bg-red-500 border-b-4 border-red-400 dark:border-red-600 active:border-none active:mt-1 text-gray-100 hover:text-gray-100"
      );
      setIsCorrect(false);
      setShowMessage(true);
      if (!isIntermediate && !isExpert && life > 0) {
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
      {isCaptchaVerified || debug ? (
        <>
          {shuffledQuestions &&
            shuffledQuestions[currentQuestion] &&
            isLoggedIn && (
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
            )}
          {shuffledQuestions &&
          shuffledQuestions[currentQuestion] &&
          shuffledQuestions[currentQuestion].options ? (
            <ul className="mt-3 pt-6 flex flex-col gap-4">
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
                          {isLoading && (
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
                          className={`cursor-pointer px-4 py-2 rounded-xl ${
                            answers[currentQuestion] === option
                              ? optionClass
                              : "bg-gray-100 border-b-4 border-gray-400 dark:border-gray-600 active:border-none active:mt-1 dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-700"
                          }`}
                          onClick={() => handleAnswer(option)}
                        >
                          {option}
                          {isLoading && (
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
      ) : (
        <>
          <span className="text-red-500 dark:text-red-300">
            {lang === "en"
              ? "Complete the captcha first."
              : "Complètez le captcha d'abord."}
          </span>
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
      {captchaMessage && (
        <div
          className={`${
            !captchaMessage && "hidden"
          } mt-6 flex flex-col gap-2 animate__animated animate__fadeIn text-red-500 dark:text-red-300`}
        >
          {lang === "en"
            ? "You didn't do the captcha."
            : "Vous n'avez pas fait le captcha."}
        </div>
      )}
      {isTotallyCorrect && isCorrect && (
        <div
          className={`mt-6 flex flex-col gap-2 animate__animated animate__fadeIn text-green-500 dark:text-green-300`}
        >
          {lang === "en"
            ? "You answered correctly to all the questions!"
            : "Vous avez répondu correctement à toutes les questions !"}
        </div>
      )}
      {showMessage && !isCorrect && (
        <div
          className={`mt-4 flex flex-col gap-2 animate__animated animate__fadeIn text-red-500 dark:text-red-300`}
        >
          {lang === "en"
            ? "Oups. You answered incorrectly. Try again!"
            : "Mince. Vous avez répondu incorrectement. Essayez encore !"}
          {life >= 0 && life <= 3 && !isIntermediate && !isExpert && (
            <span className="text-red-500 dark:text-red-300">
              {lang === "en" ? (
                <>You have {life} lives left.</>
              ) : (
                <>Il vous reste {life} vies restantes.</>
              )}
            </span>
          )}
        </div>
      )}
    </>
  );
};

export default QuizComponent;
