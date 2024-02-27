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
          fr: "Comprenez comment TrotelCoin va vous aider à apprendre les crypto.",
        },
        two: {
          en: "Learn about the TrotelCoin token and its use cases.",
          fr: "Apprenez en plus sur le token TrotelCoin et ses cas d'utilisation.",
        },
        three: {
          en: "Be able to claim your TrotelCoin tokens.",
          fr: "Soyiez capable de réclamer vos TrotelCoin.",
        },
        sponsored: false,
        new: false,
        quizId: 1,
        available: true,
      },
      {
        title: {
          en: "Claim your NFT",
          fr: "Récupérez vos NFT",
        },
        description: {
          en: "Learn how to claim your TrotelCoin's NFT",
          fr: "Apprenez comment réclamer vos NFTs TrotelCoin",
        },
        one: {
          en: "Understand the process of claiming TrotelCoin's NFTs.",
          fr: "Comprenez le processus de réclamation des NFTs de TrotelCoin.",
        },
        two: {
          en: "Discover the different types of NFTs that you can claim.",
          fr: "Découvrez les différents types de NFTs que vous pouvez réclamer.",
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
        available: true,
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
          en: "Learn how to create your first crypto wallet",
          fr: "Apprenez à créer votre premier portefeuille crypto",
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
          fr: "Apprenez à utiliser votre portefeuille pour stocker vos crypto.",
        },
        href: "/wallet/create-your-first-wallet",
        tier: {
          en: "Beginner",
          fr: "Débutant",
        },
        sponsored: false,
        new: true,
        quizId: 3,
        available: true,
      },
      {
        title: {
          en: "Secure your wallet",
          fr: "Sécurisez votre portefeuille",
        },
        description: {
          en: "Discover how to secure your wallet",
          fr: "Découvrez comment sécuriser votre portefeuille",
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
          fr: "Apprenez à utiliser votre portefeuille pour stocker de manière sécurisée vos crypto.",
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
          fr: "Connectez vous avec votre portefeuille",
        },
        description: {
          en: "Discover methods to sign in with your wallet securely",
          fr: "Découvrez des méthodes pour vous connecter avec votre portefeuille en toute sécurité",
        },
        one: {
          en: "Understand the advantages of signing in with your wallet.",
          fr: "Comprenez les avantages de vous connecter avec votre portefeuille.",
        },
        two: {
          en: "Discover the notion of decentralized identity.",
          fr: "Découvrez la notion d'identité décentralisée.",
        },
        three: {
          en: "Learn how to use your wallet to sign in yourself.",
          fr: "Apprenez à utiliser votre portefeuille pour vous connecter.",
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
          fr: "Effectuez votre première transaction",
        },
        description: {
          en: "Learn how to make your first crypto transaction",
          fr: "Apprenez comment effectuer votre première transaction crypto",
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
          en: "Understand the necessity of gas fees.",
          fr: "Comprenez la nécessité des frais de transaction.",
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
          fr: "Comprenez les concepts d'une blockchain",
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
          en: "Explore the various consensus mechanisms",
          fr: "Explorez les différents mécanismes de consensus",
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
          en: "Discover other consensus mechanisms.",
          fr: "Découvrez d'autres mécanismes de consensus.",
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
          fr: "Explorez les bases et les principes fondamentaux de Bitcoin",
        },
        one: {
          en: "Understand the basics of Bitcoin.",
          fr: "Comprenez les bases de Bitcoin.",
        },
        two: {
          en: "Understand why Bitcoin is fundamental for the society.",
          fr: "Comprenez pourquoi Bitcoin est fondamental pour la société.",
        },
        three: {
          en: "Discover the philosophy behind Bitcoin.",
          fr: "Découvrez la philosophie derrière Bitcoin.",
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
          fr: "Plongez dans l'évolution historique de Bitcoin",
        },
        one: {
          en: "Dive into the history of Bitcoin.",
          fr: "Plongez dans l'histoire de Bitcoin.",
        },
        two: {
          en: "Understand the different phases of Bitcoin.",
          fr: "Comprenez les différentes phases de Bitcoin.",
        },
        three: {
          en: "Discover about the different Bitcoin forks.",
          fr: "Découvrez les différents forks de Bitcoin.",
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
          en: "Discover why Ethereum is a revolution.",
          fr: "Découvrez en quoi Ethereum est une révolution.",
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
          fr: "Comprendrez les couches de niveau 2",
        },
        description: {
          en: "Understand why L2 are essential for Ethereum",
          fr: "Comprenez pourquoi les L2 sont essentiels pour Ethereum",
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
          fr: "Découvrez pourquoi les L2 sont essentiels pour Ethereum.",
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
          en: "Discover smart contracts and their applications",
          fr: "Découvrez les contrats intelligents et leurs applications",
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
          en: "Learn what's Ethereum's virtual machine",
          fr: "Apprenez ce qu'est la machine virtuelle Ethereum",
        },
        one: {
          en: "Understand the basics of the Ethereum Virtual Machine.",
          fr: "Comprenez les bases de la machine virtuelle Ethereum.",
        },
        two: {
          en: "Understand why the EVM is so important for Ethereum.",
          fr: "Comprenez pourquoi l'EVM est si important pour Ethereum.",
        },
        three: {
          en: "Discover Solidity, the programmation language of the EVM.",
          fr: "Découvrez Solidity, le langage de programmation de l'EVM.",
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
          en: "Explore use cases of DAOs.",
          fr: "Explorez des cas d'utilisation de DAO.",
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
