import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import { Lang } from "@/types/lang";
import BlueButton from "@/app/[lang]/components/blueButton";
import WhiteButton from "@/app/[lang]/components/whiteButton";

export default function WarningConfirmation({
  lang,
  show,
  title,
  message,
  onConfirm,
  onClose,
}: {
  lang: Lang;
  show: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onClose: () => void;
}) {
  return (
    <Transition.Root show={show} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-xl bg-white dark:bg-gray-800 border border-gray-900/10 dark:border-gray-100/10 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div>
                  <div className="flex justify-center items-center mx-auto">
                    <ExclamationTriangleIcon
                      className="h-6 w-6 text-yellow-500 dark:text-yellow-300"
                      aria-hidden="true"
                    />
                  </div>

                  <div className="mt-2 text-center sm:mt-4">
                    <Dialog.Title
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900 dark:text-gray-100"
                    >
                      {title}
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        {message}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 flex items-center gap-4">
                  <WhiteButton
                    text={lang === "en" ? "Cancel" : "Annuler"}
                    isFull={true}
                    lang={lang}
                    onClick={() => onClose()}
                  />

                  <BlueButton
                    lang={lang}
                    isFull={true}
                    text={lang === "en" ? "Confirm" : "Confirmer"}
                    onClick={() => {
                      onConfirm();
                      onClose();
                    }}
                  />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
