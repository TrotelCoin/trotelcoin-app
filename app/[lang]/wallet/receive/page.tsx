"use client";

import React, { useState } from "react";
import { useAccount } from "wagmi";
import QRCode from "react-qr-code";
import { Lang } from "@/types/lang";
import BlueSimpleButton from "@/app/[lang]/components/blueSimpleButton";
import Success from "@/app/[lang]/components/modals/success";
import shortenAddress from "@/utils/shortenAddress";
import Wallet from "@/app/[lang]/components/header/wallet";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";

const Receive = ({ params: { lang } }: { params: { lang: Lang } }) => {
  const [addressCopied, setAddressCopied] = useState<boolean>(false);

  const { address } = useAccount();

  const share = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "TrotelCoin Wallet",
          text: `Want to send me some TROTEL? \n\nStart your crypto learning journey with TrotelCoin today at https://app.trotelcoin.com. \n\nLet's dive into the world of Web3 together! \n\nHere's my crypto address: ${address}`,
        });
      } catch (error) {
        console.error("Error sharing", error);
      }
    } else {
      console.error("Web share not supported");
    }
  };

  return (
    <>
      <div className="mx-auto flex flex-col max-w-md justify-center w-full items-center">
        <span className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          {lang === "en" ? "Receive" : "Recevoir"}
        </span>

        {address && (
          <div className="bg-white p-4 my-8 border border-gray-900/10 dark:border-gray-100/10 rounded-xl">
            <QRCode value={address ?? ""} />
          </div>
        )}

        <div className="flex flex-col text-center items-center justify-center gap-1">
          <div className="flex items-center gap-2">
            <ExclamationTriangleIcon className="w-6 h-6 text-red-500 dark:text-red-300" />
            <span className="text-red-500 dark:text-red-300">
              {lang === "en" ? "Important Notice!" : "Avis important!"}
            </span>
          </div>
          <span className="text-gray-700 dark:text-gray-300">
            {lang === "en"
              ? "Please make sure to double check the address before sending any funds. We are not responsible for any lost funds."
              : "Veuillez vous assurer de vérifier l'adresse avant d'envoyer des fonds. Nous ne sommes pas responsables des fonds perdus."}
          </span>
        </div>

        {address && (
          <>
            <div className="flex text-center items-center mt-8 px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-900/10 dark:border-gray-100/10 hover:border-gray-900/50 dark:hover:border-gray-100/50 rounded-full">
              <span className="block md:hidden font-semibold text-gray-900 dark:text-gray-100">
                {shortenAddress(address)}
              </span>
              <span className="hidden md:block font-semibold text-gray-900 dark:text-gray-100">
                {address}
              </span>
            </div>
          </>
        )}

        <div className="mt-4 flex items-center gap-4">
          {address ? (
            <>
              <BlueSimpleButton
                disabled={!address}
                onClick={() => {
                  if (address) {
                    navigator.clipboard.writeText(address);
                    setAddressCopied(true);
                  }
                }}
              >
                {lang === "en" ? "Copy" : "Copier"}
              </BlueSimpleButton>
              <BlueSimpleButton onClick={() => share()} disabled={!address}>
                {lang === "en" ? "Share" : "Partager"}
              </BlueSimpleButton>
            </>
          ) : (
            <Wallet lang={lang} isFull={true} isCentered={true} />
          )}
        </div>
      </div>

      <Success
        show={addressCopied}
        onClose={() => setAddressCopied(false)}
        title={lang === "en" ? "Address copied" : "Adresse copiée"}
        lang={lang}
        message={
          lang === "en"
            ? "The address has been copied, you can now share it"
            : "L'adresse a été copiée, vous pouvez maintenant la partager"
        }
      />
    </>
  );
};

export default Receive;
