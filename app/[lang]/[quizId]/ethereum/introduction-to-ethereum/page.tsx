"use client";

import type { Lang } from "@/types/language/lang";
import Course from "@/app/[lang]/components/courses/courseScreen/course";

const cards = {
  en: [
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
      text: "Ethereum's use cases include decentralized finance (DeFi), non-fungible tokens (NFTs) and more.",
    },
    {
      title: "Smart Contracts",
      text: "Smart contracts are self-executing contracts. Terms are directly written into code.",
    },
    {
      title: "Tokens on Ethereum",
      text: "Tokens on Ethereum can represent assets, a voting power, or any other form of value, enabling various functionalities within dApps.",
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
      title: "Qu'est-ce qu'Ethereum ?",
      text: "Ethereum est une plateforme décentralisée qui permet la création de contrats intelligents et d'applications décentralisées (dApps).",
    },
    {
      title: "dApps",
      text: "Les applications décentralisées (dApps) sont des applications qui s'exécutent sur un réseau décentralisé d'ordinateurs, garantissant transparence et sécurité.",
    },
    {
      title: "Cas d'utilisation d'Ethereum",
      text: "Les cas d'utilisation d'Ethereum incluent la finance décentralisée (DeFi), les jetons non fongibles (NFT) et plus encore.",
    },
    {
      title: "Contrats Intelligents",
      text: "Les contrats intelligents sont des contrats qui s'exécutent automatiquement. Les termes sont directement écrits dans le code.",
    },
    {
      title: "Jetons sur Ethereum",
      text: "Les jetons sur Ethereum peuvent représenter des actifs, un pouvoir de vote, ou toute autre forme de valeur, permettant diverses fonctionnalités au sein des dApps.",
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
