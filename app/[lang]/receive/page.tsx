"use client";

import React, { useState } from "react";
import { useAccount } from "wagmi";
import QRCode from "react-qr-code";
import { Lang } from "@/types/language/lang";
import BlueSimpleButton from "@/app/[lang]/components/buttons/blueSimple";
import SuccessNotification from "@/app/[lang]/components/modals/notifications/success";
import shortenAddress from "@/utils/addresses/shortenAddress";
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
          text: `Want to send me some TROTEL? \n\nStart your crypto learning journey with TrotelCoin today at https://app.trotelcoin.com. \n\nLet's dive into the world of Web3 together! \n\nHere's my crypto address: ${address}`
        });
      } catch (error) {
        console.error("Error sharing", error);
      }
    } else {
      const url = `https://twitter.com/intent/tweet?text=Want to send me some TROTEL? \n\n\nStart your crypto learning journey with TrotelCoin today at https://app.trotelcoin.com. \n\n\nLet's dive into the world of Web3 together! \n\n\nHere's my crypto address: ${address}`;
      window.open(url, "_blank");
    }
  };

  return (
    <>
      <div className="mx-auto flex w-full max-w-md flex-col items-center justify-center">
        <span className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          {lang === "en" ? "Receive" : "Recevoir"}
        </span>

        {address && (
          <div className="mb-4 mt-8 rounded-xl border border-gray-900/10 bg-white p-4 dark:border-gray-100/10">
            <QRCode value={address ?? ""} />
          </div>
        )}

        <div className="mt-4 flex flex-col items-center justify-center gap-1 text-center">
          <div className="flex items-center gap-2">
            <ExclamationTriangleIcon className="h-6 w-6 text-red-500 dark:text-red-300" />
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
            <div className="mt-8 flex items-center rounded-full border border-gray-900/10 bg-white px-4 py-2 text-center hover:border-gray-900/50 dark:border-gray-100/10 dark:bg-gray-800 dark:hover:border-gray-100/50">
              <span className="block font-semibold text-gray-900 dark:text-gray-100 md:hidden">
                {shortenAddress(address)}
              </span>
              <span className="hidden font-semibold text-gray-900 dark:text-gray-100 md:block">
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

      <SuccessNotification
        display={addressCopied}
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
