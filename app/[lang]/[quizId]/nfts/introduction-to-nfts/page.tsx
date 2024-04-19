"use client";

import type { Lang } from "@/types/lang";
import Course from "@/app/[lang]/[quizId]/components/course";

const cards = {
  en: [
    {
      title: "Introduction to NFTs",
      text: "NFTs mean Non-Fungible Tokens. They are unique digital assets that are stored on a blockchain. ",
    },
    {
      title: "What are NFTs?",
      text: "NFTs can represent ownership of digital or physical assets, such as art, music, videos, and even real estate. ",
    },
    {
      title: "Indivisible",
      text: "NFTs are unique because they are indivisible. This makes them ideal for proving ownership of unique items.",
    },
    {
      title: "ERC-721",
      text: "ERC-721 is the standard for NFTs on the Ethereum blockchain.",
    },
    {
      title: "Fungible",
      text: "Contrary to fungible tokens that are interchangeable with each other - like cryptocurrencies - NFTs are unique and cannot be exchanged like-for-like.",
    },
    {
      title: "Internet problems",
      text: "Nowadays, the internet has a problem with digital ownership where everything can be replicated. NFTs solve this problem by providing a way to prove ownership of digital assets.",
    },
    {
      title: "Ownership",
      text: "With NFTs, you own your assets. You can sell them, trade them, or even gift them to someone else. ",
    },
    {
      title: "Use cases",
      text: "NFTs can be used for digital art, certify that you completed a course, or even gating access to features in an app.",
    },
  ],
  fr: [
    {
      title: "Introduction aux NFTs",
      text: "Les NFTs signifient jetons non fongibles. Ce sont des actifs numériques uniques qui sont stockés sur une blockchain.",
    },
    {
      title: "Qu'est-ce que les NFTs?",
      text: "Les NFTs peuvent représenter la propriété d'actifs numériques ou physiques, comme l'art, la musique, les vidéos et même l'immobilier.",
    },
    {
      title: "Indivisible",
      text: "Les NFTs sont uniques car ils sont indivisibles. Ils sont idéaux pour prouver la propriété d'articles uniques.",
    },
    {
      title: "ERC-721",
      text: "ERC-721 est la norme pour les NFTs sur la blockchain Ethereum.",
    },
    {
      title: "Fongible",
      text: "Contrairement aux jetons fongibles qui sont interchangeables entre eux - comme les cryptomonnaies - les NFTs sont uniques et ne peuvent pas être échangés de manière équivalente.",
    },
    {
      title: "Problèmes d'internet",
      text: "Aujourd'hui, Internet a un problème de propriété numérique où tout peut être répliqué. Les NFTs résolvent ce problème en fournissant un moyen de prouver la propriété d'actifs numériques.",
    },
    {
      title: "Propriété",
      text: "Avec les NFTs, vous possédez vos actifs. Vous pouvez les vendre, les échanger ou même les offrir à quelqu'un d'autre.",
    },
    {
      title: "Cas d'utilisation",
      text: "Les NFTs peuvent être utilisés pour l'art numérique, certifier que vous avez suivi un cours, ou même pour limiter l'accès à des fonctionnalités dans une application.",
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
