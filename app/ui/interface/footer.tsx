"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Define the navigation items for the footer
const navigation = {
  main: [
    {
      name: "Home",
      href: "/",
      iconSolid: (
        props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
      ) => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
          {...props}
        >
          <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
          <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
        </svg>
      ),
      iconOutline: (
        props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
      ) => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
          {...props}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
          />
        </svg>
      ),
    },
    {
      name: "Account",
      href: "/account",
      iconSolid: (
        props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
      ) => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
          {...props}
        >
          <path
            fillRule="evenodd"
            d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
            clipRule="evenodd"
          />
        </svg>
      ),
      iconOutline: (
        props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
      ) => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
          {...props}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
          />
        </svg>
      ),
    },
  ],
  social: [
    {
      name: "X / Twitter",
      href: "https://x.com/trotelcoin",
      icon: (
        props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
      ) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      ),
    },
    {
      name: "GitHub",
      href: "https://github.com/TrotelCoin",
      icon: (
        props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
      ) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ],
};

// Define FooterProps interface
interface FooterProps {
  currentPage: string;
}

const Footer = () => {
  const [isFooterVisible, setIsFooterVisible] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    // Add scroll event listener to toggle footer visibility
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsFooterVisible(false);
      } else {
        setIsFooterVisible(true);
      }
    };

    // Attach the event listener and remove it on component unmount
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <footer>
      <div className="hidden sm:flex bg-white dark:bg-black relative">
        <div className="mx-auto max-w-8xl overflow-hidden px-6 py-20 sm:py-24 lg:px-8">
          <nav
            className="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12"
            aria-label="Footer"
          >
            {navigation.main.map((item) => (
              <div key={item.name} className="pb-6">
                <Link
                  href={item.href}
                  key={item.name}
                  className="text-sm leading-6 text-stone-900 hover:text-stone-700 dark:text-stone-100 dark:hover:text-stone-300"
                >
                  {item.name}
                </Link>
              </div>
            ))}
          </nav>
          <div className="mt-10 flex justify-center space-x-10">
            {navigation.social.map((item) => (
              <a key={item.name} href={item.href} target="_blank">
                <item.icon className="h-6 w-6 text-stone-900 hover:text-stone-700 dark:text-stone-100 dark:hover:text-stone-300"></item.icon>
              </a>
            ))}
          </div>
          <div>
            <p className="mt-10 text-center text-xs leading-5 text-stone-700 dark:text-stone-300">
              &copy; 2023 TrotelCoin. All rights reserved.
            </p>
          </div>
        </div>
      </div>
      {/* Mobile footer 
      <div
        className={`fixed sm:hidden bottom-0 left-0 w-full dark:bg-black bg-white shadow-xl border-t-2 border-stone-900/5 dark:border-white/5 transition-all duration-500 ${
          isFooterVisible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="mx-auto flex max-w-8xl overflow-hidden bottom-0 p-2 pb-6 sm:py-24 lg:px-8 items-center justify-evenly gap-x-4">
          {navigation.main.map((item) => (
            <Link
              href={item.href}
              key={item.name}
              className="my-auto text-stone-900 flex flex-col items-center gap-y-1 dark:text-stone-100 hover:text-stone-700 dark:hover:text-stone-300"
            >
              {pathname === item.href && item.iconSolid && (
                <item.iconSolid></item.iconSolid>
              )}{" "}
              {pathname !== item.href && item.iconOutline && (
                <item.iconOutline></item.iconOutline>
              )}{" "}
              <span className="text-xs">{item.name}</span>
            </Link>
          ))}
        </div>
      </div>*/}
    </footer>
  );
};

export default Footer;
