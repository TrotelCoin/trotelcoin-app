const quizzes = [
  {
    quizId: 1,
    title: "Introduction to TrotelCoin", // not used (to make things simpler)
    questions: [
      {
        questionId: 1,
        question: {
          en: "What's TrotelCoin?",
          fr: "Qu'est-ce que TrotelCoin?",
        },
        options: {
          en: [
            "TrotelCoin is a cryptocurrency",
            "TrotelCoin is a blockchain",
            "TrotelCoin is a wallet",
            "TrotelCoin is a learning platform",
          ],
          fr: [
            "TrotelCoin est une crypto-monnaie",
            "TrotelCoin est une blockchain",
            "TrotelCoin est un portefeuille",
            "TrotelCoin est une plateforme d'apprentissage",
          ],
        },
      },
      {
        questionId: 2,
        question: {
          en: "What's the utility of the TrotelCoin token?",
          fr: "Quelle est l'utilité du token TrotelCoin?",
        },
        options: {
          en: [
            "Claim NFTs that can be used to access exclusive content",
            "Rewards for completing quizzes",
            "Right to vote on proposals according to the TrotelCoin DAO",
            "All of the above",
          ],
          fr: [
            "Réclamer des NFT qui peuvent être utilisés pour accéder à du contenu exclusif",
            "Récompenses pour avoir complété des quiz",
            "Droit de vote sur les propositions selon le TrotelCoin DAO",
            "Tout ce qui précède",
          ],
        },
      },
      {
        questionId: 3,
        question: {
          en: "Why can't I use the platform without a wallet?",
          fr: "Pourquoi ne puis-je pas utiliser la plateforme sans portefeuille?",
        },
        options: {
          en: [
            "To ensure that you are not an AI",
            "To ensure that you can receive your rewards",
            "To ensure that you can claim your monkey's NFTs",
            "To ensure that you can store your Bitcoin",
          ],
          fr: [
            "Pour vous assurer que vous n'êtes pas une IA",
            "Pour vous assurer que vous pouvez recevoir vos récompenses",
            "Pour vous assurer que vous pouvez réclamer les NFT de votre singe",
            "Pour vous assurer que vous pouvez stocker votre Bitcoin",
          ],
        },
      },
      {
        questionId: 4,
        question: {
          en: "What's the purpose of the TrotelCoin DAO?",
          fr: "Quel est le but de la DAO TrotelCoin?",
        },
        options: {
          en: [
            "To ensure that the platform is decentralized",
            "To ensure that the platform is centralized",
            "To ensure that the platform is not a scam",
            "To ensure that the platform is not a ponzi scheme",
          ],
          fr: [
            "Pour assurer que la plateforme est décentralisée",
            "Pour assurer que la plateforme est centralisée",
            "Pour assurer que la plateforme n'est pas une arnaque",
            "Pour assurer que la plateforme n'est pas un schéma de Ponzi",
          ],
        },
      },
      {
        questionId: 5,
        question: {
          en: "Why should I use TrotelCoin?",
          fr: "Pourquoi devrais-je utiliser TrotelCoin?",
        },
        options: {
          en: [
            "To learn about blockchain",
            "To learn about cryptocurrencies",
            "To learn about NFTs",
            "All of the above",
          ],
          fr: [
            "Pour apprendre la blockchain",
            "Pour apprendre les crypto-monnaies",
            "Pour apprendre les NFT",
            "Tout ce qui précède",
          ],
        },
      },
      {
        questionId: 6,
        question: {
          en: "Must I buy TrotelCoin to learn?",
          fr: "Dois-je acheter du TrotelCoin pour apprendre?",
        },
        options: {
          en: [
            "Yes, it's mandatory",
            "No, you can entirely use the platform for free",
            "Yes, but you can use the platform for free",
            "I don't know",
          ],
          fr: [
            "Oui, c'est obligatoire",
            "Non, vous pouvez utiliser la plateforme entièrement gratuitement",
            "Oui, mais vous pouvez utiliser la plateforme gratuitement",
            "Je ne sais pas",
          ],
        },
      },
    ],
  },
];

export default quizzes;
