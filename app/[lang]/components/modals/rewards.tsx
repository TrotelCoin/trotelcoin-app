"use client";

import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useContext, useEffect } from "react";
import BlueButton from "@/app/[lang]/components/buttons/blue";
import AudioContext from "@/contexts/audio";
import type { Lang } from "@/types/language/lang";
import CountUp from "react-countup";
import TrotelCoinLogo from "@/app/[lang]/components/trotelCoinLogo";
import UserContext from "@/contexts/user";
import { Skeleton } from "@radix-ui/themes";
import { roundPrice } from "@/utils/price/roundPrice";
import TrotelPriceContext from "@/contexts/trotelPrice";

const pages = 4;

const RewardsModal = ({
  show,
  onClose,
  lang,
  rewards,
  courseTime,
  courseMark
}: {
  show: boolean;
  onClose: () => void;
  lang: Lang;
  rewards: number | null;
  courseTime: number;
  courseMark: number | null;
}) => {
  const [currentPage, setCurrentPage] = React.useState(1);

  const { playAudio } = useContext(AudioContext);
  const {
    userNumberOfQuizzesAnswered,
    userLevel,
    quizzesLeft,
    userTotalRewardsPending,
    learningTime
  } = useContext(UserContext);
  const { trotelPrice } = useContext(TrotelPriceContext);

  useEffect(() => {
    if (show) {
      playAudio("successModal");
    }
  }, [show, playAudio]);

  const handleNext = () => {
    if (currentPage < pages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
      <Transition.Root show={show} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 m-auto flex h-screen items-center justify-center"
          onClose={onClose}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-white/10 backdrop-blur-sm transition-opacity dark:bg-gray-700/10" />
          </Transition.Child>

          <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative my-8 w-full max-w-sm transform overflow-hidden rounded-xl border border-gray-900/10 bg-white p-6 px-4 pb-4 pt-5 text-left backdrop-blur-xl transition-all dark:border-gray-100/10 dark:bg-gray-800">
                  <div className="grid grid-cols-4 gap-2">
                    {Array.from({ length: pages }, (_, i) => i + 1).map(
                      (page) => (
                        <div
                          key={page}
                          className={`${
                            currentPage >= page
                              ? "bg-blue-500"
                              : "bg-gray-200 dark:bg-gray-700"
                          } rounded-lg py-1`}
                        />
                      )
                    )}
                  </div>
                  <div className="my-8 flex items-center justify-center">
                    {currentPage === 1 && (
                      <>
                        <div className="mt-2 flex flex-col items-center justify-center gap-2 text-center">
                          <h2 className="font-bold text-gray-900 dark:text-gray-100">
                            {lang === "en" ? "Rewards" : "Récompenses"}
                          </h2>
                          <div className="flex items-center justify-center gap-2">
                            <Skeleton loading={!rewards}>
                              <span className="text-2xl font-semibold text-gray-700 dark:text-gray-300">
                                <CountUp start={0} end={rewards as number} />{" "}
                              </span>
                              <TrotelCoinLogo width={24} height={24} />
                            </Skeleton>
                          </div>
                          <p className="text-sm text-gray-700 dark:text-gray-300">
                            {lang === "en"
                              ? `You have earned ${roundPrice(
                                  rewards as number
                                )} TROTEL, valued at $${roundPrice(
                                  (rewards as number) * (trotelPrice as number)
                                )}.`
                              : `Vous avez gagné ${roundPrice(
                                  rewards as number
                                )} TROTEL, d'une valeur de $${roundPrice(
                                  (rewards as number) * (trotelPrice as number)
                                )}.`}
                            {lang === "en"
                              ? "You have now"
                              : "Vous avez maintenant"}{" "}
                            <Skeleton loading={!userTotalRewardsPending}>
                              {Math.floor(userTotalRewardsPending as number)}{" "}
                              TROTEL
                            </Skeleton>{" "}
                            {lang === "en"
                              ? `pending that worth $${roundPrice(
                                  (userTotalRewardsPending as number) *
                                    (trotelPrice as number)
                                )}.`
                              : `en attente qui valent $${roundPrice(
                                  (userTotalRewardsPending as number) *
                                    (trotelPrice as number)
                                )}.`}
                          </p>
                        </div>
                      </>
                    )}
                    {currentPage === 2 && (
                      <>
                        <div className="mt-2 flex flex-col items-center justify-center gap-2 text-center">
                          <h2 className="font-bold text-gray-900 dark:text-gray-100">
                            {lang === "en"
                              ? "Quizzes answered"
                              : "Quiz répondus"}
                          </h2>
                          <Skeleton loading={!userNumberOfQuizzesAnswered}>
                            <p className="text-2xl font-semibold text-gray-700 dark:text-gray-300">
                              <CountUp
                                start={0}
                                end={userNumberOfQuizzesAnswered as number}
                              />{" "}
                              📚
                            </p>{" "}
                          </Skeleton>
                          <p className="text-sm text-gray-700 dark:text-gray-300">
                            {lang === "en" ? "You scored" : "Vous avez obtenu"}{" "}
                            <Skeleton loading={!courseMark}>
                              {Math.floor(courseMark as number)}/20
                            </Skeleton>{" "}
                            {lang === "en"
                              ? "on this course."
                              : "sur ce cours."}{" "}
                          </p>
                        </div>
                      </>
                    )}
                    {currentPage === 3 && (
                      <>
                        <div className="mt-2 flex flex-col items-center justify-center gap-2 text-center">
                          <h2 className="font-bold text-gray-900 dark:text-gray-100">
                            {lang === "en" ? "Level" : "Niveau"}
                          </h2>
                          <Skeleton loading={!userLevel}>
                            <p className="text-2xl font-semibold text-gray-700 dark:text-gray-300">
                              <CountUp start={0} end={userLevel ?? 1} /> 💊
                            </p>
                          </Skeleton>
                          <p className="text-sm text-gray-700 dark:text-gray-300">
                            <Skeleton loading={!quizzesLeft}>
                              {quizzesLeft as number}
                            </Skeleton>{" "}
                            {lang === "en"
                              ? "quizzes left until next level."
                              : "quiz restant avant le prochain niveau."}
                          </p>
                        </div>
                      </>
                    )}
                    {currentPage === 4 && (
                      <>
                        <div className="mt-2 flex flex-col items-center justify-center gap-2 text-center">
                          <h2 className="font-bold text-gray-900 dark:text-gray-100">
                            {lang === "en"
                              ? "Learning time"
                              : "Temps d'apprentissage"}
                          </h2>
                          <Skeleton loading={!courseTime}>
                            <span className="text-2xl font-semibold text-gray-700 dark:text-gray-300">
                              <CountUp
                                start={0}
                                end={
                                  courseTime ? Math.floor(courseTime * 1e-3) : 0
                                }
                                suffix="s ⏳"
                              />{" "}
                            </span>
                          </Skeleton>
                          <p className="text-sm text-gray-700 dark:text-gray-300">
                            {lang === "en"
                              ? `You're total learning time is ${Math.floor(learningTime as number) * 1e-3} seconds.`
                              : `Votre temps d'apprentissage total est de ${Math.floor(learningTime as number) * 1e-3} secondes.`}
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="flex w-full items-center justify-center gap-4">
                    {currentPage < pages ? (
                      <BlueButton
                        lang={lang}
                        isFull={true}
                        text={lang === "en" ? "Next" : "Suivant"}
                        onClick={() => handleNext()}
                      />
                    ) : (
                      <BlueButton
                        lang={lang}
                        onClick={(event: { stopPropagation: () => void }) => {
                          event?.stopPropagation();
                          onClose();
                        }}
                        isFull={true}
                        text={lang === "en" ? "Finish" : "Terminer"}
                      />
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default RewardsModal;
