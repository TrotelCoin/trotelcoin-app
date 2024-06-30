"use client";

import type { Lang } from "@/types/language/lang";
import Course from "@/app/[lang]/components/courses/courseScreen/course";

const cards = {
  en: [
    {
      title: "Introduction",
      text: "The Snapshot protocol is a decentralized governance tool that allows token holders to vote on proposals without having to delegate their vote to a trusted third party."
    },
    {
      title: "How does it work?",
      text: "Like Discord, you can join spaces dedicated to specific projects and vote on proposals."
    },
    {
      title: "Why is it important?",
      text: "As in democracy, it is important to give the community a voice in making decisions that affect all users, and Snapshot allows this to be done in a decentralized way."
    },
    {
      title: "How are votes calculated?",
      text: "There are several voting strategies, such as voting weighted by the number of tokens held, the number of staked tokens worth double, etc. It is the project that decides the voting strategy."
    },
    {
      title: "Which projects use Snapshot?",
      text: "Many DeFi and NFT projects use Snapshot. These include Uniswap, Yearn Finance, Aave, Sushiswap, Balancer, Synthetix, etc."
    },
    {
      title: "How to follow votes?",
      text: "You can vote directly on the Snapshot website. You can subscribe to spaces to follow the votes of your favorite projects."
    },
    {
      title: "Vote privacy",
      text: "Finally, the project can decide to hide the vote result until the end of the voting period to avoid manipulation."
    },
    {
      title: "Conclusion",
      text: "In conclusion, Snapshot is a decentralized governance tool that allows communities to vote on proposals without having to delegate their vote to a trusted third party."
    }
  ],
  fr: [
    {
      title: "Introduction",
      text: "Le protocole Snapshot est un outil de gouvernance décentralisée qui permet aux détenteurs de jetons de voter sur des propositions sans avoir à déléguer leur vote à un tiers de confiance."
    },
    {
      title: "Comment ça marche ?",
      text: "À la manière de Discord, vous pouvez rejoindre des espaces dédiés à des projets spécifiques et voter sur des propositions."
    },
    {
      title: "Pourquoi c'est important ?",
      text: "Comme en démocratie, il est important de donner la parole à la communauté pour prendre des décisions qui affectent l'ensemble des utilisateurs et Snapshot permet de le faire de manière décentralisée."
    },
    {
      title: "Comment sont calculés les votes ?",
      text: "Il existe plusieurs stratégies de vote, comme le vote pondéré par le nombre de jetons détenus, le nombre de jetons en staking valant le double, etc. C'est le projet qui décide de la stratégie de vote."
    },
    {
      title: "Quels sont les projets qui utilisent Snapshot ?",
      text: "De nombreux projets DeFi et NFT utilisent Snapshot. On y retrouve Uniswap, Yearn Finance, Aave, Sushiswap, Balancer, Synthetix, etc."
    },
    {
      title: "Comment suivre les votes ?",
      text: "Vous pouvez voter directement sur le site de Snapshot. Vous pouvez vous abonner à des espaces pour suivre les votes de vos projets préférés."
    },
    {
      title: "Confidentialité des votes",
      text: "Enfin, le projet peut décider de cacher le résultat des votes afin la fin de la période de vote pour éviter les manipulations."
    },
    {
      title: "Conclusion",
      text: "Pour conclure, Snapshot est un outil de gouvernance décentralisée qui permet aux communautés de voter sur des propositions sans avoir à déléguer leur vote à un tiers de confiance."
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
