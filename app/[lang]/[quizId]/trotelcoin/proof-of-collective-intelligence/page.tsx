"use client";

import type { Lang } from "@/types/language/lang";
import Course from "@/app/[lang]/components/courses/courseScreen/course";

const cards = {
  en: [
    {
      title: "Introduction",
      text: "The Proof of Collective Intelligence is a new concept in decentralized education."
    },
    {
      title: "What is it for?",
      text: "It allows everyone to contribute to education and earn rewards. This allows learning from others and sharing knowledge."
    },
    {
      title: "How does it work?",
      text: "A set of technologies and steps enable this innovation. Let's take a closer look."
    },
    {
      title: "Workflow",
      text: "First, the course creator enters information about the course. Available information includes the title, course category, description, content, etc."
    },
    {
      title: "Course accessibility",
      text: "The creator can also choose to restrict their course to Intermediates and Experts for various reasons."
    },
    {
      title: "Fees",
      text: "Finally, the creator pays fees to put their course online. These fees are used to secure the protocol and generate revenue for the DAO."
    },
    {
      title: "Technologies",
      text: "On the technology side, we use IPFS to store data and a smart contract on Polygon PoS to manage associated transactions."
    },
    {
      title: "Content verification",
      text: "Once the fees are paid, the course is verified by the DAO governance. If the course is approved, it is put online and creators can start earning rewards."
    },
    {
      title: "Voting power",
      text: "Voting power is determined by the number of TROTEL held and staked, with additional benefits for staking."
    },
    {
      title: "Conclusion",
      text: "If the vote is positive, the course is put online and creators can start earning rewards. Good luck!"
    }
  ],
  fr: [
    {
      title: "Introduction",
      text: "La Preuve d'Intelligence Collective est un nouveau concept dans l'éducation décentralisée."
    },
    {
      title: "À quoi sert-elle ?",
      text: "Elle permet à tout le monde de contribuer à l'éducation et de gagner des récompenses. Cela permet d'apprendre des autres et de partager ses connaissances."
    },
    {
      title: "Comment ça marche ?",
      text: "Un ensemble de technologies et d'étapes permettent cette innovation. Regardons cela de plus près."
    },
    {
      title: "Le workflow",
      text: "Tout d'abord, le créateur du cours rentre les informations sur le cours. Les informations disponibles sont le titre, la catégorie du cours, une description, son contenu, etc."
    },
    {
      title: "Accessibilité du cours",
      text: "Le créateur peut aussi choisir de resteindre son cours aux Intermédiaires et Experts pour différentes raisons."
    },
    {
      title: "Frais",
      text: "Enfin, le créateur paye des frais pour mettre son cours en ligne. Ces frais sont utilisés pour sécuriser le protocole et générer des revenus à la DAO."
    },
    {
      title: "Technologies",
      text: "Du côté des technologies, nous utilisons IPFS pour stocker les données et un smart contract sur Polygon PoS pour gérer les transactions associées."
    },
    {
      title: "Vériﬁcation du contenu",
      text: "Une fois les frais payés, le cours est vérifié par la gouvernance de la DAO. Si le cours est approuvé, il est mis en ligne et les créateurs peuvent commencer à gagner des récompenses."
    },
    {
      title: "Pouvoir de vote",
      text: "Le pouvoir de vote est déterminé par le nombre de TROTEL détenus et en staking, avec des avantages supplémentaires pour le staking."
    },
    {
      title: "Conclusion",
      text: "Si le vote est positif, le cours est mis en ligne et les créateurs peuvent commencer à gagner des récompenses. Bonne chance !"
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
