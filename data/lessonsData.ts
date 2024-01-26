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
        one: {
          en: "Understand how TrotelCoin works and how it will help you to learn about crypto.",
          fr: "Comprennez comment TrotelCoin fonctionne et comment il vous aidera à apprendre la crypto.",
        },
        two: {
          en: "Learn about the TrotelCoin token and its use cases.",
          fr: "Apprenez-en plus sur le token TrotelCoin et ses cas d'utilisation.",
        },
        three: {
          en: "Be able to claim your TrotelCoin tokens.",
          fr: "Soyez capable de réclamer vos tokens TrotelCoin.",
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
        one: {
          en: "Understand the process of claiming TrotelCoin's NFTs.",
          fr: "Comprenez le processus de réclamation des NFT de TrotelCoin.",
        },
        two: {
          en: "Discover the different types of NFTs that you can claim.",
          fr: "Découvrez les différents types de NFT que vous pouvez réclamer.",
        },
        three: {
          en: "Learn how to use your NFTs to access exclusive content.",
          fr: "Apprenez à utiliser vos NFTs pour accéder à du contenu exclusif.",
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
        one: {
          en: "Learn about the different types of wallets and their use cases.",
          fr: "Découvrez les différents types de portefeuilles et leurs cas d'utilisation.",
        },
        two: {
          en: "Understand the process of creating your first wallet.",
          fr: "Comprenez le processus de création de votre premier portefeuille.",
        },
        three: {
          en: "Learn how to use your wallet to store your cryptocurrencies.",
          fr: "Apprenez à utiliser votre portefeuille pour stocker vos crypto-monnaies.",
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
        one: {
          en: "Understand the importance of securing your wallet.",
          fr: "Comprenez l'importance de sécuriser votre portefeuille.",
        },
        two: {
          en: "Learn about the different methods to secure your wallet.",
          fr: "Découvrez les différentes méthodes pour sécuriser votre portefeuille.",
        },
        three: {
          en: "Learn how to use your wallet to store safely your cryptocurrencies.",
          fr: "Apprenez à utiliser votre portefeuille pour stocker de manière sécurisée vos crypto-monnaies.",
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
        one: {
          en: "Understand the importance of authenticating with your wallet.",
          fr: "Comprenez l'importance de vous authentifier avec votre portefeuille.",
        },
        two: {
          en: "Discover the notion of decentralized identity.",
          fr: "Découvrez la notion d'identité décentralisée.",
        },
        three: {
          en: "Learn how to use your wallet to authenticate yourself.",
          fr: "Apprenez à utiliser votre portefeuille pour vous authentifier.",
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
        one: {
          en: "Learn to make your first transaction.",
          fr: "Apprenez à effectuer votre première transaction.",
        },
        two: {
          en: "Understand the different types of transactions.",
          fr: "Comprenez les différents types de transactions.",
        },
        three: {
          en: "Understand the importance of transaction fees.",
          fr: "Comprenez l'importance des frais de transaction.",
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
        one: {
          en: "Understand the basics of blockchain technology.",
          fr: "Comprenez les bases de la technologie blockchain.",
        },
        two: {
          en: "Learn about the different types of blockchains.",
          fr: "Découvrez les différents types de blockchains.",
        },
        three: {
          en: "Learn about the different components of a blockchain.",
          fr: "Découvrez les différents composants d'une blockchain.",
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
        one: {
          en: "Understand the importance of consensus mechanisms.",
          fr: "Comprenez l'importance des mécanismes de consensus.",
        },
        two: {
          en: "Learn about the different types of consensus mechanisms.",
          fr: "Découvrez les différents types de mécanismes de consensus.",
        },
        three: {
          en: "Discover some exotics consensus mechanisms.",
          fr: "Découvrez quelques mécanismes de consensus exotiques.",
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
        one: {
          en: "Understand the basics of Bitcoin.",
          fr: "Comprenez les bases de Bitcoin.",
        },
        two: {
          en: "Discover why Bitcoin is so important.",
          fr: "Découvrez pourquoi Bitcoin est si important.",
        },
        three: {
          en: "Learn about the philosophy behind Bitcoin.",
          fr: "Apprenez la philosophie derrière Bitcoin.",
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
        one: {
          en: "Understand the history of Bitcoin.",
          fr: "Comprenez l'histoire de Bitcoin.",
        },
        two: {
          en: "Discover the different phases of Bitcoin.",
          fr: "Découvrez les différentes phases de Bitcoin.",
        },
        three: {
          en: "Learn about the different Bitcoin forks.",
          fr: "Apprenez les différents forks de Bitcoin.",
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
        one: {
          en: "Understand the basics of Ethereum.",
          fr: "Comprenez les bases d'Ethereum.",
        },
        two: {
          en: "Discover why Ethereum is so important.",
          fr: "Découvrez pourquoi Ethereum est si important.",
        },
        three: {
          en: "Understand why we talk about a giant computer.",
          fr: "Comprenez pourquoi on parle d'un ordinateur géant.",
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
        one: {
          en: "Understand the different layers of Ethereum.",
          fr: "Comprenez les différentes couches d'Ethereum.",
        },
        two: {
          en: "Discover the different types of layers.",
          fr: "Découvrez les différents types de couches.",
        },
        three: {
          en: "Discover why L2 are essential for Ethereum.",
          fr: "Découvrez pourquoi L2 sont essentiels pour Ethereum.",
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
        one: {
          en: "Understand the basics of smart contracts.",
          fr: "Comprenez les bases des contrats intelligents.",
        },
        two: {
          en: "Learn why smart contracts are so important.",
          fr: "Apprenez pourquoi les contrats intelligents sont si importants.",
        },
        three: {
          en: "Discover some real use cases of smart contracts.",
          fr: "Découvrez quelques cas d'utilisation réels des contrats intelligents.",
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
        one: {
          en: "Understand the basics of the Ethereum Virtual Machine.",
          fr: "Comprenez les bases de la machine virtuelle Ethereum.",
        },
        two: {
          en: "Learn why the EVM is so important for Ethereum.",
          fr: "Apprenez pourquoi l'EVM est si important pour Ethereum.",
        },
        three: {
          en: "Discover Solidity, the main language of the EVM.",
          fr: "Découvrez Solidity, le langage principal de l'EVM.",
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
        one: {
          en: "Understand the basics of DAOs.",
          fr: "Comprenez les bases des DAO.",
        },
        two: {
          en: "Learn about the different types of DAOs.",
          fr: "Découvrez les différents types de DAO.",
        },
        three: {
          en: "Discover real use cases of DAOs.",
          fr: "Découvrez de vrais cas d'utilisation de DAO.",
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
