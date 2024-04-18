"use client";

import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useContext, useEffect } from "react";
import BlueButton from "@/app/[lang]/components/blueButton";
import AudioContext from "@/app/[lang]/contexts/audioContext";
import type { Lang } from "@/types/lang";
import CountUp from "react-countup";
import TrotelCoinLogo from "@/app/[lang]/components/trotelCoinLogo";
import UserContext from "@/app/[lang]/contexts/userContext";

const RewardsModal = ({
  show,
  onClose,
  lang,
  rewards,
}: {
  show: boolean;
  onClose: () => void;
  lang: Lang;
  rewards: number;
}) => {
  const [pages, setPages] = React.useState(4);
  const [currentPage, setCurrentPage] = React.useState(1);

  const { playAudio } = useContext(AudioContext);
  const {
    userNumberOfQuizzesAnswered,
    userLevel,
    quizzesLeft,
    averageMark,
    userTotalRewardsPending,
    learningTime,
  } = useContext(UserContext);

  useEffect(() => {
    if (show) {
      playAudio("successModal");
    }
  }, [show]);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

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
          className="fixed inset-0 flex z-50 items-center justify-center h-screen m-auto"
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
            <div className="fixed inset-0 backdrop-blur-sm bg-gray-50/10 dark:bg-gray-700/10 transition-opacity" />
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
                <Dialog.Panel className="relative transform overflow-hidden rounded-xl border backdrop-blur-xl border-gray-900/10 dark:border-gray-100/10 bg-white dark:bg-gray-800 px-4 pb-4 pt-5 text-left transition-all my-8 w-full max-w-sm p-6">
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
                  <div className="my-8 flex justify-center items-center">
                    {currentPage === 1 && (
                      <>
                        <div className="mt-2 text-center flex flex-col items-center gap-2 justify-center">
                          <h2 className="text-gray-900 dark:text-gray-100 font-bold">
                            {lang === "en" ? "Rewards" : "Récompenses"}
                          </h2>
                          <div className="flex items-center justify-center gap-2">
                            <span className="text-2xl font-semibold text-gray-700 dark:text-gray-300">
                              <CountUp start={0} end={rewards} />{" "}
                            </span>
                            <TrotelCoinLogo width={24} height={24} />
                          </div>
                          <p className="text-sm text-gray-700 dark:text-gray-300">
                            {lang === "en"
                              ? "You have now"
                              : "Vos avez maintenant"}{" "}
                            {Math.floor(userTotalRewardsPending)} TROTEL{" "}
                            {lang === "en" ? "pending" : "en attente"}
                          </p>
                        </div>
                      </>
                    )}
                    {currentPage === 2 && (
                      <>
                        <div className="mt-2 text-center flex flex-col items-center gap-2 justify-center">
                          <h2 className="text-gray-900 dark:text-gray-100 font-bold">
                            {lang === "en"
                              ? "Quizzes answered"
                              : "Quiz répondus"}
                          </h2>
                          <p className="text-2xl font-semibold text-gray-700 dark:text-gray-300">
                            <CountUp
                              start={0}
                              end={userNumberOfQuizzesAnswered}
                            />{" "}
                            📚
                          </p>
                          <p className="text-sm text-gray-700 dark:text-gray-300">
                            {lang === "en"
                              ? "With an average mark of"
                              : "Avec une note moyenne de"}{" "}
                            {Math.floor(averageMark)}/20
                          </p>
                        </div>
                      </>
                    )}
                    {currentPage === 3 && (
                      <>
                        <div className="mt-2 text-center flex flex-col items-center gap-2 justify-center">
                          <h2 className="text-gray-900 dark:text-gray-100 font-bold">
                            {lang === "en" ? "Level" : "Niveau"}
                          </h2>
                          <p className="text-2xl font-semibold text-gray-700 dark:text-gray-300">
                            <CountUp start={0} end={userLevel} /> 💊
                          </p>
                          <p className="text-sm text-gray-700 dark:text-gray-300">
                            {quizzesLeft}{" "}
                            {lang === "en"
                              ? "quizzes left until next level"
                              : "quiz restant avant le prochain niveau"}
                          </p>
                        </div>
                      </>
                    )}
                    {currentPage === 4 && (
                      <>
                        <div className="mt-2 text-center flex flex-col items-center gap-2 justify-center">
                          <h2 className="text-gray-900 dark:text-gray-100 font-bold">
                            {lang === "en"
                              ? "Learning time"
                              : "Temps d'apprentissage"}
                          </h2>
                          <span className="text-2xl font-semibold text-gray-700 dark:text-gray-300">
                            <CountUp
                              start={0}
                              end={Math.floor((learningTime * 1e-3) / 60)}
                              suffix="m ⏳"
                            />{" "}
                          </span>
                          <p className="text-sm text-gray-700 dark:text-gray-300">
                            {lang === "en"
                              ? "Keep learning to get more rewards"
                              : "Continuez à apprendre pour obtenir plus de récompenses"}
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="flex items-center justify-center w-full gap-4">
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
