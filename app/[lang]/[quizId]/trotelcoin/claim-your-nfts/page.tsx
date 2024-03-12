"use client";

import { Lang } from "@/types/types";
import Course from "@/app/[lang]/[quizId]/components/course";
import { useAddress } from "@thirdweb-dev/react";

const CoursePage = ({ params: { lang } }: { params: { lang: Lang } }) => {
  const address = useAddress();

  const cards = {
    en: [
      {
        title: "Introduction",
        text: "Learn to get your TrotelCoin NFTs in this course. Two NFTs are up for grabs: Intermediate 🙈 and Expert 🦊. No need to grasp NFT concepts now; just discover claiming. A separate NFT course is available. Assume you have a crypto wallet and enough TrotelCoins.",
      },
      {
        title: "What are the roles of this NFTs?",
        text: "Access advanced courses and don't worry about your lives with these NFTs. Certain courses are for Intermediates or Experts. Exclusive gamification features require NFT ownership, like earning badges. The platform is evolving, and Early Access for Intermediates and Experts allow them to test beta features.",
      },
      {
        title: "How to claim the NFTs?",
        text: "Go to the shop, link your wallet, and verify. Make sure you have enough TrotelCoins in your wallet. If using email or social media, find the linked wallet address.",
      },
      {
        title: "Your address",
        text: `${address ?? "Not connected"}`,
      },
      {
        title: "Claiming",
        text: "Visit the NFTs claim page, ensure you have enough TrotelCoins, and click the button to get your NFTs. If it works, your NFTs will have rainbow borders.",
      },
    ],
    fr: [
      {
        title: "Introduction",
        text: "Dans ce cours, vous apprendrez à obtenir vos NFTs TrotelCoin. Deux NFT sont disponibles : Intermédiaire 🙈 et Expert 🦊. Pas besoin de comprendre les concepts NFT maintenant; découvrez simplement comment les obtenir. Un cours sur les NFTs est disponible. Vous devrez avoir un portefeuille crypto et suffisamment de TrotelCoins.",
      },
      {
        title: "Quels sont les rôles de ces NFTs ?",
        text: "Accédez à des cours avancés, ne vous souciez plus de vos vies avec ces NFTs. Certains cours sont réservés aux Intermédiaires ou Experts. Des fonctionnalités exclusives de gamification nécessitent la possession de NFT, comme gagner des badges. La plateforme évolue, et l'Accès Anticipé pour les Intermédiaires et Experts leur permet de tester les fonctionnalités bêta.",
      },
      {
        title: "Comment réclamer les NFTs ?",
        text: "Allez à la boutique, liez votre portefeuille et vérifiez-le. Assurez-vous d'avoir suffisamment de TrotelCoins dans votre portefeuille. Si vous utilisez un e-mail ou les médias sociaux, trouvez l'adresse du portefeuille liée.",
      },
      {
        title: "Votre adresse",
        text: `${address ?? "Non connecté"}`,
      },
      {
        title: "Réclamation",
        text: "Visitez la page de réclamation des NFTs, assurez-vous d'avoir suffisamment de TrotelCoins, et cliquez sur le bouton pour obtenir vos NFTs. Si cela fonctionne, vos NFTs auront des bordures arc-en-ciel.",
      },
    ],
  };

  return (
    <>
      <Course cards={cards} lang={lang} />
    </>
  );
};

export default CoursePage;
