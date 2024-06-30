"use client";

import React, { useContext } from "react";
import "animate.css";
import type { Lang } from "@/types/language/lang";
import Tilt from "react-parallax-tilt";
import PremiumContext from "@/contexts/premium";
import {
  CheckCircleIcon,
  InformationCircleIcon
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { intermediateStakingBalance } from "@/data/staking/premium";
import { roundPrice } from "@/utils/price/roundPrice";
import TrotelPriceContext from "@/contexts/trotelPrice";

const Intermediate = ({ lang }: { lang: Lang }) => {
  const { isIntermediate, totalStakingAmount } = useContext(PremiumContext);
  const { trotelPrice } = useContext(TrotelPriceContext);

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
          className={`} flex h-full items-center justify-center overflow-hidden rounded-xl border border-gray-900/10 bg-white backdrop-blur-xl dark:border-gray-100/10 dark:bg-gray-800`}
        >
          <div className="w-full px-4 py-5 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <div
                  className={`text-2xl font-semibold text-gray-900 dark:text-gray-100 ${
                    isIntermediate && "rainbow-text"
                  }`}
                >
                  {lang === "en" ? "Intermediate" : "Intermédiaire"}
                </div>
                <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  $
                  {roundPrice(
                    (trotelPrice as number) * intermediateStakingBalance
                  )}
                </span>
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
                    <InformationCircleIcon className="h-6 w-6 text-gray-900 hover:text-gray-800 dark:text-gray-100 dark:hover:text-gray-200" />
                  </Link>
                </>
              )}
            </div>
            <div className="mt-5 flex items-center justify-center">
              <span className="text-8xl">🙈</span>
            </div>
            <div className="mt-5 flex flex-col">
              <Link
                href={!isIntermediate ? `/${lang}/stake` : ""}
                className={`${
                  isIntermediate ? "cursor-default" : "cursor-pointer"
                }`}
              >
                <div
                  className={`rounded-xl bg-gray-800 px-6 py-2 text-center text-sm font-semibold text-gray-100 dark:bg-gray-100 dark:text-gray-900 ${
                    !isIntermediate &&
                    "hover:bg-gray-700 dark:hover:bg-gray-200"
                  }`}
                >
                  {totalStakingAmount &&
                  totalStakingAmount > intermediateStakingBalance
                    ? null
                    : `${
                        totalStakingAmount
                          ? totalStakingAmount.toLocaleString("en-US")
                          : 0
                      } /`}{" "}
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
