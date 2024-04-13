"use client";

import type { Lang } from "@/types/lang";
import Course from "@/app/[lang]/[quizId]/components/course";

const cards = {
  en: [
    {
      title: "Introduction to Ethereum",
      text: "Let's dive into the world of Ethereum and explore its groundbreaking features in Web3.",
    },
    {
      title: "What is Ethereum?",
      text: "Ethereum is a decentralized platform that enables the creation of smart contracts and decentralized applications (dApps).",
    },
    {
      title: "dApps",
      text: "Decentralized applications (dApps) are applications that run on a decentralized network of computers, ensuring transparency and security.",
    },
    {
      title: "Use Cases of Ethereum",
      text: "Ethereum's use cases include decentralized finance (DeFi), non-fungible tokens (NFTs), supply chain management, and more.",
    },
    {
      title: "Smart Contracts",
      text: "Smart contracts are self-executing contracts with the terms directly written into code.",
    },
    {
      title: "Tokens on Ethereum",
      text: "Tokens on Ethereum can represent assets, voting power, or any other form of value, enabling various functionalities within dApps.",
    },
    {
      title: "No Control Over Data",
      text: "Ethereum operates on a decentralized network, ensuring that no single entity has control over user data or transactions.",
    },
    {
      title: "Staking",
      text: "Staking involves participating in the network by locking up a certain amount of cryptocurrency to support its operations and earn rewards.",
    },
    {
      title: "Conclusion",
      text: "As a conclusion, Ethereum is a powerful platform that is revolutionizing the way we interact with the internet.",
    },
  ],
  fr: [
    {
      title: "Introduction à Ethereum !",
      text: "Plongeons dans le monde d'Ethereum et explorons ses fonctionnalités révolutionnaires dans le Web3.",
    },
    {
      title: "Qu'est-ce qu'Ethereum ?",
      text: "Ethereum est une plateforme décentralisée qui permet la création de contrats intelligents et d'applications décentralisées (dApps).",
    },
    {
      title: "dApps",
      text: "Les applications décentralisées (dApps) sont des applications qui s'exécutent sur un réseau décentralisé d'ordinateurs, garantissant transparence et sécurité.",
    },
    {
      title: "Cas d'utilisation d'Ethereum",
      text: "Les cas d'utilisation d'Ethereum incluent la finance décentralisée (DeFi), les jetons non fongibles (NFT), la gestion de supply chains, et plus encore.",
    },
    {
      title: "Contrats Intelligents",
      text: "Les contrats intelligents sont des contrats qui s'exécutent automatiquement avec les termes directement écrits dans le code.",
    },
    {
      title: "Jetons sur Ethereum",
      text: "Les jetons sur Ethereum peuvent représenter des actifs, du pouvoir de vote, ou toute autre forme de valeur, permettant diverses fonctionnalités au sein des dApps.",
    },
    {
      title: "Aucun Contrôle sur les Données",
      text: "Ethereum fonctionne sur un réseau décentralisé, garantissant qu'aucune entité unique n'a le contrôle sur les données des utilisateurs ou les transactions.",
    },
    {
      title: "Staking",
      text: "Le staking implique de participer au réseau en verrouillant une certaine quantité de cryptomonnaie pour soutenir ses opérations et gagner des récompenses.",
    },
    {
      title: "Conclusion",
      text: "En conclusion, Ethereum est une plateforme puissante qui révolutionne la façon dont nous interagissons avec l'internet.",
    },
  ],
};

const CoursePage = ({ params: { lang } }: { params: { lang: Lang } }) => {
  return (
    <>
      <Course cards={cards} lang={lang} conditionIsOkay={true} />
    </>
  );
};

export default CoursePage;
