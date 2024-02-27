import { DictType, Lang, Question } from "@/types/types";
import React, { useContext, useEffect, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import Confetti from "react-dom-confetti";
import LifeContext from "@/app/[lang]/contexts/lifeContext";
import { loadQuizData } from "@/app/[lang]/[quizId]/components/quiz/loadQuizData";
import shuffleArray from "@/utils/shuffleArray";
import "animate.css";
import PremiumContext from "@/app/[lang]/contexts/premiumContext";

const debug = process.env.NODE_ENV === "development";

const QuizComponent = ({
  dict,
  lang,
  isCorrect,
  setIsCorrect,
  setAudio,
  quizId,
}: {
  dict: DictType;
  lang: Lang;
  isCorrect: boolean;
  setIsCorrect: (value: boolean) => void;
  setAudio: (value: boolean) => void;
  quizId: number;
}) => {
  const [isCaptchaVerified, setIsCaptchaVerified] = useState<boolean>(false);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [wrongAnswers, setWrongAnswers] = useState<number[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [correctAnswers, setCorrectAnswers] = useState<string[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [questions, setQuestions] = useState<Question[] | null>(null);
  const [shuffled, setShuffled] = useState<boolean>(false);
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[] | null>(
    null
  );

  const { updateLife, life } = useContext(LifeContext);
  const { isIntermediate, isExpert } = useContext(PremiumContext);

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);
  };

  const goToPrevious = () => {
    setCurrentQuestion((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const goToNext = () => {
    if (questions) {
      setCurrentQuestion((prev) =>
        prev < questions.length - 1 ? prev + 1 : prev
      );
    }
  };

  const handleCaptchaVerify = () => {
    setIsCaptchaVerified(true);
  };

  const handleSubmit = () => {
    let correctCount = 0;
    let newWrongAnswers: number[] = [];

    for (let i = 0; i < correctAnswers.length; i++) {
      if (correctAnswers[i] === answers[i]) {
        correctCount++;
      } else {
        newWrongAnswers.push(i + 1);
      }
    }

    if (correctCount === correctAnswers.length) {
      setIsCorrect(true);
      setShowConfetti(true);
      setAudio(true);
    } else {
      setIsCorrect(false);
      setShowConfetti(false);
      setAudio(false);
      if (!isIntermediate && !isExpert && life > 0) {
        updateLife();
      }
    }
    setWrongAnswers(newWrongAnswers);
    setShowMessage(true);
  };

  useEffect(() => {
    if (quizId && lang) {
      loadQuizData(quizId, lang)
        .then((result) => {
          const { quiz, answers } = JSON.parse(result as string);
          setQuestions(quiz);
          setCorrectAnswers(answers);
        })
        .catch((error) => console.error(error));
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
      {shuffledQuestions && shuffledQuestions[currentQuestion] && (
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
        <ul className="mt-3 py-6 space-y-4">
          {lang === "en"
            ? shuffledQuestions[currentQuestion].options.en.map(
                (option: string, index: number) => (
                  <li key={index} className="items-center">
                    <div
                      className={`cursor-pointer px-4 py-2 rounded-lg ${
                        answers[currentQuestion] === option
                          ? "bg-blue-500 text-gray-100 hover:bg-blue-500 hover:text-gray-100"
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
                      className={`cursor-pointer px-4 py-2 rounded-lg ${
                        answers[currentQuestion] === option
                          ? "bg-blue-500 text-gray-100 hover:bg-blue-500 hover:text-gray-100"
                          : "bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-700"
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
        <span className="font-semibold text-gray-900 dark:text-gray-100 animate__animated animate__flash animate__slower animate__infinite">
          {typeof dict?.quiz !== "string" && <>{dict?.quiz.loading}</>}
        </span>
      )}
      {!isCorrect && questions && (
        <ReCAPTCHA
          sitekey={process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY as string}
          onChange={handleCaptchaVerify}
        />
      )}
      <div className="mt-6 flex justify-between items-center">
        <button
          className={`${
            currentQuestion !== 0
              ? "cursor-pointer"
              : "disabled cursor-not-allowed"
          } bg-gray-900 dark:bg-white hover:bg-gray-700 dark:hover:bg-gray-300 px-6 py-2 text-sm text-gray-100 dark:text-gray-900 dark:hover:text-gray-900 hover:text-gray-100 rounded-full font-semibold`}
          onClick={goToPrevious}
        >
          {typeof dict?.quiz !== "string" && <>{dict?.quiz.previous}</>}
        </button>
        {questions && currentQuestion < questions.length - 1 && (
          <button
            className="cursor-pointer bg-gray-900 dark:bg-white hover:bg-gray-700 dark:hover:bg-gray-300 px-6 py-2 text-sm text-gray-100 dark:text-gray-900 dark:hover:text-gray-900 hover:text-gray-100 rounded-full font-semibold"
            onClick={goToNext}
          >
            {typeof dict?.quiz !== "string" && <>{dict?.quiz.next}</>}
          </button>
        )}
        {questions && currentQuestion === questions.length - 1 ? (
          isCaptchaVerified || debug ? (
            <button
              onClick={handleSubmit}
              className="cursor-pointer bg-gray-900 dark:bg-white hover:bg-gray-700 dark:hover:bg-gray-300 px-6 py-2 text-sm text-gray-100 dark:text-gray-900 dark:hover:text-gray-900 hover:text-gray-100 rounded-full font-semibold"
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
          className={`mt-6 flex flex-col gap-2 animate__animated animate__fadeIn ${
            isCorrect
              ? "text-green-500 dark:text-green-300"
              : "text-red-500 dark:text-red-300"
          }`}
        >
          {isCorrect
            ? `${dict && typeof dict.quiz !== "string" && dict?.quiz.correct}`
            : `${
                dict && typeof dict.quiz !== "string" && dict?.quiz.incorrect
              } ${wrongAnswers.join(", ")}.`}
          {!isCorrect && life >= 0 && life <= 3 && (
            <span className="text-red-500 dark:text-red-300">
              {lang === "en" ? (
                <>You have {life} left.</>
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
