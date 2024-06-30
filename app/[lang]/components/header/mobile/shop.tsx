import type { Lang } from "@/types/language/lang";
import Link from "next/link";
import React from "react";
import { ChevronRightIcon } from "@heroicons/react/20/solid";

const ShopMobile = ({
  lang,
  setMobileMenuOpen
}: {
  lang: Lang;
  setMobileMenuOpen: (open: boolean) => void;
}) => {
  return (
    <>
      <Link
        href={`/${lang}/inventory`}
        onClick={() => setMobileMenuOpen(false)}
      >
        <div className="flex flex-col divide-y divide-gray-900/10 rounded-xl border border-gray-900/10 bg-white text-gray-900 hover:border-gray-900/50 active:border-blue-500 dark:divide-gray-100/10 dark:border-gray-100/10 dark:bg-gray-800 dark:text-gray-100 dark:hover:border-gray-100/50 dark:active:border-blue-500">
          <div className="flex items-center justify-between gap-2 p-4">
            <h3>{lang === "en" ? "Your inventory" : "Votre inventaire"}</h3>
            <span>
              <ChevronRightIcon className="h-5 w-5" />
            </span>
          </div>
          <div className="flex items-center justify-start gap-4 p-4">
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
