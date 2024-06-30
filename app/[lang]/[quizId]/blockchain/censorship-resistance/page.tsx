"use client";

import type { Lang } from "@/types/language/lang";
import Course from "@/app/[lang]/components/courses/courseScreen/course";

const cards = {
  en: [
    {
      title: "Censorship resistance",
      text: "Censorship resistance ensures freedom of expression and financial autonomy by preventing centralized authorities from controlling digital transactions."
    },
    {
      title: "Freedom of expression",
      text: "Eliminating intermediaries allows for the free exchange of ideas and information. As an example, a media can publish content without fear of censorship in any country."
    },
    {
      title: "Financial autonomy",
      text: "The middlemens in the traditional financial system can freeze your account or block your transactions. With censorship resistance, you have full control over your funds and can send them to anyone, anywhere, anytime."
    },
    {
      title: "Technical aspects",
      text: "The censorship resistance of a blockchain is determined by its decentralization, immutability, and security. The more decentralized a blockchain is, the more censorship-resistant it becomes."
    },
    {
      title: "Immutability",
      text: "In addition, immutability ensures that once a transaction is recorded on the blockchain, it cannot be altered or deleted."
    },
    {
      title: "51% attack",
      text: "However, a 51% attack can occur when a single entity controls more than half of the network's mining power. This entity can then prevent new transactions from being confirmed, allowing them to double-spend coins."
    },
    {
      title: "Risk of 51% attack",
      text: "However, the higher the hashrate, the more difficult it is to perform a 51% attack. For example, the Bitcoin network has a hashrate of over 100 exahashes per second, making it virtually impossible to carry out such an attack."
    },
    {
      title: "Hashrate",
      text: "The hashrate is the computational power of the network that miners use to validate transactions and create new blocks."
    },
    {
      title: "Bitcoin's hashrate",
      text: "Bitcoin's hashrate is the highest of all blockchains, making it the most secure and censorship-resistant blockchain in the world. In other words, it would cost billions of dollars to perform a 51% attack on the Bitcoin network."
    }
  ],
  fr: [
    {
      title: "Résistance à la censure",
      text: "La résistance à la censure garantit la liberté d'expression et l'autonomie financière en empêchant les autorités centralisées de contrôler les transactions numériques."
    },
    {
      title: "Liberté d'expression",
      text: "L'élimination des intermédiaires permet l'échange libre d'idées et d'informations. Par exemple, un média peut publier du contenu sans craindre la censure peu importe le pays."
    },
    {
      title: "Autonomie financière",
      text: "Les intermédiaires du système financier traditionnel peuvent geler votre compte ou bloquer vos transactions. Avec la résistance à la censure, vous avez le contrôle total de vos fonds et pouvez les envoyer à qui vous voulez, où vous voulez, quand vous voulez."
    },
    {
      title: "Aspects techniques",
      text: "La résistance à la censure d'une blockchain est déterminée par sa décentralisation, son immuabilité et sa sécurité. Plus une blockchain est décentralisée, plus elle est résistante à la censure."
    },
    {
      title: "Immuabilité",
      text: "De plus, l'immutabilité garantit qu'une fois qu'une transaction est enregistrée sur la blockchain, elle ne peut pas être modifiée ou supprimée."
    },
    {
      title: "Attaque des 51%",
      text: "Cependant, une attaque des 51% peut se produire lorsqu'une seule entité contrôle plus de la moitié de la puissance de minage du réseau. Cette entité peut alors empêcher la confirmation de nouvelles transactions, lui permettant de doubler les dépenses de pièces."
    },
    {
      title: "Risque d'attaque des 51%",
      text: "Cependant, plus le hashrate est élevé, plus il est difficile de réaliser une attaque des 51%. Par exemple, le réseau Bitcoin a un hashrate de plus de 100 exahashes par seconde, rendant pratiquement impossible de mener une telle attaque."
    },
    {
      title: "Hashrate",
      text: "Le hashrate est la puissance de calcul du réseau que les mineurs utilisent pour valider les transactions et créer de nouveaux blocs."
    },
    {
      title: "Hashrate de Bitcoin",
      text: "Le hashrate de Bitcoin est le plus élevé de toutes les blockchains, ce qui en fait la blockchain la plus sécurisée et la plus résistante à la censure au monde. En d'autres termes, il en coûterait des milliards de dollars pour réaliser une attaque des 51% sur le réseau Bitcoin."
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
