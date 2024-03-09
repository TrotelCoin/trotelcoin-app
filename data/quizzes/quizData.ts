const quizzes = [
  {
    quizId: 1,
    title: "Introduction to TrotelCoin", // not used (to make things simpler)
    questions: [
      {
        questionId: 1,
        question: {
          en: "What topics are covered by TrotelCoin?",
          fr: "Quels sujets sont couverts par TrotelCoin?",
        },
        options: {
          en: [
            "Web3, Crypto, DeFi, and Blockchain",
            "Tech, Science, and History",
            "Math, Physics, and Chemistry",
            "TrotelCoin has no defined topics",
          ],
          fr: [
            "Web3, Crypto, DeFi, et Blockchain",
            "Tech, Science, et Histoire",
            "Math, Physique, et Chimie",
            "TrotelCoin n'a pas de sujets définis",
          ],
        },
      },
      {
        questionId: 2,
        question: {
          en: "Why is it important to learn about Web3?",
          fr: "Pourquoi est-il important d'apprendre sur le Web3?",
        },
        options: {
          en: [
            "To take control over your data and promote transparency",
            "To allow the government control your data",
            "To become rich with cryptocurrencies",
            "It's not important to learn about Web3",
          ],
          fr: [
            "Pour prendre le contrôle sur vos données et promouvoir la transparence",
            "Pour faire en sorte que le gouvernement contrôle vos données",
            "Pour devenir riche avec les cryptomonnaies",
            "Il n'est pas important d'apprendre le Web3",
          ],
        },
      },
      {
        questionId: 3,
        question: {
          en: "What's TrotelCoin?",
          fr: "Qu'est-ce que TrotelCoin?",
        },
        options: {
          en: [
            "An educational platform for exploring Web3 and cryptocurrencies",
            "A platform for buying and selling cryptocurrencies",
            "A platform for playing games",
            "A platform to trade NFTs",
          ],
          fr: [
            "Une plateforme éducative pour explorer le Web3 et les cryptomonnaies",
            "Une plateforme pour acheter et vendre des cryptomonnaies",
            "Une plateforme pour jouer à des jeux",
            "Une plateforme pour échanger des NFTs",
          ],
        },
      },
      {
        questionId: 4,
        question: {
          en: "Do I need a crypto wallet to learn?",
          fr: "Ai-je besoin d'un portefeuille de cryptomonnaie pour apprendre?",
        },
        options: {
          en: [
            "No, learning is free without earning TrotelCoins",
            "Yes, you need a crypto wallet to learn",
            "You need to give us Bitcoin to access the platform",
            "Yes, you need a bank account to learn",
          ],
          fr: [
            "Non, l'apprentissage est gratuit sans gagner de TrotelCoins",
            "Oui, vous avez besoin d'un portefeuille de cryptomonnaie pour apprendre",
            "Vous devez nous donner du Bitcoin pour accéder à la plateforme",
            "Oui, vous avez besoin d'un compte bancaire pour apprendre",
          ],
        },
      },
      {
        questionId: 5,
        question: {
          en: "Is TrotelCoin a token?",
          fr: "TrotelCoin est-il un token?",
        },
        options: {
          en: [
            "Yes, TrotelCoin has its own token, TROTEL used for governance and rewards",
            "No, TrotelCoin is only the name of the app",
            "TrotelCoin plans to create a token",
            "TrotelCoin uses Bitcoin",
          ],
          fr: [
            "Oui, TrotelCoin a son propre token, TROTEL utilisé pour la gouvernance et les récompenses",
            "Non, TrotelCoin est seulement le nom de l'application",
            "TrotelCoin prévoit de créer un token",
            "TrotelCoin utilise Bitcoin",
          ],
        },
      },
      {
        questionId: 6,
        question: {
          en: "How are TrotelCoins rewarded?",
          fr: "Comment sont récompensés les TrotelCoins?",
        },
        options: {
          en: [
            "The more tokens left, the more rewards you may get",
            "You need to buy TrotelCoins to get rewards",
            "You need to complete a survey giving all your data to get rewards",
            "TrotelCoins are not rewarded",
          ],
          fr: [
            "Plus il reste de tokens, plus vous pouvez obtenir de récompenses",
            "Vous devez acheter des TrotelCoins pour obtenir des récompenses",
            "Vous devez compléter un sondage donnant toutes vos données pour obtenir des récompenses",
            "Les TrotelCoins ne sont pas récompensés",
          ],
        },
      },
      {
        questionId: 7,
        question: {
          en: "What's the purpose of liquidity?",
          fr: "Quel est le but de la liquidité?",
        },
        options: {
          en: [
            "It helps making trading smoother while rewarding you",
            "It's like donating your money for the project",
            "You can never get back your cryptocurrencies when adding liquidity",
            "It's only available on Uniswap",
          ],
          fr: [
            "Cela aide à rendre le trading plus fluide tout en vous récompensant",
            "C'est comme faire un don pour le projet",
            "Vous ne pouvez jamais récupérer vos cryptomonnaies lorsque vous ajoutez de la liquidité",
            "C'est seulement disponible sur Uniswap",
          ],
        },
      },
      {
        questionId: 8,
        question: {
          en: "What's token burning?",
          fr: "C'est quoi le burning de tokens?",
        },
        options: {
          en: [
            "It increases the token's value by reducing the supply",
            "It's burning the physical version of the token",
            "It is a bad thing for the project",
            "It is only to make the community happy",
          ],
          fr: [
            "Cela augmente la valeur du token en réduisant l'offre",
            "Il s'agit de brûler la version physique du token",
            "C'est une mauvaise chose pour le projet",
            "Cela sert juste à rendre la communauté heureuse",
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
          fr: "De quoi avez-vous besoin pour réclamer les NFTs?",
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
          en: "What action do you need to take to claim the NFTs?",
          fr: "Quelle action devez-vous prendre pour réclamer les NFTs?",
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
        questionId: 5,
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
  {
    quizId: 3,
    title: "Create your fist wallet", // not used
    questions: [
      {
        questionId: 1,
        question: {
          en: "What is the main purpose of the wallet?",
          fr: "Quel est le but principal du portefeuille?",
        },
        options: {
          en: [
            "To store your cryptocurrencies",
            "To store your fiat money",
            "To store your art",
            "To store your personal data",
          ],
          fr: [
            "Pour stocker vos cryptomonnaies",
            "Pour stocker votre argent fiat",
            "Pour stocker vos œuvres d'art",
            "Pour stocker vos données personnelles",
          ],
        },
      },
      {
        questionId: 2,
        question: {
          en: "Which type of wallet provides offline storage?",
          fr: "Quel type de portefeuille fournit un stockage hors ligne?",
        },
        options: {
          en: ["Cold wallet", "Hot wallet", "Software wallet", "Mobile wallet"],
          fr: [
            "Portefeuille froid",
            "Portefeuille chaud",
            "Portefeuille logiciel",
            "Portefeuille mobile",
          ],
        },
      },
      {
        questionId: 3,
        question: {
          en: "What is the significance of a seed phrase in wallet security?",
          fr: "Quelle est l'importance d'une phrase de récupération dans la sécurité du portefeuille?",
        },
        options: {
          en: [
            "It's the backup of the wallet",
            "It's the password of the wallet",
            "It's the username of the wallet",
            "It's the wallet's address",
          ],
          fr: [
            "C'est la sauvegarde du portefeuille",
            "C'est le mot de passe du portefeuille",
            "C'est le nom d'utilisateur du portefeuille",
            "C'est l'adresse du portefeuille",
          ],
        },
      },
      {
        questionId: 4,
        question: {
          en: "What is the main purpose of the public key?",
          fr: "Quel est le but principal de la clé publique?",
        },
        options: {
          en: [
            "To receive cryptocurrencies",
            "To send cryptocurrencies",
            "To access the wallet",
            "To secure the wallet",
          ],
          fr: [
            "Recevoir des cryptomonnaies",
            "Envoyer des cryptomonnaies",
            "Accéder au portefeuille",
            "Sécuriser le portefeuille",
          ],
        },
      },
      {
        questionId: 5,
        question: {
          en: "Why is it essential to back up your wallet's private key or seed phrase?",
          fr: "Pourquoi est-il essentiel de sauvegarder la phrase de récupération de votre portefeuille?",
        },
        options: {
          en: [
            "To recover your wallet if it's lost or stolen",
            "To share it with friends and family",
            "There's no need to back up your wallet",
          ],
          fr: [
            "Pour récupérer votre portefeuille s'il est perdu ou volé",
            "Pour le partager avec vos amis et votre famille",
            "Il n'est pas nécessaire de sauvegarder votre portefeuille",
          ],
        },
      },
    ],
  },
  {
    quizId: 7,
    title: "Introduction to blockchains",
    questions: [
      {
        questionId: 1,
        question: {
          en: "What is a blockchain?",
          fr: "Qu'est-ce qu'une blockchain?",
        },
        options: {
          en: [
            "A decentralized ledger that stores a chain of blocks",
            "A type of cryptocurrency",
            "A programming language used to create smart contracts",
            "A digital wallet for storing Bitcoin",
          ],
          fr: [
            "Un registre décentralisé qui stocke une chaîne de blocs",
            "Un type de cryptomonnaie",
            "Un langage de programmation utilisé pour créer des smart contracts",
            "Un portefeuille numérique pour stocker du Bitcoin",
          ],
        },
      },
      {
        questionId: 2,
        question: {
          en: "What is a block?",
          fr: "Qu'est-ce qu'un bloc?",
        },
        options: {
          en: [
            "A collection of transactions",
            "A collection of computers",
            "A collection of users",
            "A collection of cryptocurrencies",
          ],
          fr: [
            "Une collection de transactions",
            "Une collection d'ordinateurs",
            "Une collection d'utilisateurs",
            "Une collection de cryptomonnaies",
          ],
        },
      },
      {
        questionId: 3,
        question: {
          en: "What means 'immutable' in the context of blockchain?",
          fr: "Que signifie 'immuable' dans le contexte de la blockchain?",
        },
        options: {
          en: [
            "Once a block is added, it cannot be altered",
            "Once a block is added, it can be altered",
            "Once a block is added, it can be deleted",
            "Once a block is added, it can be duplicated",
          ],
          fr: [
            "Une fois qu'un bloc est ajouté, il ne peut pas être modifié",
            "Une fois qu'un bloc est ajouté, il peut être modifié",
            "Une fois qu'un bloc est ajouté, il peut être supprimé",
            "Une fois qu'un bloc est ajouté, il peut être dupliqué",
          ],
        },
      },
      {
        questionId: 4,
        question: {
          en: "Why is Blockchain decentralization important?",
          fr: "Pourquoi la décentralisation de la blockchain est-elle importante?",
        },
        options: {
          en: [
            "To make the blockchain secure and censorship-resistant",
            "To make transactions faster",
            "To allow governments to control the blockchain",
            "To simplify the consensus mechanism",
          ],
          fr: [
            "Pour rendre la blockchain sécurisée et résistante à la censure",
            "Pour rendre les transactions plus rapides",
            "Pour permettre aux gouvernements de contrôler la blockchain",
            "Pour simplifier le mécanisme de consensus",
          ],
        },
      },
      {
        questionId: 5,
        question: {
          en: "Why blockchain is transparent?",
          fr: "Pourquoi la blockchain est transparente?",
        },
        options: {
          en: [
            "Everyone can verify the state of the blockchain",
            "Only validators can verify the state of the blockchain",
            "It's not transparent",
            "It's transparent only for the developers",
          ],
          fr: [
            "Tout le monde peut vérifier l'état de la blockchain",
            "Seuls les validateurs peuvent vérifier l'état de la blockchain",
            "Elle n'est pas transparente",
            "Elle est transparente uniquement pour les développeurs",
          ],
        },
      },
      {
        questionId: 6,
        question: {
          en: "Why blockchain is secure?",
          fr: "Pourquoi la blockchain est sécurisée?",
        },
        options: {
          en: [
            "It uses cryptographic techniques to secure transactions",
            "It relies on trust to secure transactions",
            "It is not secure",
            "Only the wallet is secured",
          ],
          fr: [
            "Elle utilise des techniques cryptographiques pour sécuriser les transactions",
            "Elle repose sur la confiance pour sécuriser les transactions",
            "Elle n'est pas sécurisée",
            "Seul le portefeuille est sécurisé",
          ],
        },
      },
      {
        questionId: 7,
        question: {
          en: "What are the consensus mechanisms?",
          fr: "Quels sont les mécanismes de consensus?",
        },
        options: {
          en: [
            "A way to consider a transaction as legitimate and add them to the block",
            "A way to make the government control the blockchain",
            "It's a term used to describe the block",
            "It's a term used to describe the transaction",
          ],
          fr: [
            "Une manière de considérer une transaction comme légitime et de les ajouter au bloc",
            "Une manière de faire en sorte que le gouvernement contrôle la blockchain",
            "C'est un terme utilisé pour décrire le bloc",
            "C'est un terme utilisé pour décrire la transaction",
          ],
        },
      },
      {
        questionId: 8,
        question: {
          en: "What are cryptocurrencies?",
          fr: "Qu'est-ce que sont les cryptomonnaies?",
        },
        options: {
          en: [
            "A digital currency used to secure transactions and operate on a blockchain",
            "A volatile currency",
            "A currency used for illegal activities",
            "A currency to speculate on the market",
          ],
          fr: [
            "Une monnaie numérique utilisée pour sécuriser les transactions et opérer sur une blockchain",
            "Une monnaie volatile",
            "Une monnaie utilisée pour des activités illégales",
            "Une monnaie pour spéculer sur le marché",
          ],
        },
      },
    ],
  },
  {
    quizId: 9,
    title: "Introduction to Bitcoin",
    questions: [
      {
        questionId: 1,
        question: {
          en: "Who created Bitcoin?",
          fr: "Qui a créé Bitcoin?",
        },
        options: {
          en: [
            "Satoshi Nakamoto",
            "Vitalik Buterin",
            "Charlie Lee",
            "Roger Ver",
          ],
          fr: [
            "Satoshi Nakamoto",
            "Vitalik Buterin",
            "Charlie Lee",
            "Roger Ver",
          ],
        },
      },
      {
        questionId: 2,
        question: {
          en: "What is the maximum supply of Bitcoin?",
          fr: "Quelle est l'offre maximale de Bitcoin?",
        },
        options: {
          en: ["21 million", "42 million", "84 million", "100 million"],
          fr: ["21 millions", "42 millions", "84 millions", "100 millions"],
        },
      },
      {
        questionId: 3,
        question: {
          en: "What is the issue with traditional currencies?",
          fr: "Quel est le problème avec les monnaies traditionnelles?",
        },
        options: {
          en: ["Inflation", "Deflation", "No issue", "They are not digital"],
          fr: [
            "L'inflation",
            "La déflation",
            "Pas de problème",
            "Elles ne sont pas digitales",
          ],
        },
      },
      {
        questionId: 4,
        question: {
          en: "Why Bitcoin is similar to gold?",
          fr: "Pourquoi Bitcoin est similaire à l'or?",
        },
        options: {
          en: [
            "It's a store of value",
            "It's a medium of exchange",
            "It's a unit of account",
            "It's a standard of deferred payment",
          ],
          fr: [
            "C'est un réserve de valeur",
            "C'est un moyen d'échange",
            "C'est une unité de compte",
            "C'est un standard de paiement différé",
          ],
        },
      },
      {
        questionId: 5,
        question: {
          en: "Why cryptography is important in Bitcoin?",
          fr: "Pourquoi la cryptographie est importante dans Bitcoin?",
        },
        options: {
          en: [
            "To secure transactions",
            "To secure the network",
            "To secure the wallet",
            "To secure the blockchain",
          ],
          fr: [
            "Pour sécuriser les transactions",
            "Pour sécuriser le réseau",
            "Pour sécuriser le portefeuille",
            "Pour sécuriser la blockchain",
          ],
        },
      },
      {
        questionId: 6,
        question: {
          en: "Why Bitcoin uses blockchain technology?",
          fr: "Pourquoi Bitcoin utilise la technologie blockchain?",
        },
        options: {
          en: [
            "Transparency, decentralization and security",
            "Speed and scalability",
            "Low fees",
            "It's the only technology available",
          ],
          fr: [
            "Transparence, décentralisation et sécurité",
            "Vitesse et scalabilité",
            "Frais bas",
            "C'est la seule technologie disponible",
          ],
        },
      },
      {
        questionId: 7,
        question: {
          en: "Why Bitcoin encounters political issues?",
          fr: "Pourquoi Bitcoin rencontre des problèmes politiques?",
        },
        options: {
          en: [
            "Government sees it as a threat",
            "Government sees it as an opportunity",
            "Government doesn't care",
            "It uses the same technology as the government",
          ],
          fr: [
            "Le gouvernement le voit comme une menace",
            "Le gouvernement le voit comme une opportunité",
            "Le gouvernement s'en fiche",
            "Il utilise la même technologie que le gouvernement",
          ],
        },
      },
    ],
  },
  {
    quizId: 16,
    title: "Stake your TrotelCoins",
    questions: [
      {
        questionId: 1,
        question: {
          en: "What is the purpose of TrotelCoin's staking?",
          fr: "Quel est le but du staking de TrotelCoin?",
        },
        options: {
          en: [
            "To earn rewards and secure the community",
            "To secure the network",
            "To lose your voting power",
            "Because it's fun",
          ],
          fr: [
            "Pour gagner des récompenses et sécuriser la communauté",
            "Pour sécuriser le réseau",
            "Pour perdre votre pouvoir de vote",
            "Parce que c'est amusant",
          ],
        },
      },
      {
        questionId: 2,
        question: {
          en: "How many TrotelCoins can I stake?",
          fr: "Combien de TrotelCoins puis-je stocker?",
        },
        options: {
          en: ["As many as you want", "A fixed amount", "Only 1", "None"],
          fr: [
            "Autant que vous voulez",
            "Un montant fixe",
            "Seulement 1",
            "Aucun",
          ],
        },
      },
      {
        questionId: 3,
        question: {
          en: "How long can I stake my TrotelCoins?",
          fr: "Combien de temps puis-je stocker mes TrotelCoins?",
        },
        options: {
          en: [
            "30 days, 3 months, 6 months, 1 year",
            "30 days, 6 months, 1 year",
            "30 days, 1 year",
            "How long I want",
          ],
          fr: [
            "30 jours, 3 mois, 6 mois, 1 an",
            "30 jours, 6 mois, 1 an",
            "30 jours, 1 an",
            "Aussi longtemps que je veux",
          ],
        },
      },
      {
        questionId: 4,
        question: {
          en: "How can I stake my TrotelCoins?",
          fr: "Comment puis-je staker mes TrotelCoins?",
        },
        options: {
          en: [
            "In the Wallet page",
            "In your wallet",
            "In the staking pool",
            "In the TrotelCoin Discord",
          ],
          fr: [
            "Dans la page Wallet",
            "Dans votre portefeuille",
            "Dans la pool de staking",
            "Dans le Discord de TrotelCoin",
          ],
        },
      },
      {
        questionId: 5,
        question: {
          en: "When can I unstake my TrotelCoins?",
          fr: "Quand puis-je retirer mes TrotelCoins?",
        },
        options: {
          en: [
            "After the staking period",
            "Whenever I want",
            "After 1 year",
            "Never",
          ],
          fr: [
            "Après la période de staking",
            "Quand je veux",
            "Après 1 an",
            "Jamais",
          ],
        },
      },
    ],
  },
];

export default quizzes;
