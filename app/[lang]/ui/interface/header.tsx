"use client";

// Import necessary libraries and components
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Dialog, Transition } from "@headlessui/react";
import React, { useEffect, useState, Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import TrotelPrice from "@/app/[lang]/hooks/trotelPrice";
import TrotelPriceChange from "@/app/[lang]/hooks/trotelPriceChange";
import ThemeSwitcher, { useTheme } from "@/app/[lang]/components/themeSelector";
import LanguageSelector from "@/app/[lang]/components/languageSelector";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { Lang, DictType } from "@/types/types";
import { useContractRead } from "wagmi";
import {
  ConnectWallet,
  useAddress,
  useDisconnect,
  useLogout,
  useUser,
} from "@thirdweb-dev/react";
import CountUp from "react-countup";
import { Address } from "viem";
import trotelCoinIntermediateABI from "@/abi/trotelCoinIntermediate";
import {
  trotelCoinExpertAddress,
  trotelCoinIntermediateAddress,
} from "@/data/addresses";
import { polygon } from "viem/chains";
import trotelCoinExpertABI from "@/abi/trotelCoinExpert";

// Define the Header component
const Header = ({
  router,
  lang,
  life,
}: {
  router: AppRouterInstance;
  lang: Lang;
  life: number;
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dict, setDict] = useState<DictType | null>(null);
  const [streak, setStreak] = useState<number | null>(null);
  const [isHoveringLife, setIsHoveringLife] = useState<boolean>(false);
  const [isHoveringStreak, setIsHoveringStreak] = useState<boolean>(false);
  const [isIntermediateBalance, setIsIntermediateBalance] =
    useState<boolean>(false);
  const [isExpertBalance, setIsExpertBalance] = useState<boolean>(false);

  const pathname = usePathname();

  const isLightTheme = useTheme();

  const { user, isLoggedIn, isLoading } = useUser();
  const address = useAddress();
  const disconnect = useDisconnect();
  const { logout } = useLogout();

  const handleDisconnect = () => {
    if (address) {
      disconnect();
      logout();
    }
  };

  useEffect(() => {
    const fetchUserStreak = async () => {
      await fetch(`/api/database/streak?wallet=${address as Address}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-cache",
      })
        .then((res) => res.json())
        .then((data) => {
          setStreak(data.currentStreak);
        });
    };

    if (address) {
      fetchUserStreak();
    }
  }, [address, streak]);

  useEffect(() => {
    const fetchDictionary = async () => {
      const result = await getDictionary(lang);
      setDict(result);
    };

    fetchDictionary();
  }, [lang]);

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
      name: typeof dict?.header !== "string" && dict?.header.premium,
      href: "/premium",
      id: 3,
    },
    {
      name: typeof dict?.header !== "string" && dict?.header.account,
      href: "/account",
      id: 4,
    },
  ];

  const closeMenu = () => {
    setMobileMenuOpen(false);
  };

  const { data: intermediate } = useContractRead({
    chainId: polygon.id,
    abi: trotelCoinIntermediateABI,
    address: trotelCoinIntermediateAddress,
    functionName: "balanceOf",
    args: [address as Address],
    account: address as Address,
    enabled: Boolean(address),
    watch: true,
  });

  const { data: expert } = useContractRead({
    chainId: polygon.id,
    abi: trotelCoinExpertABI,
    address: trotelCoinExpertAddress,
    functionName: "balanceOf",
    args: [address as Address],
    account: address as Address,
    enabled: Boolean(address),
    watch: true,
  });

  useEffect(() => {
    const intermediateBalance: number = parseFloat(intermediate as string);
    const expertBalance: number = parseFloat(expert as string);

    if (intermediateBalance > 0) {
      setIsIntermediateBalance(true);
    }

    if (expertBalance > 0) {
      setIsExpertBalance(true);
    }
  }, [intermediate, expert]);

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
          <div className="hidden md:block">{<TrotelPriceChange />}</div>
          <span className="hidden xl:inline-flex items-center rounded-lg bg-yellow-50 dark:bg-yellow-200/10 px-2 py-1 text-xs font-medium text-yellow-600 dark:text-yellow-200 ring-1 ring-inset ring-yellow-700/10 dark:ring-yellow-200/30">
            <span className="animate-pulse">
              {typeof dict?.header !== "string" && <>{dict?.header.version}</>}
            </span>
          </span>
        </div>

        {/* Desktop navigation links */}
        <div
          className={`hidden lg:flex backdrop-blur-xl items-center bg-black dark:bg-white py-2 px-3 rounded-full lg:gap-x-8`}
        >
          {navigation.map((item) => {
            const defaultClasses =
              "text-gray-100 dark:text-gray-900 text-sm font-semibold hover:bg-white dark:hover:bg-black hover:text-gray-900 dark:hover:text-gray-100 leading-6 py-1 px-3 hover:shadow-lg rounded-full";

            const dynamicClasses =
              "bg-white dark:bg-black text-gray-900 dark:text-gray-100 text-sm font-semibold hover:bg-white hover:text-gray-900 dark:hover:bg-black dark:hover:text-gray-100 leading-6 py-1 px-3 hover:shadow-lg rounded-full";

            return (
              <Link
                key={item.id}
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
            {/*<span className="font-semibold text-gray-900 dark:text-gray-100 hidden xl:flex">
              <TrotelBalance /> TROTEL
            </span>*/}
            {/*<Wallet lang={lang} />*/}
            <div
              className="relative flex justify-center gap-1 text-xl items-center text-gray-900 dark:text-gray-100 cursor-pointer"
              onMouseEnter={() => setIsHoveringLife(true)}
              onMouseLeave={() => setIsHoveringLife(false)}
            >
              {isExpertBalance || isIntermediateBalance ? (
                <span className="font-semibold text-2xl">&infin;</span>
              ) : life ? (
                <span className="font-semibold">
                  <CountUp start={0} end={life} duration={2} />
                </span>
              ) : (
                <span className="font-semibold">0</span>
              )}{" "}
              💛
              <Transition
                as={Fragment}
                show={isHoveringLife}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <div
                  className="absolute flex justify-center bg-white dark:bg-gray-900 z-10 mt-3 text-sm text-gray-900 dark:text-gray-100"
                  style={{ width: "300px" }}
                >
                  <div className="absolute flex flex-col gap-4 bg-white dark:bg-gray-900 justify-center items-center top-5 z-50 border border-gray-900/20 dark:border-gray-100/40 p-4 rounded-xl">
                    <p>
                      {typeof dict?.header !== "string" && (
                        <>{dict?.header.lifeMessage}</>
                      )}
                    </p>
                    <Link href={`/${lang}/premium`}>
                      <button className="bg-yellow-500 hover:bg-yellow-400 dark:bg-yellow-300 dark:hover:bg-yellow-400 hover:border-gray-900/50 dark:hover:border-gray-100/50 focus:border-yellow-500 dark:focus:border-yellow-300 text-sm px-6 py-2 text-gray-900 dark:text-gray-900 rounded-lg font-semibold">
                        {typeof dict?.header !== "string" && (
                          <>{dict?.header.lifeButton}</>
                        )}
                      </button>
                    </Link>
                  </div>
                </div>
              </Transition>
            </div>
            <div
              className="relative flex justify-center gap-1 text-xl items-center text-gray-900 dark:text-gray-100 cursor-pointer"
              onMouseEnter={() => setIsHoveringStreak(true)}
              onMouseLeave={() => setIsHoveringStreak(false)}
            >
              {streak ? (
                <span className="font-semibold">
                  <CountUp start={0} end={streak} duration={2} />
                </span>
              ) : (
                <span className="font-semibold">0</span>
              )}{" "}
              🔥
              <Transition
                as={Fragment}
                show={isHoveringStreak}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <div
                  className="absolute flex justify-center bg-white dark:bg-gray-900 z-10 mt-3 text-sm text-gray-900 dark:text-gray-100"
                  style={{ width: "300px" }}
                >
                  <div className="absolute flex flex-col gap-4 bg-white dark:bg-gray-900 justify-center items-center top-5 z-50 border border-gray-900/20 dark:border-gray-100/40 p-4 rounded-xl">
                    <p>
                      {typeof dict?.header !== "string" && (
                        <>{dict?.header.streakMessage}</>
                      )}
                    </p>
                    <Link href={`/${lang}/learn`}>
                      <button className="bg-yellow-500 hover:bg-yellow-400 dark:bg-yellow-300 dark:hover:bg-yellow-400 hover:border-gray-900/50 dark:hover:border-gray-100/50 focus:border-yellow-500 dark:focus:border-yellow-300 text-sm px-6 py-2 text-gray-900 dark:text-gray-900 rounded-lg font-semibold">
                        {typeof dict?.header !== "string" && (
                          <>{dict?.header.streakButton}</>
                        )}
                      </button>
                    </Link>
                  </div>
                </div>
              </Transition>
            </div>
            {address && isLoggedIn ? (
              <button
                onClick={handleDisconnect}
                className="text-sm font-semibold rounded-full px-6 py-2 bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200 text-gray-100 dark:text-gray-900"
                style={{ minWidth: "0px" }}
              >
                {typeof dict?.header !== "string" && (
                  <>{dict?.header.disconnect}</>
                )}
              </button>
            ) : (
              <ConnectWallet
                theme={isLightTheme ? "light" : "dark"}
                auth={{ loginOptional: false }}
                switchToActiveChain={true}
                modalSize={"wide"}
                modalTitleIconUrl={""}
                btnTitle={lang === "en" ? "Sign in" : "Se connecter"}
                className="text-sm font-semibold rounded-full px-6 py-2 bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200 text-gray-100 dark:text-gray-900"
                style={{ minWidth: "0px" }}
              />
            )}
          </div>
          <div className="flex justify-center items-center mx-4 h-6 w-px rounded-full bg-gray-900/20 dark:bg-gray-100/40" />
          <div className="items-center flex gap-2">
            <LanguageSelector router={router} lang={lang} />
            <ThemeSwitcher />
            {/*<AudioComponent />*/}
          </div>
        </div>

        {/* Mobile menu button */}
        <div className="flex gap-2 items-center lg:hidden">
          <div className="flex items-center">
            <div className="flex gap-2 items-center">
              <div
                className="relative flex justify-center gap-1 text-xl items-center text-gray-900 dark:text-gray-100 cursor-pointer"
                onMouseEnter={() => setIsHoveringLife(true)}
                onMouseLeave={() => setIsHoveringLife(false)}
              >
                {isExpertBalance || isIntermediateBalance ? (
                  <span className="font-semibold text-2xl">&infin;</span>
                ) : life ? (
                  <span className="font-semibold">
                    <CountUp start={0} end={life} duration={2} />
                  </span>
                ) : (
                  <span className="font-semibold">0</span>
                )}{" "}
                💛
                <Transition
                  as={Fragment}
                  show={isHoveringLife}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                >
                  <div
                    className="absolute flex justify-center bg-white dark:bg-gray-900 z-10 mt-3 text-sm text-gray-900 dark:text-gray-100"
                    style={{ width: "300px" }}
                  >
                    <div className="absolute flex flex-col gap-4 bg-white dark:bg-gray-900 justify-center items-center top-5 z-50 border border-gray-900/20 dark:border-gray-100/40 p-4 rounded-xl">
                      <p>
                        {typeof dict?.header !== "string" && (
                          <>{dict?.header.lifeMessage}</>
                        )}
                      </p>
                      <Link href={`/${lang}/premium`}>
                        <button className="bg-yellow-500 hover:bg-yellow-400 dark:bg-yellow-300 dark:hover:bg-yellow-400 hover:border-gray-900/50 dark:hover:border-gray-100/50 focus:border-yellow-500 dark:focus:border-yellow-300 text-sm px-6 py-2 text-gray-900 dark:text-gray-900 rounded-lg font-semibold">
                          {typeof dict?.header !== "string" && (
                            <>{dict?.header.lifeButton}</>
                          )}
                        </button>
                      </Link>
                    </div>
                  </div>
                </Transition>
              </div>
              <div
                className="relative flex justify-center gap-1 text-xl items-center text-gray-900 dark:text-gray-100 cursor-pointer"
                onMouseEnter={() => setIsHoveringStreak(true)}
                onMouseLeave={() => setIsHoveringStreak(false)}
              >
                {streak ? (
                  <span className="font-semibold">
                    <CountUp start={0} end={streak} duration={2} />
                  </span>
                ) : (
                  <span className="font-semibold">0</span>
                )}{" "}
                🔥
                <Transition
                  as={Fragment}
                  show={isHoveringStreak}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                >
                  <div
                    className="absolute flex justify-center bg-white dark:bg-gray-900 z-10 mt-3 text-sm text-gray-900 dark:text-gray-100"
                    style={{ width: "300px" }}
                  >
                    <div className="absolute flex flex-col gap-4 bg-white dark:bg-gray-900 justify-center items-center top-5 z-50 border border-gray-900/20 dark:border-gray-100/40 p-4 rounded-xl">
                      <p>
                        {typeof dict?.header !== "string" && (
                          <>{dict?.header.streakMessage}</>
                        )}
                      </p>
                      <Link href={`/${lang}/learn`}>
                        <button className="bg-yellow-500 hover:bg-yellow-400 dark:bg-yellow-300 dark:hover:bg-yellow-400 hover:border-gray-900/50 dark:hover:border-gray-100/50 focus:border-yellow-500 dark:focus:border-yellow-300 text-sm px-6 py-2 text-gray-900 dark:text-gray-900 rounded-lg font-semibold">
                          {typeof dict?.header !== "string" && (
                            <>{dict?.header.streakButton}</>
                          )}
                        </button>
                      </Link>
                    </div>
                  </div>
                </Transition>
              </div>
            </div>
            <div className="flex justify-center items-center mx-4 h-6 w-px rounded-full bg-gray-900/20 dark:bg-gray-100/40" />
            <div className="flex gap-2 items-center">
              {/*<AudioComponent />*/}
              <LanguageSelector router={router} lang={lang} />
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
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white dark:bg-black px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
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
              {/*<Wallet lang={lang} />*/}

              {address && isLoggedIn ? (
                <button
                  onClick={handleDisconnect}
                  className="text-sm font-semibold rounded-full px-6 py-2 bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200 text-gray-100 dark:text-gray-900"
                  style={{ minWidth: "0px" }}
                >
                  {typeof dict?.header !== "string" && (
                    <>{dict?.header.disconnect}</>
                  )}
                </button>
              ) : (
                <ConnectWallet
                  theme={isLightTheme ? "light" : "dark"}
                  auth={{ loginOptional: false }}
                  switchToActiveChain={true}
                  modalSize={"wide"}
                  modalTitleIconUrl={""}
                  btnTitle={lang === "en" ? "Sign in" : "Se connecter"}
                  className="text-sm font-semibold rounded-full px-6 py-2 bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200 text-gray-100 dark:text-gray-900"
                  style={{ minWidth: "0px" }}
                />
              )}
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
                    key={item.id}
                    href={`/${lang}${item.href}`}
                    onClick={() => {
                      closeMenu();
                    }}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 dark:text-gray-100 hover:bg-gray-100/80 dark:hover:bg-black/80"
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
