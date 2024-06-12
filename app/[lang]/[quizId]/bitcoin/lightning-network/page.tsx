"use client";

import type { Lang } from "@/types/language/lang";
import Course from "@/app/[lang]/components/courses/courseScreen/course";

const cards = {
  en: [
    {
        title: "Introduction",
        text: "The Lightning Network is a second-layer payment solution for Bitcoin.",
    },
    {
        title: "What is it for?",
        text: "The Lightning Network allows for instant and low-cost transactions.",
    },
    {
        title: "Payment channels",
        text: "First, the Lightning Network uses payment channels between users to make transactions.",
    },
    {
        title: "Fees",
        text: "To use payment channels, users must pay fees.",
    },
    {
        title: "The intermediary",
        text: "Let's say I want to send money to Jean, but we don't have a payment channel in common. In this case, we will have to go through an intermediary.",
    },
    {
        title: 'Limits',
        text: "Thus, there are limits because if the intermediary does not have enough funds, the transaction cannot be made.",
    },
    {
        title: "Advantages",
        text: "Conversely, the advantages are numerous, including the speed of transactions and low fees by using existing channels to route payments.",
    },
    {
        title: "Conclusion",
        text: "In conclusion, the Lightning Network is a second-layer payment solution for Bitcoin that allows for instant and low-cost transactions.",
    },
  ],
  fr: [
    {
      title: "Introduction",
      text: "Le Lightning Network est une solution de paiement de deuxième couche pour Bitcoin.",
    },
    {
      title: "À quoi sert cela?",
      text: "Le Lightning Network permet de réaliser des transactions instantanées et à faible coût.",
    },
    {
        title: "Les canaux de paiement",
        text: "Tout d'abord, le Lightning Network utilise des canaux de paiement entre les utilisateurs pour effectuer des transactions.",
    },
    {
        title: "Les frais",
        text: "Pour utiliser les canaux de paiement, les utilisateurs doivent payer des frais.",
    }
    {
        title: "L'intermédiaire",
        text: "Admettons que je veuille envoyer de l'argent à Jean, mais que nous n'ayons pas de canal de paiement en commun. Dans ce cas, nous devrons passer par un intermédiaire.",
    },
    {
        title: 'Les limites',
        text: "Ainsi, il existe des limites car si l'intermédiaire n'a pas assez de fonds, la transaction ne pourra pas être effectuée.",
    },
    {
        title: "Les avantages",
        text: "À l'inverse les avantages sont nombreux, notamment la rapidité des transactions et les faibles frais en utilisant les canaux déjà existants pour router les paiements.",
    },
    {
        title: "Conclusion",
        text: "En conclusion, le Lightning Network est une solution de paiement de deuxième couche pour Bitcoin qui permet de réaliser des transactions instantanées et à faible coût.",
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
