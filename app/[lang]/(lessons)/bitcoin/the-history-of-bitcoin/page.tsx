"use client";

import "animate.css";
import { Course } from "@/types/types";
import React, { useState, useEffect, useRef } from "react";
import Confetti from "react-dom-confetti";
import ReCAPTCHA from "react-google-recaptcha";
import { unstable_noStore as noStore } from "next/cache";
import lessons from "@/data/lessonsData";
import Link from "next/link";
import { useAccount, useContractRead } from "wagmi";
import { polygon } from "wagmi/chains";
import trotelCoinIntermediateABI from "@/abi/trotelCoinIntermediate";
import trotelCoinExpertABI from "@/abi/trotelCoinExpert";
import {
  trotelCoinIntermediateAddress,
  trotelCoinExpertAddress,
} from "@/data/addresses";
import GoHomeButton from "@/app/[lang]/components/goHomeButton";

const getTierByQuizId = (quizId: number): string => {
  let foundTier = "";
  lessons.forEach((lesson) => {
    lesson.courses.forEach((course) => {
      if (course.quizId === quizId) {
        foundTier = course.tier;
      }
    });
  });
  return foundTier;
};

const getAvailabilityByQuizId = (quizId: number): boolean => {
  let foundAvailability = false;
  lessons.forEach((lesson) => {
    lesson.courses.forEach((course) => {
      if (course.quizId === quizId) {
        foundAvailability = course.available;
      }
    });
  });
  return foundAvailability;
};

const loadQuizData = async (
  quizId: number,
  setQuestions: Function,
  setCorrectAnswers: Function
) => {
  noStore();
  try {
    const quizResponse = await fetch(`/api/quizzes/${quizId.toString()}`);
    const answersResponse = await fetch(`/api/answers/${quizId.toString()}`);

    if (quizResponse.ok && answersResponse.ok) {
      const quizData = await quizResponse.json();
      const answersData = await answersResponse.json();

      setQuestions(quizData);
      setCorrectAnswers(answersData);
    } else {
      console.error("Failed to fetch quiz data or answers data");
    }
  } catch (error) {
    console.error("An error occurred while fetching data:", error);
  }
};

const quizId = 10;
const available = getAvailabilityByQuizId(quizId);
const tier = getTierByQuizId(quizId);

const currentCourse: Course = lessons
  .flatMap((lesson) => lesson.courses)
  .find((course) => course.quizId === quizId) as Course;

