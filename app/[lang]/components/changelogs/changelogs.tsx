"use client";

import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";

export const version: string = "1.0.0";

const Changelogs = ({ lang }: { lang: string }) => {
  const [changeLogsVisible, setChangeLogsVisible] = React.useState(true);

  React.useEffect(() => {
    const storedState = localStorage.getItem("changelogsState");
    if (
      storedState === null ||
      version !== localStorage.getItem("changelogsVersion")
    ) {
      setChangeLogsVisible(true);
      localStorage.setItem("changelogsState", "true");
      localStorage.setItem("changelogsVersion", version);
    } else {
      setChangeLogsVisible(storedState === "true");
    }
  }, [version]);

  const hide = () => {
    localStorage.setItem("changelogsState", "false");
    setChangeLogsVisible(false);
  };

  if (!changeLogsVisible) return null;

  return (
    <Transition.Root show={changeLogsVisible} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 flex z-50 items-center justify-center h-screen m-auto"
        onClose={() => {}}
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-xl border backdrop-blur-xl border-gray-900/20 dark:border-gray-100/20 bg-white dark:bg-gray-800 text-left transition-all my-8 w-full max-w-2xl p-6">
                <button
                  className="absolute top-4 right-4 p-1 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-full"
                  onClick={hide}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                </button>
                <div>
                  <Dialog.Title
                    as="h3"
                    className="text-2xl font-bold leading-6 text-gray-900 dark:text-gray-100 items-center flex gap-2"
                  >
                    Changelogs
                  </Dialog.Title>
                  <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                    February 19, 2024 - v{version}
                  </p>
                  <div className="mt-8">
                    <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">
                      {lang === "en" ? "New courses 📚" : "Nouveaux cours 📚"}
                    </h2>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {lang === "en"
                        ? "- Claim your NFTs is available"
                        : "- Récupère tes NFTs est disponible"}
                    </p>
                  </div>
                  <div className="mt-8">
                    <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">
                      {lang === "en" ? "Features 👨‍💻" : "Fonctionnalités 👨‍💻"}
                    </h2>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {lang === "en"
                        ? "- You can stake your TROTEL now"
                        : "- Tu peux staker tes TROTEL maintenant"}
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {lang === "en"
                        ? "- You can claim your TROTEL now"
                        : "- Tu peux récupérer tes TROTEL maintenant"}
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {lang === "en"
                        ? "- You can send your TROTEL and MATIC now"
                        : "- Tu peux envoyer tes TROTEL et MATIC maintenant"}
                    </p>
                  </div>
                  <div className="mt-8">
                    <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">
                      {lang === "en" ? "Community 🦊" : "Communauté 🦊"}
                    </h2>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {lang === "en"
                        ? "- We organize daily quizzes on the Discord"
                        : "- On organise des quiz quotidiens sur le Discord"}
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {lang === "en"
                        ? "- We reached $31k of market cap"
                        : "- On a atteint 31k$ de capitalisation"}
                    </p>
                  </div>
                  <div className="mt-8">
                    <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">
                      {lang === "en"
                        ? "What about next updates? 🙈"
                        : "Et les prochaines mises à jour? 🙈"}
                    </h2>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {lang === "en"
                        ? "- Some secrets..."
                        : "- Quelques secrets..."}
                    </p>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Changelogs;
