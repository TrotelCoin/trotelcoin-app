"use client";

import type { Lang } from "@/types/lang";
import Course from "@/app/[lang]/[quizId]/components/course";

const cards = {
  en: [
    {
      title: "Consensus Mechanisms",
      text: "The term consensus mechanism is the complete stack of ideas, protocols and incentives that facilitate a distributed network of nodes to reach consensus on the current state of a blockchain.",
    },
    {
      title: "Consensus",
      text: "A consensus means that a general agreement has been reached. It is like a group of friends that want to go to the restaurant, they have to agree on what to eat.",
    },
    {
      title: "Ethereum Example",
      text: "On Ethereum, a consensus is reached when 66% of the nodes agree on the global state of the network. For Bitcoin it is 50%.",
    },
    {
      title: "Consensus Mechanism",
      text: "There are differents consensus mechanisms to agree on the state of the network. The most known are Proof of Work used by Bitcoin and Proof of Stake by Ethereum.",
    },
    {
      title: "Block Creation",
      text: "Miners race each other to make new blocks packed with completed transactions. The one who wins shows the new block to everyone else and gets some brand-new BTC as a reward.",
    },
    {
      title: "Computation",
      text: "In Proof-of-Work, the computer that solves a math puzzle the quickest wins the race. This creates a hash that connects the current block to the previous one. So, solving this puzzle is what Proof-of-Work is all about.",
    },
    {
      title: "Canonical Chain",
      text: "The main chain is decided by a rule that picks the blocks with the most effort put into mining them.",
    },
    {
      title: "Security",
      text: "The network stays safe because you would have to control more than half of the computers in the network to cheat. Doing this would need a lot of money for buying equipment and power, and you'd probably end up spending more than you could ever make.",
    },
    {
      title: "Proof of Stake",
      text: "Ethereum uses a Proof-of-Stake consensus mechanism. It involves giving rewards or penalties to those who are involved in staking a certain capital amount on Ethereum.",
    },
    {
      title: "Incentives",
      text: "This reward motivates people who stake their cryptocurrency to be honest validators, penalizes those who aren't honest, and makes it very expensive to try and harm the network.",
    },
    {
      title: "Protocol",
      text: "In addition, a protocol governs the way honest validators are selected to propose or validate blocks, process transactions and vote.",
    },
    {
      title: "Fake Identities",
      text: "Proof-of-work and proof-of-stake aren't exactly consensus protocols, even though people often call them that for simplicity. They're really about preventing fake identities and choosing who gets to create the newest block.",
    },
    {
      title: "Sybil Attacks",
      text: "Sybil attacks happen when one person or a group acts like they're many different people. It's important for a decentralized blockchain to defend against this kind of attack. This ensures that miners and validators are rewarded fairly for the work they do. ",
    },
    {
      title: "Sybil Resistance",
      text: "Proof-of-Work and Proof-of-Stake stop Sybil attacks by making it hard for someone to fake being multiple users.",
    },
    {
      title: "Chain Selection Rule",
      text: "In Bitcoin, there's a rule called the \"longest chain\" rule that helps decide which chain is right. Basically, the chain that's the longest is the one everyone agrees on and uses.",
    },
  ],
  fr: [
    {
      title: "Mécanismes de consensus",
      text: "Le terme mécanisme de consensus représente l'ensemble des idées, protocoles et incitations qui facilitent à un réseau distribué de nœuds d'atteindre un consensus sur l'état actuel d'une blockchain.",
    },
    {
      title: "Consensus",
      text: "Un consensus signifie qu'un accord général a été atteint. C'est comme un groupe d'amis qui veulent aller au restaurant, ils doivent se mettre d'accord sur ce qu'ils veulent manger.",
    },
    {
      title: "Exemple Ethereum",
      text: "Sur Ethereum, un consensus est atteint lorsque 66% des nœuds sont d'accord sur l'état global du réseau. Pour Bitcoin, c'est 50%.",
    },
    {
      title: "Mécanisme de consensus",
      text: "Il existe différents mécanismes de consensus pour s'accorder sur l'état du réseau. Les plus connus sont la Preuve de Travail et la Preuve d'Enjeu.",
    },
    {
      title: "Création de blocs",
      text: "Les mineurs se disputent pour créer de nouveaux blocs contenant des transactions terminées. Celui qui gagne montre le nouveau bloc à tout le monde et reçoit de nouveaux BTC en récompense.",
    },
    {
      title: "Calcul",
      text: "En Preuve de Travail, l'ordinateur qui résout le plus rapidement un puzzle mathématique gagne la course. Cela crée un hash qui relie le bloc actuel au précédent. Ainsi, résoudre ce puzzle est le principe de la Preuve de Travail.",
    },
    {
      title: "Chaîne canonique",
      text: "La chaîne principale est déterminée par une règle qui sélectionne les blocs ayant demandé le plus d'efforts pour être minés.",
    },
    {
      title: "Sécurité",
      text: "Le réseau reste sécurisé car il faudrait contrôler plus de la moitié des ordinateurs du réseau pour tricher. Faire cela nécessiterait beaucoup d'argent pour acheter du matériel et de l'électricité, et vous finiriez probablement par dépenser plus que vous ne pourriez jamais gagner.",
    },
    {
      title: "Preuve d'Enjeu",
      text: "Ethereum utilise un mécanisme de consensus appelé Preuve d'Enjeu. Cela implique de récompenser ou de pénaliser ceux qui sont impliqués dans la mise en jeu d'un certain montant de capital sur Ethereum.",
    },
    {
      title: "Incitations",
      text: "Cette récompense motive les personnes qui misent leur cryptomonnaie à être des validateurs honnêtes, punit ceux qui ne le sont pas et rend très coûteux de tenter de nuire au réseau.",
    },
    {
      title: "Protocole",
      text: "De plus, un protocole régit la manière dont les validateurs honnêtes sont sélectionnés pour proposer ou valider des blocs, traiter des transactions et voter.",
    },
    {
      title: "Identités frauduleuses",
      text: "La Preuve de Travail et la Preuve d'Enjeu ne sont pas exactement des protocoles de consensus, même si les gens les appellent souvent ainsi par simplicité. Elles visent vraiment à empêcher les identités frauduleuses et à choisir qui peut créer le dernier bloc.",
    },
    {
      title: "Attaques Sybil",
      text: "Les attaques Sybil se produisent lorsqu'une personne ou un groupe se fait passer pour de nombreuses personnes différentes. Il est important pour une blockchain décentralisée de se défendre contre ce type d'attaque. Cela garantit que les mineurs et les validateurs sont récompensés équitablement pour le travail qu'ils accomplissent.",
    },
    {
      title: "Résistance Sybil",
      text: "La Preuve de Travail et la Preuve d'Enjeu empêchent les attaques Sybil en rendant difficile pour quelqu'un de se faire passer pour plusieurs utilisateurs.",
    },
    {
      title: "Règle de sélection de chaîne",
      text: "Dans Bitcoin, il existe une règle appelée la règle de la \"chaîne la plus longue\" qui aide à décider quelle chaîne est correcte. Fondamentalement, la chaîne la plus longue est celle sur laquelle tout le monde est d'accord et qu'il utilise.",
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
