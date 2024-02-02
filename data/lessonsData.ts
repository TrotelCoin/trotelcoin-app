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
          en: "Discover what's TrotelCoin",
          fr: "Découvrez TrotelCoin",
        },
        href: "/trotelcoin/introduction-to-trotelcoin",
        tier: {
          en: "Beginner",
          fr: "Débutant",
        },
        one: {
          en: "Understand how TrotelCoin helps you in your crypto learning journey.",
          fr: "Comprends comment TrotelCoin va t'aider à apprendre les crypto.",
        },
        two: {
          en: "Learn about the TrotelCoin token and its use cases.",
          fr: "Apprends en plus sur le token TrotelCoin et ses cas d'utilisation.",
        },
        three: {
          en: "Be able to claim your TrotelCoin tokens.",
          fr: "Sois capable de réclamer tes TrotelCoin.",
        },
        sponsored: false,
        new: true,
        quizId: 1,
        available: true,
      },
      {
        title: {
          en: "Claim your NFTs",
          fr: "Revendique tes NFTs",
        },
        description: {
          en: "Understand the process of claiming TrotelCoin's NFTs and their utilization",
          fr: "Comprends le processus de réclamation des NFT de TrotelCoin et leur utilisation",
        },
        one: {
          en: "Understand the process of claiming TrotelCoin's NFTs.",
          fr: "Comprends le processus de réclamation des NFT de TrotelCoin.",
        },
        two: {
          en: "Discover the different types of NFTs that you can claim.",
          fr: "Découvre les différents types de NFT que tu peux réclamer.",
        },
        three: {
          en: "Learn how to use your NFTs to access exclusive content.",
          fr: "Apprends à utiliser tes NFTs pour accéder à du contenu exclusif.",
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
          fr: "Crée ton premier portefeuille",
        },
        description: {
          en: "Learn the steps involved in creating your initial digital wallet securely",
          fr: "Apprends les étapes de création de ton premier portefeuille crypto en toute sécurité",
        },
        one: {
          en: "Learn about the different types of wallets and their use cases.",
          fr: "Découvre les différents types de portefeuilles et leurs cas d'utilisation.",
        },
        two: {
          en: "Understand the process of creating your first wallet.",
          fr: "Comprends le processus de création de ton premier portefeuille.",
        },
        three: {
          en: "Learn how to use your wallet to store your cryptocurrencies.",
          fr: "Apprends à utiliser ton portefeuille pour stocker tes crypto.",
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
          fr: "Sécurise ton portefeuille",
        },
        description: {
          en: "Discover methods to secure your wallet",
          fr: "Découvre des méthodes pour sécuriser ton portefeuille",
        },
        one: {
          en: "Understand the importance of securing your wallet.",
          fr: "Comprends l'importance de sécuriser ton portefeuille.",
        },
        two: {
          en: "Learn about the different methods to secure your wallet.",
          fr: "Découvre les différentes méthodes pour sécuriser ton portefeuille.",
        },
        three: {
          en: "Learn how to use your wallet to store safely your cryptocurrencies.",
          fr: "Apprends à utiliser ton portefeuille pour stocker de manière sécurisée tes crypto.",
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
          en: "Sign in with your wallet",
          fr: "Connecte toi avec ton portefeuille",
        },
        description: {
          en: "Discover methods to authenticate and access your wallet securely",
          fr: "Découvre des méthodes pour te connecter et accéder à ton portefeuille en toute sécurité",
        },
        one: {
          en: "Understand the advantages of signing in with your wallet.",
          fr: "Comprends les avantages de te connecter avec votre portefeuille.",
        },
        two: {
          en: "Discover the notion of decentralized identity.",
          fr: "Découvre la notion d'identité décentralisée.",
        },
        three: {
          en: "Learn how to use your wallet to sign in yourself.",
          fr: "Apprends à utiliser ton portefeuille pour te connecter.",
        },
        href: "/wallet/sign-in-with-your-wallet",
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
          fr: "Effectue ta première transaction",
        },
        description: {
          en: "Learn how to make your first digital transaction",
          fr: "Apprends comment effectuer ta première transaction numérique",
        },
        one: {
          en: "Learn to make your first transaction.",
          fr: "Apprends à effectuer ta première transaction.",
        },
        two: {
          en: "Understand the different types of transactions.",
          fr: "Comprends les différents types de transactions.",
        },
        three: {
          en: "Understand the necessity of gas fees.",
          fr: "Comprends la nécessité des frais de transaction.",
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
          en: "Understand the concepts of a blockchain",
          fr: "Comprends les concepts d'une blockchain",
        },
        one: {
          en: "Understand the basics of blockchain technology.",
          fr: "Comprends les bases de la technologie blockchain.",
        },
        two: {
          en: "Learn about the different types of blockchains.",
          fr: "Découvre les différents types de blockchains.",
        },
        three: {
          en: "Learn about the different components of a blockchain.",
          fr: "Découvre les différents composants d'une blockchain.",
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
          en: "Explore the various consensus mechanisms",
          fr: "Explore les différents mécanismes de consensus",
        },
        one: {
          en: "Understand the importance of consensus mechanisms.",
          fr: "Comprends l'importance des mécanismes de consensus.",
        },
        two: {
          en: "Learn about the different types of consensus mechanisms.",
          fr: "Découvre les différents types de mécanismes de consensus.",
        },
        three: {
          en: "Discover other consensus mechanisms.",
          fr: "Découvre d'autres mécanismes de consensus.",
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
          en: "Explore the basics and core principles of Bitcoin",
          fr: "Explore les bases et les principes fondamentaux de Bitcoin",
        },
        one: {
          en: "Understand the basics of Bitcoin.",
          fr: "Comprends les bases de Bitcoin.",
        },
        two: {
          en: "Understand why Bitcoin is fundamental for the society.",
          fr: "Comprends pourquoi Bitcoin est fondamental pour la société.",
        },
        three: {
          en: "Discover the philosophy behind Bitcoin.",
          fr: "Découvre la philosophie derrière Bitcoin.",
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
          en: "Dive into the historical evolution of Bitcoin",
          fr: "Plonge dans l'évolution historique de Bitcoin",
        },
        one: {
          en: "Dive into the history of Bitcoin.",
          fr: "Plonge dans l'histoire de Bitcoin.",
        },
        two: {
          en: "Understand the different phases of Bitcoin.",
          fr: "Comprends les différentes phases de Bitcoin.",
        },
        three: {
          en: "Discover about the different Bitcoin forks.",
          fr: "Découvre les différents forks de Bitcoin.",
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
          fr: "Explore les bases et les principes fondamentaux de la blockchain Ethereum",
        },
        one: {
          en: "Understand the basics of Ethereum.",
          fr: "Comprends les bases d'Ethereum.",
        },
        two: {
          en: "Discover why Ethereum is a revolution.",
          fr: "Découvre en quoi Ethereum est une révolution.",
        },
        three: {
          en: "Understand why we talk about a giant computer.",
          fr: "Comprends pourquoi on parle d'un ordinateur géant.",
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
          en: "Explore the other blockchains of Ethereum's ecosystem",
          fr: "Explore les autres blockchains de l'écosystème d'Ethereum",
        },
        one: {
          en: "Understand the different layers of Ethereum.",
          fr: "Comprends les différentes couches d'Ethereum.",
        },
        two: {
          en: "Discover the different types of layers.",
          fr: "Découvre les différents types de couches.",
        },
        three: {
          en: "Discover why L2 are essential for Ethereum.",
          fr: "Découvre pourquoi les L2 sont essentiels pour Ethereum.",
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
          fr: "Découvre les contrats intelligents d'Ethereum et leurs applications innovantes",
        },
        one: {
          en: "Understand the basics of smart contracts.",
          fr: "Comprends les bases des contrats intelligents.",
        },
        two: {
          en: "Learn why smart contracts are so important.",
          fr: "Apprends pourquoi les contrats intelligents sont si importants.",
        },
        three: {
          en: "Discover some real use cases of smart contracts.",
          fr: "Découvre quelques cas d'utilisation réels des contrats intelligents.",
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
          fr: "Gagne des connaissances sur la machine virtuelle Ethereum et ses fonctionnalités",
        },
        one: {
          en: "Understand the basics of the Ethereum Virtual Machine.",
          fr: "Comprends les bases de la machine virtuelle Ethereum.",
        },
        two: {
          en: "Understand why the EVM is so important for Ethereum.",
          fr: "Comprends pourquoi l'EVM est si important pour Ethereum.",
        },
        three: {
          en: "Discover Solidity, the programmation language of the EVM.",
          fr: "Découvre Solidity, le langage de programmation de l'EVM.",
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
          fr: "Découvre le concept d'organisations autonomes décentralisées",
        },
        one: {
          en: "Understand the basics of DAOs.",
          fr: "Comprends les bases des DAO.",
        },
        two: {
          en: "Learn about the different types of DAOs.",
          fr: "Découvre les différents types de DAO.",
        },
        three: {
          en: "Explore use cases of DAOs.",
          fr: "Explore des cas d'utilisation de DAO.",
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
