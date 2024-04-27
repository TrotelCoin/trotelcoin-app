"use client";

import type { Lang } from "@/types/lang";
import Course from "@/app/[lang]/[quizId]/components/course";

const cards = {
  en: [
    {
      title: "Introduction",
      text: "Bitcoin is mainly knows as the first cryptocurrency. It was launched in 2009 by an unknown person or group of people using the name Satoshi Nakamoto.",
    },
    {
      title: "Bitcoin",
      text: "Indeed, Bitcoin is a peer-to-peer online currency that allows instant payments to anyone in the world. It is decentralized, meaning that it is not controlled by any single entity.",
    },
    {
      title: "No banks",
      text: "Bitcoin wants to fix a big problem with regular money: we have to trust a lot of people and systems to make it work. Trust is good, but too much trust can make things fragile, hard to understand, and expensive to run.",
    },
    {
      title: "Bitcoin transactions",
      text: "Bitcoin transactions are easy and can be done from anywhere, without the need of personal information.",
    },
    {
      title: "A store of value",
      text: "Bitcoin can also be seen as a store of value, like gold. Indeed, Bitcoin is scarce since there will never have more than 21 million Bitcoins.",
    },
    {
      title: "Bitcoin's properties",
      text: "However, Bitcoin is not physical, it is digital. It means that it can be send anywhere, it is also easy to store and is divisible.",
    },
    {
      title: "Conclusion",
      text: "Finally, Bitcoin is a new way of thinking about money and finance and has the potential to change the current financial system.",
    },
  ],
  fr: [
    {
      title: "Introduction",
      text: "Bitcoin est principalement connu comme la première cryptomonnaie. Il a été lancé en 2009 par une personne inconnue ou un groupe de personnes utilisant le nom de Satoshi Nakamoto.",
    },
    {
      title: "Bitcoin",
      text: "En effet, Bitcoin est une monnaie en ligne pair à pair qui permet des paiements instantanés à n'importe qui dans le monde. Il est décentralisé, ce qui signifie qu'il n'est contrôlé par aucune entité unique.",
    },
    {
      title: "Pas de banques",
      text: "Bitcoin veut résoudre un gros problème avec l'argent traditionnel : nous devons faire confiance à beaucoup de personnes et de systèmes pour le faire fonctionner. La confiance est bonne, mais trop de confiance peut rendre les choses fragiles, difficiles à comprendre et coûteuses à gérer.",
    },
    {
      title: "Transactions Bitcoin",
      text: "Les transactions Bitcoin sont faciles à réaliser et peuvent être effectuées de n'importe où, sans avoir besoin d'informations personnelles.",
    },
    {
      title: "Un moyen de stocker de la valeur",
      text: "Bitcoin peut également être vu comme une réserve de valeur, comme l'or. En effet, Bitcoin est rare puisqu'il n'y aura jamais plus de 21 millions de Bitcoins.",
    },
    {
      title: "Les propriétés de Bitcoin",
      text: "Cependant, Bitcoin n'est pas physique, il est numérique. Cela signifie qu'il peut être envoyé n'importe où, il est aussi facile à stocker et divisible.",
    },
    {
      title: "Conclusion",
      text: "Finalement, Bitcoin est une nouvelle façon de penser l'argent et la finance et a le potentiel de changer le système financier actuel.",
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
