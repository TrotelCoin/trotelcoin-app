import { Lessons } from "@/types/courses/lessons";

const twoWeeksAgo = new Date();
twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);

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
          en: "TrotelCoin is an ecosystem focusing on decentralized education.",
          fr: "TrotelCoin est un écosystème qui se concentre sur l'éducation décentralisée.",
        },
        href: "/trotelcoin/introduction-to-trotelcoin",
        tier: {
          en: "Beginner",
          fr: "Débutant",
        },
        date: new Date("2024-03-06"),
        sponsored: false,
        new: new Date("2024-03-06") > twoWeeksAgo,
        quizId: 1,
        available: true,
        cover: "/assets/courses/trotelcoin/introduction-to-trotelcoin.jpg",
      },
      {
        title: {
          en: "Buy the NFTs",
          fr: "Achetez les NFTs",
        },
        description: {
          en: "Become premium by buying the TrotelCoin NFTs.",
          fr: "Devenez premium en achetant les NFTs de TrotelCoin.",
        },
        href: "/trotelcoin/buy-the-nfts",
        tier: {
          en: "Beginner",
          fr: "Débutant",
        },
        date: new Date("2024-03-06"),
        sponsored: false,
        new: new Date("2024-03-06") > twoWeeksAgo,
        quizId: 2,
        available: true,
        cover: "/assets/courses/trotelcoin/buy-the-nfts.jpg",
      },
      {
        title: {
          en: "Stake your TROTEL",
          fr: "Misez vos TROTEL",
        },
        description: {
          en: "Stake your TROTEL to earn more and help the ecosystem grow.",
          fr: "Misez vos TROTEL pour en gagner davantage et aider l'écosystème à croître.",
        },
        href: "/trotelcoin/stake-your-trotel",
        tier: {
          en: "Beginner",
          fr: "Débutant",
        },
        date: new Date("2024-03-06"),
        sponsored: false,
        new: new Date("2024-03-06") > twoWeeksAgo,
        quizId: 16,
        available: true,
        cover: "/assets/courses/trotelcoin/stake-your-trotel.jpg",
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
          en: "Choose your first wallet and create it.",
          fr: "Choisissez votre premier portefeuille et créez-le.",
        },
        href: "/wallet/create-your-first-wallet",
        tier: {
          en: "Beginner",
          fr: "Débutant",
        },
        date: new Date("2024-03-06"),
        sponsored: false,
        new: new Date("2024-03-06") > twoWeeksAgo,
        quizId: 3,
        available: true,
        cover: "/assets/courses/wallet/create-your-first-wallet.jpg",
      },
      {
        title: {
          en: "Secure your wallet",
          fr: "Sécurisez votre wallet",
        },
        description: {
          en: "Secure your wallet with best practices.",
          fr: "Sécurisez votre portefeuille avec les meilleures pratiques.",
        },
        href: "/wallet/secure-your-wallet",
        tier: {
          en: "Beginner",
          fr: "Débutant",
        },
        date: new Date("2024-04-17"),
        sponsored: false,
        new: new Date("2024-04-17") > twoWeeksAgo,
        quizId: 4,
        available: true,
        cover: "/assets/courses/wallet/secure-your-wallet.jpg",
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
        date: new Date("2024-04-16"),
        sponsored: false,
        new: new Date("2024-04-16") > twoWeeksAgo,
        quizId: 5,
        available: true,
        cover: "/assets/courses/wallet/sign-in-with-your-wallet.jpg",
      },
      {
        title: {
          en: "Your first transaction",
          fr: "Votre première transaction",
        },
        description: {
          en: "Learn how to make your first transaction.",
          fr: "Apprenez à faire votre première transaction.",
        },
        href: "/wallet/make-your-first-transaction",
        tier: {
          en: "Beginner",
          fr: "Débutant",
        },
        date: new Date("2024-04-04"),
        sponsored: false,
        new: new Date("2024-04-04") > twoWeeksAgo,
        quizId: 6,
        available: true,
        cover: "/assets/courses/wallet/make-your-first-transaction.jpg",
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
          en: "Blockchains are decentralized databases.",
          fr: "Les blockchains sont des bases de données décentralisées.",
        },
        href: "/blockchain/what-is-a-blockchain",
        tier: {
          en: "Beginner",
          fr: "Débutant",
        },
        date: new Date("2024-03-09"),
        sponsored: false,
        new: new Date("2024-03-09") > twoWeeksAgo,
        quizId: 7,
        available: true,
        cover: "/assets/courses/blockchain/what-is-a-blockchain.jpg",
      },
      {
        title: {
          en: "Consensus mechanisms",
          fr: "Les mécanismes de consensus",
        },
        description: {
          en: "Consensus mechanisms are the protocols that secure the blockchain.",
          fr: "Les mécanismes de consensus sont les protocoles qui sécurisent la blockchain.",
        },
        href: "/blockchain/consensus-mechanisms",
        tier: {
          en: "Intermediate",
          fr: "Intermédiaire",
        },
        date: new Date("2024-03-17"),
        sponsored: false,
        new: new Date("2024-03-17") > twoWeeksAgo,
        quizId: 8,
        available: true,
        cover: "/assets/courses/blockchain/consensus-mechanisms.jpg",
      },
      {
        title: {
          en: "Censorship resistance",
          fr: "Résistance à la censure",
        },
        description: {
          en: "Centralized systems can be censored, but decentralized systems are resistant to censorship.",
          fr: "Les systèmes centralisés peuvent être censurés, mais les systèmes décentralisés sont résistants à la censure.",
        },
        href: "/blockchain/censorship-resistance",
        tier: {
          en: "Intermediate",
          fr: "Intermédiaire",
        },
        date: new Date("2024-04-18"),
        sponsored: false,
        new: new Date("2024-04-18") > twoWeeksAgo,
        quizId: 20,
        available: true,
        cover: "/assets/courses/blockchain/censorship-resistance.jpg",
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
          en: "Bitcoin is a decentralized digital currency.",
          fr: "Bitcoin est une monnaie numérique décentralisée.",
        },
        href: "/bitcoin/introduction-to-bitcoin",
        tier: {
          en: "Beginner",
          fr: "Débutant",
        },
        date: new Date("2024-03-06"),
        sponsored: false,
        new: new Date("2024-03-06") > twoWeeksAgo,
        quizId: 9,
        available: true,
      },
      {
        title: {
          en: "The history of Bitcoin",
          fr: "L'histoire de Bitcoin",
        },
        description: {
          en: "Bitcoin history from its creation to today.",
          fr: "L'histoire de Bitcoin de sa création à aujourd'hui.",
        },
        href: "/bitcoin/the-history-of-bitcoin",
        tier: {
          en: "Beginner",
          fr: "Débutant",
        },
        date: new Date("2024-03-11"),
        sponsored: false,
        new: new Date("2024-03-11") > twoWeeksAgo,
        quizId: 10,
        available: true,
      },
      {
        title: {
          en: "The halving",
          fr: "Le halving",
        },
        description: {
          en: "Bitcoin halving is an event that occurs every 210,000 blocks and generally results in a price increase.",
          fr: "Le halving de Bitcoin est un événement qui se produit tous les 210 000 blocs et entraîne généralement une augmentation du prix.",
        },
        href: "/bitcoin/the-halving",
        tier: {
          en: "Beginner",
          fr: "Débutant",
        },
        date: new Date("2024-04-22"),
        sponsored: false,
        new: new Date("2024-04-22") > twoWeeksAgo,
        quizId: 22,
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
          en: "Ethereum is a decentralized platform that runs smart contracts.",
          fr: "Ethereum est une plateforme décentralisée qui exécute des contrats intelligents.",
        },
        href: "/ethereum/introduction-to-ethereum",
        tier: {
          en: "Beginner",
          fr: "Débutant",
        },
        date: new Date("2024-03-25"),
        sponsored: false,
        new: new Date("2024-03-25") > twoWeeksAgo,
        quizId: 11,
        available: true,
      },
      {
        title: {
          en: "The Layer 2s",
          fr: "Les Layer 2s",
        },
        description: {
          en: "Layers 2s are solutions that help Ethereum scale.",
          fr: "Les Layer 2s sont des solutions qui aident Ethereum à scaler.",
        },
        href: "/ethereum/understand-the-layers-2",
        tier: {
          en: "Intermediate",
          fr: "Intermédiaire",
        },
        date: new Date("2024-03-19"),
        sponsored: false,
        new: new Date("2024-03-19") > twoWeeksAgo,
        quizId: 12,
        available: true,
      },
      {
        title: {
          en: "Smart Contracts",
          fr: "Les Contrats Intelligents",
        },
        description: {
          en: "Smart contracts allow code to be run on the Ethereum blockchain.",
          fr: "Les contrats intelligents permettent d'exécuter du code sur la blockchain Ethereum.",
        },
        href: "/ethereum/smart-contracts",
        tier: {
          en: "Beginner",
          fr: "Débutant",
        },
        date: new Date("2024-03-29"),
        sponsored: false,
        new: new Date("2024-03-29") > twoWeeksAgo,
        quizId: 13,
        available: true,
      },
      {
        title: {
          en: "Ethereum Virtual Machine",
          fr: "La Machine Virtuelle d'Ethereum",
        },
        description: {
          en: "Ethereum Virtual Machine is the runtime environment for smart contracts in Ethereum.",
          fr: "La Machine Virtuelle d'Ethereum est l'environnement d'exécution des contrats intelligents dans Ethereum.",
        },
        href: "/ethereum/evm",
        tier: {
          en: "Expert",
          fr: "Expert",
        },
        date: new Date("2024-04-11"),
        sponsored: false,
        new: new Date("2024-04-11") > twoWeeksAgo,
        quizId: 15,
        available: true,
      },
    ],
  },
  {
    category: "NFTs",
    courses: [
      {
        title: {
          en: "NFTs - Non-Fungible Tokens",
          fr: "NFTs - Les Tokens Non Fongibles",
        },
        description: {
          en: "NFTs are unique digital assets that are stored on the blockchain.",
          fr: "Les NFTs sont des actifs numériques uniques qui sont stockés sur la blockchain.",
        },
        href: "/nfts/introduction-to-nfts",
        tier: {
          en: "Beginner",
          fr: "Débutant",
        },
        date: new Date("2024-04-19"),
        sponsored: false,
        new: new Date("2024-04-19") > twoWeeksAgo,
        quizId: 21,
        available: true,
      },
      {
        title: {
          en: "Price floor",
          fr: "Le prix plancher",
        },
        description: {
          en: "The price floor is the minimum price at which an NFT can be sold.",
          fr: "Le prix plancher est le prix minimum auquel un NFT peut être vendu.",
        },
        href: "/nfts/price-floor",
        tier: {
          en: "Beginner",
          fr: "Débutant",
        },
        date: new Date("2024-04-24"),
        sponsored: false,
        new: new Date("2024-04-24") > twoWeeksAgo,
        quizId: 23,
        available: true,
      },
      {
        title: {
          en: "Soulbound tokens",
          fr: "Les jetons soulbound",
        },
        description: {
          en: "Soulbound tokens are NFTs that are linked to a specific wallet and can't be transferred.",
          fr: "Les jetons soulbound sont des NFTs liés à un portefeuille spécifique et ne peuvent pas être transférés.",
        },
        href: "/nfts/soulbound-tokens",
        tier: {
          en: "Beginner",
          fr: "Débutant",
        },
        date: new Date("2024-04-29"),
        sponsored: false,
        new: new Date("2024-04-29") > twoWeeksAgo,
        quizId: 24,
        available: true,
      },
    ],
  },
  {
    category: "Metaverse",
    courses: [
      {
        title: {
          en: "The Metaverse",
          fr: "Le Metaverse",
        },
        description: {
          en: "The Metaverse is a collective virtual shared space.",
          fr: "Le Metaverse est un espace virtuel partagé collectif.",
        },
        href: "/metaverse/the-metaverse",
        tier: {
          en: "Beginner",
          fr: "Débutant",
        },
        date: new Date("2024-05-29"),
        sponsored: false,
        new: new Date("2024-05-29") > twoWeeksAgo,
        quizId: 37,
        available: true,
      },
    ],
  },
  {
    category: "Governance",
    courses: [
      {
        title: {
          en: "DAOs - Decentralized Autonomous Organizations",
          fr: "DAOs - Les Organisations Autonomes Décentralisées",
        },
        description: {
          en: "Decentralized Autonomous Organizations are a new way to build organizations.",
          fr: "Les Organisations Autonomes Décentralisées sont une nouvelle façon de construire des organisations.",
        },
        href: "/governance/what-are-daos",
        tier: {
          en: "Beginner",
          fr: "Débutant",
        },
        date: new Date("2024-04-08"),
        sponsored: false,
        new: new Date("2024-04-08") > twoWeeksAgo,
        quizId: 14,
        available: true,
      },
      {
        title: {
          en: "Types of DAOs",
          fr: "Les types de DAOs",
        },
        description: {
          en: "Decentralized Autonomous Organizations come in many forms.",
          fr: "Les Organisations Autonomes Décentralisées se présentent sous de nombreuses formes.",
        },
        href: "/governance/types-of-daos",
        tier: {
          en: "Beginner",
          fr: "Débutant",
        },
        date: new Date("2024-05-01"),
        sponsored: false,
        new: new Date("2024-05-01") > twoWeeksAgo,
        quizId: 25,
        available: true,
      },
      {
        title: {
          en: "Snapshot Protocol",
          fr: "Le Protocole Snapshot",
        },
        description: {
          en: "Snapshot is a decentralized voting system.",
          fr: "Snapshot est un système de vote décentralisé.",
        },
        href: "/governance/snapshot-protocol",
        tier: {
          en: "Beginner",
          fr: "Débutant",
        },
        date: new Date("2024-05-22"),
        sponsored: false,
        new: new Date("2024-05-22") > twoWeeksAgo,
        quizId: 34,
        available: true,
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
          en: "Stablecoins are cryptocurrencies designed to minimize the volatility of cryptocurrencies.",
          fr: "Les stablecoins sont des cryptomonnaies conçues pour minimiser la volatilité des cryptomonnaies.",
        },
        href: "/stablecoins/introduction-to-stablecoins",
        tier: {
          en: "Beginner",
          fr: "Débutant",
        },
        date: new Date("2024-03-10"),
        sponsored: false,
        new: new Date("2024-03-10") > twoWeeksAgo,
        quizId: 17,
        available: true,
      },
      {
        title: {
          en: "Terra Luna crash",
          fr: "Le crash de Terra Luna",
        },
        description: {
          en: "Terra Luna was a stablecoin that crashed.",
          fr: "Terra Luna était un stablecoin qui a crashé.",
        },
        href: "/stablecoins/terra-luna-crash",
        tier: {
          en: "Beginner",
          fr: "Débutant",
        },
        date: new Date("2024-05-03"),
        sponsored: false,
        new: new Date("2024-05-03") > twoWeeksAgo,
        quizId: 26,
        available: true,
      },
      {
        title: {
          en: "USDC by Circle",
          fr: "USDC par Circle",
        },
        description: {
          en: "USDC is a stablecoin that is pegged to the US dollar.",
          fr: "USDC est un stablecoin qui est adossé au dollar américain.",
        },
        href: "/stablecoins/usdc-by-circle",
        tier: {
          en: "Beginner",
          fr: "Débutant",
        },
        date: new Date("2024-05-20"),
        sponsored: false,
        new: new Date("2024-05-20") > twoWeeksAgo,
        quizId: 33,
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
          en: "Web3 is the next generation of the internet.",
          fr: "Web3 est la prochaine génération d'internet.",
        },
        href: "/web3/web3-essentials",
        tier: {
          en: "Beginner",
          fr: "Débutant",
        },
        date: new Date("2024-03-14"),
        sponsored: false,
        new: new Date("2024-03-14") > twoWeeksAgo,
        quizId: 18,
        available: true,
      },
      {
        title: {
          en: "Airdrops",
          fr: "Airdrops",
        },
        description: {
          en: "Airdrops are a way to distribute tokens to a large number of wallets.",
          fr: "Les airdrops sont un moyen de distribuer des tokens à un grand nombre de portefeuilles.",
        },
        href: "/web3/airdrops",
        tier: {
          en: "Beginner",
          fr: "Débutant",
        },
        date: new Date("2024-05-10"),
        sponsored: false,
        new: new Date("2024-05-10") > twoWeeksAgo,
        quizId: 29,
        available: true,
      },
      {
        title: {
          en: "ENS - Ethereum Name Service",
          fr: "ENS - Ethereum Name Service",
        },
        description: {
          en: "ENS is a decentralized domain name service.",
          fr: "ENS est un service de nom de domaine décentralisé.",
        },
        href: "/web3/ens",
        tier: {
          en: "Beginner",
          fr: "Débutant",
        },
        date: new Date("2024-05-13"),
        sponsored: false,
        new: new Date("2024-05-13") > twoWeeksAgo,
        quizId: 30,
        available: true,
      },
      {
        title: {
          en: "IPFS - InterPlanetary File System",
          fr: "IPFS - InterPlanetary File System",
        },
        description: {
          en: "IPFS is the backbone of the decentralized web.",
          fr: "IPFS est la colonne vertébrale du web décentralisé.",
        },
        href: "/web3/ipfs",
        tier: {
          en: "Intermediate",
          fr: "Intermédiaire",
        },
        date: new Date("2024-05-15"),
        sponsored: false,
        new: new Date("2024-05-15") > twoWeeksAgo,
        quizId: 31,
        available: true,
      },
      {
        title: {
          en: "Oracles",
          fr: "Les Oracles",
        },
        description: {
          en: "Oracles are third-party services that provide smart contracts with external information.",
          fr: "Les oracles sont des services tiers qui fournissent des contrats intelligents avec des informations externes.",
        },
        href: "/web3/oracles",
        tier: {
          en: "Intermediate",
          fr: "Intermédiaire",
        },
        date: new Date("2024-05-31"),
        sponsored: false,
        new: new Date("2024-05-31") > twoWeeksAgo,
        quizId: 38,
        available: true,
      },
    ],
  },
  {
    category: "Trading",
    courses: [
      {
        title: { en: "Day Trading", fr: "Day Trading" },
        description: {
          en: "Day Trading is a trading style that involves opening and closing positions within the same day.",
          fr: "Le Day Trading est un style de trading qui consiste à ouvrir et fermer des positions dans la même journée.",
        },
        href: "/trading/day-trading",
        tier: {
          en: "Beginner",
          fr: "Débutant",
        },
        date: new Date("2024-04-15"),
        sponsored: false,
        new: new Date("2024-04-15") > twoWeeksAgo,
        quizId: 19,
        available: true,
      },
      {
        title: {
          en: "5 Cognitive Biases",
          fr: "5 Biais Cognitifs",
        },
        description: {
          en: "Main cognitive biases that can affect your trading decisions.",
          fr: "Les principaux biais cognitifs qui peuvent affecter vos décisions de trading.",
        },
        href: "/trading/5-cognitive-biases",
        tier: {
          en: "Beginner",
          fr: "Débutant",
        },
        date: new Date("2024-05-06"),
        sponsored: false,
        new: new Date("2024-05-06") > twoWeeksAgo,
        quizId: 27,
        available: true,
      },
      {
        title: {
          en: "The 5 Trading Rules",
          fr: "Les 5 Règles de Trading",
        },
        description: {
          en: "The 5 trading rules that every trader should follow.",
          fr: "Les 5 règles de trading que chaque trader devrait suivre.",
        },
        href: "/trading/5-trading-rules",
        tier: {
          en: "Beginner",
          fr: "Débutant",
        },
        date: new Date("2024-05-17"),
        sponsored: false,
        new: new Date("2024-05-17") > twoWeeksAgo,
        quizId: 32,
        available: true,
      },
      {
        title: {
          en: "Futures Contracts",
          fr: "Les Contrats à Terme",
        },
        description: {
          en: "Futures contracts are agreements to buy or sell an asset at a specific future date and price.",
          fr: "Les contrats à terme sont des accords pour acheter ou vendre un actif à une date et un prix futurs spécifiques.",
        },
        href: "/trading/futures-contracts",
        tier: {
          en: "Intermediate",
          fr: "Intermédiaire",
        },
        date: new Date("2024-06-03"),
        sponsored: false,
        new: new Date("2024-06-03") > twoWeeksAgo,
        quizId: 39,
        available: true,
      },
    ],
  },
  {
    category: "Investing",
    courses: [
      {
        title: {
          en: "Dollar Cost Averaging",
          fr: "Le Dollar Cost Averaging",
        },
        description: {
          en: "DCA is an investment strategy that involves buying a fixed dollar amount of a particular investment on a regular schedule.",
          fr: "Le DCA est une stratégie d'investissement qui consiste à acheter un montant fixe d'un investissement particulier à intervalles réguliers.",
        },
        href: "/investing/dollar-cost-averaging",
        tier: {
          en: "Beginner",
          fr: "Débutant",
        },
        date: new Date("2024-05-08"),
        sponsored: false,
        new: new Date("2024-05-08") > twoWeeksAgo,
        quizId: 28,
        available: true,
      },
      {
        title: {
          en: "Fundamental Analysis",
          fr: "L'analyse fondamentale",
        },
        description: {
          en: "Fundamental analysis consists to determine the intrinsic value of a company.",
          fr: "L'analyse fondamentale consiste à déterminer la valeur intrinsèque d'une entreprise.",
        },
        href: "/investing/fundamental-analysis",
        tier: {
          en: "Beginner",
          fr: "Débutant",
        },
        date: new Date("2024-05-24"),
        sponsored: false,
        new: new Date("2024-05-24") > twoWeeksAgo,
        quizId: 35,
        available: true,
      },
      {
        title: {
          en: "Bonds vs Stocks",
          fr: "Obligations vs Actions",
        },
        description: {
          en: "Bonds and stocks are main types of investments. What's the difference?",
          fr: "Les obligations et les actions sont les principaux types d'investissements. Quelle est la différence?",
        },
        href: "/investing/bonds-vs-stocks",
        tier: {
          en: "Beginner",
          fr: "Débutant",
        },
        date: new Date("2024-05-27"),
        sponsored: false,
        new: new Date("2024-05-27") > twoWeeksAgo,
        quizId: 36,
        available: true,
      },
    ],
  },
];

export default lessons;
