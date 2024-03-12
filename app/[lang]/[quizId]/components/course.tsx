import React, {
  Fragment,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";
import { Lang, Cards } from "@/types/types";
import GetStarted from "@/app/[lang]/[quizId]/components/getStarted";
import Card from "@/app/[lang]/[quizId]/components/card";
import { Dialog, Transition } from "@headlessui/react";
import BlueButton from "@/app/[lang]/components/blueButton";
import CourseFinishedContext from "@/app/[lang]/contexts/courseFinishedContext";
import AudioContext from "@/app/[lang]/contexts/audioContext";
import AudioSelector from "@/app/[lang]/components/selectors/audioSelector";
import ThemeSelector from "@/app/[lang]/components/selectors/themeSelector";
import BlueSimpleButton from "@/app/[lang]/components/blueSimpleButton";

const Course = ({ cards, lang }: { cards: Cards; lang: Lang }) => {
  const [fullscreen, setFullScreen] = useState<boolean>(false);
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
  const [width, setWidth] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { setIsCourseFinished } = useContext(CourseFinishedContext);
  const { audioEnabled } = useContext(AudioContext);

  const audioRef = useRef<HTMLAudioElement>(null);

  const playAudio = () => {
    if (audioEnabled && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  const handleNext = () => {
    setCurrentCardIndex((prev) => prev + 1);
  };

  const handlePrevious = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex((prev) => prev - 1);
    }
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

  return (
    <>
      <audio ref={audioRef} src="/audio/sounds/course-finished.wav" />

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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
                </svg>
              </BlueSimpleButton>
            </div>
          </div>
          <div
            className="flex justify-center items-center mx-8"
            style={{ height: "calc(100vh - 185px)" }}
          >
            <div className="max-w-xl mx-auto text-center">
              {lang === "en" ? (
                <Card text={cards.en[currentCardIndex].text} />
              ) : (
                <Card text={cards.fr[currentCardIndex].text} />
              )}
            </div>
          </div>
          <div className="fixed bottom-0 left-0 right-0 px-6 py-6 pb-10 md:p-6 border-t border-gray-900/10 dark:border-gray-100/10">
            <div className="flex justify-between items-center mx-auto">
              <BlueButton
                onClick={() => handlePrevious()}
                lang={lang}
                text={lang === "en" ? "Previous" : "Précédent"}
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
                  onClick={() => {
                    setIsCourseFinished(true);
                    playAudio();
                    setIsLoading(true);
                    setTimeout(() => {
                      setFullScreen(false);
                    }, 2000);
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
