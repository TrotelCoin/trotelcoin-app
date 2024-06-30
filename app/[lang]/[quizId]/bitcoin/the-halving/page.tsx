"use client";

import type { Lang } from "@/types/language/lang";
import Course from "@/app/[lang]/components/courses/courseScreen/course";

const cards = {
  en: [
    {
      title: "Bitcoin",
      text: "As a reminder, Bitcoin is a peer-to-peer digital currency created and managed by a decentralized network of computers, rather than a central authority like a government or a bank."
    },
    {
      title: "Bitcoin is limited",
      text: "Remember, one important aspect of Bitcoin is its limited supply. There will only ever be 21 million Bitcoins in existence."
    },
    {
      title: "The halving",
      text: "To control the rate at which new Bitcoins are introduced like the scarcity of gold, Bitcoin has a built-in mechanism called halving."
    },
    {
      title: "Frequency of halving",
      text: "This event happens approximately every four years and is programmed into the Bitcoin protocol."
    },
    {
      title: "Impact of the halving",
      text: "During the halving, the reward that Bitcoin miners receive for validating and securing transactions on the network is cut in half."
    },
    {
      title: "Diminishing rewards over time",
      text: "For example, at the beginning, miners received 50 Bitcoins for every block of transactions they processed. But, during the first halving in 2012, this reward was cut in half to 25 Bitcoins."
    },
    {
      title: "Why halving is important?",
      text: "This scarcity is one of the factors that contributes to Bitcoin's value, as it's seen as a hedge against inflation."
    },
    {
      title: "Conclusion",
      text: "In summary, the halving is an event that occurs approximately every four years, where the reward for Bitcoin miners is reduced by half, ultimately leading to a limited and predictable supply of Bitcoins."
    }
  ],
  fr: [
    {
      title: "Rappel sur Bitcoin",
      text: "Pour rappel, Bitcoin est une monnaie numérique pair à pair créée et gérée par un réseau décentralisé d'ordinateurs, plutôt qu'une autorité centrale comme un gouvernement ou une banque."
    },
    {
      title: "Bitcoin est limité",
      text: "Rappelez-vous, un aspect important de Bitcoin est son offre limitée. Il n'y aura jamais que 21 millions de Bitcoins en circulation."
    },
    {
      title: "Le halving",
      text: "Pour contrôler le taux d'introduction de nouveaux Bitcoins comme la rareté de l'or, Bitcoin dispose d'un mécanisme intégré appelé halving."
    },
    {
      title: "Fréquence du halving",
      text: "Cet événement se produit environ tous les quatre ans et est programmé dans le protocole Bitcoin."
    },
    {
      title: "L'impact du halving",
      text: "Lors du halving, la récompense que les mineurs de Bitcoin reçoivent pour valider et sécuriser les transactions sur le réseau est réduite de moitié."
    },
    {
      title: "Récompenses diminuantes au fil du temps",
      text: "Par exemple, au début, les mineurs recevaient 50 Bitcoins pour chaque bloc de transactions qu'ils traitaient. Mais, lors du premier halving en 2012, cette récompense a été réduite de moitié à 25 Bitcoins."
    },
    {
      title: "Pourquoi le halving est-il important?",
      text: "Cette rareté est l'un des facteurs qui contribuent à la valeur de Bitcoin, car il est considéré comme un refuge contre l'inflation."
    },
    {
      title: "Conclusion",
      text: "En résumé, le halving est un événement qui se produit environ tous les quatre ans, où la récompense pour les mineurs de Bitcoin est réduite de moitié, conduisant finalement à une offre limitée et prévisible de Bitcoins."
    }
  ]
};

const CoursePage = ({ params: { lang } }: { params: { lang: Lang } }) => {
  return (
    <>
      <Course cards={cards} lang={lang} conditionIsOkay={true} />
    </>
  );
};

export default CoursePage;
