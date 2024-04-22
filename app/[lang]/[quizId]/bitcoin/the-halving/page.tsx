"use client";

import type { Lang } from "@/types/lang";
import Course from "@/app/[lang]/[quizId]/components/course";

const cards = {
  en: [
    {
      title: "Bitcoin's reminder",
      text: "Imagine Bitcoin as a digital currency that's created and managed by a decentralized network of computers, rather than a central authority like a government or a bank.",
    },
    {
      title: "Bitcoin is limited",
      text: "Now, one important aspect of Bitcoin is its limited supply. There will only ever be 21 million Bitcoins in existence.",
    },
    {
      title: "The halving",
      text: "To control the rate at which new Bitcoins are introduced and to mimic the scarcity of a precious metal like gold, Bitcoin has a built-in mechanism called halving.",
    },
    {
      title: "Frequency of halving",
      text: "This event happens approximately every four years and is programmed into the Bitcoin protocol.",
    },
    {
      title: "Impact of halving",
      text: "During the halving, the reward that Bitcoin miners receive for validating and securing transactions on the network is cut in half. This means that miners receive fewer Bitcoins as a reward for their efforts.",
    },
    {
      title: "Rewards over time",
      text: "For example, when Bitcoin first started, miners received 50 Bitcoins for every block of transactions they processed. Then, during the first halving in 2012, this reward was cut in half to 25 Bitcoins.",
    },
    {
      title: "Why halving is important?",
      text: "This scarcity is one of the factors that contributes to Bitcoin's value, as it's seen as a hedge against inflation, similar to gold.",
    },
    {
      title: "Conclusion",
      text: "In summary, the Bitcoin halving is an event that occurs approximately every four years, where the reward for Bitcoin miners is reduced by half, ultimately leading to a limited and predictable supply of Bitcoins.",
    },
  ],
  fr: [
    {
      title: "Rappel sur Bitcoin",
      text: "Imaginez Bitcoin comme une monnaie numérique créée et gérée par un réseau décentralisé d'ordinateurs, plutôt qu'une autorité centrale comme un gouvernement ou une banque.",
    },
    {
      title: "Bitcoin est limité",
      text: "Un aspect important de Bitcoin est son offre limitée. Il n'y aura jamais + que 21 millions de Bitcoins en circulation.",
    },
    {
      title: "Le halving",
      text: "Pour contrôler le taux de nouveaux Bitcoins et imiter la rareté d'un métal précieux comme l'or, Bitcoin dispose d'un mécanisme intégré appelé halving.",
    },
    {
      title: "Fréquence du halving",
      text: "Cet événement se produit environ tous les quatre ans et est programmé dans le protocole Bitcoin.",
    },
    {
      title: "Impact du halving",
      text: "Lors du halving, la récompense que les mineurs de Bitcoin reçoivent pour valider et sécuriser les transactions sur le réseau est réduite de moitié. Cela signifie que les mineurs reçoivent moins de Bitcoins en récompense de leurs efforts.",
    },
    {
      title: "Récompenses au fil du temps",
      text: "Par exemple, lorsque Bitcoin a commencé, les mineurs recevaient 50 Bitcoins pour chaque bloc de transactions qu'ils traitaient. Ensuite, lors du premier halving en 2012, cette récompense a été réduite de moitié à 25 Bitcoins.",
    },
    {
      title: "Pourquoi le halving est-il important?",
      text: "Cette rareté est l'un des facteurs qui contribuent à la valeur de Bitcoin, car il est considéré comme un refuge contre l'inflation, similaire à l'or.",
    },
    {
      title: "Conclusion",
      text: "En résumé, le halving de Bitcoin est un événement qui se produit environ tous les quatre ans, où la récompense pour les mineurs de Bitcoin est réduite de moitié, conduisant finalement à une offre limitée et prévisible de Bitcoins.",
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