const CoursePage = () => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showConfettiReward, setShowConfettiReward] = useState<boolean>(false);
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [isCaptchaVerified, setIsCaptchaVerified] = useState<boolean>(false);
  const [questions, setQuestions] = useState<any>(null);
  const [correctAnswers, setCorrectAnswers] = useState<string[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [audio, setAudio] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const { address, isConnected, isDisconnected } = useAccount();

  const { data: intermediate } = useContractRead({
    chainId: polygon.id,
    address: trotelCoinIntermediateAddress,
    abi: trotelCoinIntermediateABI,
    args: [address],
    account: address,
    functionName: "balanceOf",
    watch: true,
  });
  const { data: expert } = useContractRead({
    chainId: polygon.id,
    address: trotelCoinExpertAddress,
    abi: trotelCoinExpertABI,
    args: [address],
    account: address,
    functionName: "balanceOf",
    watch: true,
  });

  const intermediateBalance = parseFloat(intermediate as string);
  const expertBalance = parseFloat(expert as string);

  useEffect(() => {
    loadQuizData(quizId, setQuestions, setCorrectAnswers);
  }, []);

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
    answers.forEach((answer, index) => {
      if (answer === correctAnswers[index]) {
        correctCount++;
      }
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
    setShowMessage(true);
  };

  const renderUnauthorizedContent = () => {
    return (
      <>
        <main className="grid min-h-full place-items-center bg-white dark:bg-black px-6 py-24 sm:py-32 lg:px-8">
          <div className="text-center">
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl">
              Not available
            </h1>
            <p className="mt-6 text-base leading-7 text-gray-700 dark:text-gray-300">
              Either connect your wallet or become a premium user to access this
              course.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/home"
                className="rounded-md bg-blue-600 dark:bg-blue-200 px-3.5 py-2.5 text-sm font-semibold text-gray-100 dark:text-gray-900 shadow-sm hover:bg-blue-800 dark:hover:bg-blue-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Go back home
              </Link>
            </div>
          </div>
        </main>
      </>
    );
  };

  const renderCourseContent = () => {
    return (
      <>
        <audio
          ref={audioRef}
          src="/audio/correct-answer.mp3"
          className="hidden"
        ></audio>
        <p className="text-base font-semibold leading-7 text-blue-600 dark:text-blue-200">
          Course
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
          {currentCourse.title}
        </h1>
        <p className="mt-2 text-gray-900 dark:text-gray-100">
          What are you going to learn?
        </p>
        <div className="bg-gray-50 my-10 border backdrop-blur-xl border-gray-900/10 dark:border-gray-100/10 rounded-lg px-10 py-2 dark:bg-gray-900">
          <ul
            role="list"
            className="max-w-xl space-y-8 text-gray-700 dark:text-gray-300"
          >
            <div className="grid grid-cols-1 divide-y divide-gray-900/10 dark:divide-gray-100/10">
              <div className="py-4">
                <li className="flex gap-x-3">
                  <span className="text-gray-900 dark:text-gray-100">
                    Choose a crypto wallet that suits your needs.
                  </span>
                </li>
              </div>
              <div className="py-4">
                <li className="flex gap-x-3">
                  <span className="text-gray-900 dark:text-gray-100">
                    Understand that crypto wallets serve specific purposes.
                  </span>
                </li>
              </div>
              <div className="py-4">
                <li className="flex gap-x-3">
                  <span className="text-gray-900 dark:text-gray-100">
                    Know good practices to navigate on the web3.
                  </span>
                </li>
              </div>
            </div>
          </ul>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          Install your first wallet
        </h2>
        <p className="mt-6">
          Id orci tellus laoreet id ac. Dolor, aenean leo, ac etiam consequat
          in. Convallis arcu ipsum urna nibh. Pharetra, euismod vitae interdum
          mauris enim, consequat vulputate nibh. Maecenas pellentesque id sed
          tellus mauris, ultrices mauris. Tincidunt enim cursus ridiculus mi.
          Pellentesque nam sed nullam sed diam turpis ipsum eu a sed convallis
          diam.
        </p>
        <figure className="mt-10 border-l border-blue-600 dark:border-blue-200 pl-9">
          <blockquote className="font-semibold text-gray-900 dark:text-gray-100">
            <p>
              “Vel ultricies morbi odio facilisi ultrices accumsan donec lacus
              purus. Lectus nibh ullamcorper ac dictum justo in euismod. Risus
              aenean ut elit massa. In amet aliquet eget cras. Sem volutpat enim
              tristique.”
            </p>
          </blockquote>
          <figcaption className="mt-6 flex gap-x-4">
            <div className="text-sm leading-6">
              <strong className="font-semibold text-gray-900 dark:text-gray-100">
                Alexandre Trotel
              </strong>{" "}
              – CEO & Founder
            </div>
          </figcaption>
        </figure>
        <p className="mt-10">
          Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus
          enim. Mattis mauris semper sed amet vitae sed turpis id. Id dolor
          praesent donec est. Odio penatibus risus viverra tellus varius sit
          neque erat velit.
        </p>

        <div className="mt-16 mx-auto">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            Configure your wallet
          </h2>
          <p className="mt-6">
            Purus morbi dignissim senectus mattis adipiscing. Amet, massa quam
            varius orci dapibus volutpat cras. In amet eu ridiculus leo sodales
            cursus tristique. Tincidunt sed tempus ut viverra ridiculus non
            molestie. Gravida quis fringilla amet eget dui tempor dignissim.
            Facilisis auctor venenatis varius nunc, congue erat ac. Cras
            fermentum convallis quam.
          </p>
          <p className="mt-8">
            Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus
            enim. Mattis mauris semper sed amet vitae sed turpis id. Id dolor
            praesent donec est. Odio penatibus risus viverra tellus varius sit
            neque erat velit.
          </p>
        </div>

        {/* Quizz */}
        <div className="mt-10 mx-auto border-t border-gray-900/20 dark:border-gray-100/20 pt-10">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Quiz
          </h2>
          <div className="mt-6 py-6 px-4 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-900/10 dark:border-gray-100/10">
            {questions && questions[currentQuestion] && (
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {questions[currentQuestion].question} ({currentQuestion + 1}/
                {questions.length})
              </h3>
            )}
            {questions && questions[currentQuestion] ? (
              <ul className="mt-3 py-6 space-y-4">
                {questions[currentQuestion].options.map(
                  (option: string, index: number) => (
                    <li key={index} className="items-center">
                      <div
                        className={`cursor-pointer px-4 py-2 rounded-lg border border-gray-900/10 dark:border-gray-100/10 hover:border-gray-900/50 dark:hover:border-gray-100/50 ${
                          answers[currentQuestion] === option
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100"
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
                Loading...
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
                } bg-blue-600 dark:bg-blue-200 hover:bg-blue-600/80 dark:hover:bg-blue-200/80 px-6 py-2 text-sm text-gray-100 dark:text-gray-900 dark:hover:text-gray-900 hover:text-gray-100 rounded-full font-semibold`}
                onClick={goToPrevious}
              >
                Previous
              </button>
              {questions && currentQuestion < questions.length - 1 && (
                <button
                  className="cursor-pointer bg-blue-600 dark:bg-blue-200 hover:bg-blue-600/80 dark:hover:bg-blue-200/80 px-6 py-2 text-sm text-gray-100 dark:text-gray-900 dark:hover:text-gray-900 hover:text-gray-100 rounded-full font-semibold"
                  onClick={goToNext}
                >
                  Next
                </button>
              )}
              {questions && currentQuestion === questions.length - 1 ? (
                isCaptchaVerified ? (
                  <button
                    onClick={handleSubmit}
                    className="cursor-pointer bg-blue-600 dark:bg-blue-200 hover:bg-blue-600/80 dark:hover:bg-blue-200/80 px-6 py-2 text-sm text-gray-100 dark:text-gray-900 dark:hover:text-gray-900 hover:text-gray-100 rounded-full font-semibold"
                  >
                    Submit
                    <Confetti active={showConfetti} />
                  </button>
                ) : (
                  <span className="text-sm text-gray-900 dark:text-gray-100">
                    Missing captcha.
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
                  ? "Congratulations! All the answers are correct!"
                  : "Something's wrong. Check your answers."}
              </div>
            )}
          </div>
        </div>

        {/* Reward */}
        {isCorrect && (
          <div className="mt-10 mx-auto border-t border-gray-900/20 dark:border-gray-100/20 pt-10 animate__animated animate__FadeIn">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Claim your reward
            </h2>
            <div className="mt-6 py-6 px-4 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-900/10 dark:border-gray-100/10">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                You will get 0.1 TROTEL {/* change this value */}
              </h3>
              <div className="mt-6 items-center">
                <button className="bg-blue-600 dark:bg-blue-200 hover:bg-blue-600/80 dark:hover:bg-blue-200/80 px-6 py-2 text-sm text-gray-100 dark:text-gray-900 dark:hover:text-gray-900 hover:text-gray-100 rounded-full font-semibold">
                  {" "}
                  {/* onclick={} */}
                  Receive my crypto
                </button>
                <Confetti active={showConfettiReward} />
              </div>
              {/* Add this mechanism and confetti */}
              {/* {trotelClaimed && (
        <div
          className={`mt-6 animate__animated animate__fadeIn ${
            isCorrect
              ? "text-green-600 dark:text-green-200"
              : "text-red-600 dark:text-red-200"
          }`}
        >
          {isCorrect
            ? "Congratulations! All the answers are correct!"
            : "Something's wrong. Check your answers."}
        </div>
        )} */}
            </div>
          </div>
        )}
        <GoHomeButton />
      </>
    );
  };

  return (
    <>
      {isDisconnected && tier !== "Beginner"
        ? renderUnauthorizedContent()
        : !available ||
          tier !== "Beginner" &&
          ((tier === "Intermediate" && intermediateBalance < 1) ||
            (tier === "Expert" && expertBalance < 1))
        ? renderUnauthorizedContent()
        : renderCourseContent()}
    </>
  );
};

export default CoursePage;
