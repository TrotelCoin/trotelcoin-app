"use client";

import React, { Fragment, useContext, useEffect, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { Modals } from "@/types/types";
import BlueButton from "@/app/[lang]/components/blueButton";
import AudioContext from "@/app/[lang]/contexts/audioContext";

const Fail: React.FC<Modals> = ({ title, show, message, onClose, lang }) => {
  const { audioEnabled } = useContext(AudioContext);

  const audioRef = useRef<HTMLAudioElement>(null);

  const playAudio = () => {
    if (audioRef.current && audioEnabled) {
      audioRef.current.play();
    }
  };

  useEffect(() => {
    if (show) {
      playAudio();
    }
  }, [show]);

  return (
    <>
      <audio ref={audioRef} src="/audio/sounds/fail-modal.wav" />
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
            <div className="fixed inset-0 backdrop-blur-sm bg-white/10 dark:bg-gray-700/10 transition-opacity" />
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
                <Dialog.Panel className="relative transform overflow-hidden rounded-xl backdrop-blur-xl border border-gray-900/10 dark:border-gray-100/10 bg-white dark:bg-gray-800 px-4 pb-4 pt-5 text-left transition-all my-8 w-full max-w-sm p-6">
                  <div>
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                      <ExclamationTriangleIcon
                        className="h-6 w-6 text-red-500"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-3 text-center sm:mt-5">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900 dark:text-gray-100"
                      >
                        {title}
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500 dark:text-gray-300">
                          {message}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6">
                    <BlueButton
                      onClick={onClose}
                      isFull={true}
                      text={lang === "en" ? "Close" : "Fermer"}
                    />
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

export default Fail;
