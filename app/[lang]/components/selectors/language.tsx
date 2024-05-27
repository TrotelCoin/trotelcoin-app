"use client";

import React, { useContext } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { Lang } from "@/types/language/lang";
import { LanguageIcon } from "@heroicons/react/24/solid";
import * as Popover from "@radix-ui/react-popover";
import AudioContext from "@/contexts/audio";

interface Language {
  code: string;
  label: string;
}

const languages = [
  { code: "en", label: "English 🇬🇧" },
  { code: "fr", label: "Français 🇫🇷" },
];

const LanguageSelector = ({ lang }: { lang: Lang }) => {
  const router = useRouter();
  const pathname = usePathname();

  const { playAudio } = useContext(AudioContext);

  const onChangeLanguage = (language: Language) => {
    localStorage.setItem("lang", language.code);
    const newPathname = pathname?.replace(/^\/(en|fr)/, "");
    if (language.code === "fr") {
      router.replace(`/fr${newPathname}`);
    } else {
      router.replace(`/en${newPathname}`);
    }
  };

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button
          onClick={() => playAudio("blueButton")}
          className="flex bg-blue-500 hover:bg-blue-500/80 border-blue-700 border-b-4 active:border-none active:mt-1 text-sm font-semibold justify-center rounded-xl text-gray-100 backdrop-blur-xl px-4 py-2"
        >
          <LanguageIcon className="w-5 h-5" />
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          side="bottom"
          align="end"
          sideOffset={10}
          className="rounded-xl z-50 border border-gray-900/10 dark:border-gray-100/10 shadow-lg w-40 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none"
        >
          <div className="p-2">
            {languages.map((language, index) => (
              <ul key={index}>
                <li>
                  <button
                    onClick={() => onChangeLanguage(language)}
                    className={`hover:bg-gray-200 dark:hover:bg-gray-700 block p-2 text-sm w-full text-left rounded-xl`}
                  >
                    {language.label}
                  </button>
                </li>
              </ul>
            ))}
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default LanguageSelector;
