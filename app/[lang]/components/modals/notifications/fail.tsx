"use client";

import { Fragment, useEffect, useState, useContext } from "react";
import { Transition } from "@headlessui/react";
import { XCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import type { Lang } from "@/types/language/lang";
import AudioContext from "@/contexts/audio";

export default function WarningNotification({
  title,
  message,
  lang,
  display,
  onClose
}: {
  title: string;
  message: string;
  lang: Lang;
  display: boolean;
  onClose?: () => void;
}) {
  const [show, setShow] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(100);

  const { playAudio } = useContext(AudioContext);

  useEffect(() => {
    if (show) {
      playAudio("failModal");
    }
  }, [show, playAudio]);

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
        if (onClose) {
          onClose();
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
  }, [show, onClose]);

  return (
    <>
      <div
        aria-live="assertive"
        className="pointer-events-none fixed inset-0 z-50 flex items-start px-4 py-6 sm:items-start sm:p-6"
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
            <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-xl border border-gray-900/10 bg-white shadow dark:border-gray-100/10 dark:bg-gray-900">
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
                      <div className="h-2 rounded-full bg-gray-100">
                        <div
                          className="h-2 rounded-full bg-red-500"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="ml-4 flex flex-shrink-0">
                    <button
                      type="button"
                      className="-mr-2 -mt-2 inline-flex rounded-full p-2 text-gray-700 hover:bg-gray-100 focus:outline-none dark:text-gray-300 dark:hover:bg-gray-800"
                      onClick={() => {
                        setShow(false);
                        if (onClose) {
                          onClose();
                        }
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
