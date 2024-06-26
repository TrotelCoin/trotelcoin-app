"use client";

import type { Lang } from "@/types/language/lang";
import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { XMarkIcon } from "@heroicons/react/20/solid";

const formatDate = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric"
  };
  return new Intl.DateTimeFormat("en-US", options).format(new Date(date));
};

const version = "1.9.9";

interface ChangelogItem {
  title: string;
  content: { text: string; isNew?: boolean }[];
}

const ChangelogSection = ({
  title,
  content,
  lang
}: ChangelogItem & { lang: Lang }) => (
  <div className="mt-8">
    <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">
      {title}
    </h2>
    {content.map((item, index) => (
      <div key={index} className="flex items-center gap-2">
        <p className="text-sm text-gray-700 dark:text-gray-300">{item.text}</p>
        {item && item?.isNew && (
          <span className="inline-flex items-center rounded-full bg-blue-400 px-2 py-1 text-xs font-medium text-gray-100">
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
  }, []);

  const hide = () => {
    localStorage.setItem("changelogsState", "false");
    setChangeLogsVisible(false);
  };

  if (!changeLogsVisible) return null;

  const changelogSections: ChangelogItem[] = [
    {
      title: lang === "en" ? "New courses 📚" : "Nouveaux cours 📚",
      content: [
        {
          text:
            lang === "en"
              ? "- What is BIM Finance?"
              : "- Qu'est-ce BIM Finance?"
        },
        {
          text:
            lang === "en"
              ? "- What is Proof of Collective Intelligence?"
              : "- Qu'est-ce que la Preuve d'Intelligence Collective?"
        },
        {
          text:
            lang === "en"
              ? "- What is the Lightning Network?"
              : "- Qu'est-ce que le Lightning Network?"
        }
      ]
    },
    {
      title: lang === "en" ? "Features 👨‍💻" : "Fonctionnalités 👨‍💻",
      content: [
        {
          text:
            lang === "en"
              ? "- Adding images to courses"
              : "- Ajout d'images aux cours"
        },
        {
          text:
            lang === "en"
              ? "- Rebuilding the homepage"
              : "- On retravaille la page d'accueil"
        },
        {
          text:
            lang === "en"
              ? "- Added For You section"
              : "- On a ajouté la section Pour Vous"
        },
        {
          text:
            lang === "en"
              ? "- Added skeletons when fetching data"
              : "- On a ajouté des skeletons pour la récupération des données"
        }
      ]
    },
    {
      title: lang === "en" ? "Community 🦊" : "Communauté 🦊",
      content: [
        {
          text:
            lang === "en"
              ? "- We already whitelisted 150+ wallets"
              : "- Nous avons déjà whitelisté 150+ wallets"
        },
        {
          text:
            lang === "en"
              ? "- We listed on BIM Exchange"
              : "- Nous sommes listé sur BIM Exchange"
        },
        {
          text:
            lang === "en"
              ? "- We are adding our first Sponsor"
              : "- Nous ajoutons notre premier Sponsor"
        }
      ]
    },
    {
      title:
        lang === "en"
          ? "What about next updates? 🙈"
          : "Et les prochaines mises à jour? 🙈",
      content: [
        {
          text:
            lang === "en"
              ? "- We are working on Proof of Collective Intelligence"
              : "- Nous travaillons sur la Preuve d'Intelligence Collective"
        },
        {
          text:
            lang === "en"
              ? "- We are working on Quests"
              : "- Nous travaillons sur les Quêtes"
        }
      ]
    }
  ];

  return (
    <Transition.Root show={changeLogsVisible} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 m-auto flex h-screen items-center justify-center"
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
              <Dialog.Panel className="relative my-8 w-full max-w-2xl transform overflow-hidden rounded-xl border border-gray-900/10 bg-white p-6 text-left backdrop-blur-xl transition-all dark:border-gray-100/10 dark:bg-gray-800">
                <button
                  className="absolute right-4 top-4 rounded-full p-1 text-gray-900 hover:bg-gray-100 focus:outline-none dark:text-gray-100 dark:hover:bg-gray-700"
                  onClick={hide}
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
                <div>
                  <Dialog.Title
                    as="h3"
                    className="flex items-center gap-2 text-2xl font-bold leading-6 text-gray-900 dark:text-gray-100"
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
