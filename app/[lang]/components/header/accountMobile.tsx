import { Lang } from "@/types/lang";
import { useAccount } from "wagmi";
import Wallet from "@/app/[lang]/components/header/wallet";
import Link from "next/link";
import React, { useContext } from "react";
import UserContext from "@/app/[lang]/contexts/userContext";
import { ChevronRightIcon } from "@heroicons/react/20/solid";

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
  const { address } = useAccount();
  const { isLoggedIn } = useContext(UserContext);

  return (
    <>
      {isLoggedIn ? (
        <>
          <Link
            href={`/${lang}/account`}
            onClick={() => {
              if (isLoggedIn) {
                setMobileMenuOpen(false);
              }
            }}
          >
            <div className="relative">
              <div
                className={`flex flex-col border border-gray-900/10 dark:border-gray-100/10 hover:border-gray-900/50 dark:hover:border-gray-100/50 active:border-blue-500 dark:active:border-blue-500
               bg-gray-100 dark:bg-gray-800 rounded-xl text-gray-900 dark:text-gray-100 divide-y divide-gray-900/10 dark:divide-gray-100/10`}
              >
                <div className="flex gap-2 items-center justify-between p-4">
                  <div className="flex gap-2 items-center">
                    <h3>{lang === "en" ? "Your account" : "Votre compte"}</h3>
                    <span className={`${connectedClass}`}>
                      {lang === "en" ? "Logged in" : "Connecté"}
                    </span>
                  </div>
                  <span>
                    <ChevronRightIcon className="h-5 w-5" />
                  </span>
                </div>
                <div className="flex justify-start items-center gap-4 p-4">
                  <span className="text-4xl">👋</span>

                  <button className="flex flex-wrap text-left text-xs text-gray-700 dark:text-gray-300">
                    {lang === "en"
                      ? "Go to your account to see your rewards, max streak, level and more."
                      : "Allez sur votre compte pour voir vos récompenses, votre série maximale, votre niveau et plus encore."}
                  </button>
                </div>
              </div>
            </div>
          </Link>
        </>
      ) : (
        <>
          <div className="relative">
            <div
              className={`flex flex-col border border-gray-900/10 dark:border-gray-100/10 bg-gray-100 dark:bg-gray-800 rounded-xl text-gray-900 dark:text-gray-100 divide-y divide-gray-900/10 dark:divide-gray-100/10`}
            >
              <div className="flex gap-2 items-center justify-between p-4">
                <div className="flex gap-2 items-center">
                  <h3>{lang === "en" ? "Your account" : "Votre compte"}</h3>
                  <div
                    className={`${address ? walletClass : disconnectedClass}`}
                  >
                    <span>
                      {address
                        ? lang === "en"
                          ? "Only wallet"
                          : "Portefeuille seulement"
                        : lang === "en"
                        ? "Logged out"
                        : "Déconnecté"}
                    </span>
                  </div>
                </div>
                <span>
                  <ChevronRightIcon className="h-5 w-5" />
                </span>
              </div>
              <div className="flex justify-start items-center gap-4 p-4">
                <Wallet lang={lang} isFull={true} />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AccountMobile;
