"use client";

import React, { useContext } from "react";
import "animate.css";
import type { Lang } from "@/types/language/lang";
import Tilt from "react-parallax-tilt";
import PremiumContext from "@/contexts/premium";
import {
  CheckCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { intermediateStakingBalance } from "@/data/staking/premium";

const Intermediate = ({ lang }: { lang: Lang }) => {
  const { isIntermediate, totalStakingAmount } = useContext(PremiumContext);

  return (
    <>
      <Tilt
        glareEnable={true}
        tiltMaxAngleX={5}
        tiltMaxAngleY={5}
        glareMaxOpacity={0.15}
        perspective={800}
        className="h-full"
      >
        <div
          className={`overflow-hidden h-full flex items-center justify-center rounded-xl bg-white dark:bg-gray-800 border border-gray-900/10 dark:border-gray-100/10
          } backdrop-blur-xl`}
        >
          <div className="px-4 py-5 sm:p-6 w-full">
            <div className="flex items-center justify-between">
              <div
                className={`font-semibold text-gray-900 dark:text-gray-100 text-2xl ${
                  isIntermediate && "rainbow-text"
                }`}
              >
                {lang === "en" ? "Intermediate" : "Intermédiaire"}
              </div>

              {isIntermediate ? (
                <>
                  <CheckCircleIcon className="h-6 w-6 text-blue-500 dark:text-blue-300" />
                </>
              ) : (
                <>
                  <Link
                    href="https://docs.trotelcoin.com/overview/ranks"
                    target="_blank"
                  >
                    <InformationCircleIcon className="h-6 w-6 text-gray-900 dark:text-gray-100 hover:text-gray-800 dark:hover:text-gray-200" />
                  </Link>
                </>
              )}
            </div>
            <div className="flex items-center justify-center mt-5">
              <span className="text-8xl">🙈</span>
            </div>
            <div className="flex flex-col mt-5">
              <Link
                href={!isIntermediate ? `/${lang}/stake` : ""}
                className={`${
                  isIntermediate ? "cursor-default" : "cursor-pointer"
                }`}
              >
                <div
                  className={`bg-gray-800 text-center dark:bg-gray-100 text-sm px-6 py-2 text-gray-100 dark:text-gray-900 rounded-xl font-semibold ${
                    !isIntermediate &&
                    "hover:bg-gray-700 dark:hover:bg-gray-200"
                  }`}
                >
                  {totalStakingAmount > intermediateStakingBalance
                    ? null
                    : `${totalStakingAmount.toLocaleString("en-US")} /`}{" "}
                  {intermediateStakingBalance.toLocaleString("en-US")}{" "}
                  {isIntermediate && "TROTEL"}
                </div>
              </Link>
            </div>
          </div>
        </div>
      </Tilt>
    </>
  );
};

export default Intermediate;
