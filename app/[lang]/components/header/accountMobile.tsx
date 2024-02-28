import { Lang } from "@/types/types";
import { useAddress, useUser } from "@thirdweb-dev/react";
import Link from "next/link";
import React from "react";

const connectedClass =
  "inline-flex items-center rounded-xl bg-green-400 px-2 py-1 text-xs font-medium text-gray-100";
const walletClass =
  "inline-flex items-center rounded-xl bg-blue-400 px-2 py-1 text-xs font-medium text-gray-100";
const disconnectedClass =
  "inline-flex items-center rounded-xl bg-red-400 px-2 py-1 text-xs font-medium text-gray-100";

const AccountMobile = ({
  lang,
  setMobileMenuOpen,
}: {
  lang: Lang;
  setMobileMenuOpen: (open: boolean) => void;
}) => {
  const address = useAddress();
  const { isLoggedIn } = useUser();

  return (
    <>
      <Link href={`/${lang}/account`} onClick={() => setMobileMenuOpen(false)}>
        <div className="flex flex-col border border-gray-900/10 dark:border-gray-100/10 bg-gray-100 dark:bg-gray-800 rounded-xl text-gray-900 dark:text-gray-100 divide-y divide-gray-900/10 dark:divide-gray-100/10">
          <div className="flex gap-2 items-center justify-between p-4">
            <div className="flex gap-2 items-center">
              <h3>Account</h3>
              <span
                className={`${
                  address
                    ? isLoggedIn
                      ? connectedClass
                      : walletClass
                    : disconnectedClass
                }`}
              >
                {address
                  ? isLoggedIn
                    ? lang === "en"
                      ? "Logged in"
                      : "Connecté"
                    : lang === "en"
                    ? "Only wallet"
                    : "Portefeuille seulement"
                  : lang === "en"
                  ? "Logged out"
                  : "Déconnecté"}
              </span>
            </div>
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
            <span className="text-4xl">🦄</span>
            <button className="flex flex-wrap text-left text-xs text-gray-700 dark:text-gray-300">
              {lang === "en"
                ? "Go to your account to see your rewards, max streak, level and more."
                : "Allez sur votre compte pour voir vos récompenses, votre série maximale, votre niveau et plus encore."}
            </button>
          </div>
        </div>
      </Link>
    </>
  );
};

export default AccountMobile;
