"use client";

import { Lang } from "@/types/types";
import Course from "@/app/[lang]/[quizId]/components/course";
import { useAccount } from "wagmi";
import shortenAddress from "@/utils/shortenAddress";
import React, { useState } from "react";
import Success from "@/app/[lang]/components/modals/success";

const CoursePage = ({ params: { lang } }: { params: { lang: Lang } }) => {
  const [copied, setCopied] = useState<boolean>(false);

  const { address } = useAccount();

  const cards = {
    en: [
      {
        title: "Introduction",
        text: "Two NFTs are up for grabs: Intermediate and Expert. Assume you have a crypto wallet and enough TrotelCoins.",
      },
      {
        title: "What are the roles of this NFTs?",
        text: "Don't worry about your lives with these NFTs. Moreover, certain courses are only for Intermediates or Experts. Also, exclusive gamification features require NFT ownership, like earning badges. Finally, Intermediates and Experts can test beta features.",
      },
      {
        title: "How to claim the NFTs?",
        text: "Go to the shop, link your wallet, and verify. Make sure you have enough TrotelCoins in your wallet. If using email or your social accounts, find the linked wallet address.",
      },
      {
        title: "Claiming",
        text: "Visit the NFTs claim page, ensure you have enough TrotelCoins, and click the button to get your NFTs. If it works, your NFTs will have rainbow borders.",
      },
      {
        title: "Your address",
        text: (
          <span className="break-words whitespace-normal">
            Click on your address to copy it:{" "}
            <span
              className="text-blue-500 dark:text-blue-300 hover:text-blue-400 dark:hover:text-blue-400 cursor-pointer"
              onClick={() => {
                if (address) {
                  navigator.clipboard.writeText(address);
                  setCopied(true);
                }
              }}
            >
              {address ? shortenAddress(address) : "Not connected"}
            </span>
          </span>
        ),
      },
    ],
    fr: [
      {
        title: "Introduction",
        text: "Deux NFT sont disponibles : Intermédiaire et Expert. Vous devrez avoir un portefeuille crypto et suffisamment de TrotelCoins.",
      },
      {
        title: "Quels sont les rôles de ces NFTs ?",
        text: "Ne vous souciez plus de vos vies avec ces NFTs. De plus, certains cours sont réservés uniquement aux Intermédiaires ou Experts. Aussi, des fonctionnalités exclusives de gamification nécessitent la possession de NFT, comme gagner des badges. Enfin, les Intermédiaires et Experts peuvent tester les fonctionnalités bêta.",
      },
      {
        title: "Comment réclamer les NFTs ?",
        text: "Allez à la boutique, liez votre portefeuille et vérifiez-le. Assurez-vous d'avoir suffisamment de TrotelCoins dans votre portefeuille. Si vous utilisez un e-mail ou vos réseaux sociaux, trouvez l'adresse du portefeuille liée.",
      },
      {
        title: "Réclamation",
        text: "Visitez la page de réclamation des NFTs, assurez-vous d'avoir suffisamment de TrotelCoins, et cliquez sur le bouton pour obtenir vos NFTs. Si cela fonctionne, vos NFTs auront des bordures arc-en-ciel.",
      },
      {
        title: "Votre adresse",
        text: (
          <>
            Cliquez sur votre adresse pour la copier :{" "}
            <span
              className="text-blue-500 dark:text-blue-300 hover:text-blue-400 dark:hover:text-blue-400 cursor-pointer"
              onClick={() => {
                if (address) {
                  navigator.clipboard.writeText(address);
                  setCopied(true);
                }
              }}
            >
              {address ? shortenAddress(address) : "Non connecté"}
            </span>
          </>
        ),
      },
    ],
  };

  return (
    <>
      <Course cards={cards} lang={lang} />
      <Success
        show={copied}
        onClose={() => setCopied(false)}
        lang={lang}
        title={lang === "en" ? "Success" : "Succès"}
        message={
          lang === "en"
            ? "You have copied your address."
            : "Vous avez copié votre addresse."
        }
      />
    </>
  );
};

export default CoursePage;
