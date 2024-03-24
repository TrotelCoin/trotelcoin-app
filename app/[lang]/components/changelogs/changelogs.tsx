"use client";

import type { Lang } from "@/types/lang";
import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { XMarkIcon } from "@heroicons/react/20/solid";

const formatDate = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Intl.DateTimeFormat("en-US", options).format(new Date(date));
};

const version = "1.8.3";

interface ChangelogItem {
  title: string;
  content: { text: string; isNew: boolean | undefined }[];
}

const ChangelogSection = ({
  title,
  content,
  lang,
}: ChangelogItem & { lang: Lang }) => (
  <div className="mt-8">
    <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">
      {title}
    </h2>
    {content.map((item, index) => (
      <div key={index} className="flex gap-2 items-center">
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
        {
          text: lang === "en" ? "- Web3 Essentials" : "- Les bases du Web3",
          isNew: false,
        },
        {
          text:
            lang === "en"
              ? "- Consensus Mechanisms"
              : "- Les Mécanismes de Consensus",
          isNew: false,
        },
        {
          text: lang === "en" ? "- The Layers 2" : "- Les Layers 2",
          isNew: true,
        },
      ],
    },
    {
      title: lang === "en" ? "Features 👨‍💻" : "Fonctionnalités 👨‍💻",
      content: [
        {
          text:
            lang === "en"
              ? "- We fixed some bugs with staking"
              : "- Nous avons corrigé quelques bugs avec le staking",
          isNew: true,
        },
        {
          text:
            lang === "en"
              ? "- We fixed some bugs for swapping and bridging"
              : "- Nous avons corrigé quelques bugs pour le swap et le bridge",
          isNew: true,
        },
        {
          text:
            lang === "en"
              ? "- Native tokens are not yet supported for swapping"
              : "- Les tokens natifs ne sont pas encore supportés pour le swap",
          isNew: true,
        },
      ],
    },
    {
      title: lang === "en" ? "Community 🦊" : "Communauté 🦊",
      content: [
        {
          text:
            lang === "en"
              ? "- We launched a Liquid Bootstrapping Pool"
              : "- Nous avons lancé une Liquid Bootstrapping Pool",
          isNew: true,
        },
      ],
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
              ? "- The shop will be available in the next month"
              : "- La boutique sera disponible le mois prochain",
          isNew: true,
        },
        {
          text:
            lang === "en"
              ? "Support native tokens for swapping"
              : "Support des tokens natifs pour le swap",
          isNew: true,
        },
      ],
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-xl border backdrop-blur-xl border-gray-900/10 dark:border-gray-100/10 bg-white dark:bg-gray-800 text-left transition-all my-8 w-full max-w-2xl p-6">
                <button
                  className="absolute top-4 right-4 p-1 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-full focus:outline-none"
                  onClick={hide}
                >
                  <XMarkIcon className="h-6 w-6" />
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
