import React, { Fragment, useContext, useEffect, useState } from "react";
import type { Lang } from "@/types/language/lang";
import type { Cards } from "@/types/components/cards";
import GetStarted from "@/app/[lang]/components/courses/buttons/getStarted";
import Card from "@/app/[lang]/components/courses/courseScreen/card";
import { Dialog, Transition } from "@headlessui/react";
import BlueButton from "@/app/[lang]/components/buttons/blue";
import CourseFinishedContext from "@/contexts/courseFinished";
import AudioContext from "@/contexts/audio";
import AudioSelector from "@/app/[lang]/components/selectors/audio";
import ThemeSelector from "@/app/[lang]/components/selectors/theme";
import BlueSimpleButton from "@/app/[lang]/components/buttons/blueSimple";
import { useKeyPressed } from "@react-hooks-library/core";
import { XMarkIcon } from "@heroicons/react/20/solid";

const Course = ({
  cards,
  lang,
  conditionIsOkay
}: {
  cards: Cards;
  lang: Lang;
  conditionIsOkay: boolean;
}) => {
  const [fullscreen, setFullScreen] = useState<boolean>(false);
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
  const [width, setWidth] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { setIsCourseFinished } = useContext(CourseFinishedContext);
  const { playAudio } = useContext(AudioContext);

  const handleNext = () => {
    if (currentCardIndex >= cards.en.length - 1) {
      return;
    }

    setCurrentCardIndex((prev) => Math.min(prev + 1, cards.en.length - 1));
  };

  const handlePrevious = () => {
    if (currentCardIndex <= 0) {
      return;
    }

    setCurrentCardIndex((prev) => Math.max(prev - 1, 0));
  };

  useEffect(() => {
    if (currentCardIndex === 0) {
      setWidth(0);
    } else {
      const width = ((currentCardIndex + 1) / cards.en.length) * 100;
      setWidth(width);
    }
  }, [currentCardIndex, cards]);

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
          className="fixed left-0 top-0 z-50 h-screen w-full bg-white dark:bg-gray-900"
          onClose={() => setFullScreen(false)}
        >
          <div className="flex flex-1 items-center justify-between gap-6 border-b border-gray-900/10 p-6 dark:border-gray-100/10">
            <span className="flex w-12 items-center justify-center font-semibold text-gray-900 dark:text-gray-100">
              {currentCardIndex + 1}/{cards.en.length}
            </span>

            <div className="flex h-2 w-1/2 overflow-hidden rounded-full bg-gray-400 text-xs">
              <div
                style={{
                  width: `${width}%`,
                  transition: "width 0.2s ease-in"
                }}
                className="h-2 rounded-full bg-blue-500"
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
            className="mx-8 flex items-center justify-center"
            style={{ height: "calc(100vh - 185px)" }}
          >
            <div
              className={`mx-auto flex w-full max-w-xl flex-col items-center justify-stretch gap-2 text-center`}
            >
              {lang === "en" ? (
                <Card
                  title={cards.en[currentCardIndex].title}
                  text={cards.en[currentCardIndex].text}
                  video={cards.en[currentCardIndex].video}
                />
              ) : (
                <Card
                  title={cards.fr[currentCardIndex].title}
                  text={cards.fr[currentCardIndex].text}
                  video={cards.fr[currentCardIndex].video}
                />
              )}
            </div>
          </div>
          <div className="fixed bottom-0 left-0 right-0 border-t border-gray-900/10 px-6 py-6 pb-10 dark:border-gray-100/10 md:p-6">
            <div className="mx-auto flex items-center justify-between">
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
