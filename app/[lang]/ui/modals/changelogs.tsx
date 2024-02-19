"use client";

import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";

export const version: string = "0.8.8";

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
          <div className="fixed inset-0 backdrop-blur-sm bg-white/10 dark:bg-gray-800/10 transition-opacity" />
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-xl border backdrop-blur-xl border-gray-900/20 dark:border-gray-100/40 bg-white dark:bg-gray-900 text-left transition-all my-8 w-full max-w-2xl p-6">
                <button
                  className="absolute top-4 right-4 p-1 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-full"
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
                        ? "- Claim your NFTs will be soon available"
                        : "- Récupère tes NFTs sera bientôt disponible"}
                    </p>
                  </div>
                  <div className="mt-8">
                    <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">
                      {lang === "en" ? "Features 👨‍💻" : "Fonctionnalités 👨‍💻"}
                    </h2>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {lang === "en"
                        ? "- We added leaderboard on a specific page"
                        : "- On a ajouté un classement sur une page spécifique"}
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {lang === "en"
                        ? "- We added lives depending on your quizzes answers"
                        : "- On a ajouté des vies en fonction de tes réponses aux quiz"}
                    </p>
                  </div>
                  <div className="mt-8">
                    <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">
                      {lang === "en" ? "Community 🦊" : "Communauté 🦊"}
                    </h2>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {lang === "en"
                        ? "- We will be having a lot of events on our Discord"
                        : "- On va organiser beaucoup d'événements sur notre Discord"}
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
                        ? "- You'll be able to stake your TrotelCoins to earn more of them"
                        : "- Vous pourrez staker vos TrotelCoins pour en gagner +"}
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {lang === "en"
                        ? "- You'll be able to claim your TrotelCoins from a dashboard"
                        : "- Vous pourrez réclamer vos TrotelCoins depuis un dashboard"}
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
