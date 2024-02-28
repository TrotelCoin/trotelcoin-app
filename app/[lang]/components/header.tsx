"use client";

import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Dialog, Transition } from "@headlessui/react";
import React, { useEffect, useState } from "react";
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
import StreakMobile from "@/app/[lang]/components/header/streakMobile";
import ShopMobile from "@/app/[lang]/components/header/shopMobile";
import AccountMobile from "@/app/[lang]/components/header/accountMobile";
import LifeMobile from "@/app/[lang]/components/header/lifeMobile";

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
      name: typeof dict?.header !== "string" && dict?.header.shop,
      href: "/shop",
      id: 4,
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
        </div>

        {/* Desktop navigation links */}
        <div
          className={`hidden lg:flex backdrop-blur-xl items-center bg-gray-900 dark:bg-white p-2 rounded-full lg:gap-x-8`}
        >
          {navigation.map((item, index) => {
            const defaultClasses =
              "text-gray-300 dark:text-gray-700 hover:text-gray-100 dark:hover:text-gray-900 text-sm font-semibold leading-6 py-1 px-4 rounded-full";

            const dynamicClasses =
              "bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 text-sm font-semibold hover:bg-white hover:text-gray-900 dark:hover:bg-gray-900 dark:hover:text-gray-100 leading-6 py-1 px-4 hover:shadow-lg rounded-full";

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
          </div>
          <div className="flex justify-center items-center mx-4 h-6 w-px rounded-full bg-gray-800/20 dark:bg-gray-200/40" />
          <div className="items-center flex gap-2">
            <Link
              href={`/${lang}/account`}
              className="p-2 rounded-full bg-white dark:bg-gray-900 focus:bg-white dark:focus:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path d="M10 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3.465 14.493a1.23 1.23 0 0 0 .41 1.412A9.957 9.957 0 0 0 10 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 0 0-13.074.003Z" />
              </svg>
            </Link>
            <LanguageSelector lang={lang} />
            <ThemeSwitcher />
            <Wallet lang={lang} dict={dict as DictType} />
            <button
              type="button"
              className="hidden lg:block p-2 rounded-full bg-white dark:bg-gray-900 focus:bg-white dark:focus:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-100"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Bars3Icon className="h-5 w-5" aria-hidden="true" />
            </button>
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
              <LanguageSelector lang={lang} />
              <ThemeSwitcher />
            </div>
          </div>
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-xl p-2.5 text-gray-900 dark:text-gray-100"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Bars3Icon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <Transition
        show={mobileMenuOpen}
        className={`${mobileMenuOpen ? "" : "pointer-events-none"} z-50`}
      >
        <div className="fixed inset-0 z-10" />
        <div className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white dark:bg-gray-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center gap-x-6">
            <div className="-m-1.5 p-1.5">
              <Link
                href={`/${lang}/home`}
                onClick={() => setMobileMenuOpen(false)}
              >
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
                onClick={() => setMobileMenuOpen(false)}
                className="hidden lg:block p-2 rounded-full bg-white dark:bg-gray-900 focus:bg-white dark:focus:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-100"
              >
                <XMarkIcon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="-m-2.5 rounded-xl p-2.5 text-gray-900 dark:text-gray-100 lg:hidden"
                onClick={() => setMobileMenuOpen(false)}
              >
                <XMarkIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-4 mt-4">
            <AccountMobile lang={lang} setMobileMenuOpen={setMobileMenuOpen} />
            <StreakMobile lang={lang} dict={dict as DictType} />
            <LifeMobile lang={lang} dict={dict as DictType} />
            <ShopMobile lang={lang} setMobileMenuOpen={setMobileMenuOpen} />
          </div>
        </div>
      </Transition>
    </header>
  );
};

export default Header;
