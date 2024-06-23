"use client";

import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useContext, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeSwitcher from "@/app/[lang]/components/selectors/theme";
import LanguageSelector from "@/app/[lang]/components/selectors/language";
import type { Lang } from "@/types/language/lang";
import StreakMobile from "@/app/[lang]/components/header/mobile/streak";
import ShopMobile from "@/app/[lang]/components/header/mobile/shop";
import AccountMobile from "@/app/[lang]/components/header/mobile/account";
import LifeMobile from "@/app/[lang]/components/header/mobile/life";
import BlueButton from "@/app/[lang]/components/buttons/blue";
import AudioSelector from "@/app/[lang]/components/selectors/audio";
import BlueSimpleButton from "@/app/[lang]/components/buttons/blueSimple";
import { XMarkIcon } from "@heroicons/react/20/solid";
import PendingRewardsMobile from "@/app/[lang]/components/header/mobile/pendingRewards";
import UserInformationMobile from "@/app/[lang]/components/header/mobile/userInformation";
import UserContext from "@/contexts/user";
import StreakContext from "@/contexts/streak";
import LifeContext from "@/contexts/life";
import PremiumContext from "@/contexts/premium";
import { loadingFlashClass } from "@/style/loading";
import ChainContext from "@/contexts/chain";
import { Switch } from "@nextui-org/switch";
import { polygonAmoy } from "viem/chains";

const Header = ({ lang }: { lang: Lang }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const pathname = usePathname();

  const { streak } = useContext(StreakContext);
  const { life } = useContext(LifeContext);
  const { userTotalRewardsPending, userNumberOfQuizzesAnswered, isLoggedIn } =
    useContext(UserContext);
  const { isPremium } = useContext(PremiumContext);
  const { chain, handleTestnet, showTestnet } = useContext(ChainContext);

  const navigation = [
    {
      name: lang === "en" ? "Home" : "Accueil",
      href: "/home",
      id: 1
    },
    {
      name: lang === "en" ? "Learn" : "Apprendre",
      href: "/learn",
      id: 2
    },
    {
      name: lang === "en" ? "Shop" : "Boutique",
      href: "/shop",
      id: 3
    },
    {
      name: lang === "en" ? "Account" : "Compte",
      href: "/account",
      id: 3
    }
  ];

  return (
    <header className="bg-white dark:bg-gray-900">
      {/* Navigation */}
      <nav
        className="mx-auto flex items-center justify-between p-6 md:gap-x-8 lg:px-8"
        aria-label="Global"
      >
        {/* Left section with logo, Trotel price, and version */}
        <div className="flex items-center md:gap-x-8 lg:flex-1">
          <Link href={`/${lang}/home`}>
            <div className="h-12 w-12">
              <Image
                className="block dark:hidden"
                width={48}
                height={48}
                src="/assets/logo/trotelcoin-white.png"
                alt="TrotelCoin Logo"
              />
              <Image
                width={48}
                height={48}
                alt="TrotelCoin Logo"
                className="hidden dark:block"
                src="/assets/logo/trotelcoin.png"
              />
            </div>
          </Link>

          <div className="hidden w-96 rounded-full border border-gray-900/10 bg-white px-4 py-2 dark:border-gray-100/10 dark:bg-gray-800 lg:block">
            {isLoggedIn ? (
              <UserInformationMobile
                lang={lang}
                streak={streak}
                userNumberOfQuizzesAnswered={userNumberOfQuizzesAnswered}
                userTotalRewardsPending={userTotalRewardsPending}
                isPremium={isPremium}
                life={life}
              />
            ) : (
              <span
                className={`flex items-center justify-center text-center font-semibold text-gray-900 dark:text-gray-100 ${loadingFlashClass}`}
              >
                {lang === "en" ? "Not connected" : "Non connecté"}
              </span>
            )}
          </div>
        </div>

        {/* Desktop navigation links */}
        <div
          className={`hidden items-center rounded-full bg-blue-500 p-2 backdrop-blur-xl lg:flex lg:gap-x-8`}
        >
          {navigation.map((item, index) => {
            const defaultClasses =
              "text-gray-100 hover:text-white text-sm font-semibold leading-6 py-1 px-4 rounded-full";

            const dynamicClasses =
              "bg-white dark:bg-gray-900 text-black dark:text-white text-sm font-semibold hover:bg-white hover:text-gray-900 dark:hover:bg-gray-900 dark:hover:text-gray-100 leading-6 py-1 px-4 shadow-lg rounded-full";

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
        <div className="hidden flex-1 items-center justify-end lg:flex">
          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 lg:flex">
              <AudioSelector />
              <LanguageSelector lang={lang} />
              <ThemeSwitcher />
            </div>
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
        <div className="flex items-center gap-2 lg:hidden">
          <div className="flex items-center">
            <div className="flex items-center gap-2">
              <LanguageSelector lang={lang} />
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

      <div className="border-y border-gray-900/10 bg-white px-4 py-3 dark:border-gray-100/10 dark:bg-gray-800 lg:hidden">
        {isLoggedIn ? (
          <UserInformationMobile
            lang={lang}
            streak={streak}
            userNumberOfQuizzesAnswered={userNumberOfQuizzesAnswered}
            userTotalRewardsPending={userTotalRewardsPending}
            isPremium={isPremium}
            life={life}
          />
        ) : (
          <span
            className={`flex items-center justify-center text-center font-semibold text-gray-900 dark:text-gray-100 ${loadingFlashClass}`}
          >
            {lang === "en" ? "Not connected" : "Non connecté"}
          </span>
        )}
      </div>

      {/* Mobile menu */}
      <Transition.Root show={mobileMenuOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={setMobileMenuOpen}>
          <div className="fixed inset-0">
            <div className="fixed inset-0 overflow-hidden">
              <div className="absolute inset-0 overflow-hidden">
                <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full">
                  <Transition.Child
                    as={Fragment}
                    enter="transform transition ease-in-out duration-500"
                    enterFrom="translate-x-full"
                    enterTo="translate-x-0"
                    leave="transform transition ease-in-out duration-500"
                    leaveFrom="translate-x-0"
                    leaveTo="translate-x-full"
                  >
                    <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                      <div className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 dark:bg-gray-900 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 sm:dark:ring-gray-100/10">
                        <div className="flex items-center gap-x-6">
                          <div className="p-1">
                            <Dialog.Title className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                              {lang === "en" ? "Menu" : "Menu"}
                            </Dialog.Title>
                          </div>

                          <div className="flex flex-1 items-center justify-end gap-2">
                            <div className="flex items-center gap-2 lg:hidden">
                              <AudioSelector />
                            </div>
                            <BlueSimpleButton
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              <XMarkIcon className="h-5 w-5" />
                            </BlueSimpleButton>
                          </div>
                        </div>

                        <div className="mt-10 flex flex-col gap-4">
                          <AccountMobile
                            lang={lang}
                            setMobileMenuOpen={setMobileMenuOpen}
                          />
                          <PendingRewardsMobile lang={lang} />
                          <StreakMobile lang={lang} />
                          <LifeMobile
                            lang={lang}
                            setMobileMenuOpen={setMobileMenuOpen}
                          />
                          <ShopMobile
                            lang={lang}
                            setMobileMenuOpen={setMobileMenuOpen}
                          />
                        </div>

                        {showTestnet && (
                          <div className="mt-4">
                            <Switch
                              isSelected={chain.id === polygonAmoy.id}
                              onChange={handleTestnet}
                              color="success"
                              size="sm"
                            >
                              Testnet
                            </Switch>
                          </div>
                        )}
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </header>
  );
};

export default Header;
