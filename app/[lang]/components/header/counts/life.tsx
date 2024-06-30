import type { Lang } from "@/types/language/lang";
import { Transition } from "@headlessui/react";
import Link from "next/link";
import React, { Fragment, useContext, useState } from "react";
import LifeContext from "@/contexts/life";
import PremiumContext from "@/contexts/premium";
import BlueButton from "@/app/[lang]/components/buttons/blue";

const LifeCount = ({ lang }: { lang: Lang }) => {
  const [isHoveringLife, setIsHoveringLife] = useState<boolean>(false);

  const { life } = useContext(LifeContext);
  const { isIntermediate, isExpert } = useContext(PremiumContext);

  return (
    <>
      <div
        className="relative flex cursor-pointer items-center justify-center gap-1 text-xl text-gray-900 dark:text-gray-100"
        onMouseEnter={() => setIsHoveringLife(true)}
        onMouseLeave={() => setIsHoveringLife(false)}
      >
        {isExpert || isIntermediate ? (
          <span className="text-2xl font-semibold">&infin;</span>
        ) : life ? (
          <span className="font-semibold">{life}</span>
        ) : (
          <span className="font-semibold">0</span>
        )}{" "}
        <span>{Number(life) > 0 ? "💙" : "💔"}</span>
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
            className="absolute z-10 mt-3 flex justify-center bg-white text-sm text-gray-900 dark:bg-gray-800 dark:text-gray-100"
            style={{ width: "300px" }}
          >
            <div className="absolute top-5 z-50 flex flex-col items-center justify-center gap-4 rounded-xl border border-gray-900/10 bg-white p-4 dark:border-gray-100/10 dark:bg-gray-800">
              <p className="font-semibold">
                {lang === "en" ? "Your lives" : "Vos vies"}
              </p>
              <Link href={`/${lang}/premium`}>
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
