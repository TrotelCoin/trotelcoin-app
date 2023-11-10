import { Lessons } from "@/types/types";

const lessons: Lessons[] = [
  {
    category: "TrotelCoin",
    courses: [
      {
        title: "Introduction to TrotelCoin",
        href: "/trotelcoin/introduction-to-trotelcoin",
        status: "Not started",
        tier: "Beginner",
        sponsored: false,
        tutorial: true,
        new: true,
        quizId: 1,
      },
      {
        title: "Claim your NFTs",
        href: "/trotelcoin/claim-your-nfts",
        status: "Not started",
        tier: "Beginner",
        sponsored: false,
        tutorial: true,
        new: false,
        quizId: 2,
      },
    ],
  },
  {
    category: "Wallet",
    courses: [
      {
        title: "Create your first wallet",
        href: "/wallet/create-your-first-wallet",
        status: "Not started",
        tier: "Beginner",
        sponsored: false,
        tutorial: false,
        new: false,
        quizId: 3,
      },
      {
        title: "Secure your wallet",
        href: "/wallet/secure-your-wallet",
        status: "Not started",
        tier: "Intermediate",
        sponsored: false,
        tutorial: false,
        new: false,
        quizId: 4,
      },
      {
        title: "Authenticate with your wallet",
        href: "/wallet/authenticate-with-your-wallet",
        status: "Not started",
        tier: "Beginner",
        sponsored: false,
        tutorial: false,
        new: false,
        quizId: 5,
      },
      {
        title: "Make your first transaction",
        href: "/wallet/make-your-first-transaction",
        status: "Not started",
        tier: "Beginner",
        sponsored: false,
        tutorial: false,
        new: false,
        quizId: 6,
      },
    ],
  },
  {
    category: "Blockchain",
    courses: [
      {
        title: "What is a blockchain?",
        href: "/blockchain/what-is-a-blockchain",
        status: "Not started",
        tier: "Beginner",
        sponsored: false,
        tutorial: false,
        new: false,
        quizId: 7,
      },
      {
        title: "Consensus mechanisms",
        href: "/blockchain/consensus-mechanisms",
        status: "Not started",
        tier: "Beginner",
        sponsored: false,
        tutorial: false,
        new: false,
        quizId: 8,
      },
    ],
  },
  {
    category: "Bitcoin",
    courses: [
      {
        title: "Introduction to Bitcoin",
        href: "/bitcoin/introduction-to-bitcoin",
        status: "Not started",
        tier: "Beginner",
        sponsored: false,
        tutorial: false,
        new: false,
        quizId: 9,
      },
      {
        title: "The history of Bitcoin",
        href: "/bitcoin/the-history-of-bitcoin",
        status: "Not started",
        tier: "Intermediate",
        sponsored: false,
        tutorial: false,
        new: false,
        quizId: 10,
      },
    ],
  },
  {
    category: "Ethereum",
    courses: [
      {
        title: "Introduction to Ethereum",
        href: "/ethereum/introduction-to-ethereum",
        status: "Not started",
        tier: "Beginner",
        sponsored: false,
        tutorial: false,
        new: false,
        quizId: 11,
      },
      {
        title: "Understand the layers 2",
        href: "/ethereum/understand-the-layers-2",
        status: "Not started",
        tier: "Beginner",
        sponsored: false,
        tutorial: false,
        new: false,
        quizId: 12,
      },
      {
        title: "Smart contracts",
        href: "/ethereum/smart-contracts",
        status: "Not started",
        tier: "Beginner",
        sponsored: false,
        tutorial: false,
        new: true,
        quizId: 13,
      },
    ],
  },
  {
    category: "Governance",
    courses: [
      {
        title: "What are DAOs?",
        href: "/governance/what-are-daos",
        status: "Not started",
        tier: "Expert",
        sponsored: false,
        tutorial: false,
        new: false,
        quizId: 14,
      },
    ],
  },
];

export default lessons;
