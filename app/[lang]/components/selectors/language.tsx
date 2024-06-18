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
  { code: "fr", label: "Français 🇫🇷" }
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
          className="flex justify-center rounded-xl border-b-4 border-blue-700 bg-blue-500 px-4 py-2 text-sm font-semibold text-gray-100 backdrop-blur-xl hover:bg-blue-500/80 active:mt-1 active:border-none"
        >
          <LanguageIcon className="h-5 w-5" />
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          side="bottom"
          align="end"
          sideOffset={10}
          className="z-50 w-40 rounded-xl border border-gray-900/10 bg-white text-gray-900 shadow-lg focus:outline-none dark:border-gray-100/10 dark:bg-gray-800 dark:text-gray-100"
        >
          <div className="p-2">
            {languages.map((language, index) => (
              <ul key={index}>
                <li>
                  <button
                    onClick={() => onChangeLanguage(language)}
                    className={`block w-full rounded-lg p-2 text-left text-sm hover:bg-gray-200 dark:hover:bg-gray-700`}
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
