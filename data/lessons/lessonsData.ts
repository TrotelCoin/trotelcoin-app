import { Lessons } from "@/types/courses/lessons";

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
          en: "Learn about TrotelCoin and its use cases.",
          fr: "Apprenez en plus sur TrotelCoin et ses cas d'utilisation.",
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
          fr: "Réclamez vos NFTs",
        },
        description: {
          en: "Learn how to claim your NFTs.",
          fr: "Apprenez à réclamer vos NFTs.",
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
      {
        title: {
          en: "Stake your TrotelCoins",
          fr: "Misez vos TrotelCoins",
        },
        description: {
          en: "Learn how to stake your TrotelCoins to earn more.",
          fr: "Apprenez comment stakez vos TrotelCoins pour gagner plus.",
        },
        href: "/trotelcoin/stake-your-trotelcoins",
        tier: {
          en: "Beginner",
          fr: "Débutant",
        },
        sponsored: false,
        new: false,
        quizId: 16,
        available: true,
      },
    ],
  },
  {
    category: "Wallet",
    courses: [
      {
        title: {
          en: "Your first wallet",
          fr: "Votre premier wallet",
        },
        description: {
          en: "Create your first wallet",
          fr: "Créez votre premier portefeuille",
        },
        href: "/wallet/create-your-first-wallet",
        tier: {
          en: "Beginner",
          fr: "Débutant",
        },
        sponsored: false,
        new: false,
        quizId: 3,
        available: true,
      },
      {
        title: {
          en: "Secure your wallet",
          fr: "Sécurisez votre wallet",
        },
        description: {
          en: "Learn how to secure your wallet.",
          fr: "Apprenez à sécuriser votre portefeuille.",
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
          en: "Web3 authentication",
          fr: "Authentification Web3",
        },
        description: {
          en: "Learn how to sign in with your wallet.",
          fr: "Apprenez à vous connecter avec votre portefeuille.",
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
          en: "Your first transaction",
          fr: "Votre première transaction",
        },
        description: {
          en: "Learn how to make your first transaction.",
          fr: "Apprenez à effectuer votre première transaction.",
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
          en: "Introduction to blockchains",
          fr: "Introduction aux blockchains",
        },
        description: {
          en: "Learn about the basics of blockchain technology.",
          fr: "Apprenez les bases de la technologie blockchain.",
        },
        href: "/blockchain/what-is-a-blockchain",
        tier: {
          en: "Beginner",
          fr: "Débutant",
        },
        sponsored: false,
        new: false,
        quizId: 7,
        available: true,
      },
      {
        title: {
          en: "Consensus mechanisms",
          fr: "Les mécanismes de consensus",
        },
        description: {
          en: "Learn about the different consensus mechanisms.",
          fr: "Apprenez les mécanismes de consensus.",
        },
        href: "/blockchain/consensus-mechanisms",
        tier: {
          en: "Intermediate",
          fr: "Intermédiaire",
        },
        sponsored: false,
        new: true,
        quizId: 8,
        available: true,
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
          en: "Learn about the basics of Bitcoin.",
          fr: "Apprenez les bases de Bitcoin.",
        },
        href: "/bitcoin/introduction-to-bitcoin",
        tier: {
          en: "Beginner",
          fr: "Débutant",
        },
        sponsored: false,
        new: false,
        quizId: 9,
        available: true,
      },
      {
        title: {
          en: "The history of Bitcoin",
          fr: "L'histoire de Bitcoin",
        },
        description: {
          en: "Learn about the history of Bitcoin.",
          fr: "Apprenez l'histoire de Bitcoin.",
        },
        href: "/bitcoin/the-history-of-bitcoin",
        tier: {
          en: "Beginner",
          fr: "Débutant",
        },
        sponsored: false,
        new: false,
        quizId: 10,
        available: true,
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
          en: "Learn about the basics of Ethereum.",
          fr: "Apprenez les bases d'Ethereum.",
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
          en: "The Layer 2s",
          fr: "Les Layer 2s",
        },
        description: {
          en: "Learn about the different layers 2.",
          fr: "Apprenez les différentes couches de niveau 2.",
        },
        href: "/ethereum/understand-the-layers-2",
        tier: {
          en: "Intermediate",
          fr: "Intermédiaire",
        },
        sponsored: false,
        new: true,
        quizId: 12,
        available: true,
      },
      {
        title: {
          en: "Smart contracts",
          fr: "Les contrats intelligents",
        },
        description: {
          en: "Learn about the basics of smart contracts.",
          fr: "Apprenez les bases des contrats intelligents.",
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
          fr: "La Machine Virtuelle d'Ethereum",
        },
        description: {
          en: "Learn about the basics of the Ethereum Virtual Machine.",
          fr: "Apprenez les bases de la machine virtuelle Ethereum.",
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
          en: "Introduction to DAOs",
          fr: "Introduction aux DAOs",
        },
        description: {
          en: "Learn about the basics of DAOs.",
          fr: "Apprenez les bases des DAOs.",
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
  {
    category: "Stablecoins",
    courses: [
      {
        title: {
          en: "Introduction to stablecoins",
          fr: "Introduction aux stablecoins",
        },
        description: {
          en: "Learn about the basics of stablecoins.",
          fr: "Apprenez les bases des stablecoins.",
        },
        href: "/stablecoins/introduction-to-stablecoins",
        tier: {
          en: "Beginner",
          fr: "Débutant",
        },
        sponsored: false,
        new: false,
        quizId: 17,
        available: true,
      },
    ],
  },
  {
    category: "Web3",
    courses: [
      {
        title: { en: "Web3 Essentials", fr: "Les bases du Web3" },
        description: {
          en: "Learn about the basics of Web3.",
          fr: "Apprenez les bases de Web3.",
        },
        href: "/web3/web3-essentials",
        tier: {
          en: "Beginner",
          fr: "Débutant",
        },
        sponsored: false,
        new: false,
        quizId: 18,
        available: true,
      },
    ],
  },
];

export default lessons;
