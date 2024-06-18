"use client";

import type { Lang } from "@/types/language/lang";
import Course from "@/app/[lang]/components/courses/courseScreen/course";

const cards = {
  en: [
    {
      title: "What are DAOs?",
      text: "Decentralized Autonomous Organizations are entities governed by smart contracts and run on blockchain technology."
    },
    {
      title: "How they operate?",
      text: "They operate without centralized control, relying on consensus mechanisms for decision-making."
    },
    {
      title: "What can you do?",
      text: "DAOs enable participants to vote on proposals and manage funds transparently, often used for community-driven projects."
    },
    {
      title: "Benefits",
      text: "Their autonomy and transparency make them promising for various decentralized applications across industries."
    },
    {
      title: "The DAO",
      text: "The DAO was one of the biggest DAO at the beginning and got hacked. The hackers drained worth of $50 million in cryptocurrency."
    },
    {
      title: "Solution",
      text: "Then, the Ethereum blockchain was hardforked making it easier to support DAOs on the network. The funds were restored at the same time."
    }
  ],
  fr: [
    {
      title: "Qu'est-ce que sont les DAO ?",
      text: "Les organisations autonomes décentralisées sont des entités gouvernées par des contrats intelligents et fonctionnent sur la technologie de la blockchain."
    },
    {
      title: "Comment fonctionnent-elles ?",
      text: "Elles fonctionnent sans contrôle centralisé, en s'appuyant sur des mécanismes de consensus pour la prise de décision."
    },
    {
      title: "Que pouvez-vous faire ?",
      text: "Les DAO permettent aux participants de voter sur des propositions et de gérer les fonds de manière transparente, souvent utilisées pour des projets pilotés par la communauté."
    },
    {
      title: "Avantages",
      text: "Leur autonomie et leur transparence les rendent prometteuses pour diverses applications décentralisées dans différents secteurs industriels."
    },
    {
      title: "The DAO",
      text: "The DAO était l'un des plus grandes DAO au début et a été piraté. Les pirates ont dérobé l'équivalent de 50 millions de dollars en cryptomonnaie."
    },
    {
      title: "Solution",
      text: "Ensuite, la blockchain Ethereum a été forkée pour faciliter le support des DAOs sur le réseau. Les fonds ont été restaurés en même temps."
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
