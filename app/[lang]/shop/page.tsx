"use client";

import React from "react";
import Link from "next/link";
import Tilt from "react-parallax-tilt";
import type { Lang } from "@/types/lang";

const Subscription = ({ params: { lang } }: { params: { lang: Lang } }) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link href={`/${lang}/shop/ranks`}>
          <Tilt
            glareEnable={true}
            tiltMaxAngleX={5}
            tiltMaxAngleY={5}
            glareMaxOpacity={0.15}
            perspective={800}
            className="bg-blue-500 dark:bg-blue-500 shadow-xl active:border-gray-900 active:bg-blue-400 dark:active:bg-blue-400 border-2 border-gray-900/50 dark:border-transparent backdrop-blur-xl rounded-xl p-12"
          >
            <div className="flex flex-col items-center text-center justify-center gap-2">
              <h2 className="text-gray-100 font-semibold text-4xl">
                {lang === "en" ? "Ranks" : "Rangs"}
              </h2>
              <span className="text-gray-100">
                {lang === "en"
                  ? "Claim your NFTs to access special ranks and benefits"
                  : "Récupérez vos NFTs pour accéder à des rangs spéciaux et à des avantages"}
              </span>
            </div>
          </Tilt>
        </Link>
        <Link href={`/${lang}/shop/items`}>
          <Tilt
            glareEnable={true}
            tiltMaxAngleX={5}
            tiltMaxAngleY={5}
            glareMaxOpacity={0.15}
            perspective={800}
            className="bg-yellow-500 dark:bg-yellow-500 shadow-xl active:border-gray-900 active:bg-yellow-400 dark:active:bg-yellow-400  border-2 border-gray-900/50 dark:border-transparent backdrop-blur-xl rounded-xl p-12"
          >
            <div className="flex flex-col items-center text-center justify-center gap-2">
              <h2 className="text-gray-100 font-semibold text-4xl">
                {lang === "en" ? "Shop" : "Boutique"}
              </h2>
              <span className="text-gray-100">
                {lang === "en"
                  ? "Buy items to get more lives, reset your streak and more"
                  : "Achetez des items pour obtenir plus de vies, réinitialiser votre série et plus encore"}
              </span>
            </div>
          </Tilt>
        </Link>
        <Link href={`/${lang}/shop/inventory`}>
          <Tilt
            glareEnable={true}
            tiltMaxAngleX={5}
            tiltMaxAngleY={5}
            glareMaxOpacity={0.15}
            perspective={800}
            className="bg-green-500 dark:bg-green-500 shadow-xl active:border-gray-900 active:bg-green-400 dark:active:bg-green-400  border-2 border-gray-900/50 dark:border-transparent backdrop-blur-xl rounded-xl p-12"
          >
            <div className="flex flex-col items-center text-center justify-center gap-2">
              <h2 className="text-gray-100 font-semibold text-4xl">
                {lang === "en" ? "Inventory" : "Inventaire"}
              </h2>
              <span className="text-gray-100">
                {lang === "en"
                  ? "Use your items to get + lives and rewards"
                  : "Utilisez vos items pour obtenir + de vies et de récompenses"}
              </span>
            </div>
          </Tilt>
        </Link>
      </div>
    </>
  );
};

export default Subscription;
