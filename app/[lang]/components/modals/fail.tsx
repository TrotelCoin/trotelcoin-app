"use client";

import React, { Fragment, useContext, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { Modals } from "@/types/components/modals";
import BlueButton from "@/app/[lang]/components/buttons/blue";
import AudioContext from "@/contexts/audio";

const Fail: React.FC<Modals> = ({ title, show, message, onClose, lang }) => {
  const { playAudio } = useContext(AudioContext);

  useEffect(() => {
    if (show) {
      playAudio("failModal");
    }
  }, [show, playAudio]);

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
                      lang={lang}
                      onClick={(event: { stopPropagation: () => void }) => {
                        event?.stopPropagation();
                        onClose();
                      }}
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
