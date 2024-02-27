"use client";

import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Dialog } from "@headlessui/react";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import TrotelPrice from "@/app/[lang]/hooks/trotelPrice";
import TrotelPriceChange from "@/app/[lang]/hooks/trotelPriceChange";
import ThemeSwitcher from "@/app/[lang]/components/selectors/themeSelector";
import LanguageSelector from "@/app/[lang]/components/selectors/languageSelector";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { Lang, DictType } from "@/types/types";
import LifeCount from "@/app/[lang]/components/header/lifeCount";
import StreakCount from "@/app/[lang]/components/header/streakCount";
import Wallet from "@/app/[lang]/components/header/wallet";
import LifeContext from "@/app/[lang]/lifeContext";

const Header = ({ lang }: { lang: Lang }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dict, setDict] = useState<DictType | null>(null);

  const pathname = usePathname();

  useEffect(() => {
    const fetchDictionary = async () => {
      const result = await getDictionary(lang);
      setDict(result);
    };

    fetchDictionary();
  }, [lang]);

  const closeMenu = () => {
    setMobileMenuOpen(false);
  };

  const navigation = [
    {
      name: typeof dict?.header !== "string" && dict?.header.home,
      href: "/home",
      id: 1,
    },
    {
      name: typeof dict?.header !== "string" && dict?.header.learn,
      href: "/learn",
      id: 2,
    },
    {
      name: typeof dict?.header !== "string" && dict?.header.wallet,
      href: "/wallet",
      id: 3,
    },
    {
      name: typeof dict?.header !== "string" && dict?.header.premium,
      href: "/premium",
      id: 4,
    },
    {
      name: typeof dict?.header !== "string" && dict?.header.account,
      href: "/account",
      id: 5,
    },
  ];

  return (
    <header className="bg-white dark:bg-gray-900">
      {/* Navigation */}
      <nav
        className="mx-auto flex max-w-8xl items-center justify-between gap-x-8 md:gap-x-16 p-6 lg:px-8"
        aria-label="Global"
      >
        {/* Left section with logo, Trotel price, and version */}
        <div className="flex lg:flex-1 items-center gap-x-4">
          <div className="-m-1.5 p-1.5">
            <Link href={`/${lang}/home`}>
              <Image
                className="h-12 w-auto"
                width={128}
                height={128}
                src="/assets/logo/trotelcoin-white.png"
                alt={""}
              ></Image>
            </Link>
          </div>

          <p className="hidden md:block font-semibold text-gray-900 dark:text-gray-100">
            {<TrotelPrice />}
          </p>
          <div className="hidden md:block">{<TrotelPriceChange />}</div>
          <span className="hidden xl:inline-flex items-center rounded-lg bg-blue-50 dark:bg-blue-300/10 px-2 py-1 text-xs font-medium text-blue-500 dark:text-blue-300 ring-1 ring-inset ring-blue-700/10 dark:ring-blue-300/30">
            <span className="animate__animated animate__flash animate__slower animate__infinite">
              {typeof dict?.header !== "string" && <>{dict?.header.version}</>}
            </span>
          </span>
        </div>

        {/* Desktop navigation links */}
        <div
          className={`hidden lg:flex backdrop-blur-xl items-center bg-gray-900 dark:bg-white py-2 px-3 rounded-full lg:gap-x-8`}
        >
          {navigation.map((item, index) => {
            const defaultClasses =
              "text-gray-100 dark:text-gray-900 text-sm font-semibold hover:bg-white dark:hover:bg-gray-900 hover:text-gray-900 dark:hover:text-gray-100 leading-6 py-1 px-3 hover:shadow-lg rounded-full";

            const dynamicClasses =
              "bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 text-sm font-semibold hover:bg-white hover:text-gray-900 dark:hover:bg-gray-900 dark:hover:text-gray-100 leading-6 py-1 px-3 hover:shadow-lg rounded-full";

            return (
              <Link
                key={index}
                href={`/${lang}${item.href}`}
                className={
                  pathname === `/${lang}${item.href}`
                    ? dynamicClasses
                    : defaultClasses
                }
              >
                {item.name as string}
              </Link>
            );
          })}
        </div>

        {/* Right section with Wallet component */}
        <div className="hidden lg:flex justify-end flex-1 items-center">
          <div className="items-center flex gap-x-4">
            <LifeCount dict={dict as DictType} lang={lang} />
            <StreakCount dict={dict as DictType} lang={lang} />
            <Wallet dict={dict as DictType} lang={lang} />
          </div>
          <div className="flex justify-center items-center mx-4 h-6 w-px rounded-full bg-gray-800/20 dark:bg-gray-200/40" />
          <div className="items-center flex gap-2">
            <LanguageSelector lang={lang} />
            <ThemeSwitcher />
          </div>
        </div>

        {/* Mobile menu button */}
        <div className="flex gap-2 items-center lg:hidden">
          <div className="flex items-center">
            <div className="flex gap-2 items-center">
              <LifeCount dict={dict as DictType} lang={lang} />
              <StreakCount dict={dict as DictType} lang={lang} />
            </div>
            <div className="flex justify-center items-center mx-4 h-6 w-px rounded-full bg-gray-800/20 dark:bg-gray-200/40" />
            <div className="flex gap-2 items-center">
              {/*<AudioComponent />*/}
              <LanguageSelector lang={lang} />
              <ThemeSwitcher />
            </div>
          </div>
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-lg p-2.5 text-gray-900 dark:text-gray-100"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white dark:bg-gray-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center gap-x-6">
            <div className="-m-1.5 p-1.5">
              <Link href={`/${lang}/home`}>
                <Image
                  className="h-12 w-auto"
                  width={128}
                  height={128}
                  src="/assets/logo/trotelcoin-white.png"
                  alt={""}
                ></Image>
              </Link>
            </div>
            <div className="flex flex-1 items-center justify-end gap-x-4">
              <Wallet dict={dict as DictType} lang={lang} />
              <button
                type="button"
                className="-m-2.5 rounded-lg p-2.5 text-gray-900 dark:text-gray-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6">
              <div className="space-y-2 py-6">
                {/* Mobile navigation links */}
                {navigation.map((item, index) => (
                  <Link
                    key={index}
                    href={`/${lang}${item.href}`}
                    onClick={() => {
                      closeMenu();
                    }}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 dark:text-gray-100 hover:bg-gray-200/80 dark:hover:bg-gray-900/80"
                  >
                    <>{item.name}</>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
};

export default Header;
