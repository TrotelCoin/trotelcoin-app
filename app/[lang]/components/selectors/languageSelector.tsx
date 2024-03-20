"use client";

import React, { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { usePathname, useRouter } from "next/navigation";
import type { Lang } from "@/types/lang";
import BlueSimpleButton from "@/app/[lang]/components/blueSimpleButton";
import { LanguageIcon } from "@heroicons/react/20/solid";

interface Language {
  code: string;
  label: string;
}

const LanguageSelector = ({ lang }: { lang: Lang }) => {
  const [showMenu, setShowMenu] = useState(false);

  const router = useRouter();

  const languages = [
    { code: "en", label: "English 🇬🇧" },
    { code: "fr", label: "Français 🇫🇷" },
  ];

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

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <Menu as="div" className="relative inline-block text-center">
      <div>
        <BlueSimpleButton onClick={() => toggleMenu()}>
          <LanguageIcon className="w-5 h-5" />
        </BlueSimpleButton>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
        show={showMenu}
      >
        <Menu.Items className="origin-top-right rounded-xl absolute z-50 right-0 mt-4 shadow w-40 bg-white dark:bg-gray-800 border border-gray-900/10 dark:border-gray-100/10 focus:outline-none">
          <div className="p-2">
            {languages.map((language, index) => (
              <Menu.Item key={index}>
                {({ active }) => (
                  <button
                    onClick={() => onChangeLanguage(language)}
                    className={`${
                      active
                        ? "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        : "text-gray-900 dark:text-gray-100"
                    } hover:bg-gray-200 dark:hover:bg-gray-700 block px-4 py-2 text-sm w-full text-left rounded-xl`}
                  >
                    {language.label}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default LanguageSelector;
