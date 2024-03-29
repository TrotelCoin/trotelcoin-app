"use client";

import { Fragment, useEffect, useState, useContext } from "react";
import { Transition } from "@headlessui/react";
import { XCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import type { Lang } from "@/types/lang";
import AudioContext from "@/app/[lang]/contexts/audioContext";

export default function WarningNotification({
  title,
  message,
  lang,
  display,
  onDismiss,
}: {
  title: string;
  message: string;
  lang: Lang;
  display: boolean;
  onDismiss?: () => void;
}) {
  const [show, setShow] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(100);

  const { playAudio } = useContext(AudioContext);

  useEffect(() => {
    if (show) {
      playAudio("failModal");
    }
  }, [show]);

  useEffect(() => {
    if (display) {
      setShow(true);
    }
  }, [display]);

  useEffect(() => {
    if (show) {
      const duration = 3000;
      const initialProgress = 100;

      const timer = setTimeout(() => {
        setShow(false);
        if (onDismiss) {
          onDismiss();
        }
      }, duration);

      setProgress(initialProgress);

      const progressInterval = duration / initialProgress;

      const progressTimer = setInterval(() => {
        setProgress((prev) => prev - 1);
      }, progressInterval);

      return () => {
        clearTimeout(timer);
        clearInterval(progressTimer);
      };
    }
  }, [show]);

  return (
    <>
      <div
        aria-live="assertive"
        className="pointer-events-none fixed inset-0 flex items-start px-4 py-6 sm:items-start sm:p-6"
      >
        <div className="flex w-full flex-col items-center space-y-4 sm:items-start">
          <Transition
            show={show}
            as={Fragment}
            enter="transform ease-out duration-300 transition"
            enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
            enterTo="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-xl bg-white dark:bg-gray-900 shadow border border-gray-900/10 dark:border-gray-100/10">
              <div className="p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <XCircleIcon
                      className="h-6 w-6 text-red-500"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="ml-3 w-0 flex-1 pt-0.5">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {title}
                    </p>
                    <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
                      {message}
                    </p>
                    <div className="mt-2">
                      <div className="bg-gray-100 rounded-full h-2">
                        <div
                          className="bg-red-500 rounded-full h-2"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="ml-4 flex flex-shrink-0">
                    <button
                      type="button"
                      className="inline-flex p-2 -mt-2 -mr-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none"
                      onClick={() => {
                        setShow(false);
                      }}
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </>
  );
}
