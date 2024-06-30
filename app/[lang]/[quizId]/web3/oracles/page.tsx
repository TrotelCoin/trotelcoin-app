"use client";

import type { Lang } from "@/types/language/lang";
import Course from "@/app/[lang]/components/courses/courseScreen/course";

const CoursePage = ({ params: { lang } }: { params: { lang: Lang } }) => {
  const cards = {
    en: [
      {
        title: "Introduction",
        text: "Oracles are bridges between the blockchain and the real world. They provide external data to the blockchain."
      },
      {
        title: "Example",
        text: "For example, let's imagine that the blockchain needs to know the price of Apple stock. The oracle will fetch this information from the internet and transmit it to the blockchain."
      },
      {
        title: "How it works",
        text: "Concretely, an oracle is a computer program that retrieves data from the internet. This data is then transmitted to the blockchain."
      },
      {
        title: "1. Data retrieval",
        text: "The oracle retrieves the data from the internet. To do this, it can use APIs (Application Programming Interface)."
      },
      {
        title: "API",
        text: "An API is a set of rules that allow computer programs to communicate with each other and exchange data."
      },
      {
        title: "2. Data transmission",
        text: "Once the data is retrieved, the oracle transmits it to the blockchain. To do this, it uses smart contracts."
      },
      {
        title: "3. Data usage",
        text: "Smart contracts use the data transmitted by the oracle to execute actions. For example, they can trigger a payment for an insurance contract if a tornado is detected."
      },
      {
        title: "Main oracles",
        text: "There are many oracles on the market. The main ones are Chainlink and Pyth Network."
      },
      {
        title: "Conclusion",
        text: "Thus, oracles make it possible to connect the real world with the blockchain and open up many application possibilities."
      }
    ],
    fr: [
      {
        title: "Introduction",
        text: "Les oracles sont des ponts entre la blockchain et le monde réel. Ils fournissent des données externes à la blockchain."
      },
      {
        title: "Exemple",
        text: "Par exemple, imaginons que la blockchain ait besoin de connaître le cours de l'action Apple. L'oracle va chercher cette information sur internet et la transmettre à la blockchain."
      },
      {
        title: "Fonctionnement",
        text: "Concrètement, un oracle est un programme informatique qui récupère des données sur internet. Ces données sont ensuite transmises à la blockchain."
      },
      {
        title: "1. Récupération des données",
        text: "L'oracle récupère les données sur internet. Pour cela, il peut utiliser des API (Application Programming Interface)."
      },
      {
        title: "API",
        text: "Une API est un ensemble de règles qui permettent à des programmes informatiques de communiquer entre eux et de s'échanger des données."
      },
      {
        title: "2. Transmission des données",
        text: "Une fois les données récupérées, l'oracle les transmet à la blockchain. Pour cela, il utilise les smart contracts."
      },
      {
        title: "3. Utilisation des données",
        text: "Les smart contracts utilisent les données transmises par l'oracle pour exécuter des actions. Par exemple, ils peuvent déclencher un paiement pour un contrat d'assurance si une tornade est détectée."
      },
      {
        title: "Principaux oracles",
        text: "Il existe de nombreux oracles sur le marché. Les principaux sont Chainlink et Pyth Network."
      },
      {
        title: "Conclusion",
        text: "Ainsi, les oracles permettent de connecter le monde réel avec la blockchain et ouvrent de nombreuses possibilités d'applications."
      }
    ]
  };

  return (
    <>
      <Course cards={cards} lang={lang} conditionIsOkay={true} />
    </>
  );
};

export default CoursePage;
