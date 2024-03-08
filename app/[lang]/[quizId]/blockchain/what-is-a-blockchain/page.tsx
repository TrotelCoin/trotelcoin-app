"use client";

import { Lang } from "@/types/types";
import Course from "@/app/[lang]/[quizId]/components/course";

const cards = {
  en: [
    {
      title: "What is a blockchain?",
      text: "Blockchain is a distributed ledger used to record transactions across multiple computers. Each transaction is recorded in a block, which is then linked to the previous block, creating a chain of blocks.",
    },
    {
      title: "Block",
      text: "A block is a collection of transactions. Each block contains a list of transactions, a timestamp, and a reference to the previous block. Once a block is added to the blockchain, it cannot be altered.",
    },
    {
      title: "Immutable",
      text: "The blockchain is immutable, meaning that once a block is added to the blockchain, it cannot be altered. This makes the blockchain secure and tamper-resistant.",
    },
    {
      title: "Decentralized",
      text: "The blockchain is decentralized, meaning that it is not controlled by any single entity. Instead, it is maintained by a network of computers, making it secure and resistant to censorship.",
    },
    {
      title: "Transparent",
      text: "The blockchain is transparent, meaning that all transactions are publicly available. This transparency helps to prevent fraud and corruption.",
    },
    {
      title: "Secure",
      text: "The blockchain uses cryptographic techniques to secure transactions and prevent unauthorized access. This makes the blockchain secure and resistant to hacking.",
    },
    {
      title: "Consensus Mechanisms",
      text: "Consensus mechanisms are the protocols that consider a transaction as legitimate and add them to the block. The most common consensus mechanisms are Proof of Work (PoW) and Proof of Stake (PoS).",
    },
    {
      title: "Cryptocurrencies",
      text: "Blockchain technology is the foundation of cryptocurrencies. Cryptocurrencies are digital or virtual currencies that use cryptography for security and operate on a blockchain.",
    },
    {
      title: "Use cases",
      text: "Blockchain technology has a wide range of use cases, including supply chain management, voting systems, identity verification, and more.",
    },
  ],
  fr: [
    {
      title: "Qu'est-ce qu'une blockchain ?",
      text: "La blockchain est un registre distribué utilisé pour enregistrer des transactions sur plusieurs ordinateurs. Chaque transaction est enregistrée dans un bloc, qui est ensuite lié au bloc précédent, créant ainsi une chaîne de blocs.",
    },
    {
      title: "Bloc",
      text: "Un bloc est une collection de transactions. Chaque bloc contient une liste de transactions, une horodatage et une référence au bloc précédent. Une fois qu'un bloc est ajouté à la blockchain, il ne peut pas être modifié.",
    },
    {
      title: "Immuable",
      text: "La blockchain est immuable, ce qui signifie qu'une fois qu'un bloc est ajouté à la blockchain, il ne peut pas être modifié. Cela rend la blockchain sécurisée et résistante à la falsification.",
    },
    {
      title: "Décentralisé",
      text: "La blockchain est décentralisée, ce qui signifie qu'elle n'est pas contrôlée par une seule entité. Au lieu de cela, elle est entretenue par un réseau d'ordinateurs, ce qui la rend sécurisée et résistante à la censure.",
    },
    {
      title: "Transparent",
      text: "La blockchain est transparente, ce qui signifie que toutes les transactions sont publiquement disponibles. Cette transparence contribue à prévenir la fraude et la corruption.",
    },
    {
      title: "Sécurisé",
      text: "La blockchain utilise des techniques cryptographiques pour sécuriser les transactions et empêcher l'accès non autorisé. Cela rend la blockchain sécurisée et résistante au piratage.",
    },
    {
      title: "Mécanismes de consensus",
      text: "Les mécanismes de consensus sont les protocoles qui considèrent une transaction comme légitime et les ajoutent au bloc. Les mécanismes de consensus les plus courants sont la preuve de travail (PoW) et la preuve d'enjeu (PoS).",
    },
    {
      title: "Cryptomonnaies",
      text: "La technologie blockchain est la base des cryptomonnaies. Les cryptomonnaies sont des monnaies numériques ou virtuelles qui utilisent la cryptographie pour la sécurité et fonctionnent sur une blockchain.",
    },
    {
      title: "Cas d'utilisation",
      text: "La technologie blockchain a une large gamme de cas d'utilisation, y compris la gestion de la chaîne d'approvisionnement, les systèmes de vote, la vérification d'identité, et plus encore.",
    },
  ],
};

const CoursePage = ({ params: { lang } }: { params: { lang: Lang } }) => {
  return (
    <>
      <Course cards={cards} lang={lang} />
    </>
  );
};

export default CoursePage;
