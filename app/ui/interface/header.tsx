"use client";

// Import necessary libraries and components
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Dialog } from "@headlessui/react";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Import dynamic components with SSR disabled
const WalletNoSSR = dynamic(() => import("@/app/ui/interface/wallet"), {
  ssr: false,
});

const LanguageSelectorNoSSR = dynamic(
  () => import("@/app/ui/interface/languageSelector"),
  {
    ssr: false,
  }
);

const TrotelPriceNoSSR = dynamic(() => import("@/app/ui/hooks/trotelPrice"), {
  ssr: false,
});

const TrotelPriceChangeNoSSR = dynamic(
  () => import("@/app/ui/hooks/trotelPriceChange"),
  {
    ssr: false,
  }
);

// Define types for navigation items and header props
interface NavigationItem {
  name: string;
  href: string;
}

interface HeaderProps {
  currentPage: string;
}

// Define an array of navigation items
const navigation = [
  { name: "Home", href: "/" },
  { name: "Account", href: "/account" },
];

// Define the Header component
const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="bg-white dark:bg-black">
      {/* Navigation */}
      <nav
        className="mx-auto flex max-w-8xl items-center justify-between gap-x-16 p-6 lg:px-8"
        aria-label="Global"
      >
        {/* Left section with logo, Trotel price, and version */}
        <div className="flex lg:flex-1 items-center gap-x-4">
          <div className="-m-1.5 p-1.5">
            <Image
              className="h-12 w-auto"
              width={128}
              height={128}
              src="/assets/logo/trotelcoin-white.png"
              alt={""}
            ></Image>
          </div>
          <p className="dark:text-gray-100">
            ${<TrotelPriceNoSSR></TrotelPriceNoSSR>}
          </p>
          {<TrotelPriceChangeNoSSR></TrotelPriceChangeNoSSR>}
          <span className="hidden lg:inline-flex items-center rounded-md bg-blue-50 dark:bg-blue-400/10 px-2 py-1 text-xs font-medium text-blue-700 dark:text-blue-400 ring-1 ring-inset ring-blue-700/10 dark:ring-blue-400/30">
            <span className="animate-pulse">alpha version</span>
          </span>
        </div>

        {/* Desktop navigation links */}
        <div className="hidden lg:flex lg:gap-x-4">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-sm px-6 py-2 ${
                pathname === item.href
                  ? "bg-blue-200 dark:bg-blue-200 text-gray-900 dark:text-gray-900 dark:hover:text-gray-900 hover:text-gray-900"
                  : ""
              } font-semibold rounded-full leading-6 dark:text-gray-100 dark:hover:text-gray-300 text-gray-900 hover:text-gray-700`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Right section with Wallet component */}
        <div className="hidden sm:flex flex-1 items-center justify-end gap-x-6">
          <WalletNoSSR />
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-900 dark:text-gray-100"
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
              <Image
                className="h-12 w-auto"
                width={128}
                height={128}
                src="/assets/logo/trotelcoin-white.png"
                alt={""}
              ></Image>
            </div>
            <div className="flex flex-1 items-center justify-end gap-x-6">
              <WalletNoSSR />
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-900 dark:text-gray-100"
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
                    href={item.href}
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
