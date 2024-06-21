"use client";

import type { Lang } from "@/types/language/lang";
import Course from "@/app/[lang]/components/courses/courseScreen/course";

const cards = {
  en: [
    {
      title: "Introduction",
      text: "Liquid staking is a staking method that allows users to delegate their tokens to a staking pool while maintaining the liquidity of their tokens."
    },
    {
      title: "Reminder on staking",
      text: "Indeed, users can delegate their tokens to a staking pool to secure the network and earn rewards in return. But traditional staking has a major drawback: it locks the tokens for a determined period."
    },
    {
      title: "How liquid staking works?",
      text: "A user locks their cryptocurrency tokens in a staking pool, receives equivalent Liquid Staking Tokens (LST) in return that they can use in other DeFi protocols or exchange."
    },
    {
      title: "The benefits of liquid staking",
      text: "Liquid staking solves the problem of traditional staking liquidity, allows the use of derivative tokens in other DeFi protocols, generates passive income, and allows staking and lending of cryptocurrencies simultaneously."
    },
    {
      title: "The risks of liquid staking",
      text: "However, liquid staking has risks, including the price volatility of derivative tokens, and security risks related to DeFi protocols."
    },
    {
      title: "Example of platform",
      text: "Examples of liquid staking platforms include Lido Finance, Rocket Pool, Frax Finance, Ankr, and BENQI. These platforms allow users to stake their tokens and receive LST in return."
    },
    {
      title: "Conclusion",
      text: "Thus, liquid staking allows users to receive Liquid Staking Tokens (LST). These tokens can then be used in DeFi applications to earn additional interest while continuing to secure the network."
    }
  ],
  fr: [
    {
      title: "Introduction",
      text: "Le staking liquide est une méthode de staking qui permet aux utilisateurs de déléguer leurs jetons à un pool de staking tout en conservant la liquidité de leurs jetons."
    },
    {
      title: "Rappel sur le staking",
      text: "En effet, les utilisateurs peuvent déléguer leurs jetons à un pool de staking pour sécuriser le réseau et gagner des récompenses en échange. Mais le staking traditionnel a un inconvénient majeur : il bloque les jetons pendant une période déterminée."
    },
    {
      title: "Comment fonctionne le staking liquide ?",
      text: "Un utilisateur bloque ses jetons de crypto-monnaie dans un pool de staking, reçoit en retour des Liquid Staking Tokens (LST) équivalents qu'il peut utiliser dans d'autres protocoles DeFi ou échanger."
    },
    {
      title: "Les avantages du staking liquide",
      text: "Le staking liquide résout le problème de la liquidité du staking traditionnel, permet d'utiliser les jetons dérivés dans d'autres protocoles DeFi, génère des revenus passifs, et permet de staker et prêter des crypto-monnaies simultanément."
    },
    {
      title: "Les risques du staking liquide",
      text: "Cependant, le staking liquide comporte des risques, notamment la volatilité des prix des jetons dérivés, et les risques de sécurité liés aux protocoles DeFi."
    },
    {
      title: "Exemple de plateforme",
      text: "Des exemples de plateformes de staking liquide incluent Lido Finance, Rocket Pool, Frax Finance, Ankr, et BENQI. Ces plateformes permettent aux utilisateurs de staker leurs jetons et de recevoir des LST en retour."
    },
    {
      title: "Conclusion",
      text: "Ainsi, le staking liquide permet aux utilisateurs de reçevoir des Liquid Staking Tokens (LST). Ces jetons peuvent ensuite être utilisés dans des applications DeFi pour gagner des intérêts supplémentaires tout en continuant de sécuriser le réseau."
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
