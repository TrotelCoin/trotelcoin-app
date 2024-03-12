import { DictType, Lang, Question } from "@/types/types";
import React, {
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import ReCAPTCHA from "react-google-recaptcha";
import Confetti from "react-dom-confetti";
import LifeContext from "@/app/[lang]/contexts/lifeContext";
import { loadQuizData } from "@/app/[lang]/[quizId]/components/quiz/loadQuizData";
import shuffleArray from "@/utils/shuffleArray";
import "animate.css";
import PremiumContext from "@/app/[lang]/contexts/premiumContext";
import { useUser } from "@thirdweb-dev/react";
import AudioContext from "@/app/[lang]/contexts/audioContext";

const debug = process.env.NODE_ENV !== "production";

const QuizComponent = ({
  dict,
  lang,
  isTotallyCorrect,
  setIsTotallyCorrect,
  quizId,
}: {
  dict: DictType;
  lang: Lang;
  isTotallyCorrect: boolean;
  setIsTotallyCorrect: React.Dispatch<SetStateAction<boolean>>;
  quizId: number;
}) => {
  const [isCaptchaVerified, setIsCaptchaVerified] = useState<boolean>(false);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [correctAnswers, setCorrectAnswers] = useState<string[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [questions, setQuestions] = useState<Question[] | null>(null);
  const [shuffled, setShuffled] = useState<boolean>(false);
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[] | null>(
    null
  );
  const [captchaMessage, setCaptchaMessage] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [optionClass, setOptionClass] = useState<string>(
    "bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-700"
  );

  const { updateLife, life } = useContext(LifeContext);
  const { isLoggedIn } = useUser();
  const { isIntermediate, isExpert } = useContext(PremiumContext);
  const { audioEnabled } = useContext(AudioContext);

  const audioRefGood = useRef<HTMLAudioElement>(null);
  const audioRefBad = useRef<HTMLAudioElement>(null);

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);
    setShowConfetti(false);

    if (!isCaptchaVerified && !debug) {
      setCaptchaMessage(true);
      return;
    }

    if (correctAnswers[currentQuestion] === answer) {
      setOptionClass(
        "bg-green-500 hover:bg-green-500 text-gray-100 hover:text-gray-100"
      );
      setIsCorrect(true);
      setShowConfetti(true);
      setShowMessage(true);
      if (questions) {
        if (audioEnabled && audioRefGood.current) {
          audioRefGood.current.play();
        }
        setTimeout(() => {
          setCurrentQuestion((prev) =>
            prev < questions.length - 1 ? prev + 1 : prev
          );
        }, 2000);
        if (currentQuestion === questions.length - 1) {
          setIsTotallyCorrect(true);
        }
      }
      setTimeout(() => {
        setShowMessage(false);
      }, 5000);
    } else {
      setOptionClass(
        "bg-red-500 hover:bg-red-500 text-gray-100 hover:text-gray-100"
      );
      setIsCorrect(false);
      setShowConfetti(false);
      setShowMessage(true);
      if (!isIntermediate && !isExpert && life > 0) {
        updateLife();
      }
      if (audioEnabled && audioRefBad.current) {
        audioRefBad.current.play();
      }
      setTimeout(() => {
        setShowMessage(false);
      }, 5000);
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
      <audio ref={audioRefGood} src="/audio/sounds/good-answer.wav" />
      <audio ref={audioRefBad} src="/audio/sounds/bad-answer.wav" />
      {isCaptchaVerified || debug ? (
        <>
          {shuffledQuestions &&
            shuffledQuestions[currentQuestion] &&
            isLoggedIn && (
              <h3 className="text-lg font-semibold text-gray-900 flex justify-between gap-4 dark:text-gray-100">
                <span>
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
            <ul className="mt-3 pt-6 space-y-4">
              {lang === "en"
                ? shuffledQuestions[currentQuestion].options.en.map(
                    (option: string, index: number) => (
                      <li key={index} className="items-center">
                        <div
                          className={`cursor-pointer px-4 py-2 rounded-xl ${
                            answers[currentQuestion] === option
                              ? optionClass
                              : "bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-700"
                          }`}
                          onClick={() => handleAnswer(option)}
                        >
                          {option}
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
                              : "bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-700"
                          }`}
                          onClick={() => handleAnswer(option)}
                        >
                          {option}
                        </div>
                        <div className="flex justify-center items-center mx-auto">
                          <Confetti active={showConfetti} />
                        </div>
                      </li>
                    )
                  )}
            </ul>
          ) : (
            <span className="font-semibold text-gray-900 dark:text-gray-100 animate__animated animate__flash animate__slower animate__infinite">
              {typeof dict?.quiz !== "string" && <>{dict?.quiz.loading}</>}
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
            ? "You got all the questions right!"
            : "Vous avez toutes les questions correctes!"}
        </div>
      )}
      {showMessage && !isCorrect && (
        <div
          className={`mt-4 flex flex-col gap-2 animate__animated animate__fadeIn text-red-500 dark:text-red-300`}
        >
          <>{dict && typeof dict.quiz !== "string" && dict?.quiz.incorrect}</>
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
