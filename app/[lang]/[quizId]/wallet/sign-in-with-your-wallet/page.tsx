"use client";

import type { Lang } from "@/types/lang";
import Course from "@/app/[lang]/[quizId]/components/course";
import { useContext } from "react";
import UserContext from "@/app/[lang]/contexts/userContext";
import Wallet from "@/app/[lang]/components/header/wallet";

const CoursePage = ({ params: { lang } }: { params: { lang: Lang } }) => {
  const { isLoggedIn } = useContext(UserContext);

  const cards = {
    en: [
      {
        title: "Introduction",
        text: "Web3 auth lets you sign in to any website or app using just one digital identity. It's easy and works everywhere on the decentralized web.",
      },
      {
        title: "One Account",
        text: "You only need one account for all your online activities unlike Google, Facebook, or Amazon. This protects you from data breaches and hacks.",
      },
      {
        title: "Identity Verification",
        text: "Instead of a username and password, you use your cryptocurrency wallet to prove who you are.",
      },
      {
        title: "Advantages",
        text: "This makes it easier to use websites and apps, and it's safer too. You don't have to share your private key, so you're protected from phishing attacks.",
      },
      {
        title: "Disadvantages",
        text: "But it can be confusing for beginners. Creating a wallet isn't always straightforward, especially at first.",
      },
      {
        title: "Conclusion",
        text: "To take the quiz, you need to log in to our website. This helps you understand how authentication works with your wallet. It's pretty simple, right?",
      },
      {
        title: "Connect",
        text: (
          <>
            <span className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Connect
            </span>
            <div className="my-4">
              {isLoggedIn ? (
                <>You are connected !</>
              ) : (
                <Wallet lang={lang} isCentered={true} />
              )}
            </div>
          </>
        ),
      },
    ],
    fr: [
      {
        title: "Introduction",
        text: "L'authentification Web3 vous permet de vous connecter à n'importe quel site web ou application avec une seule identité numérique. C'est facile et fonctionne partout sur le web décentralisé.",
      },
      {
        title: "Un seul compte",
        text: "Vous avez besoin d'un seul compte pour toutes vos activités en ligne contrairement à Google, Facebook ou Amazon. Cela vous protège contre les violations de données et les piratages.",
      },
      {
        title: "Vérification d'identité",
        text: "Au lieu d'un nom d'utilisateur et d'un mot de passe, vous utilisez votre portefeuille de cryptomonnaie pour prouver qui vous êtes.",
      },
      {
        title: "Avantages",
        text: "Cela rend plus facile l'utilisation des sites web et des applications, et c'est aussi plus sûr. Vous n'avez pas à partager votre clé privée, donc vous êtes protégé contre les attaques de phishing.",
      },
      {
        title: "Inconvénients",
        text: "Mais cela peut être déroutant pour les débutants. Créer un portefeuille n'est pas toujours simple, surtout au début.",
      },
      {
        title: "Conclusion",
        text: "Pour passer le quiz, vous devez vous connecter à notre site web. Cela vous aide à comprendre comment fonctionne l'authentification avec votre portefeuille. C'est assez simple, non ?",
      },
      {
        title: "Connect",
        text: (
          <>
            <span className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Se connecter
            </span>
            <div className="my-4">
              {isLoggedIn ? (
                <>Vous êtes connecté !</>
              ) : (
                <Wallet lang={lang} isCentered={true} />
              )}
            </div>
          </>
        ),
      },
    ],
  };

  return (
    <>
      <Course cards={cards} lang={lang} conditionIsOkay={isLoggedIn} />
    </>
  );
};

export default CoursePage;
