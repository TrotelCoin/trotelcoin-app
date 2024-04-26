"use client";

import type { Lang } from "@/types/lang";
import Course from "@/app/[lang]/[quizId]/components/course";

const cards = {
  en: [
    {
      title: "Introduction",
      text: "A blockchain is decentralized, secure, and scalable. But, the blockchain trilemma states that a base blockchain can only have two of these properties, not all three.",
    },
    {
      title: "Ethereum Layer 2s",
      text: "Layer 2 blockchains, which are built on Ethereum, make transactions faster and cheaper for the main Ethereum network. They handle the hard work of processing transactions that Ethereum can't handle quickly.",
    },
    {
      title: "A Layer 2",
      text: "A Layer 2 solution is like a helper network for a main blockchain. It helps ease the burden on the main chain by taking care of some of its tasks.",
    },
    {
      title: "Layer 2 example",
      text: "Imagine a Layer 2 solution as friends helping you carry a heavy backpack (the main blockchain). They take some of the weight off your shoulders by carrying part of the load themselves, making it easier to move.",
    },
    {
      title: "Context",
      text: "Back to the blockchain trilemna, when we sacrifice scalability, it causes some clear problems: transactions become slow and costly. Right now, Ethereum can only handle about 15 to 30 transactions per second. In comparison, VISA manages around 1,700 transactions per second.",
    },
    {
      title: "Finality",
      text: "Additionally, when a transaction is put onto the blockchain and can't be changed anymore, it usually takes about 15 minutes on Ethereum. Thus, when lots of people are using it at the same time, the network gets very busy, making the fees go up suddenly.",
    },
    {
      title: "Sidechains",
      text: "There are also sidechains, which are blockchains with their own properties and rules. They are designed to help the main network run better. Plus, they are linked to the main blocks using a special bridge that lets people move their belongings between them and Ethereum.",
    },
    {
      title: "Two-pegged sidechains",
      text: "But, no actual moving of belongings happens between the two chains. Sidechains work by using a method called a two-way peg. A special kind of contract locks away belongings on the main chain and creates a copy of the tokens on the sidechain. The worth of these new belongings is tied to the belongings on the first chain.",
    },
    {
      title: "Rollups",
      text: "Rollups are like bundles of transactions. They group lots of transactions together and send them to Ethereum all at once. Ethereum then adds these bundles to its blocks and confirms them.",
    },
    {
      title: "Rollups example",
      text: "Rollups are like buses that take lots of people (transactions) to the city (Ethereum). They pick up people at different stops (transactions) and drop them off at the city all at once.",
    },
    {
      title: "Optimistic rollups",
      text: "Optimistic rollups are a type of rollup that are made to be faster and cheaper. They work by assuming that all the transactions in a rollup are good, and only checking them if someone says they're not.",
    },
    {
      title: "ZK rollups",
      text: "ZK rollups are a type of rollup that are made to be private. They work by using some special math to prove that all the transactions in a rollup are good, without needing to check them all.",
    },
    {
      title: "Popular Layer 2s",
      text: "Some popular Layer 2s are Polygon, Arbitrum and Optimism. They all use different methods to make Ethereum faster and cheaper.",
    },
  ],
  fr: [
    {
      title: "Introduction",
      text: "Une blockchain est décentralisée, sécurisée et scalable. Mais, le trilemme de la blockchain stipule qu'une blockchain de base ne peut avoir que deux de ces propriétés, pas les trois.",
    },
    {
      title: "Ethereum Layer 2s",
      text: "Les blockchains de couche 2, qui sont construites sur Ethereum, rendent les transactions plus rapides et moins chères pour le réseau principal Ethereum. Elles gèrent le travail difficile de traitement des transactions qu'Ethereum ne peut pas traiter rapidement.",
    },
    {
      title: "Une couche 2",
      text: "Une solution de couche 2 est comme un réseau auxiliaire pour une blockchain principale. Elle aide à alléger la charge sur la chaîne principale en s'occupant de certaines de ses tâches.",
    },
    {
      title: "Layer 2 exemple",
      text: "Imagine une solution de couche 2 comme des amis qui t'aide à porter un sac à dos lourd (la blockchain principale). Ils prennent une partie du poids de tes épaules en portant une partie de la charge eux-mêmes, ce qui facilite le déplacement.",
    },
    {
      title: "Contexte",
      text: "Revenons au trilemme de la blockchain, lorsque nous sacrifions la scalabilité, cela pose des problèmes évidents : les transactions deviennent lentes et coûteuses. En ce moment, Ethereum ne peut gérer que 15 à 30 transactions par seconde. En comparaison, VISA gère environ 1 700 transactions par seconde.",
    },
    {
      title: "Finalité",
      text: "De plus, lorsqu'une transaction est placée sur la blockchain et ne peut plus être modifiée, cela prend généralement environ 15 minutes sur Ethereum. Alors, lorsque beaucoup de gens l'utilisent en même temps, le réseau devient très occupé, ce qui fait monter soudainement les frais.",
    },
    {
      title: "Sidechains",
      text: "On a aussi les sidechains qui sont des blockchains avec leurs propres propriétés et règles. Elles sont conçues pour aider le réseau principal à mieux fonctionner. De plus, elles sont liées aux blocs principaux en utilisant un pont spécial qui permet aux gens de déplacer leurs biens entre eux et Ethereum.",
    },
    {
      title: "Sidechains à deux jetons",
      text: "Mais, aucun déplacement réel de biens ne se produit entre les deux chaînes. Les sidechains fonctionnent en utilisant une méthode appelée two-way peg. Un contrat spécial enferme les biens sur la chaîne principale et crée une copie des jetons sur la sidechain. La valeur de ces nouveaux biens est liée aux biens sur la première chaîne.",
    },
    {
      title: "Rollups",
      text: "Les rollups sont comme des paquets de transactions. Ils regroupent beaucoup de transactions et les envoient à Ethereum en une seule fois. Ethereum ajoute ensuite ces paquets à ses blocs et les confirme.",
    },
    {
      title: "Rollups exemple",
      text: "Les rollups sont comme des bus qui emmènent beaucoup de gens (transactions) à la ville (Ethereum). Ils ramassent des gens à différents arrêts (transactions) et les déposent à la ville en une seule fois.",
    },
    {
      title: "Rollups optimistes",
      text: "Les rollups optimistes sont un type de rollup conçu pour être plus rapide et moins cher. Ils fonctionnent en supposant que toutes les transactions dans un rollup sont bonnes, et ne les vérifient que si quelqu'un dit qu'elles ne le sont pas.",
    },
    {
      title: "Rollups ZK",
      text: "Les rollups ZK sont un type de rollup conçu pour être privé. Ils fonctionnent en utilisant des mathématiques spéciales pour prouver que toutes les transactions dans un rollup sont bonnes, sans avoir besoin de toutes les vérifier.",
    },
    {
      title: "Layer 2s populaires",
      text: "Certains Layer 2 populaires sont Polygon, Arbitrum et Optimism. Ils utilisent tous des méthodes différentes pour rendre Ethereum plus rapide et moins cher.",
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
