import { QuizData } from "@/types/types";

const quizzes: QuizData = [
  {
    quizId: 1,
    title: "Introduction to TrotelCoin", // not used (to make things simpler)
    questions: [
      {
        questionId: 1,
        question: {
          en: "What can you learn with TrotelCoin?",
          fr: "Que pouvez-vous apprendre avec TrotelCoin?",
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
          fr: "Pourquoi est-il important d'apprendre le Web3?",
        },
        options: {
          en: [
            "To take control over your data and money",
            "To allow the government to control your data",
            "To become rich because of cryptocurrencies",
            "It's not important to learn about Web3",
          ],
          fr: [
            "Pour reprendre le contrôle sur vos données et votre argent",
            "Pour faire en sorte que le gouvernement contrôle vos données",
            "Pour devenir riche grâce aux cryptomonnaies",
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
            "An educational app for exploring Web3",
            "An app for buying and selling cryptocurrencies",
            "An app for playing games",
            "An app to trade NFTs",
          ],
          fr: [
            "Une app éducative pour explorer le Web3",
            "Une app pour acheter et vendre des cryptomonnaies",
            "Une app pour jouer à des jeux",
            "Une app pour échanger des NFTs",
          ],
        },
      },
      {
        questionId: 4,
        question: {
          en: "Do I need a crypto wallet to get started?",
          fr: "Avez-vous besoin d'un portefeuille crypto pour commencer?",
        },
        options: {
          en: [
            "No, learning is free",
            "Yes, you need a crypto wallet to learn",
            "You need to give us Bitcoin to access the app",
            "Yes, you need a bank account to learn",
          ],
          fr: [
            "Non, l'apprentissage est gratuit",
            "Oui, vous avez besoin d'un portefeuille de cryptomonnaie pour apprendre",
            "Vous devez nous donner du Bitcoin pour accéder à l'app'",
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
            "TROTEL is used for governance and rewards",
            "No, TrotelCoin is only the name of the app",
            "TrotelCoin plans to create a token",
            "TrotelCoin uses Bitcoin",
          ],
          fr: [
            "Le TROTEL est utilisé pour la gouvernance et les récompenses",
            "Non, TrotelCoin est seulement le nom de l'application",
            "TrotelCoin prévoit de créer un token",
            "TrotelCoin utilise Bitcoin",
          ],
        },
      },
      {
        questionId: 6,
        question: {
          en: "How are TrotelCoins distributed?",
          fr: "Comment sont distribués les TrotelCoins?",
        },
        options: {
          en: [
            "The more tokens left in a cycle, the more rewards you may get",
            "You need to buy TrotelCoins to get rewards",
            "You need to complete a survey giving all your data to get rewards",
            "TrotelCoins are not distributed",
          ],
          fr: [
            "Plus il reste de tokens dans un cycle, plus vous pouvez obtenir de récompenses",
            "Vous devez acheter des TrotelCoins pour obtenir des récompenses",
            "Vous devez compléter un sondage donnant toutes vos données pour obtenir des récompenses",
            "Les TrotelCoins ne sont pas distribués",
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
            "Intermediate and Expert",
            "Basic and Advanced",
            "Starter and Pro",
            "Novice and Master",
          ],
          fr: [
            "Intermédiaire et Expert",
            "Basique et Advancé",
            "Starter et Pro",
            "Novice et Maître",
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
            "Rewarding learners and providing access to exclusive content",
            "There are digital collectibles",
            "They are used for financial transactions",
            "They are solely used to vote on governance proposals",
          ],
          fr: [
            "Récompenser les apprenants et fournir un accès à du contenu exclusif",
            "Ce sont des objets de collection numériques",
            "Ils sont utilisés pour des transactions financières",
            "Ils sont seulement utilisés pour voter sur des propositions de gouvernance",
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
            "Only an account on TrotelCoin",
            "A certain amount of Bitcoin",
          ],
          fr: [
            "Un certain montant de TrotelCoin",
            "Une connexion internet rapide",
            "Seulement un compte sur TrotelCoin",
            "Un certain montant de Bitcoin",
          ],
        },
      },
      {
        questionId: 4,
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
          en: "Why is Blockchain needs to be decentralized?",
          fr: "Pourquoi la blockchain doit être décentralisée?",
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
          fr: "Pourquoi la blockchain est-elle transparente?",
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
          en: "What are cryptocurrencies?",
          fr: "Qu'est-ce que sont les cryptomonnaies?",
        },
        options: {
          en: [
            "A digital currency used to secure transactions",
            "A volatile currency",
            "A currency used for illegal activities",
            "A currency to speculate on the market",
          ],
          fr: [
            "Une monnaie numérique utilisée pour sécuriser les transactions",
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
        questionId: 6,
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
    quizId: 10,
    title: "History of Bitcoin",
    questions: [
      {
        questionId: 1,
        question: {
          en: "Who published the Bitcoin Whitepaper?",
          fr: "Qui a publié le livre blanc sur le Bitcoin?",
        },
        options: {
          en: ["Satoshi Nakamoto", "Wei Dai", "Nick Szabo", "Hal Finney"],
          fr: ["Satoshi Nakamoto", "Wei Dai", "Nick Szabo", "Hal Finney"],
        },
      },
      {
        questionId: 2,
        question: {
          en: "What is the Genesis Block?",
          fr: "Qu'est-ce que le bloc Genesis?",
        },
        options: {
          en: [
            "The first block of the Bitcoin blockchain",
            "The last block of the Bitcoin blockchain",
            "The only transaction block",
            "Each block sent by Satoshi Nakamoto",
          ],
          fr: [
            "Le premier bloc de la blockchain Bitcoin",
            "Le dernier bloc de la blockchain Bitcoin",
            "Le seul bloc de transaction",
            "Chaque bloc envoyé par Satoshi Nakamoto",
          ],
        },
      },
      {
        questionId: 3,
        question: {
          en: "Who was the first to receive Bitcoins?",
          fr: "Qui a été le premier à recevoir des Bitcoins?",
        },
        options: {
          en: ["Hal Finney", "Satoshi Nakamoto", "Wei Dai", "Nick Szabo"],
          fr: ["Hal Finney", "Satoshi Nakamoto", "Wei Dai", "Nick Szabo"],
        },
      },
      {
        questionId: 4,
        question: {
          en: "What happened on May 22, 2010?",
          fr: "Qu'est-il arrivé le 22 mai 2010?",
        },
        options: {
          en: [
            "Bitcoin Pizza Day",
            "Genesis Block Mined",
            "Bitcoin Software Announced",
            "The Silk Road Launch",
          ],
          fr: [
            "Journée de la pizza Bitcoin",
            "Extraction du bloc Genesis",
            "Annonce du logiciel Bitcoin",
            "Lancement de la Route de la soie",
          ],
        },
      },
      {
        questionId: 5,
        question: {
          en: "What is the Lightning Network?",
          fr: "Qu'est-ce que le Lightning Network?",
        },
        options: {
          en: [
            "A second layer to bitcoin's blockchain for micropayments",
            "A new Bitcoin exchange platform",
            "A protocol for Bitcoin mining",
            "A decentralized cryptocurrency",
          ],
          fr: [
            "Une seconde couche de la blockchain de Bitcoin pour les micropaiements",
            "Une nouvelle plateforme d'échange de Bitcoin",
            "Un protocole pour le minage de Bitcoin",
            "Une cryptomonnaie décentralisée",
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
          en: "What is the purpose of staking TrotelCoin?",
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
          fr: "Combien de TrotelCoins puis-je miser?",
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
          fr: "Combien de temps puis-je miser mes TrotelCoins?",
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
          fr: "Comment puis-je miser mes TrotelCoins?",
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
  {
    quizId: 17,
    title: "Introduction to stablecoins",
    questions: [
      {
        questionId: 1,
        question: {
          en: "What is the primary purpose of stablecoins?",
          fr: "Quel est le but principal des stablecoins?",
        },
        options: {
          en: [
            "To minimize volatility",
            "To maximize volatility",
            "To maximize the price",
            "To replicate fiat currencies",
          ],
          fr: [
            "Minimiser la volatilité",
            "Maximiser la volatilité",
            "Maximiser le prix",
            "Répliquer les monnaies fiat",
          ],
        },
      },
      {
        questionId: 2,
        question: {
          en: "What are the three main types of stablecoins?",
          fr: "Quels sont les trois principaux types de stablecoins?",
        },
        options: {
          en: [
            "Centralized, decentralized, algorithmic",
            "Fiat, Gold, and Silver-backed",
            "Bitcoin, Ethereum, and Ripple",
            "Stable, Unstable, and Volatile",
          ],
          fr: [
            "Centralisé, décentralisé, algorithmique",
            "Adossé à des monnaies fiat, de l'or, et de l'argent",
            "Bitcoin, Ethereum, et Ripple",
            "Stable, Instable, et Volatile",
          ],
        },
      },
      {
        questionId: 3,
        question: {
          en: "Why are stablecoins important?",
          fr: "Pourquoi les stablecoins sont-ils importants?",
        },
        options: {
          en: [
            "To provide a way using crypto without volatility",
            "To increase exposure to crypto volatility",
            "To replace fiat currencies",
            "To eliminate the need for cryptocurrencies",
          ],
          fr: [
            "Pour fournir un moyen d'utiliser la cryptomonnaie sans volatilité",
            "Pour augmenter l'exposition à la volatilité des cryptomonnaies",
            "Pour remplacer les monnaies fiat",
            "Pour éliminer le besoin de cryptomonnaies",
          ],
        },
      },
      {
        questionId: 4,
        question: {
          en: "What is a risk of stablecoins?",
          fr: "Quel est un risque des stablecoins?",
        },
        options: {
          en: ["Collateralization risk", "There's no risk"],
          fr: ["Risque de garantie", "Il n'y a pas de risque"],
        },
      },
      {
        questionId: 5,
        question: {
          en: "What are some uses of stablecoins mentioned?",
          fr: "Quelles sont quelques utilisations des stablecoins mentionnées?",
        },
        options: {
          en: [
            "Remittances, trading, and store of value",
            "Voting and gaming",
            "Real estate and art",
            "Social media engagement and music",
          ],
          fr: [
            "Transferts d'argent, trading, et réserve de valeur",
            "Vote et jeux",
            "Immobilier et art",
            "Engagement sur les réseaux sociaux et musique",
          ],
        },
      },
    ],
  },
];

export default quizzes;
