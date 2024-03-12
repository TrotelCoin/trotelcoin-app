"use client";

import React, { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { usePathname, useRouter } from "next/navigation";
import { Lang } from "@/types/types";
import BlueSimpleButton from "@/app/[lang]/components/blueSimpleButton";

interface Language {
  code: string;
  label: string;
}

const LanguageSelector = ({ lang }: { lang: Lang }) => {
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

  return (
    <Menu as="div" className="relative inline-block text-center">
      <div>
        <Menu.Button>
          <BlueSimpleButton onClick={() => {}}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-1.503.204A6.5 6.5 0 1 1 7.95 3.83L6.927 5.62a1.453 1.453 0 0 0 1.91 2.02l.175-.087a.5.5 0 0 1 .224-.053h.146a.5.5 0 0 1 .447.724l-.028.055a.4.4 0 0 1-.357.221h-.502a2.26 2.26 0 0 0-1.88 1.006l-.044.066a2.099 2.099 0 0 0 1.085 3.156.58.58 0 0 1 .397.547v1.05a1.175 1.175 0 0 0 2.093.734l1.611-2.014c.192-.24.296-.536.296-.842 0-.316.128-.624.353-.85a1.363 1.363 0 0 0 .173-1.716l-.464-.696a.369.369 0 0 1 .527-.499l.343.257c.316.237.738.275 1.091.098a.586.586 0 0 1 .677.11l1.297 1.297Z"
                clipRule="evenodd"
              />
            </svg>
          </BlueSimpleButton>
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
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
