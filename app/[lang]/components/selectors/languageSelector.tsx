"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import type { Lang } from "@/types/lang";
import { LanguageIcon } from "@heroicons/react/24/solid";
import * as Popover from "@radix-ui/react-popover";
import BlueSimplePopover from "@/app/[lang]/components/blueSimplePopover";

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
      <Popover.Trigger>
        <BlueSimplePopover>
          <LanguageIcon className="w-5 h-5" />
        </BlueSimplePopover>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          side="bottom"
          align="end"
          sideOffset={10}
          className="rounded-xl shadow-lg w-40 bg-blue-500 text-gray-100 focus:outline-none"
        >
          <div className="p-2">
            {languages.map((language, index) => (
              <ul key={index}>
                <li>
                  <button
                    onClick={() => onChangeLanguage(language)}
                    className={`hover:bg-blue-400 dark:hover:bg-blue-400 block p-2 text-sm w-full text-left rounded-xl`}
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
