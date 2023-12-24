import { Lessons } from "@/types/types";

const lessons: Lessons[] = [
  {
    category: "TrotelCoin",
    courses: [
      {
        title: "Introduction to TrotelCoin",
        description:
          "Get acquainted with using TrotelCoin, exploring its functionalities",
        href: "/trotelcoin/introduction-to-trotelcoin",
        status: "Not started",
        tier: "Beginner",
        sponsored: false,
        new: false,
        quizId: 1,
        available: true,
      },
      {
        title: "Claim your NFTs",
        description:
          "Understand the process of claiming TrotelCoin's NFTs and their utilization",
        href: "/trotelcoin/claim-your-nfts",
        status: "Not started",
        tier: "Beginner",
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
        title: "Create your first wallet",
        description:
          "Learn the steps involved in creating your initial digital wallet securely",
        href: "/wallet/create-your-first-wallet",
        status: "Not started",
        tier: "Beginner",
        sponsored: false,
        new: false,
        quizId: 3,
        available: false,
      },
      {
        title: "Secure your wallet",
        description:
          "Implement advanced security measures to protect your digital assets within the wallet",
        href: "/wallet/secure-your-wallet",
        status: "Not started",
        tier: "Expert",
        sponsored: false,
        new: false,
        quizId: 4,
        available: false,
      },
      {
        title: "Authenticate with your wallet",
        description:
          "Discover methods to authenticate and access your wallet securely",
        href: "/wallet/authenticate-with-your-wallet",
        status: "Not started",
        tier: "Beginner",
        sponsored: false,
        new: false,
        quizId: 5,
        available: false,
      },
      {
        title: "Make your first transaction",
        description:
          "Gain hands-on experience in initiating and completing your first digital transaction",
        href: "/wallet/make-your-first-transaction",
        status: "Not started",
        tier: "Beginner",
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
        title: "What is a blockchain?",
        description:
          "Grasp the fundamental concepts underlying the functionality of a blockchain",
        href: "/blockchain/what-is-a-blockchain",
        status: "Not started",
        tier: "Beginner",
        sponsored: false,
        new: false,
        quizId: 7,
        available: false,
      },
      {
        title: "Consensus mechanisms",
        description:
          "Explore various consensus mechanisms utilized within blockchain networks",
        href: "/blockchain/consensus-mechanisms",
        status: "Not started",
        tier: "Intermediate",
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
        title: "Introduction to Bitcoin",
        description:
          "Explore the basics and core principles of the Bitcoin cryptocurrency",
        href: "/bitcoin/introduction-to-bitcoin",
        status: "Not started",
        tier: "Beginner",
        sponsored: false,
        new: false,
        quizId: 9,
        available: false,
      },
      {
        title: "The history of Bitcoin",
        description:
          "Dive into the historical evolution and significant milestones of Bitcoin",
        href: "/bitcoin/the-history-of-bitcoin",
        status: "Not started",
        tier: "Beginner",
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
        title: "Introduction to Ethereum",
        description:
          "Understand the foundational aspects and principles behind the Ethereum network",
        href: "/ethereum/introduction-to-ethereum",
        status: "Not started",
        tier: "Beginner",
        sponsored: false,
        new: false,
        quizId: 11,
        available: false,
      },
      {
        title: "Understand the layers 2",
        description:
          "Explore the secondary layers of Ethereum's architecture and their functionalities",
        href: "/ethereum/understand-the-layers-2",
        status: "Not started",
        tier: "Intermediate",
        sponsored: false,
        new: false,
        quizId: 12,
        available: false,
      },
      {
        title: "Smart contracts",
        description:
          "Learn about Ethereum's smart contracts and their innovative applications",
        href: "/ethereum/smart-contracts",
        status: "Not started",
        tier: "Intermediate",
        sponsored: false,
        new: false,
        quizId: 13,
        available: false,
      },
      {
        title: "EVM",
        description:
          "Gain insights into Ethereum's virtual machine and its functionalities",
        href: "/ethereum/evm",
        status: "Not started",
        tier: "Expert",
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
        title: "What are DAOs?",
        description:
          "Gain insights into the decentralized autonomous organizations (DAOs)",
        href: "/governance/what-are-daos",
        status: "Not started",
        tier: "Intermediate",
        sponsored: false,
        new: false,
        quizId: 14,
        available: false,
      },
    ],
  },
];

export default lessons;
