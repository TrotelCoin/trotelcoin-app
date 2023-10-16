import React, { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string | undefined) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-full bg-white px-3 py-2 text-sm font-semibold text-gray-900 border-2 border-black dark:border-transparent hover:bg-gray-white/80">
          Language
          <ChevronDownIcon
            className="-mr-1 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
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
        <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-gray-50 dark:bg-gray-800 border-2 border-black dark:border-transparent focus:outline-none">
          <div className="divide-y-2 divide-gray-900 dark:divide-gray-700">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => changeLanguage("en")}
                  className={classNames(
                    active
                      ? " text-gray-900 dark:text-gray-100"
                      : "text-gray-700 dark:text-gray-300",
                    "block px-4 py-2 w-full text-sm"
                  )}
                >
                  English
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => changeLanguage("fr")}
                  className={classNames(
                    active
                      ? " text-gray-900 dark:text-gray-100"
                      : "text-gray-700 dark:text-gray-300",
                    "block px-4 py-2 w-full text-sm"
                  )}
                >
                  French
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default LanguageSelector;
