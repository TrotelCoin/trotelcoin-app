import type { Lang } from "@/types/language/lang";
import React, { useContext } from "react";
import LifeContext from "@/contexts/life";
import Link from "next/link";
import PremiumContext from "@/contexts/premium";
import BlueButton from "@/app/[lang]/components/buttons/blue";

const LifeMobile = ({
  lang,
  setMobileMenuOpen
}: {
  lang: Lang;
  setMobileMenuOpen: (open: boolean) => void;
}) => {
  const { life, lifeCooldown } = useContext(LifeContext);
  const { isIntermediate, isExpert } = useContext(PremiumContext);

  return (
    <>
      <div className="flex flex-col divide-y divide-gray-900/10 rounded-xl border border-gray-900/10 bg-white text-gray-900 dark:divide-gray-100/10 dark:border-gray-100/10 dark:bg-gray-800 dark:text-gray-100">
        <div className="flex items-center justify-between gap-2 p-4">
          <h3>{lang === "en" ? "Your lives" : "Vos vies"}</h3>
          <div className="flex items-center gap-2">
            <span>{lifeCooldown}</span>
            <div className="h-6 border-r border-gray-900/10 dark:border-gray-100/10" />
            {isIntermediate || isExpert ? (
              <span className="flex items-center">
                <span className="mr-1 text-xl font-bold">&infin;</span>💙
              </span>
            ) : (
              <span>
                {life} {Number(life) > 0 ? "💙" : "💔"}
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center justify-center gap-4 p-4">
          <Link href={`/${lang}/premium`} className="w-full">
            <BlueButton
              lang={lang}
              isFull={true}
              onClick={() => setMobileMenuOpen(false)}
              text={
                lang === "en"
                  ? "Get unlimited lives"
                  : "Obtenez vies illimitées"
              }
            />
          </Link>
        </div>
      </div>
    </>
  );
};

export default LifeMobile;
