import React, { Fragment, useContext, useEffect, useState } from "react";
import type { Lang } from "@/types/lang";
import type { Cards } from "@/types/components/cards";
import GetStarted from "@/app/[lang]/[quizId]/components/getStarted";
import Card from "@/app/[lang]/[quizId]/components/card";
import { Dialog, Transition } from "@headlessui/react";
import BlueButton from "@/app/[lang]/components/blueButton";
import CourseFinishedContext from "@/app/[lang]/contexts/courseFinishedContext";
import AudioContext from "@/app/[lang]/contexts/audioContext";
import AudioSelector from "@/app/[lang]/components/selectors/audioSelector";
import ThemeSelector from "@/app/[lang]/components/selectors/themeSelector";
import BlueSimpleButton from "@/app/[lang]/components/blueSimpleButton";
import { useKeyPressed } from "@react-hooks-library/core";
import { XMarkIcon } from "@heroicons/react/20/solid";

const Course = ({
  cards,
  lang,
  conditionIsOkay,
}: {
  cards: Cards;
  lang: Lang;
  conditionIsOkay: boolean;
}) => {
  const [fullscreen, setFullScreen] = useState<boolean>(false);
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
  const [width, setWidth] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [pause, setPause] = useState<boolean>(false);

  const { setIsCourseFinished } = useContext(CourseFinishedContext);
  const { playAudio } = useContext(AudioContext);

  const handleNext = () => {
    if (currentCardIndex >= cards.en.length - 1) {
      return;
    }
    setCurrentIndex(-1);
    setPause(true);
    setTimeout(() => {
      setCurrentCardIndex((prev) => Math.min(prev + 1, cards.en.length - 1));
      setPause(false);
    }, 400);
  };

  const handlePrevious = () => {
    if (currentCardIndex <= 0) {
      return;
    }
    setCurrentIndex(-1);
    setPause(true);
    setTimeout(() => {
      setCurrentCardIndex((prev) => Math.max(prev - 1, 0));
      setPause(false);
    }, 400);
  };

  useEffect(() => {
    if (currentCardIndex === 0) {
      setWidth(0);
    } else {
      const width = ((currentCardIndex + 1) / cards.en.length) * 100;
      setWidth(width);
    }
  }, [currentCardIndex]);

  useEffect(() => {
    if (!fullscreen) {
      setCurrentCardIndex(0);
      setWidth(0);
      setIsLoading(false);
    }
  }, [fullscreen]);

  useKeyPressed(["ArrowRight"], (e) => {
    handleNext();
    e.preventDefault();
  });

  useKeyPressed(["ArrowLeft"], (e) => {
    handlePrevious();
    e.preventDefault();
  });

  return (
    <>
      <GetStarted lang={lang} setFullScreen={setFullScreen} />

      <Transition as={Fragment} show={fullscreen}>
        <Dialog
          as="div"
          className="z-50 fixed top-0 left-0 w-full h-screen bg-white dark:bg-gray-900"
          onClose={() => setFullScreen(false)}
        >
          <div className="flex flex-1 justify-between items-center gap-6 p-6 border-b border-gray-900/10 dark:border-gray-100/10">
            <span className="text-gray-900 dark:text-gray-100 flex w-12 justify-center items-center font-semibold">
              {currentCardIndex + 1}/{cards.en.length}
            </span>

            <div className="overflow-hidden w-1/2 h-2 text-xs bg-gray-400 flex rounded-full">
              <div
                style={{
                  width: `${width}%`,
                  transition: "width 0.2s ease-in",
                }}
                className="rounded-full h-2 bg-blue-500"
              />
            </div>

            <div className="flex items-center gap-2">
              <AudioSelector />
              <div className="hidden md:block">
                <ThemeSelector />
              </div>

              <BlueSimpleButton onClick={() => setFullScreen(false)}>
                <XMarkIcon className="h-5 w-5" />
              </BlueSimpleButton>
            </div>
          </div>
          <div
            className="flex justify-center items-center mx-8"
            style={{ height: "calc(100vh - 185px)" }}
          >
            <div className="max-w-xl mx-auto text-center w-full">
              {lang === "en" ? (
                <Card
                  text={cards.en[currentCardIndex].text}
                  currentIndex={currentIndex}
                  setCurrentIndex={setCurrentIndex}
                  pause={pause}
                />
              ) : (
                <Card
                  text={cards.fr[currentCardIndex].text}
                  currentIndex={currentIndex}
                  setCurrentIndex={setCurrentIndex}
                  pause={pause}
                />
              )}
            </div>
          </div>
          <div className="fixed bottom-0 left-0 right-0 px-6 py-6 pb-10 md:p-6 border-t border-gray-900/10 dark:border-gray-100/10">
            <div className="flex justify-between items-center mx-auto">
              <BlueButton
                onClick={() => handlePrevious()}
                lang={lang}
                text={lang === "en" ? "Previous" : "Précédent"}
                disabled={currentCardIndex === 0}
              />
              <div
                className={`${
                  currentCardIndex === cards.en.length - 1 && "hidden"
                }`}
              >
                <BlueButton
                  onClick={() => handleNext()}
                  lang={lang}
                  text={lang === "en" ? "Next" : "Suivant"}
                  disabled={currentCardIndex > cards.en.length - 1}
                />
              </div>
              <div
                className={`${
                  currentCardIndex < cards.en.length - 1 && "hidden"
                }`}
              >
                <BlueButton
                  lang={lang}
                  showConfetti={isLoading}
                  isLoading={isLoading}
                  disabled={
                    currentCardIndex < cards.en.length - 1 || !conditionIsOkay
                  }
                  onClick={() => {
                    if (conditionIsOkay) {
                      setIsCourseFinished(true);
                      playAudio("courseFinished");
                      setIsLoading(true);
                      setTimeout(() => {
                        setFullScreen(false);
                      }, 2000);
                    }
                  }}
                  text={lang === "en" ? "Do the quiz" : "Faire le quiz"}
                />
              </div>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Course;
