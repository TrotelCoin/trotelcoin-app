"use client";

import { JSX, SVGProps, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { DictType, Lang } from "@/types/types";
import { getDictionary } from "@/app/[lang]/dictionaries";

const twitterIcon = (
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) => (
  <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
  </svg>
);
const githubIcon = (
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) => (
  <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
    <path
      fillRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      clipRule="evenodd"
    />
  </svg>
);

export default function Footer({ lang }: { lang: Lang }) {
  const [dict, setDict] = useState<DictType | null>(null);

  useEffect(() => {
    const fetchDictionary = async () => {
      const result = await getDictionary(lang);
      setDict(result);
    };

    fetchDictionary();
  }, [lang]);

  const navigation = {
    main: [
      {
        name: typeof dict?.footer !== "string" && dict?.footer.about,
        href: "https://trotelcoin.com",
        display: true,
        id: 1,
        anotherWindow: true,
      },
      {
        name: typeof dict?.footer !== "string" && dict?.footer.documentation,
        href: "https://docs.trotelcoin.com",
        display: true,
        id: 2,
        anotherWindow: true,
      },
      {
        name: typeof dict?.footer !== "string" && dict?.footer.statistics,
        href: `/${lang}/statistics`,
        display: true,
        id: 3,
        anotherWindow: false,
      },
      {
        name: typeof dict?.footer !== "string" && dict?.footer.premium,
        href: `/${lang}/premium`,
        display: false,
        id: 4,
        anotherWindow: false,
      },
      {
        name: typeof dict?.footer !== "string" && dict?.footer.business,
        href: "mailto:hello@trotelcoin.com",
        display: true,
        id: 5,
        anotherWindow: false,
      },
      {
        name: typeof dict?.footer !== "string" && dict?.footer.partners,
        href: "#",
        display: false,
        id: 6,
        anotherWindow: false,
      },
      {
        name: typeof dict?.footer !== "string" && dict?.footer.jobs,
        href: "#",
        display: false,
        id: 7,
        anotherWindow: false,
      },
      {
        name: typeof dict?.footer !== "string" && dict?.footer.blog,
        href: "#",
        display: false,
        id: 8,
        anotherWindow: true,
      },
    ],
    social: [
      {
        name: "Twitter",
        href: "https://twitter.com/TrotelCoin",
        icon: twitterIcon,
      },
      {
        name: "GitHub",
        href: "https://github.com/TrotelCoin",
        icon: githubIcon,
      },
    ],
  };

  const displayedItems = navigation.main.filter((item) => item.display);

  return (
    <footer className="bg-white dark:bg-black mx-10">
      <div className="mx-auto flex justify-between max-w-6xl overflow-hidden px-6 py-10 sm:py-12 border-t border-black/20 dark:border-white/20">
        <nav
          className="-mb-6 sm:flex sm:justify-center sm:space-x-12"
          aria-label="Footer"
        >
          {displayedItems.map((item: any) => (
            <div key={item.id} className="pb-6 flex items-center">
              {item.display && (
                <Link
                  href={item.href}
                  target={item.anotherWindow ? "_blank" : "_self"}
                  className="text-sm leading-6 text-gray-700 dark:text-gray-300 hover:text-gray-900 hover:dark:text-gray-100"
                >
                  {item.name}
                </Link>
              )}
              {item.anotherWindow && (
                <span className="ml-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-3 h-3"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
                    />
                  </svg>
                </span>
              )}
            </div>
          ))}
        </nav>
        <div>
          <Link href="/home">
            <Image
              width={128}
              height={128}
              alt="TrotelCoin Logo"
              className="block sm:hidden h-12 w-auto"
              src="/assets/logo/trotelcoin-white.png"
            ></Image>
          </Link>
          <div className="flex justify-center space-x-10">
            {navigation.social.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                target="_blank"
                className="hidden sm:block text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
              >
                <span className="sr-only">{item.name}</span>
                <item.icon className="h-6 w-6" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
