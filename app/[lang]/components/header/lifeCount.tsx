import type { Lang } from "@/types/lang";
import { Transition } from "@headlessui/react";
import Link from "next/link";
import React, { Fragment, useContext, useState } from "react";
import LifeContext from "@/app/[lang]/contexts/lifeContext";
import PremiumContext from "@/app/[lang]/contexts/premiumContext";
import BlueButton from "@/app/[lang]/components/blueButton";

const LifeCount = ({ lang }: { lang: Lang }) => {
  const [isHoveringLife, setIsHoveringLife] = useState<boolean>(false);

  const { life } = useContext(LifeContext);
  const { isIntermediate, isExpert } = useContext(PremiumContext);

  return (
    <>
      <div
        className="relative flex justify-center gap-1 text-xl items-center text-gray-900 dark:text-gray-100 cursor-pointer"
        onMouseEnter={() => setIsHoveringLife(true)}
        onMouseLeave={() => setIsHoveringLife(false)}
      >
        {isExpert || isIntermediate ? (
          <span className="font-semibold text-2xl">&infin;</span>
        ) : life ? (
          <span className="font-semibold">{life}</span>
        ) : (
          <span className="font-semibold">0</span>
        )}{" "}
        <span>💙</span>
        <Transition
          as={Fragment}
          show={isHoveringLife}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <div
            className="absolute flex justify-center bg-white dark:bg-gray-800 z-10 mt-3 text-sm text-gray-900 dark:text-gray-100"
            style={{ width: "300px" }}
          >
            <div className="absolute flex flex-col gap-4 bg-white dark:bg-gray-800 justify-center items-center top-5 z-50 border border-gray-900/10 dark:border-gray-100/10 p-4 rounded-xl">
              <p className="font-semibold">
                {lang === "en" ? "Your lives" : "Vos vies"}
              </p>
              <Link href={`/${lang}/shop/ranks`}>
                <BlueButton
                  lang={lang}
                  onClick={() => setIsHoveringLife(false)}
                  text={
                    lang === "en"
                      ? "Get unlimited lives"
                      : "Obtenez vies illimitées"
                  }
                />
              </Link>
            </div>
          </div>
        </Transition>
      </div>
    </>
  );
};

export default LifeCount;
