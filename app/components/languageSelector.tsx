"use client";

import React, { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";

interface Language {
  code: string;
  label: string;
}

const LanguageSelector = () => {
  const languages = [
    { code: "en", label: "English" },
    { code: "fr", label: "Français" },
  ];

  const onChangeLanguage = (language: Language) => {};

  return (
    <Menu as="div" className="relative inline-block text-center">
      <div>
        <Menu.Button className="inline-flex font-semibold justify-center items-center text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100">
          Language
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
        <Menu.Items className="origin-top-right rounded-lg absolute z-50 right-0 mt-4 w-40 shadow bg-white dark:bg-gray-900 ring-1 ring-gray-900/10 dark:ring-gray-100/10 focus:outline-none">
          <div className="p-2">
            {languages.map((language, index) => (
              <Menu.Item key={language.code}>
                {({ active }) => (
                  <button
                    onClick={() => onChangeLanguage(language)}
                    className={`${
                      active
                        ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                        : "text-gray-900 dark:text-gray-100"
                    } hover:bg-gray-100 dark:hover:bg-gray-800 block px-4 py-2 text-sm w-full text-left rounded-lg`}
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
