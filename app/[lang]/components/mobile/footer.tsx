"use client";

import type { Lang } from "@/types/language/lang";
import { MobileFooterItem } from "@/types/components/footer";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Transition } from "@headlessui/react";

const defaultClasses =
  "text-gray-100 hover:text-white text-sm font-semibold leading-6 py-1 px-4 rounded-full";

const dynamicClasses =
  "bg-white dark:bg-gray-900 text-black dark:text-white text-sm font-semibold hover:bg-white hover:text-gray-900 dark:hover:bg-gray-900 dark:hover:text-gray-100 leading-6 py-1 px-4 shadow-lg rounded-full";

const MobileFooter = ({ lang }: { lang: Lang }) => {
  const [scrolling, setScrolling] = useState<boolean>(false);

  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navigation = [
    {
      name: lang === "en" ? "Home" : "Accueil",
      href: `/${lang}/home`,
      id: 1
    },
    {
      name: lang === "en" ? "Learn" : "Cours",
      href: `/${lang}/learn`,
      id: 2
    },
    {
      name: lang === "en" ? "Shop" : "Boutique",
      href: `/${lang}/shop`,
      id: 3
    },
    {
      name: lang === "en" ? "Account" : "Compte",
      href: `/${lang}/account`,
      id: 4
    }
  ];

  return (
    <>
      <Transition
        show={!scrolling}
        enter="transition-opacity duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        className="mx-auto flex justify-center"
      >
        <div
          className={`fixed bottom-0 mx-auto mb-8 w-11/12 rounded-full bg-blue-500 p-2 shadow-lg backdrop-blur-xl md:hidden`}
        >
          <div className="flex flex-wrap items-center justify-between text-gray-900 dark:text-gray-100">
            {navigation.map((item: MobileFooterItem, index: number) => (
              <Link
                key={index}
                href={item.href}
                className={`flex items-center text-xs ${
                  pathname === item.href ? dynamicClasses : defaultClasses
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </Transition>
    </>
  );
};

export default MobileFooter;
