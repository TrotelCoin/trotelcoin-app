"use client";

import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";

const version: string = "0.8.6";

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
              <Dialog.Panel className="relative transform overflow-hidden rounded-xl border backdrop-blur-xl border-gray-900/10 dark:border-gray-100/10 bg-white dark:bg-gray-900 text-left transition-all my-8 w-full max-w-2xl p-6">
                <button
                  className="absolute top-4 right-4 p-1 hover:bg-gray-100 dark:bg-gray-800 rounded-full duration-500"
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
                    February 3, 2024 - v{version}
                  </p>
                  <div className="mt-8">
                    <h2 className="text-base font-semibold">
                      {lang === "en" ? "New courses 📚" : "Nouveaux cours 📚"}
                    </h2>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {lang === "en"
                        ? "- Introduction to TrotelCoin is now available"
                        : "- Introduction à TrotelCoin est maintenant disponible"}
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {lang === "en"
                        ? "- We are cooking 3 other courses"
                        : "- Nous préparons 3 autres cours"}
                    </p>
                  </div>
                  <div className="mt-8">
                    <h2 className="text-base font-semibold">
                      {lang === "en" ? "Features 👨‍💻" : "Fonctionnalités 👨‍💻"}
                    </h2>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {lang === "en"
                        ? "- More transparency about the algorithm on Statistics page"
                        : "- + de transparence sur l'algorithme sur la page Statistiques"}
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {lang === "en"
                        ? "- New label to indicate new courses on the homepage"
                        : "- Nouveau label pour indiquer les nouveaux cours sur la page d'accueil"}
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {lang === "en"
                        ? "- Give feedback about TrotelCoin in your account page"
                        : "- Donne ton avis sur TrotelCoin dans ta page de compte"}
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {lang === "en"
                        ? "- Increase your streaks every day on the Learn page"
                        : "- Augmente tes séries tous les jours sur la page Apprendre"}
                    </p>
                  </div>
                  <div className="mt-8">
                    <h2 className="text-base font-semibold">
                      {lang === "en" ? "Community 🦊" : "Communauté 🦊"}
                    </h2>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {lang === "en"
                        ? "- We've been interviewed by cryptonaute.fr"
                        : "- Nous avons été interviewés par cryptonaute.fr"}
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {lang === "en"
                        ? "- We gonna list on ProductHunt and dApps websites"
                        : "- On va lister sur ProductHunt et des sites de dApps"}
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {lang === "en"
                        ? "- We reached 1200 followers on X / Twitter"
                        : "- On a atteint 1200 followers sur X / Twitter"}
                    </p>
                  </div>
                  <div className="mt-8">
                    <h2 className="text-base font-semibold">
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
