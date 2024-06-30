"use client";

import type { Lang } from "@/types/language/lang";
import Course from "@/app/[lang]/components/courses/courseScreen/course";

const cards = {
  en: [
    {
      title: "Introduction",
      text: "In this course, you will learn about the different types of DAOs and how they operate."
    },
    {
      title: "Operating system DAOs",
      text: "This type of DAO serves as a platform for other DAOs to operate on. They are responsible for creating, managing and executing smart contracts. Indeed, they can be used to create any kind of DAO."
    },
    {
      title: "Protocol DAOs",
      text: "They are the most common type of DAOs. They are responsible to create the underlying protocol that governs the blockchain. It is the alternative to Application DAOs. Uniswap, Compound, and MakerDAO are examples of Protocol DAOs."
    },
    {
      title: "Application DAOs",
      text: "They are responsible for creating and managing decentralized applications that run on the blockchain."
    },
    {
      title: "Media DAOs",
      text: "This kind of DAO are platforms that allow users to create content, collaborate on projects, and share their work with others. This helps to make a democratic space where everyone can participate in the creation of content."
    },
    {
      title: "Collector DAOs",
      text: "This kind of organizations collect data from surveys or social media. Then, they use it to decide about investment or product investment. However, it is totally transparent where everyone can see the collected data and how it is used."
    },
    {
      title: "Social DAOs",
      text: "The idea behind social DAOs is to create a community that can vote on decisions that affect the community. This is used for collaborative projects such as software development."
    },
    {
      title: "Investment DAOs",
      text: "In this category, the most common DAO is the pooled investment DAO. This type of DAO allows users to pool their funds together to invest in a project. You also have diversified investment DAO which instead of investing in multiple assets, you invest in multiple DAOs."
    },
    {
      title: "Grants DAOs",
      text: "These organizations give grants to other DAOs. The idea was to fund other DAOs that support the decentralized ecosystem. It also helps you to spread your risks by diversifying your investments."
    },
    {
      title: "Conclusion",
      text: "In this course, you have learned about the different types of DAOs and how they operate."
    }
  ],
  fr: [
    {
      title: "Introduction",
      text: "Dans ce cours, vous apprendrez ce que sont les différents types de DAOs et comment ils fonctionnent."
    },
    {
      title: "DAOs de système d'exploitation",
      text: "Ce type de DAO sert de plateforme pour d'autres DAOs. Ils sont responsables de la création, de la gestion et de l'exécution de contrats intelligents. En effet, ils peuvent être utilisés pour créer n'importe quel type de DAO."
    },
    {
      title: "DAOs de protocole",
      text: "C'est le type de DAOs le plus courant. Ils sont responsables de créer le protocole sous-jacent qui régit la blockchain. C'est l'alternative aux DAOs d'application. Uniswap, Compound et MakerDAO sont des exemples de DAOs de protocole."
    },
    {
      title: "DAOs d'application",
      text: "Elles sont responsables de la création et de la gestion d'applications décentralisées qui fonctionnent sur la blockchain."
    },
    {
      title: "DAOs de médias",
      text: "Ce type de DAO est une plateforme qui permet aux utilisateurs de créer du contenu, de collaborer sur des projets et de partager leur travail avec d'autres. Cela aide à créer un espace démocratique où tout le monde peut participer à la création de contenu."
    },
    {
      title: "DAOs de collecte",
      text: "Ce type d'organisations collectent des données à partir d'enquêtes ou des réseaux sociaux. Ensuite, ils l'utilisent pour décider d'investissements ou d'investissements produit. Cependant, elle est totalement transparente car tout le monde peut voir les données collectées et comment elles sont utilisées."
    },
    {
      title: "DAOs sociaux",
      text: "L'idée derrière les DAOs sociaux est de créer une communauté qui peut voter sur des décisions qui affectent la communauté. Cela est utilisé pour des projets collaboratifs tels que le développement de logiciels."
    },
    {
      title: "DAOs d'investissement",
      text: "Dans cette catégorie, la DAO d'investissement la plus courante est la DAO d'investissement groupé. Ce type de DAO permet aux utilisateurs de regrouper leurs fonds pour investir dans un projet. Vous avez également des DAOs d'investissement diversifiés qui, au lieu d'investir dans plusieurs actifs, investissent dans plusieurs DAOs."
    },
    {
      title: "DAOs de subventions",
      text: "Ces organisations accordent des subventions à d'autres DAOs. L'idée était de financer d'autres DAOs qui soutiennent l'écosystème décentralisé. Cela vous aide également à répartir vos risques en diversifiant vos investissements."
    },
    {
      title: "Conclusion",
      text: "Dans ce cours, vous aurez appris ce que sont les différents types de DAOs et comment ils fonctionnent."
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
