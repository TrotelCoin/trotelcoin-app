"use client";

import React from "react";
import type { Lang } from "@/types/lang";
import Link from "next/link";
import Tilt from "react-parallax-tilt";

const Page = ({ params: { lang } }: { params: { lang: Lang } }) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link href={`/${lang}/wallet/claim`} className="h-full">
          <Tilt
            glareEnable={true}
            tiltMaxAngleX={5}
            tiltMaxAngleY={5}
            glareMaxOpacity={0.15}
            perspective={800}
            className="h-full flex items-center justify-center bg-blue-500 dark:bg-blue-500 shadow-xl active:border-gray-900 active:bg-blue-400 dark:active:bg-blue-400 border-2 border-gray-900/50 dark:border-transparent backdrop-blur-xl rounded-xl p-12"
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
        <Link href={`/${lang}/wallet/buy`} className="h-full">
          <Tilt
            glareEnable={true}
            tiltMaxAngleX={5}
            tiltMaxAngleY={5}
            glareMaxOpacity={0.15}
            perspective={800}
            className="h-full flex items-center justify-center bg-yellow-500 dark:bg-yellow-500 shadow-xl active:border-gray-900 active:bg-yellow-400 dark:active:bg-yellow-400 border-2 border-gray-900/50 dark:border-transparent backdrop-blur-xl rounded-xl p-12"
          >
            <div className="flex flex-col items-center text-center justify-center gap-2">
              <h2 className="text-gray-100 font-semibold text-4xl">
                {lang === "en" ? "Buy" : "Acheter"}
              </h2>
              <span className="text-gray-100">
                {lang === "en"
                  ? "Buy TROTEL using your credit card and buy items in the shop"
                  : "Achetez des TROTEL en utilisant votre carte de crédit et achetez des items"}
              </span>
            </div>
          </Tilt>
        </Link>
        <Link href={`/${lang}/wallet/stake`} className="h-full">
          <Tilt
            glareEnable={true}
            tiltMaxAngleX={5}
            tiltMaxAngleY={5}
            glareMaxOpacity={0.15}
            perspective={800}
            className="h-full flex items-center justify-center bg-green-500 dark:bg-green-500 shadow-xl active:border-gray-900 active:bg-green-400 dark:active:bg-green-400 border-2 border-gray-900/50 dark:border-transparent backdrop-blur-xl rounded-xl p-12"
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
        <Link href={`/${lang}/wallet/swap`} className="h-full">
          <Tilt
            glareEnable={true}
            tiltMaxAngleX={5}
            tiltMaxAngleY={5}
            glareMaxOpacity={0.15}
            perspective={800}
            className="h-full flex items-center justify-center bg-red-500 dark:bg-red-500 shadow-xl active:border-gray-900 active:bg-red-400 dark:active:bg-red-400 border-2 border-gray-900/50 dark:border-transparent backdrop-blur-xl rounded-xl p-12"
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
        <Link href={`/${lang}/wallet/send`} className="h-full">
          <Tilt
            glareEnable={true}
            tiltMaxAngleX={5}
            tiltMaxAngleY={5}
            glareMaxOpacity={0.15}
            perspective={800}
            className="h-full flex items-center justify-center bg-purple-500 dark:bg-purple-500 shadow-xl active:border-gray-900 active:bg-purple-400 dark:active:bg-purple-400 border-2 border-gray-900/50 dark:border-transparent backdrop-blur-xl rounded-xl p-12"
          >
            <div className="flex flex-col items-center text-center justify-center gap-2">
              <h2 className="text-gray-100 font-semibold text-4xl">
                {lang === "en" ? "Send" : "Envoyer"}
              </h2>
              <span className="text-gray-100">
                {lang === "en"
                  ? "Send TROTEL to another wallet or to your friends"
                  : "Envoyez des TROTEL à un autre portefeuille ou à vos amis"}
              </span>
            </div>
          </Tilt>
        </Link>
        <Link href={`/${lang}/wallet/receive`} className="h-full">
          <Tilt
            glareEnable={true}
            tiltMaxAngleX={5}
            tiltMaxAngleY={5}
            glareMaxOpacity={0.15}
            perspective={800}
            className="h-full flex items-center justify-center bg-orange-500 dark:bg-orange-500 shadow-xl active:border-gray-900 active:bg-orange-400 dark:active:bg-orange-400 border-2 border-gray-900/50 dark:border-transparent backdrop-blur-xl rounded-xl p-12"
          >
            <div className="flex flex-col items-center text-center justify-center gap-2">
              <h2 className="text-gray-100 font-semibold text-4xl">
                {lang === "en" ? "Receive" : "Recevoir"}
              </h2>
              <span className="text-gray-100">
                {lang === "en"
                  ? "Receive TROTEL from your friends, from anywhere"
                  : "Recevez des TROTEL de vos amis, à partir de n'importe où"}
              </span>
            </div>
          </Tilt>
        </Link>
      </div>
    </>
  );
};

export default Page;
