"use client";

import type { Lang } from "@/types/language/lang";
import Course from "@/app/[lang]/components/courses/courseScreen/course";

const cards = {
  en: [
    {
      title: "What are Smart Contracts?",
      text: "Smart contracts are self-executing contracts written with code. They automatically execute and enforce agreements when predefined conditions are met."
    },
    {
      title: "How do they Work?",
      text: "Smart contracts work on blockchain technology. They facilitate, verify, or enforce the negotiation or performance of a contract, without third parties."
    },
    {
      title: "Example",
      text: "Let's take a rental contract. The terms of the contract are written in code, and the rent payment is automatically made when the due date is reached."
    },
    {
      title: "Benefits",
      text: "Smart contracts ensure trust, transparency, and efficiency in transactions. They reduce the need for intermediaries, minimize errors, and provide security."
    },
    {
      title: "Challenges",
      text: "Smart contracts face challenges related to security vulnerabilities, legal recognition, scalability, and complexity of implementation. Addressing these challenges is crucial for widespread adoption."
    },
    {
      title: "Uses",
      text: "Smart contracts are used in various fields such as finance, supply chain management, healthcare, real estate, and more. They automate processes, reduce costs, and enhance security."
    }
  ],
  fr: [
    {
      title: "Qu'est-ce que les Contrats Intelligents ?",
      text: "Les contrats intelligents sont des contrats auto-exécutables écrits avec du code. Ils exécutent automatiquement et appliquent les accords lorsque des conditions prédéfinies sont remplies."
    },
    {
      title: "Comment fonctionnent-ils ?",
      text: "Les contrats intelligents fonctionnent sur la technologie de la blockchain. Ils facilitent, vérifient ou appliquent la négociation ou l'exécution d'un contrat, sans tiers."
    },
    {
      title: "Exemple",
      text: "Prenons un contrat de location. Les termes du contrat sont écrits dans le code et le paiement du loyer est automatiquement effectué lorsque la date d'échéance est atteinte."
    },
    {
      title: "Avantages",
      text: "Les contrats intelligents garantissent la confiance, la transparence et l'efficacité des transactions. Ils réduisent le besoin d'intermédiaires, minimisent les erreurs et fournissent la sécurité."
    },
    {
      title: "Défis",
      text: "Les contrats intelligents font face à des défis liés aux vulnérabilités de sécurité, à la reconnaissance légale, à l'évolutivité et à la complexité de mise en œuvre. Il est crucial de relever ces défis pour une adoption généralisée."
    },
    {
      title: "Utilisations",
      text: "Les contrats intelligents sont utilisés dans divers domaines tels que la finance, la supply chain, la santé, l'immobilier, et plus encore. Ils automatisent les processus, réduisent les coûts et renforcent la sécurité."
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
