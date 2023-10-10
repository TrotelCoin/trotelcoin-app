import React, { useEffect, useState } from "react";
import Link from "next/link";

// Define the navigation items for the footer
const navigation = {
  main: [
    {
      name: "Dashboard",
      href: "./",
      iconSolid: () => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          {/* Dashboard icon path */}
        </svg>
      ),
      iconOutline: () => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          {/* Dashboard outline icon path */}
        </svg>
      ),
    },
    {
      name: "News",
      href: "/news",
      iconSolid: () => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          {/* News icon path */}
        </svg>
      ),
      iconOutline: () => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          {/* News outline icon path */}
        </svg>
      ),
    },
    {
      name: "Buy",
      href: "/buy",
      iconSolid: () => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          {/* Buy icon path */}
        </svg>
      ),
      iconOutline: () => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          {/* Buy outline icon path */}
        </svg>
      ),
    },
    {
      name: "Courses",
      href: "/courses",
      iconSolid: () => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          {/* Courses icon path */}
        </svg>
      ),
      iconOutline: () => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          {/* Courses outline icon path */}
        </svg>
      ),
    },
    {
      name: "Governance",
      href: "/governance",
      iconSolid: () => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          {/* Governance icon path */}
        </svg>
      ),
      iconOutline: () => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          {/* Governance outline icon path */}
        </svg>
      ),
    },
  ],
  social: [
    {
      name: "X / Twitter",
      href: "https://x.com/trotelcoin",
      icon: (
        <svg fill="currentColor" viewBox="0 0 24 24">
          {/* Twitter icon path */}
        </svg>
      ),
    },
    {
      name: "GitHub",
      href: "https://github.com/TrotelCoin",
      icon: (
        <svg fill="currentColor" viewBox="0 0 24 24">
          {/* GitHub icon path */}
        </svg>
      ),
    },
  ],
};

// Define FooterProps interface
interface FooterProps {
  currentPage: string;
}

const Footer: React.FC<FooterProps> = ({ currentPage }) => {
  const [isFooterVisible, setIsFooterVisible] = useState(true);

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
      <div className="hidden sm:flex bg-white dark:bg-gray-900 relative">
        <div className="mx-auto max-w-8xl overflow-hidden px-6 py-20 sm:py-24 lg:px-8">
          <nav
            className="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12"
            aria-label="Footer"
          >
            {navigation.main.map((item) => (
              <div key={item.name} className="pb-6">
                <Link
                  href={item.href}
                  className="text-sm leading-6 text-gray-900 hover:text-gray-700 dark:text-gray-100 dark:hover:text-gray-300"
                >
                  {item.name}
                </Link>
              </div>
            ))}
          </nav>
          <div className="mt-10 flex justify-center space-x-10">
            {navigation.social.map((item) => (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                className="text-gray-900 hover:text-gray-700 dark:text-gray-100 dark:hover:text-gray-300"
              >
                {item.icon}
              </a>
            ))}
          </div>
          <div>
            <p className="mt-10 text-center text-xs leading-5 text-gray-700 dark:text-gray-300">
              &copy; 2023 TrotelCoin. All rights reserved.
            </p>
          </div>
        </div>
      </div>
      <div
        className={`fixed sm:hidden bottom-0 left-0 w-full dark:bg-gray-900 bg-white shadow-xl border-t-2 border-gray-900/5 dark:border-white/5 transition-all duration-500 ${
          isFooterVisible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="mx-auto flex max-w-8xl overflow-hidden bottom-0 p-2 pb-6 sm:py-24 lg:px-8 items-center justify-evenly gap-x-4">
          {navigation.main.map((item) => (
            <Link
              href={item.href}
              className="my-auto text-gray-900 flex flex-col items-center gap-y-2 dark:text-gray-100 hover:text-gray-700 dark:hover:text-gray-300"
            >
              {currentPage === item.href && item.iconSolid && item.iconSolid()}{" "}
              {currentPage !== item.href &&
                item.iconOutline &&
                item.iconOutline()}{" "}
              <span className="text-xs">{item.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
