"use client";

import React from "react";
import type { Lang } from "@/types/lang";
import Link from "next/link";
import Tilt from "react-parallax-tilt";

const Page = ({ params: { lang } }: { params: { lang: Lang } }) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link href={`/${lang}/wallet/claim`}>
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
                {lang === "en" ? "Claim" : "Récupérer"}
              </h2>
              <span className="text-gray-100">
                {lang === "en"
                  ? "Claim your pending TROTEL and use them in your wallet"
                  : "Récupèrez vos TROTEL en attente et utilisez les dans votre portefeuille"}
              </span>
            </div>
          </Tilt>
        </Link>
        <Link href={`/${lang}/wallet/buy`}>
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
                {lang === "en" ? "Buy" : "Acheter"}
              </h2>
              <span className="text-gray-100">
                {lang === "en"
                  ? "Buy TROTEL using your credit card and buy items in the shop"
                  : "Achetez des TROTEL en utilisant votre carte de crédit et achetez des items dans la boutique"}
              </span>
            </div>
          </Tilt>
        </Link>
        <Link href={`/${lang}/wallet/stake`}>
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
                {lang === "en" ? "Stake" : "Staker"}
              </h2>
              <span className="text-gray-100">
                {lang === "en"
                  ? "Stake TROTEL, boost your voting power and earn +"
                  : "Stakez des TROTEL, augmentez votre pouvoir de vote et gagnez +"}
              </span>
            </div>
          </Tilt>
        </Link>
        <Link href={`/${lang}/wallet/swap`}>
          <Tilt
            glareEnable={true}
            tiltMaxAngleX={5}
            tiltMaxAngleY={5}
            glareMaxOpacity={0.15}
            perspective={800}
            className="bg-red-500 dark:bg-red-500 shadow-xl active:border-gray-900 active:bg-red-400 dark:active:bg-red-400  border-2 border-gray-900/50 dark:border-transparent backdrop-blur-xl rounded-xl p-12"
          >
            <div className="flex flex-col items-center text-center justify-center gap-2">
              <h2 className="text-gray-100 font-semibold text-4xl">
                {lang === "en" ? "Swap" : "Échanger"}
              </h2>
              <span className="text-gray-100">
                {lang === "en"
                  ? "Swap & bridge your tokens, from one blockchain to another or the same one"
                  : "Échangez et transférez vos jetons, d'une blockchain à une autre ou sur la même"}
              </span>
            </div>
          </Tilt>
        </Link>
      </div>
    </>
  );
};

export default Page;
