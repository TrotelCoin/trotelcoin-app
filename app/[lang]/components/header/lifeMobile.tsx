import { DictType, Lang } from "@/types/types";
import React, { useContext } from "react";
import LifeContext from "@/app/[lang]/contexts/lifeContext";
import Link from "next/link";
import PremiumContext from "@/app/[lang]/contexts/premiumContext";

const LifeMobile = ({
  lang,
  dict,
  setMobileMenuOpen,
}: {
  lang: Lang;
  dict: DictType;
  setMobileMenuOpen: (open: boolean) => void;
}) => {
  const { life, lifeCooldown } = useContext(LifeContext);
  const { isIntermediate, isExpert } = useContext(PremiumContext);

  return (
    <>
      <div className="flex flex-col border border-gray-900/10 dark:border-gray-100/10 bg-gray-100 dark:bg-gray-800 rounded-xl text-gray-900 dark:text-gray-100 divide-y divide-gray-900/10 dark:divide-gray-100/10">
        <div className="flex gap-2 items-center justify-between p-4">
          <h3>{lang === "en" ? "Your lives" : "Vos vies"}</h3>
          <div className="flex gap-2 items-center">
            <span>{lifeCooldown}</span>
            <div className="border-r border-gray-900/10 dark:border-gray-100/10 h-6" />
            {isIntermediate || isExpert ? (
              <span className="flex items-center">
                <span className="font-bold text-xl mr-1">&infin;</span>💙
              </span>
            ) : (
              <span>{life} 💙</span>
            )}
          </div>
        </div>
        <div className="flex justify-center items-center gap-4 p-4">
          <Link
            href={`/${lang}/shop`}
            onClick={() => setMobileMenuOpen(false)}
            className="w-full"
          >
            <button
              className={`w-full bg-blue-500 hover:bg-blue-400 text-gray-100 hover:border-gray-900/50 dark:hover:border-gray-100/50 focus:border-blue-500 text-sm px-6 py-2 rounded-xl font-semibold`}
            >
              {lang === "en"
                ? "Get unlimited lives"
                : "Obtenez des vies illimitées"}
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default LifeMobile;
