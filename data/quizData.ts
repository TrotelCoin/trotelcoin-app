const quizzes = [
  {
    quizId: 1,
    title: "Introduction to TrotelCoin", // not used (to make things simpler)
    questions: [
      {
        questionId: 1,
        question: {
          en: "What is the mission of TrotelCoin?",
          fr: "Quelle est la mission de TrotelCoin?",
        },
        options: {
          en: [
            "Facilitate crypto education",
            "Build an empowered web3 community",
            "Maximize profits for TrotelCoin's holders",
            "TrotelCoin lacks a defined mission or vision",
          ],
          fr: [
            "Faciliter l'éducation sur la crypto",
            "Créer une communauté web3",
            "Maximiser les profits pour les détenteurs du TrotelCoin",
            "TrotelCoin n'a pas de mission ou de vision définie",
          ],
        },
      },
      {
        questionId: 2,
        question: {
          en: "How is the TrotelCoin token distributed annually?",
          fr: "Comment est distribué le TrotelCoin annuellement?",
        },
        options: {
          en: [
            "Based on the number of quizzes completed",
            "Randomly",
            "Fixed amount per user",
            "None of the above",
          ],
          fr: [
            "En fonction du nombre de quiz complétés",
            "Aléatoirement",
            "Montant fixe par utilisateur",
            "Aucune des réponses ci-dessus",
          ],
        },
      },
      {
        questionId: 3,
        question: {
          en: "What is the purpose of contributing to the Uniswap liquidity pool?",
          fr: "Quel est le but de contribuer à la pool de liquidité Uniswap?",
        },
        options: {
          en: [
            "To improve liquidity and generate fees",
            "Only to stabilize token value",
            "Only to earn comissions",
            "No risk, only benefits the project",
          ],
          fr: [
            "Améliorer la liquidité et générer des frais",
            "Uniquement pour stabiliser la valeur du token",
            "Uniquement pour gagner des commissions",
            "Aucun risque, seulement des avantages pour le projet",
          ],
        },
      },
      {
        questionId: 4,
        question: {
          en: "What is the impact of token burning?",
          fr: "Quel est l'impact du burning?",
        },
        options: {
          en: [
            "Stabilizes TrotelCoin value by preserving supply",
            "No impact on stability but increases the overall token supply",
            "Destabilizes the token by reducing its overall supply",
            "Doesn't affect TrotelCoin's stability or value",
          ],
          fr: [
            "Stabilise la valeur de TrotelCoin en préservant l'offre",
            "Aucun impact sur la stabilité mais augmente l'offre globale",
            "Déstabilise le token en réduisant son offre globale",
            "N'affecte pas la stabilité ou la valeur de TrotelCoin",
          ],
        },
      },
      {
        questionId: 5,
        question: {
          en: "What are the anti-fraud measures in place?",
          fr: "Quelles sont les mesures anti-fraude en place?",
        },
        options: {
          en: [
            "Quiz can be answered once and there's a captcha",
            "No measures and participants can submit the quiz multiple times",
            "Worldcoin ID is the only anti-fraud measure in place",
            "Measures are not necessary and limit participant engagement",
          ],
          fr: [
            "Le quiz ne peut être répondu qu'une seule fois et il y a un captcha",
            "Pas de mesure et les participants peuvent soumettre le quiz plusieurs fois",
            "Worldcoin ID est la seule mesure anti-fraude en place",
            "Les mesures sont inutiles et entravent l'engagement des learners",
          ],
        },
      },
      {
        questionId: 6,
        question: {
          en: "What is the purpose of the TrotelCoin token?",
          fr: "Quel est le but du TrotelCoin?",
        },
        options: {
          en: [
            "Incentivizes progress and permit governance",
            "No utility in education and serves only as a digital asset",
            "Utility is only about governance",
            "Utility is solely determined by market trends",
          ],
          fr: [
            "Incite les progrès et permet la gouvernance",
            "Aucune utilité dans l'éducation et ne sert que de bien numérique",
            "L'utilité est uniquement liée à la gouvernance",
            "L'utilité est uniquement déterminée par les tendances du marché",
          ],
        },
      },
    ],
  },
  {
    quizId: 2,
    title: "Claim your NFTs", // not used
    questions: [
      {
        questionId: 1,
        question: {
          en: "What are the two TrotelCoin's NFTs?",
          fr: "Quels sont les deux NFTs TrotelCoin?",
        },
        options: {
          en: [
            "Intermediate 🙈 et Expert 🦊",
            "Basic 🐦 et Advanced 🚀",
            "Starter 🌱 et Pro 🌟",
            "Novice 🐣 et Master 🧙‍♂️",
          ],
          fr: [
            "Intermediate 🙈 et Expert 🦊",
            "Basic 🐦 et Advanced 🚀",
            "Starter 🌱 et Pro 🌟",
            "Novice 🐣 et Master 🧙‍♂️",
          ],
        },
      },
      {
        questionId: 2,
        question: {
          en: "What is the main purpose of these NFTs?",
          fr: "Quel est le but principal de ces NFTs?",
        },
        options: {
          en: [
            "They are used to reward learners and provide access to exclusive content",
            "There are digital collectibles",
            "They are used for financial transactions",
            "They are used to vote on governance proposals",
          ],
          fr: [
            "Ils sont utilisés pour récompenser les apprenants et fournir un accès à du contenu exclusif",
            "Ce sont des objets de collection numériques",
            "Ils sont utilisés pour des transactions financières",
            "Ils sont utilisés pour voter sur des propositions de gouvernance",
          ],
        },
      },
      {
        questionId: 3,
        question: {
          en: "What do you need to claim the NFTs?",
          fr: "De quoi as-tu besoin pour réclamer les NFTs?",
        },
        options: {
          en: [
            "A certain amount of TrotelCoin",
            "A fast internet connection",
            "An account on TrotelCoin without any TrotelCoin",
            "A certain amount of Bitcoin",
          ],
          fr: [
            "Un certain montant de TrotelCoin",
            "Une connexion internet rapide",
            "Un compte sur TrotelCoin sans aucun TrotelCoin",
            "Un certain montant de Bitcoin",
          ],
        },
      },
      {
        questionId: 4,
        question: {
          en: "Where can you stay updated about the NFTs?",
          fr: "Où peux-tu rester informé sur les NFTs?",
        },
        options: {
          en: [
            "On the TrotelCoin documentation mainly",
            "On the TrotelCoin Discord only",
            "On the TrotelCoin Twitter only",
            "There's no place to stay updated about the NFTs",
          ],
          fr: [
            "Sur le site web de TrotelCoin principalement",
            "Sur le Discord de TrotelCoin seulement",
            "Sur le Twitter de TrotelCoin seulement",
            "Il n'y a pas d'endroit pour rester informé sur les NFTs",
          ],
        },
      },
      {
        questionId: 5,
        question: {
          en: "What action do you need to take to claim the NFTs?",
          fr: "Quelle action dois-tu prendre pour réclamer les NFTs?",
        },
        options: {
          en: [
            "Click on the claim button",
            "Complete a transaction",
            "Complete a form",
            "Complete a survey",
          ],
          fr: [
            "Cliquer sur le bouton de réclamation",
            "Compléter une transaction",
            "Compléter un formulaire",
            "Compléter un sondage",
          ],
        },
      },
      {
        questionId: 6,
        question: {
          en: "What's the last step to confirm the NFTs claim?",
          fr: "Quelle est la dernière étape pour confirmer la réclamation des NFTs?",
        },
        options: {
          en: [
            "Rainbow border around the NFTs 🌈",
            "Get a mail confirmation",
            "Obtain a QR code",
            "Nothing",
          ],
          fr: [
            "Bordure arc-en-ciel autour des NFTs 🌈",
            "Recevoir une confirmation par mail",
            "Obtenir un QR code",
            "Rien",
          ],
        },
      },
    ],
  },
];

export default quizzes;
