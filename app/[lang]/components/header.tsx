"use client";

import { Transition } from "@headlessui/react";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import TrotelPrice from "@/app/[lang]/hooks/trotelPrice";
import TrotelPriceChange from "@/app/[lang]/hooks/trotelPriceChange";
import ThemeSwitcher from "@/app/[lang]/components/selectors/themeSelector";
import LanguageSelector from "@/app/[lang]/components/selectors/languageSelector";
import { Lang } from "@/types/types";
import StreakMobile from "@/app/[lang]/components/header/streakMobile";
import ShopMobile from "@/app/[lang]/components/header/shopMobile";
import AccountMobile from "@/app/[lang]/components/header/accountMobile";
import LifeMobile from "@/app/[lang]/components/header/lifeMobile";
import BlueButton from "@/app/[lang]/components/blueButton";
import AudioSelector from "@/app/[lang]/components/selectors/audioSelector";
import BlueSimpleButton from "@/app/[lang]/components/blueSimpleButton";
import { XMarkIcon } from "@heroicons/react/20/solid";

const Header = ({ lang }: { lang: Lang }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const pathname = usePathname();

  const navigation = [
    {
      name: lang === "en" ? "Home" : "Accueil",
      href: "/home",
      id: 1,
    },
    {
      name: lang === "en" ? "Learn" : "Apprendre",
      href: "/learn",
      id: 2,
    },
    {
      name: lang === "en" ? "Wallet" : "Portefeuille",
      href: "/wallet",
      id: 3,
    },
    {
      name: lang === "en" ? "Shop" : "Boutique",
      href: "/shop",
      id: 4,
    },
  ];

  return (
    <header className="bg-white dark:bg-gray-900">
      {/* Navigation */}
      <nav
        className="mx-auto flex max-w-8xl items-center justify-between md:gap-x-16 p-6 lg:px-8"
        aria-label="Global"
      >
        {/* Left section with logo, Trotel price, and version */}
        <div className="flex lg:flex-1 items-center gap-x-4">
          <div className="p-1">
            <Link href={`/${lang}/home`}>
              <Image
                className="block dark:hidden h-12 w-auto"
                width={128}
                height={128}
                src="/assets/logo/trotelcoin-white.png"
                alt="TrotelCoin Logo"
              />
              <Image
                width={128}
                height={128}
                alt="TrotelCoin Logo"
                className="hidden dark:block h-12 w-auto"
                src="/assets/logo/trotelcoin.png"
              />
            </Link>
          </div>

          <p className="hidden md:block font-semibold text-gray-900 dark:text-gray-100">
            {<TrotelPrice />}
          </p>
          <div className="hidden md:block">{<TrotelPriceChange />}</div>
        </div>

        {/* Desktop navigation links */}
        <div
          className={`hidden lg:flex backdrop-blur-xl items-center bg-blue-500 p-2 rounded-full lg:gap-x-8`}
        >
          {navigation.map((item, index) => {
            const defaultClasses =
              "text-gray-100 hover:text-white text-sm font-semibold leading-6 py-1 px-4 rounded-full";

            const dynamicClasses =
              "bg-white dark:bg-gray-900 text-black dark:text-white text-sm font-semibold hover:bg-white hover:text-gray-900 dark:hover:bg-gray-900 dark:hover:text-gray-100 leading-6 py-1 px-4 hover:shadow-lg rounded-full";

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
                {item.name}
              </Link>
            );
          })}
        </div>

        {/* Right section with Wallet component */}
        <div className="hidden lg:flex justify-end flex-1 items-center">
          <div className="items-center flex gap-2">
            <ThemeSwitcher />
            <div className="relative">
              <BlueButton
                lang={lang}
                onClick={() => setMobileMenuOpen(true)}
                text={lang === "en" ? "Menu" : "Menu"}
              />
            </div>
          </div>
        </div>

        {/* Mobile menu button */}
        <div className="flex gap-2 items-center lg:hidden">
          <div className="flex items-center">
            <div className="flex items-center gap-2">
              <ThemeSwitcher />
              <div className="relative">
                <BlueButton
                  lang={lang}
                  onClick={() => setMobileMenuOpen(true)}
                  text={lang === "en" ? "Menu" : "Menu"}
                />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <Transition show={mobileMenuOpen} className={`z-50`}>
        <div className="fixed inset-0 z-10" />
        <div className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white dark:bg-gray-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 sm:dark:ring-gray-100/10">
          <div className="flex items-center gap-x-6">
            <div className="p-1">
              <h2 className="font-bold text-gray-900 dark:text-gray-100 text-2xl">
                Menu
              </h2>
            </div>
            <div className="flex flex-1 items-center justify-end gap-2">
              <AudioSelector />
              <LanguageSelector lang={lang} />
              <BlueSimpleButton onClick={() => setMobileMenuOpen(false)}>
                <XMarkIcon className="h-5 w-5" />
              </BlueSimpleButton>
            </div>
          </div>
          <div className="flex flex-col gap-4 mt-10">
            <AccountMobile lang={lang} setMobileMenuOpen={setMobileMenuOpen} />
            <StreakMobile lang={lang} />
            <LifeMobile lang={lang} setMobileMenuOpen={setMobileMenuOpen} />
            <ShopMobile lang={lang} setMobileMenuOpen={setMobileMenuOpen} />
          </div>
        </div>
      </Transition>
    </header>
  );
};

export default Header;
