"use client";

import type { Lang } from "@/types/lang";
import Course from "@/app/[lang]/[quizId]/components/course";

const cards = {
  en: [
    {
      title: "Introduction",
      text: "The EVM is a crucial component of the Ethereum blockchain network, serving as the runtime environment for executing smart contracts.",
    },
    {
      title: "Understanding the EVM",
      text: "The Ethereum Virtual Machine (EVM) is a decentralized virtual machine that executes scripts on the Ethereum network. It is a Turing-complete virtual machine.",
    },
    {
      title: "dApps",
      text: "This makes the EVM incredibly powerful, enabling developers to build complex decentralized applications (dApps) and execute smart contracts securely and efficiently.",
    },
    {
      title: "Bytecode",
      text: "When a smart contract or dApp is deployed on the Ethereum network, it is compiled into bytecode, which is a series of machine-readable instructions understood by the EVM. Nodes on the Ethereum network then execute these bytecode instructions.",
    },
    {
      title: "Gas",
      text: "Each instruction consumes a certain amount of gas, which serves as the unit of computation and prevents infinite loops or resource exhaustion.",
    },
    {
      title: "Importance of EVM",
      text: "The Ethereum Virtual Machine plays a vital role in enabling the functionality and interoperability of the Ethereum blockchain. It facilitates the execution of smart contracts.",
    },
    {
      title: "Applications",
      text: "This programmability enables a wide range of applications, including DeFi, NFTs, DEXs, and more, all running on the Ethereum network.",
    },
    {
      title: "Conclusion",
      text: "In conclusion, the Ethereum Virtual Machine (EVM) is a fundamental component of the Ethereum blockchain network, providing the infrastructure for executing smart contracts and powering decentralized applications.",
    },
  ],
  fr: [
    {
      title: "Introduction",
      text: "L'EVM est un composant crucial du réseau de la blockchain Ethereum, servant d'environnement d'exécution pour les contrats intelligents.",
    },
    {
      title: "Compréhension de l'EVM",
      text: "La Machine Virtuelle Ethereum (EVM) est une machine virtuelle décentralisée qui exécute des scripts sur le réseau Ethereum. C'est une machine virtuelle complète de Turing.",
    },
    {
      title: "dApps",
      text: "Cela rend l'EVM incroyablement puissant, permettant aux développeurs de construire des applications décentralisées complexes (dApps) et d'exécuter des contrats intelligents de manière sécurisée et efficace.",
    },
    {
      title: "Bytecode",
      text: "Lorsqu'un contrat intelligent ou une dApp est déployé sur le réseau Ethereum, il est compilé en bytecode, qui est une série d'instructions lisibles par la machine comprises par l'EVM. Les nœuds sur le réseau Ethereum exécutent ensuite ces instructions bytecode.",
    },
    {
      title: "Gas",
      text: "Chaque instruction consomme une certaine quantité de gaz, qui sert d'unité de calcul et empêche les boucles infinies ou l'épuisement des ressources.",
    },
    {
      title: "Importance de l'EVM",
      text: "La Machine Virtuelle Ethereum joue un rôle vital en permettant la fonctionnalité et l'interopérabilité de la blockchain Ethereum. Elle facilite l'exécution de contrats intelligents.",
    },
    {
      title: "Applications",
      text: "Cette programmabilité permet une large gamme d'applications, y compris DeFi, NFTs, DEXs, et plus encore, toutes fonctionnant sur le réseau Ethereum.",
    },
    {
      title: "Conclusion",
      text: "En conclusion, la Machine Virtuelle Ethereum (EVM) est un composant fondamental du réseau de la blockchain Ethereum, fournissant l'infrastructure pour l'exécution de contrats intelligents et l'alimentation des applications décentralisées.",
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
