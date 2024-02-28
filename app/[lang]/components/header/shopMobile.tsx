import { Lang } from "@/types/types";
import Link from "next/link";
import React from "react";

const ShopMobile = ({
  lang,
  setMobileMenuOpen,
}: {
  lang: Lang;
  setMobileMenuOpen: (open: boolean) => void;
}) => {
  return (
    <>
      <Link href={`/${lang}/shop`} onClick={() => setMobileMenuOpen(false)}>
        <div className="flex flex-col border border-gray-900/10 dark:border-gray-100/10 active:border-blue-500 dark:active:border-blue-500 bg-gray-100 dark:bg-gray-800 rounded-xl text-gray-900 dark:text-gray-100 divide-y divide-gray-900/10 dark:divide-gray-100/10">
          <div className="flex gap-2 items-center justify-between p-4">
            <h3>{lang === "en" ? "Your inventory" : "Ton inventaire"}</h3>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </div>
          <div className="flex justify-start items-center gap-4 p-4">
            <span className="text-4xl">🛍️</span>
            <span className="flex flex-wrap text-left text-xs text-gray-700 dark:text-gray-300">
              {lang === "en"
                ? "Buy more lives, reset your streak and become premium to unlock more features."
                : "Achetez plus de vies, réinitialisez votre série et devenez premium pour débloquer plus de fonctionnalités."}
            </span>
          </div>
        </div>
      </Link>
    </>
  );
};

export default ShopMobile;
