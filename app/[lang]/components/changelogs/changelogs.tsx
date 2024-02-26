"use client";

import { Lang } from "@/types/types";
import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";

const formatDate = (date: any) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Intl.DateTimeFormat("en-US", options).format(new Date(date));
};

const version = "1.1.1";

interface ChangelogItem {
  title: string;
  content: string[];
  isNew?: boolean;
}

const ChangelogSection = ({
  title,
  content,
  isNew,
  lang,
}: ChangelogItem & { lang: Lang }) => (
  <div className="mt-8">
    <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">
      {title}
    </h2>
    {content.map((item, index) => (
      <div key={index} className="flex gap-2 items-center">
        <p className="text-sm text-gray-700 dark:text-gray-300">{item}</p>
        {isNew && (
          <span className="inline-flex items-center rounded-full bg-blue-50 dark:bg-blue-400/10 px-2 py-1 text-xs font-medium text-blue-700 dark:text-blue-400 ring-1 ring-inset ring-blue-700/10 dark:ring-blue-400/30">
            {lang === "en" ? "New" : "Nouveau"}
          </span>
        )}
      </div>
    ))}
  </div>
);

const Changelogs = ({ lang }: { lang: Lang }) => {
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

  const changelogSections: ChangelogItem[] = [
    {
      title: lang === "en" ? "New courses 📚" : "Nouveaux cours 📚",
      content: [
        lang === "en"
          ? "- Create your first wallet is available"
          : "- Crée ton premier portefeuille est disponible",
      ],
      isNew: true,
    },
    {
      title: lang === "en" ? "Features 👨‍💻" : "Fonctionnalités 👨‍💻",
      content: [
        lang === "en"
          ? "- You can stake your TROTEL now"
          : "- Tu peux staker tes TROTEL maintenant",
        lang === "en"
          ? "- You can claim your TROTEL now"
          : "- Tu peux récupérer tes TROTEL maintenant",
        lang === "en"
          ? "- You can send your TROTEL and MATIC now"
          : "- Tu peux envoyer tes TROTEL et MATIC maintenant",
        lang === "en" ? "- We support ENS now" : "- On supporte ENS maintenant",
        lang === "en" ? "- We are adding badges" : "- On ajoute des badges",
        lang === "en"
          ? "- We added mobile footer for better navigation"
          : "- On a ajouté un footer mobile pour une meilleure navigation",
      ],
      isNew: false,
    },
    {
      title: lang === "en" ? "Community 🦊" : "Communauté 🦊",
      content: [
        lang === "en"
          ? "- We organize daily quizzes on the Discord"
          : "- On organise des quiz quotidiens sur le Discord",
        lang === "en"
          ? "- We reached $31k of market cap"
          : "- On a atteint 31k$ de capitalisation",
      ],
      isNew: false,
    },
    {
      title:
        lang === "en"
          ? "What about next updates? 🙈"
          : "Et les prochaines mises à jour? 🙈",
      content: [lang === "en" ? "- Some secrets..." : "- Quelques secrets..."],
      isNew: false,
    },
  ];

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
                    {formatDate(new Date())} - v{version}
                  </p>
                  {changelogSections.map((section, index) => (
                    <ChangelogSection key={index} {...section} lang={lang} />
                  ))}
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
