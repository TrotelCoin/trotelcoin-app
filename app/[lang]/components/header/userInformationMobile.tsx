"use client";

import { Lang } from "@/types/lang";
import React from "react";
import Image from "next/image";
import Marquee from "react-fast-marquee";

const UserInformationMobile = ({
  lang,
  streak,
  life,
  userTotalRewardsPending,
  userNumberOfQuizzesAnswered,
  isPremium,
}: {
  lang: Lang;
  streak: number;
  life: number;
  userTotalRewardsPending: number;
  userNumberOfQuizzesAnswered: number;
  isPremium: boolean;
}) => {
  return (
    <>
      {streak &&
        life &&
        userTotalRewardsPending &&
        userNumberOfQuizzesAnswered &&
        isPremium && (
          <Marquee>
            <div className="flex rounded-full items-center gap-16 w-full text-gray-900 dark:text-gray-100 font-semibold mx-8">
              <div className="flex items-center">{streak} 🔥</div>
              <div className="flex items-center">
                {isPremium ? (
                  <span className="text-xl mr-1">&infin;</span>
                ) : (
                  life
                )}{" "}
                💙
              </div>
              <div className="flex items-center gap-1">
                {Number(userTotalRewardsPending.toFixed(2)).toLocaleString(
                  "en-US"
                )}{" "}
                <div className="block dark:hidden w-4 h-4">
                  <Image
                    width={16}
                    height={16}
                    className="rounded-full"
                    aria-hidden="true"
                    alt="Token logo"
                    src="/assets/logo/trotelcoin.svg"
                  />
                </div>
                <div className="hidden dark:block w-4 h-4">
                  <Image
                    width={16}
                    height={16}
                    className="rounded-full"
                    aria-hidden="true"
                    alt="Token logo"
                    src="/assets/logo/trotelcoin-dark.jpg"
                  />
                </div>
              </div>
              <div className="flex items-center">
                {userNumberOfQuizzesAnswered} 📚
              </div>
            </div>
          </Marquee>
        )}
    </>
  );
};

export default UserInformationMobile;
