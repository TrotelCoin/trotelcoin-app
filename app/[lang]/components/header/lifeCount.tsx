import { DictType, Lang } from "@/types/types";
import { Transition } from "@headlessui/react";
import Link from "next/link";
import React, { Fragment, useContext, useState } from "react";
import LifeContext from "@/app/[lang]/contexts/lifeContext";
import PremiumContext from "@/app/[lang]/contexts/premiumContext";

const LifeCount = ({ dict, lang }: { dict: DictType; lang: Lang }) => {
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
          <>{life}</>
        ) : (
          <span className="font-semibold">0</span>
        )}{" "}
        <span className="text-sm">💙</span>
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
              <Link href={`/${lang}/shop`}>
                <button className="bg-blue-500 hover:bg-blue-400 hover:border-gray-900/50 dark:hover:border-gray-100/50 focus:border-blue-500 text-sm px-6 py-2 text-gray-100 rounded-xl font-semibold">
                  {typeof dict?.header !== "string" && (
                    <>{dict?.header.lifeButton}</>
                  )}
                </button>
              </Link>
            </div>
          </div>
        </Transition>
      </div>
    </>
  );
};

export default LifeCount;
