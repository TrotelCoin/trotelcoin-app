import { Lessons } from "@/types/types";

const lessons: Lessons[] = [
  {
    category: "TrotelCoin",
    courses: [
      {
        title: {
          en: "Introduction to TrotelCoin",
          fr: "Introduction à TrotelCoin",
        },
        description: {
          en: "Get acquainted with using TrotelCoin, exploring its functionalities",
          fr: "Familiarisez-vous avec l'utilisation de TrotelCoin, en explorant ses fonctionnalités",
        },
        href: "/trotelcoin/introduction-to-trotelcoin",
        tier: {
          en: "Beginner",
          fr: "Débutant",
        },
        sponsored: false,
        new: false,
        quizId: 1,
        available: true,
      },
      {
        title: {
          en: "Claim your NFTs",
          fr: "Revendiquez vos NFTs",
        },
        description: {
          en: "Understand the process of claiming TrotelCoin's NFTs and their utilization",
          fr: "Comprenez le processus de réclamation des NFT de TrotelCoin et leur utilisation",
        },
        href: "/trotelcoin/claim-your-nfts",
        tier: {
          en: "Beginner",
          fr: "Débutant",
        },
        sponsored: false,
        new: false,
        quizId: 2,
        available: false,
      },
    ],
  },
  {
    category: "Wallet",
    courses: [
      {
        title: {
          en: "Create your first wallet",
          fr: "Créez votre premier portefeuille",
        },
        description: {
          en: "Learn the steps involved in creating your initial digital wallet securely",
          fr: "Apprenez les étapes de création de votre premier portefeuille numérique en toute sécurité",
        },
        href: "/wallet/create-your-first-wallet",
        tier: {
          en: "Beginner",
          fr: "Débutant",
        },
        sponsored: false,
        new: false,
        quizId: 3,
        available: false,
      },
      {
        title: {
          en: "Secure your wallet",
          fr: "Sécurisez votre portefeuille",
        },
        description: {
          en: "Discover methods to secure your wallet and its contents",
          fr: "Découvrez des méthodes pour sécuriser votre portefeuille et son contenu",
        },
        href: "/wallet/secure-your-wallet",
        tier: {
          en: "Expert",
          fr: "Expert",
        },
        sponsored: false,
        new: false,
        quizId: 4,
        available: false,
      },
      {
        title: {
          en: "Authenticate with your wallet",
          fr: "Authentifiez-vous avec votre portefeuille",
        },
        description: {
          en: "Discover methods to authenticate and access your wallet securely",
          fr: "Découvrez des méthodes pour vous authentifier et accéder à votre portefeuille en toute sécurité",
        },
        href: "/wallet/authenticate-with-your-wallet",
        tier: {
          en: "Beginner",
          fr: "Débutant",
        },
        sponsored: false,
        new: false,
        quizId: 5,
        available: false,
      },
      {
        title: {
          en: "Make your first transaction",
          fr: "Effectuez votre première transaction",
        },
        description: {
          en: "Gain hands-on experience in making your first digital transaction",
          fr: "Acquérez une expérience pratique pour effectuer votre première transaction numérique",
        },
        href: "/wallet/make-your-first-transaction",
        tier: {
          en: "Beginner",
          fr: "Débutant",
        },
        sponsored: false,
        new: false,
        quizId: 6,
        available: false,
      },
    ],
  },
  {
    category: "Blockchain",
    courses: [
      {
        title: {
          en: "What is a blockchain?",
          fr: "Qu'est-ce qu'une blockchain?",
        },
        description: {
          en: "Grasp the concepts underlying the functionality of a blockchain",
          fr: "Saisissez les concepts sous-jacents à la fonctionnalité d'une blockchain",
        },
        href: "/blockchain/what-is-a-blockchain",
        tier: {
          en: "Beginner",
          fr: "Débutant",
        },
        sponsored: false,
        new: false,
        quizId: 7,
        available: false,
      },
      {
        title: {
          en: "Consensus mechanisms",
          fr: "Mécanismes de consensus",
        },
        description: {
          en: "Explore the various consensus mechanisms that power blockchains",
          fr: "Explorez les différents mécanismes de consensus qui alimentent les blockchains",
        },
        href: "/blockchain/consensus-mechanisms",
        tier: {
          en: "Intermediate",
          fr: "Intermédiaire",
        },
        sponsored: false,
        new: false,
        quizId: 8,
        available: false,
      },
    ],
  },
  {
    category: "Bitcoin",
    courses: [
      {
        title: {
          en: "Introduction to Bitcoin",
          fr: "Introduction à Bitcoin",
        },
        description: {
          en: "Explore the basics and core principles of the Bitcoin cryptocurrency",
          fr: "Explorez les bases et les principes fondamentaux de la crypto-monnaie Bitcoin",
        },
        href: "/bitcoin/introduction-to-bitcoin",
        tier: {
          en: "Beginner",
          fr: "Débutant",
        },
        sponsored: false,
        new: false,
        quizId: 9,
        available: false,
      },
      {
        title: {
          en: "The history of Bitcoin",
          fr: "L'histoire de Bitcoin",
        },
        description: {
          en: "Dive into the historical evolution and significant milestones of Bitcoin",
          fr: "Plongez dans l'évolution historique et les jalons importants de Bitcoin",
        },
        href: "/bitcoin/the-history-of-bitcoin",
        tier: {
          en: "Beginner",
          fr: "Débutant",
        },
        sponsored: false,
        new: false,
        quizId: 10,
        available: false,
      },
    ],
  },
  {
    category: "Ethereum",
    courses: [
      {
        title: {
          en: "Introduction to Ethereum",
          fr: "Introduction à Ethereum",
        },
        description: {
          en: "Explore the basics and core principles of the Ethereum blockchain",
          fr: "Explorez les bases et les principes fondamentaux de la blockchain Ethereum",
        },
        href: "/ethereum/introduction-to-ethereum",
        tier: {
          en: "Beginner",
          fr: "Débutant",
        },
        sponsored: false,
        new: false,
        quizId: 11,
        available: false,
      },
      {
        title: {
          en: "Understand the layers 2",
          fr: "Comprendre les couches de niveau 2",
        },
        description: {
          en: "Explore the secondary layers of Ethereum's architecture",
          fr: "Explorez les couches secondaires de l'architecture d'Ethereum",
        },
        href: "/ethereum/understand-the-layers-2",
        tier: {
          en: "Intermediate",
          fr: "Intermédiaire",
        },
        sponsored: false,
        new: false,
        quizId: 12,
        available: false,
      },
      {
        title: {
          en: "Smart contracts",
          fr: "Contrats intelligents",
        },
        description: {
          en: "Learn about Ethereum's smart contracts and their innovative applications",
          fr: "Découvrez les contrats intelligents d'Ethereum et leurs applications innovantes",
        },
        href: "/ethereum/smart-contracts",
        tier: {
          en: "Beginner",
          fr: "Débutant",
        },
        sponsored: false,
        new: false,
        quizId: 13,
        available: false,
      },
      {
        title: {
          en: "Ethereum Virtual Machine",
          fr: "Machine virtuelle Ethereum",
        },
        description: {
          en: "Gain insights into Ethereum's virtual machine and its functionalities",
          fr: "Acquérez des connaissances sur la machine virtuelle Ethereum et ses fonctionnalités",
        },
        href: "/ethereum/evm",
        tier: {
          en: "Expert",
          fr: "Expert",
        },
        sponsored: false,
        new: false,
        quizId: 15,
        available: false,
      },
    ],
  },
  {
    category: "Governance",
    courses: [
      {
        title: {
          en: "What are DAOs?",
          fr: "Qu'est-ce que les DAO?",
        },
        description: {
          en: "Discover the concept of Decentralized Autonomous Organizations",
          fr: "Découvrez le concept d'organisations autonomes décentralisées",
        },
        href: "/governance/what-are-daos",
        tier: {
          en: "Beginner",
          fr: "Débutant",
        },
        sponsored: false,
        new: false,
        quizId: 14,
        available: false,
      },
    ],
  },
];

export default lessons;
