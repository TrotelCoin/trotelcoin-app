import { Lessons } from "@/types/courses/lessons";

const twoWeeksAgo = new Date();
twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);

export const lessons: Lessons[] = [
  {
    category: "TrotelCoin",
    categoryUrl: "trotelcoin",
    courses: [
      {
        title: {
          en: "Introduction to TrotelCoin: Decentralized Education",
          fr: "Introduction à TrotelCoin: l'Éducation Décentralisée"
        },
        description: {
          en: "Discover the fundamentals of TrotelCoin, an ecosystem focused on decentralized education.",
          fr: "Découvrez les fondamentaux de TrotelCoin, un écosystème axé sur l'éducation décentralisée."
        },
        href: "/trotelcoin/introduction-to-trotelcoin",
        tier: {
          en: "Beginner",
          fr: "Débutant"
        },
        date: new Date("2024-03-06"),
        sponsored: false,
        new: new Date("2024-03-06") > twoWeeksAgo,
        quizId: 1,
        available: true,
        cover: "/assets/courses/trotelcoin/introduction-to-trotelcoin.jpg"
      },
      {
        title: {
          en: "How to buy TrotelCoin NFTs?",
          fr: "Comment acheter les NFTs de TrotelCoin ?"
        },
        description: {
          en: "Learn how to become a premium member by buying TrotelCoin NFTs.",
          fr: "Apprenez comment devenir un membre premium en achetant les NFTs de TrotelCoin."
        },
        href: "/trotelcoin/buy-the-nfts",
        tier: {
          en: "Beginner",
          fr: "Débutant"
        },
        date: new Date("2024-03-06"),
        sponsored: false,
        new: new Date("2024-03-06") > twoWeeksAgo,
        quizId: 2,
        available: true,
        cover: "/assets/courses/trotelcoin/buy-the-nfts.jpg"
      },
      {
        title: {
          en: "How to stake your TROTEL ?",
          fr: "Comment staker vos TROTEL ?"
        },
        description: {
          en: "Learn how to stake your TROTEL to earn more rewards and get premium advantages.",
          fr: "Apprenez comment staker vos TROTEL pour gagner plus de récompenses et obtenir des avantages premium."
        },
        href: "/trotelcoin/stake-your-trotel",
        tier: {
          en: "Beginner",
          fr: "Débutant"
        },
        date: new Date("2024-03-06"),
        sponsored: false,
        new: new Date("2024-03-06") > twoWeeksAgo,
        quizId: 16,
        available: true,
        cover: "/assets/courses/trotelcoin/stake-your-trotel.jpg"
      },
      {
        title: {
          en: "What is Proof of Collective Intelligence?",
          fr: "Qu'est-ce que la Preuve d'Intelligence Collective ?"
        },
        description: {
          en: "Explore the concept of Proof of Collective Intelligence and its role in decentralized education.",
          fr: "Explorez le concept de Preuve d'Intelligence Collective et son rôle dans l'éducation décentralisée."
        },
        href: "/trotelcoin/proof-of-collective-intelligence",
        tier: {
          en: "Beginner",
          fr: "Débutant"
        },
        date: new Date("2024-06-10"),
        sponsored: false,
        new: new Date("2024-06-10") > twoWeeksAgo,
        quizId: 40,
        available: true,
        cover: "/assets/courses/trotelcoin/proof-of-collective-intelligence.jpg"
      }
    ]
  },
  {
    category: "Wallet",
    categoryUrl: "wallet",
    courses: [
      {
        title: {
          en: "How to create a crypto wallet?",
          fr: "Comment créer un portefeuille crypto ?"
        },
        description: {
          en: "A step-by-step guide to choose and set up your first crypto wallet.",
          fr: "Un guide étape par étape pour choisir et configurer votre premier portefeuille de cryptomonnaies."
        },
        href: "/wallet/create-your-first-wallet",
        tier: {
          en: "Beginner",
          fr: "Débutant"
        },
        date: new Date("2024-03-06"),
        sponsored: false,
        new: new Date("2024-03-06") > twoWeeksAgo,
        quizId: 3,
        available: true,
        cover: "/assets/courses/wallet/create-your-first-wallet.jpg"
      },
      {
        title: {
          en: "How to secure your crypto wallet?",
          fr: "Comment sécuriser votre portefeuille crypto ?"
        },
        description: {
          en: "Learn the best practices to secure your crypto wallet.",
          fr: "Apprenez les meilleures pratiques pour sécuriser votre portefeuille de cryptomonnaies."
        },
        href: "/wallet/secure-your-wallet",
        tier: {
          en: "Beginner",
          fr: "Débutant"
        },
        date: new Date("2024-04-17"),
        sponsored: false,
        new: new Date("2024-04-17") > twoWeeksAgo,
        quizId: 4,
        available: true,
        cover: "/assets/courses/wallet/secure-your-wallet.jpg"
      },
      {
        title: {
          en: "How to sign in with your wallet?",
          fr: "Comment se connecter avec votre portefeuille ?"
        },
        description: {
          en: "Discover how to use your wallet to sign in to Web3 dApps.",
          fr: "Découvrez comment utiliser votre portefeuille pour vous connecter à des dApps Web3."
        },
        href: "/wallet/sign-in-with-your-wallet",
        tier: {
          en: "Beginner",
          fr: "Débutant"
        },
        date: new Date("2024-04-16"),
        sponsored: false,
        new: new Date("2024-04-16") > twoWeeksAgo,
        quizId: 5,
        available: true,
        cover: "/assets/courses/wallet/sign-in-with-your-wallet.jpg"
      },
      {
        title: {
          en: "How to make a crypto transaction?",
          fr: "Comment faire une transaction crypto ?"
        },
        description: {
          en: "A guide to make your first cryptocurrency transaction efficiently and securely.",
          fr: "Un guide pour effectuer votre première transaction de cryptomonnaies de manière efficace et sécurisée."
        },
        href: "/wallet/make-your-first-transaction",
        tier: {
          en: "Beginner",
          fr: "Débutant"
        },
        date: new Date("2024-04-04"),
        sponsored: false,
        new: new Date("2024-04-04") > twoWeeksAgo,
        quizId: 6,
        available: true,
        cover: "/assets/courses/wallet/make-your-first-transaction.jpg"
      }
    ]
  },
  {
    category: "Blockchain",
    categoryUrl: "blockchain",
    courses: [
      {
        title: {
          en: "What is a blockchain and how does it work?",
          fr: "Qu'est-ce qu'une blockchain et comment ça marche ?"
        },
        description: {
          en: "Understand the basics of blockchain technology and how they work as decentralized databases.",
          fr: "Comprenez les bases de la technologie blockchain et comment elles fonctionnent en tant que bases de données décentralisées."
        },
        href: "/blockchain/what-is-a-blockchain",
        tier: {
          en: "Beginner",
          fr: "Débutant"
        },
        date: new Date("2024-03-09"),
        sponsored: false,
        new: new Date("2024-03-09") > twoWeeksAgo,
        quizId: 7,
        available: true,
        cover: "/assets/courses/blockchain/what-is-a-blockchain.jpg"
      },
      {
        title: {
          en: "What are blockchain consensus mechanisms?",
          fr: "Quels sont les mécanismes de consensus blockchain ?"
        },
        description: {
          en: "Learn about the protocols that secure blockchains through consensus mechanisms.",
          fr: "Découvrez les protocoles qui sécurisent les blockchains grâce aux mécanismes de consensus."
        },
        href: "/blockchain/consensus-mechanisms",
        tier: {
          en: "Intermediate",
          fr: "Intermédiaire"
        },
        date: new Date("2024-03-17"),
        sponsored: false,
        new: new Date("2024-03-17") > twoWeeksAgo,
        quizId: 8,
        available: true,
        cover: "/assets/courses/blockchain/consensus-mechanisms.jpg"
      },
      {
        title: {
          en: "Why blockchains are censorship-resistant?",
          fr: "Pourquoi les blockchains sont résistantes à la censure ?"
        },
        description: {
          en: "Explore how decentralized systems resist censorship compared to centralized ones.",
          fr: "Découvrez comment les systèmes décentralisés résistent à la censure par rapport aux systèmes centralisés."
        },
        href: "/blockchain/censorship-resistance",
        tier: {
          en: "Intermediate",
          fr: "Intermédiaire"
        },
        date: new Date("2024-04-18"),
        sponsored: false,
        new: new Date("2024-04-18") > twoWeeksAgo,
        quizId: 20,
        available: true,
        cover: "/assets/courses/blockchain/censorship-resistance.jpg"
      }
    ]
  },
  {
    category: "Bitcoin",
    categoryUrl: "bitcoin",
    courses: [
      {
        title: {
          en: "What is Bitcoin: an introduction to Bitcoin?",
          fr: "Qu'est-ce que Bitcoin : une introduction à Bitcoin ?"
        },
        description: {
          en: "Learn about Bitcoin, the first decentralized digital currency.",
          fr: "Découvrez Bitcoin, la première cryptomonnaie décentralisée."
        },
        href: "/bitcoin/introduction-to-bitcoin",
        tier: {
          en: "Beginner",
          fr: "Débutant"
        },
        date: new Date("2024-03-06"),
        sponsored: false,
        new: new Date("2024-03-06") > twoWeeksAgo,
        quizId: 9,
        available: true,
        cover: "/assets/courses/bitcoin/introduction-to-bitcoin.jpg"
      },
      {
        title: {
          en: "What is the history of Bitcoin?",
          fr: "Quelle est l'histoire de Bitcoin ?"
        },
        description: {
          en: "Discover the historical milestones of Bitcoin from its inception to the present.",
          fr: "Découvrez les moments historiques de Bitcoin de sa création à nos jours."
        },
        href: "/bitcoin/the-history-of-bitcoin",
        tier: {
          en: "Beginner",
          fr: "Débutant"
        },
        date: new Date("2024-03-11"),
        sponsored: false,
        new: new Date("2024-03-11") > twoWeeksAgo,
        quizId: 10,
        available: true,
        cover: "/assets/courses/bitcoin/the-history-of-bitcoin.jpg"
      },
      {
        title: {
          en: "What is the Bitcoin halving?",
          fr: "Qu'est-ce que le halving de Bitcoin ?"
        },
        description: {
          en: "Understand the significance of Bitcoin halving events and their impact on Bitcoin price.",
          fr: "Comprenez l'importance des événements de halving de Bitcoin et leur impact sur le prix de Bitcoin."
        },
        href: "/bitcoin/the-halving",
        tier: {
          en: "Beginner",
          fr: "Débutant"
        },
        date: new Date("2024-04-22"),
        sponsored: false,
        new: new Date("2024-04-22") > twoWeeksAgo,
        quizId: 22,
        available: true,
        cover: "/assets/courses/bitcoin/the-halving.jpg"
      },
      {
        title: {
          en: "What is the Lightning Network?",
          fr: "Qu'est-ce que le Lightning Network ?"
        },
        description: {
          en: "Explore how the Lightning Network enables faster and cheaper Bitcoin transactions.",
          fr: "Découvrez comment le Lightning Network permet des transactions Bitcoin plus rapides et moins chères."
        },
        href: "/bitcoin/lightning-network",
        tier: {
          en: "Beginner",
          fr: "Débutant"
        },
        date: new Date("2024-06-12"),
        sponsored: false,
        new: new Date("2024-06-12") > twoWeeksAgo,
        quizId: 41,
        available: true,
        cover: "/assets/courses/bitcoin/lightning-network.jpg"
      }
    ]
  },
  {
    category: "Ethereum",
    categoryUrl: "ethereum",
    courses: [
      {
        title: {
          en: "What is Ethereum and how does it work?",
          fr: "Qu'est-ce qu'Ethereum et comment ça marche ?"
        },
        description: {
          en: "Learn about Ethereum, the decentralized platform for smart contracts.",
          fr: "Découvrez Ethereum, la plateforme décentralisée pour les contrats intelligents."
        },
        href: "/ethereum/introduction-to-ethereum",
        tier: {
          en: "Beginner",
          fr: "Débutant"
        },
        date: new Date("2024-03-25"),
        sponsored: false,
        new: new Date("2024-03-25") > twoWeeksAgo,
        quizId: 11,
        available: true,
        cover: "/assets/courses/ethereum/introduction-to-ethereum.jpg"
      },
      {
        title: {
          en: "What are Layer 2 solutions?",
          fr: "Qu'est ce que sont les solutions Layer 2 ?"
        },
        description: {
          en: "Explore what are Layer 2 solutions that enhance Ethereum's scalability.",
          fr: "Découvrez ce que sont les solutions Layer 2 qui améliorent la scalabilité d'Ethereum."
        },
        href: "/ethereum/understand-the-layers-2",
        tier: {
          en: "Intermediate",
          fr: "Intermédiaire"
        },
        date: new Date("2024-03-19"),
        sponsored: false,
        new: new Date("2024-03-19") > twoWeeksAgo,
        quizId: 12,
        available: true,
        cover: "/assets/courses/ethereum/understand-the-layers-2.jpg"
      },
      {
        title: {
          en: "What are smart contracts?",
          fr: "Que sont les contrats intelligents ?"
        },
        description: {
          en: "Understand how smart contracts operate on the Ethereum blockchain.",
          fr: "Comprenez comment les contrats intelligents fonctionnent sur la blockchain Ethereum."
        },
        href: "/ethereum/smart-contracts",
        tier: {
          en: "Beginner",
          fr: "Débutant"
        },
        date: new Date("2024-03-29"),
        sponsored: false,
        new: new Date("2024-03-29") > twoWeeksAgo,
        quizId: 13,
        available: true,
        cover: "/assets/courses/ethereum/smart-contracts.jpg"
      },
      {
        title: {
          en: "What is the Ethereum Virtual Machine (EVM)?",
          fr: "Qu'est-ce que la Machine Virtuelle Ethereum (EVM) ?"
        },
        description: {
          en: "Discover the role of the Ethereum Virtual Machine in executing smart contracts.",
          fr: "Découvrez le rôle de la Machine Virtuelle Ethereum dans l'exécution des contrats intelligents."
        },
        href: "/ethereum/evm",
        tier: {
          en: "Expert",
          fr: "Expert"
        },
        date: new Date("2024-04-11"),
        sponsored: false,
        new: new Date("2024-04-11") > twoWeeksAgo,
        quizId: 15,
        available: true,
        cover: "/assets/courses/ethereum/evm.jpg"
      }
    ]
  },
  {
    category: "NFTs",
    categoryUrl: "nfts",
    courses: [
      {
        title: {
          en: "What are Non-Fungible Tokens (NFTs)?",
          fr: "Qu'est-ce que les jetons non fongibles (NFTs) ?"
        },
        description: {
          en: "Learn about NFTs, unique digital assets stored on the blockchain.",
          fr: "Découvrez les NFTs, des actifs numériques uniques stockés sur la blockchain."
        },
        href: "/nfts/introduction-to-nfts",
        tier: {
          en: "Beginner",
          fr: "Débutant"
        },
        date: new Date("2024-04-19"),
        sponsored: false,
        new: new Date("2024-04-19") > twoWeeksAgo,
        quizId: 21,
        available: true,
        cover: "/assets/courses/nfts/introduction-to-nfts.jpg"
      },
      {
        title: {
          en: "What are NFT price floors?",
          fr: "Qu'est-ce que les prix planchers des NFTs ?"
        },
        description: {
          en: "Understand the concept of price floors in the NFT market.",
          fr: "Comprenez le concept des prix planchers sur le marché des NFTs."
        },
        href: "/nfts/price-floor",
        tier: {
          en: "Beginner",
          fr: "Débutant"
        },
        date: new Date("2024-04-24"),
        sponsored: false,
        new: new Date("2024-04-24") > twoWeeksAgo,
        quizId: 23,
        available: true,
        cover: "/assets/courses/nfts/floor-price.jpg"
      },
      {
        title: {
          en: "What are Soulbound tokens?",
          fr: "Qu'est-ce que les jetons Soulbound ?"
        },
        description: {
          en: "Discover the unique features of soulbound tokens and their use cases.",
          fr: "Découvrez les caractéristiques uniques des jetons soulbound et leurs cas d'utilisation."
        },
        href: "/nfts/soulbound-tokens",
        tier: {
          en: "Beginner",
          fr: "Débutant"
        },
        date: new Date("2024-04-29"),
        sponsored: false,
        new: new Date("2024-04-29") > twoWeeksAgo,
        quizId: 24,
        available: true,
        cover: "/assets/courses/nfts/soulbound-tokens.jpg"
      }
    ]
  },
  {
    category: "Metaverse",
    categoryUrl: "metaverse",
    courses: [
      {
        title: {
          en: "What is the Metaverse: a virtual shared space?",
          fr: "Qu'est-ce que le Metaverse : un espace virtuel partagé ?"
        },
        description: {
          en: "Explore the concept of the Metaverse and its potential applications.",
          fr: "Explorez le concept du Metaverse et ses applications potentielles."
        },
        href: "/metaverse/the-metaverse",
        tier: {
          en: "Beginner",
          fr: "Débutant"
        },
        date: new Date("2024-05-29"),
        sponsored: false,
        new: new Date("2024-05-29") > twoWeeksAgo,
        quizId: 37,
        available: true,
        cover: "/assets/courses/metaverse/the-metaverse.jpg"
      }
    ]
  },
  {
    category: "Governance",
    categoryUrl: "governance",
    courses: [
      {
        title: {
          en: "What are Decentralized Autonomous Organizations (DAOs)?",
          fr: "Qu'est-ce que les Organisations Autonomes Décentralisées (DAOs) ?"
        },
        description: {
          en: "Learn how DAOs are reshaping organizational structures.",
          fr: "Découvrez comment les DAOs transforment les structures organisationnelles."
        },
        href: "/governance/what-are-daos",
        tier: {
          en: "Beginner",
          fr: "Débutant"
        },
        date: new Date("2024-04-08"),
        sponsored: false,
        new: new Date("2024-04-08") > twoWeeksAgo,
        quizId: 14,
        available: true,
        cover: "/assets/courses/governance/what-are-daos.jpg"
      },
      {
        title: {
          en: "What are the types of DAOs?",
          fr: "Quels sont les types de DAOs ?"
        },
        description: {
          en: "Explore the various forms and functions of Decentralized Autonomous Organizations.",
          fr: "Explorez les différentes formes et fonctions des Organisations Autonomes Décentralisées."
        },
        href: "/governance/types-of-daos",
        tier: {
          en: "Beginner",
          fr: "Débutant"
        },
        date: new Date("2024-05-01"),
        sponsored: false,
        new: new Date("2024-05-01") > twoWeeksAgo,
        quizId: 25,
        available: true,
        cover: "/assets/courses/governance/types-of-daos.jpg"
      },
      {
        title: {
          en: "What is the Snapshot protocol: a decentralized voting platform?",
          fr: "Qu'est-ce que le protocole Snapshot : une plateforme de vote décentralisée ?"
        },
        description: {
          en: "Understand how Snapshot enables decentralized voting within DAOs.",
          fr: "Comprenez comment Snapshot permet le vote décentralisé au sein des DAOs."
        },
        href: "/governance/snapshot-protocol",
        tier: {
          en: "Beginner",
          fr: "Débutant"
        },
        date: new Date("2024-05-22"),
        sponsored: false,
        new: new Date("2024-05-22") > twoWeeksAgo,
        quizId: 34,
        available: true,
        cover: "/assets/courses/governance/snapshot-protocol.jpg"
      }
    ]
  },
  {
    category: "Stablecoins",
    categoryUrl: "stablecoins",
    courses: [
      {
        title: {
          en: "What are stablecoins?",
          fr: "Qu'est-ce que les stablecoins ?"
        },
        description: {
          en: "Learn about stablecoins, cryptocurrencies designed to minimize volatility.",
          fr: "Découvrez les stablecoins, des cryptomonnaies conçues pour minimiser la volatilité."
        },
        href: "/stablecoins/introduction-to-stablecoins",
        tier: {
          en: "Beginner",
          fr: "Débutant"
        },
        date: new Date("2024-03-10"),
        sponsored: false,
        new: new Date("2024-03-10") > twoWeeksAgo,
        quizId: 17,
        available: true,
        cover: "/assets/courses/stablecoins/introduction-to-stablecoins.jpg"
      },
      {
        title: {
          en: "The Terra Luna crash explained",
          fr: "Le crash de Terra Luna expliqué"
        },
        description: {
          en: "Understand the events leading to the Terra Luna stablecoin crash.",
          fr: "Comprenez les événements ayant conduit au crash du stablecoin Terra Luna."
        },
        href: "/stablecoins/terra-luna-crash",
        tier: {
          en: "Beginner",
          fr: "Débutant"
        },
        date: new Date("2024-05-03"),
        sponsored: false,
        new: new Date("2024-05-03") > twoWeeksAgo,
        quizId: 26,
        available: true,
        cover: "/assets/courses/stablecoins/terra-luna-crash.jpg"
      },
      {
        title: {
          en: "How does USDC work?",
          fr: "Comment l'USDC fonctionne ?"
        },
        description: {
          en: "Learn about USDC, a stablecoin pegged to the US dollar.",
          fr: "Découvrez USDC, un stablecoin indexé sur le dollar américain."
        },
        href: "/stablecoins/usdc-by-circle",
        tier: {
          en: "Beginner",
          fr: "Débutant"
        },
        date: new Date("2024-05-20"),
        sponsored: false,
        new: new Date("2024-05-20") > twoWeeksAgo,
        quizId: 33,
        available: true,
        cover: "/assets/courses/stablecoins/usdc-by-circle.jpg"
      }
    ]
  },
  {
    category: "Web3",
    categoryUrl: "web3",
    courses: [
      {
        title: {
          en: "What is the Web3: the future of Internet?",
          fr: "Qu'est-ce que le Web3 : l'avenir d'Internet ?"
        },
        description: {
          en: "Learn about Web3, the next generation of the internet.",
          fr: "Découvrez le Web3, la prochaine génération d'Internet."
        },
        href: "/web3/web3-essentials",
        tier: {
          en: "Beginner",
          fr: "Débutant"
        },
        date: new Date("2024-03-14"),
        sponsored: false,
        new: new Date("2024-03-14") > twoWeeksAgo,
        quizId: 18,
        available: true,
        cover: "/assets/courses/web3/web3-essentials.jpg"
      },
      {
        title: {
          en: "What are airdrops and how to get free money?",
          fr: "Que sont les airdrops et comment obtenir de l'argent gratuit ?"
        },
        description: {
          en: "Understand how airdrops are used to distribute tokens to many wallets.",
          fr: "Comprenez comment les airdrops sont utilisés pour distribuer des jetons à de nombreux portefeuilles."
        },
        href: "/web3/airdrops",
        tier: {
          en: "Beginner",
          fr: "Débutant"
        },
        date: new Date("2024-05-10"),
        sponsored: false,
        new: new Date("2024-05-10") > twoWeeksAgo,
        quizId: 29,
        available: true,
        cover: "/assets/courses/web3/airdrops.jpg"
      },
      {
        title: {
          en: "What's Ethereum Name Service (ENS)?",
          fr: "Qu'est-ce que Ethereum Name Service (ENS) ?"
        },
        description: {
          en: "Learn about ENS, a decentralized domain name service.",
          fr: "Découvrez ENS, un service de nom de domaine décentralisé."
        },
        href: "/web3/ens",
        tier: {
          en: "Beginner",
          fr: "Débutant"
        },
        date: new Date("2024-05-13"),
        sponsored: false,
        new: new Date("2024-05-13") > twoWeeksAgo,
        quizId: 30,
        available: true,
        cover: "/assets/courses/web3/ens.jpg"
      },
      {
        title: {
          en: "What is IPFS: the backbone of the decentralized web?",
          fr: "Qu'est-ce que IPFS : la colonne vertébrale du web décentralisé ?"
        },
        description: {
          en: "Explore how the InterPlanetary File System (IPFS) supports the decentralized web.",
          fr: "Découvrez comment le système de fichiers interplanétaire (IPFS) soutient le web décentralisé."
        },
        href: "/web3/ipfs",
        tier: {
          en: "Intermediate",
          fr: "Intermédiaire"
        },
        date: new Date("2024-05-15"),
        sponsored: false,
        new: new Date("2024-05-15") > twoWeeksAgo,
        quizId: 31,
        available: true,
        cover: "/assets/courses/web3/ipfs.jpg"
      },
      {
        title: {
          en: "What are blockchain oracles?",
          fr: "Que sont les oracles blockchain ?"
        },
        description: {
          en: "Learn how oracles provide smart contracts with external information.",
          fr: "Découvrez comment les oracles fournissent des informations externes aux contrats intelligents."
        },
        href: "/web3/oracles",
        tier: {
          en: "Intermediate",
          fr: "Intermédiaire"
        },
        date: new Date("2024-05-31"),
        sponsored: false,
        new: new Date("2024-05-31") > twoWeeksAgo,
        quizId: 38,
        available: true,
        cover: "/assets/courses/web3/oracles.jpg"
      }
    ]
  },
  {
    category: "Trading",
    categoryUrl: "trading",
    courses: [
      {
        title: {
          en: "What is day trading and what are the strategies?",
          fr: "Qu'est-ce que le day trading et quelles sont les stratégies ?"
        },
        description: {
          en: "Learn about day trading, a style that involves opening and closing positions within the same day.",
          fr: "Découvrez le day trading, un style qui consiste à ouvrir et fermer des positions dans la même journée."
        },
        href: "/trading/day-trading",
        tier: {
          en: "Beginner",
          fr: "Débutant"
        },
        date: new Date("2024-04-15"),
        sponsored: false,
        new: new Date("2024-04-15") > twoWeeksAgo,
        quizId: 19,
        available: true,
        cover: "/assets/courses/trading/day-trading.jpg"
      },
      {
        title: {
          en: "5 cognitive biases to know for trading",
          fr: "5 biais cognitifs à connaître pour le trading"
        },
        description: {
          en: "Understand the main cognitive biases that can affect your trading decisions.",
          fr: "Comprenez les principaux biais cognitifs qui peuvent affecter vos décisions de trading."
        },
        href: "/trading/5-cognitive-biases",
        tier: {
          en: "Beginner",
          fr: "Débutant"
        },
        date: new Date("2024-05-06"),
        sponsored: false,
        new: new Date("2024-05-06") > twoWeeksAgo,
        quizId: 27,
        available: true,
        cover: "/assets/courses/trading/biaises.jpg"
      },
      {
        title: {
          en: "The 5 essential trading rules",
          fr: "Les 5 règles de trading essentielles"
        },
        description: {
          en: "Learn the five trading rules every trader should follow.",
          fr: "Apprenez les cinq règles de trading que tout trader devrait suivre."
        },
        href: "/trading/5-trading-rules",
        tier: {
          en: "Beginner",
          fr: "Débutant"
        },
        date: new Date("2024-05-17"),
        sponsored: false,
        new: new Date("2024-05-17") > twoWeeksAgo,
        quizId: 32,
        available: true,
        cover: "/assets/courses/trading/trading-rules.jpg"
      },
      {
        title: {
          en: "What are Futures Contracts?",
          fr: "Que sont les contrats à terme ?"
        },
        description: {
          en: "Learn about futures contracts, agreements to buy or sell an asset at a specific future date and price.",
          fr: "Découvrez les contrats à terme, des accords pour acheter ou vendre un actif à une date et un prix futurs spécifiques."
        },
        href: "/trading/futures-contracts",
        tier: {
          en: "Intermediate",
          fr: "Intermédiaire"
        },
        date: new Date("2024-06-03"),
        sponsored: false,
        new: new Date("2024-06-03") > twoWeeksAgo,
        quizId: 39,
        available: true,
        cover: "/assets/courses/trading/futures.jpg"
      }
    ]
  },
  {
    category: "Investing",
    categoryUrl: "investing",
    courses: [
      {
        title: {
          en: "What is Dollar Cost Averaging (DCA)?",
          fr: "Qu'est-ce que le Dollar Cost Averaging (DCA) ?"
        },
        description: {
          en: "Learn about DCA, a strategy that involves buying a fixed dollar amount of a particular investment on a regular schedule.",
          fr: "Découvrez le DCA, une stratégie qui consiste à acheter un montant fixe d'un investissement particulier à intervalles réguliers."
        },
        href: "/investing/dollar-cost-averaging",
        tier: {
          en: "Beginner",
          fr: "Débutant"
        },
        date: new Date("2024-05-08"),
        sponsored: false,
        new: new Date("2024-05-08") > twoWeeksAgo,
        quizId: 28,
        available: true,
        cover: "/assets/courses/investing/dca.jpg"
      },
      {
        title: {
          en: "What is fundamental analysis?",
          fr: "Qu'est-ce que l'analyse fondamentale ?"
        },
        description: {
          en: "Learn how to determine the intrinsic value of a company through fundamental analysis.",
          fr: "Apprenez à déterminer la valeur intrinsèque d'une entreprise grâce à l'analyse fondamentale."
        },
        href: "/investing/fundamental-analysis",
        tier: {
          en: "Beginner",
          fr: "Débutant"
        },
        date: new Date("2024-05-24"),
        sponsored: false,
        new: new Date("2024-05-24") > twoWeeksAgo,
        quizId: 35,
        available: true,
        cover: "/assets/courses/investing/fundamental-analysis.jpg"
      },
      {
        title: {
          en: "What is the difference between Bonds and Stocks?",
          fr: "Quelle est la différence entre les obligations et les actions ?"
        },
        description: {
          en: "Understand the key differences between bonds and stocks as main types of investments.",
          fr: "Comprenez les principales différences entre les obligations et les actions en tant que principaux types d'investissements."
        },
        href: "/investing/bonds-vs-stocks",
        tier: {
          en: "Beginner",
          fr: "Débutant"
        },
        date: new Date("2024-05-27"),
        sponsored: false,
        new: new Date("2024-05-27") > twoWeeksAgo,
        quizId: 36,
        available: true,
        cover: "/assets/courses/investing/bonds-vs-stocks.jpg"
      }
    ]
  },
  {
    category: "BIM Finance",
    categoryUrl: "bim-finance",
    logo: "/assets/sponsors/bim-finance/bim-finance-logo.png",
    courses: [
      {
        title: {
          en: "What is BIM Finance?",
          fr: "Qu'est-ce que BIM Finance ?"
        },
        description: {
          en: "With BIM Finance, enjoy a complete and secure ecosystem to buy, sell, swap, bridge and stake your cryptocurrencies from a single interface.",
          fr: "Avec BIM Finance, profitez d'un écosystème complet et sécurisé pour acheter, vendre, échanger, pontifier et staker vos cryptomonnaies depuis une seule interface."
        },
        href: "/bim-finance/what-is-bim-finance",
        tier: {
          en: "Beginner",
          fr: "Débutant"
        },
        date: new Date("2024-06-14"),
        sponsored: true,
        new: new Date("2024-06-14") > twoWeeksAgo,
        quizId: 42,
        available: true,
        cover: "/assets/courses/bim-finance/what-is-bim-finance.jpg"
      }
    ]
  }
];

export default lessons;
