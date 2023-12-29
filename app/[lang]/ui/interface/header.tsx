"use client";

// Import necessary libraries and components
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Dialog } from "@headlessui/react";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Wallet from "@/app/[lang]/components/wallet";
import { usePathname } from "next/navigation";
import TrotelPrice from "@/app/[lang]/hooks/trotelPrice";
import TrotelPriceChange from "@/app/[lang]/hooks/trotelPriceChange";
import ThemeSwitcher from "@/app/[lang]/components/themeSelector";
import LanguageSelector from "@/app/[lang]/components/languageSelector";
import AudioComponent from "@/app/[lang]/components/audio";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { Lang } from "@/types/types";

// Define the Header component
const Header = async ({
  router,
  lang,
}: {
  router: AppRouterInstance;
  lang: Lang;
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const dict = await getDictionary(lang);

  const navigation = [
    { name: dict.header.home, href: "/home" },
    { name: dict.header.learn, href: "/learn" },
    { name: dict.header.premium, href: "/premium" },
    { name: dict.header.account, href: "/account" },
  ];

  const closeMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-white dark:bg-black">
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
          <div className="hidden sm:block">{<TrotelPriceChange />}</div>
          <span className="hidden xl:inline-flex items-center rounded-lg bg-blue-50 dark:bg-blue-200/10 px-2 py-1 text-xs font-medium text-blue-600 dark:text-blue-200 ring-1 ring-inset ring-blue-700/10 dark:ring-blue-200/30">
            <span className="animate-pulse">beta version</span>
          </span>
        </div>

        {/* Desktop navigation links */}
        <div className="hidden lg:flex lg:gap-x-4">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={`/${lang}${item.href}`}
              className={`text-sm px-6 py-2 ${
                pathname === `/${lang}${item.href}`
                  ? "bg-blue-600 dark:bg-blue-200 text-gray-100 dark:text-gray-900"
                  : "text-gray-700 dark:text-gray-300  hover:text-gray-900 dark:hover:text-gray-100"
              } font-semibold rounded-full leading-6`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Right section with Wallet component */}
        <div className="hidden md:flex justify-end flex-1 items-center divide-x divide-double divide-gray-900/10 dark:divide-gray-100/30">
          <div className="items-center flex pr-6 gap-x-4">
            {/*<span className="font-semibold text-gray-900 dark:text-gray-100 hidden xl:flex">
              <TrotelBalance /> TROTEL
            </span>*/}
            <Wallet />
          </div>
          <div className="items-center flex pl-4 gap-2">
            <LanguageSelector router={router} />
            <ThemeSwitcher />
            <AudioComponent />
          </div>
        </div>

        {/* Mobile menu button */}
        <div className="flex gap-4 items-center md:hidden">
          <div className="flex gap-2 items-center">
            <ThemeSwitcher />
            <AudioComponent />
            <LanguageSelector router={router} />
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
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white dark:bg-black px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center gap-x-6">
            <div className="-m-1.5 p-1.5">
              <Link href={`/${lang}/home`}>
                <Image
                  className="h-12 w-auto"
                  width={128}
                  height={128}
                  src="/assets/logo/trotelcoin-white.png"
                  alt="TrotelCoin logo"
                ></Image>
              </Link>
            </div>
            <div className="flex flex-1 items-center justify-end gap-x-6">
              <Wallet />
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
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={`/${lang}${item.href}`}
                    onClick={() => {
                      closeMenu();
                    }}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 dark:text-gray-100 hover:bg-gray-100/80 dark:hover:bg-black/80"
                  >
                    {item.name}
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