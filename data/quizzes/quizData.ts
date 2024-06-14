import type { QuizData } from "@/types/courses/quiz";

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
    title: "Buy the NFTs", // not used
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
          en: "What do you need to buy the NFTs?",
          fr: "De quoi avez-vous besoin pour acheter les NFTs?",
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
            "Rainbow text with the NFTs 🌈",
            "Get a mail confirmation",
            "Obtain a QR code",
            "Nothing",
          ],
          fr: [
            "Texte arc-en-ciel avec les NFTs 🌈",
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
    quizId: 4,
    title: "Secure your wallet",
    questions: [
      {
        questionId: 1,
        question: {
          en: "What step is crucial in securing your crypto wallet?",
          fr: "Quelle étape est cruciale pour sécuriser votre portefeuille de crypto ?",
        },
        options: {
          en: [
            "Using reputable exchanges",
            "Sharing passwords publicly",
            "Ignoring security updates",
            "Storing passwords in plain text",
          ],
          fr: [
            "Utiliser des échanges réputés",
            "Partager des mots de passe publiquement",
            "Ignorer les mises à jour de sécurité",
            "Stocker les mots de passe en texte clair",
          ],
        },
      },
      {
        questionId: 2,
        question: {
          en: "What type of wallet is considered one of the safest?",
          fr: "Quel type de portefeuille est considéré comme l'un des plus sûrs ?",
        },
        options: {
          en: [
            "Cold hardware wallet",
            "Hot online wallet",
            "Mobile wallet",
            "Paper wallet",
          ],
          fr: [
            "Portefeuille matériel froid",
            "Portefeuille en ligne chaud",
            "Portefeuille mobile",
            "Portefeuille papier",
          ],
        },
      },
      {
        questionId: 3,
        question: {
          en: "Which internet connection should you avoid for transactions?",
          fr: "Quelle connexion Internet devez-vous éviter pour les transactions ?",
        },
        options: {
          en: [
            "Public wifi",
            "Private network",
            "VPN connection",
            "Mobile data",
          ],
          fr: [
            "Wifi public",
            "Réseau privé",
            "Connexion VPN",
            "Données mobiles",
          ],
        },
      },
      {
        questionId: 4,
        question: {
          en: "What is a recommended security measure for protecting your passwords?",
          fr: "Quelle est une mesure de sécurité recommandée pour protéger vos mots de passe ?",
        },
        options: {
          en: [
            "Two-factor authentication",
            "Sharing passwords with friends",
            "Writing passwords on sticky notes",
            "Using common passwords",
          ],
          fr: [
            "Authentification à deux facteurs",
            "Partager les mots de passe avec des amis",
            "Écrire les mots de passe sur des notes autocollantes",
            "Utiliser des mots de passe courants",
          ],
        },
      },
      {
        questionId: 5,
        question: {
          en: "What should you avoid disclosing about your crypto wallet?",
          fr: "Que devez-vous éviter de divulguer sur votre portefeuille de crypto ?",
        },
        options: {
          en: [
            "Passwords and private keys",
            "Cryptocurrency investment amounts",
            "Social media posts about crypto",
            "Crypto wallet address to strangers",
          ],
          fr: [
            "Mots de passe et clés privées",
            "Montants d'investissement en crypto-monnaie",
            "Publications sur les médias sociaux sur la crypto",
            "Adresse de portefeuille crypto aux étrangers",
          ],
        },
      },
    ],
  },
  {
    quizId: 5,
    title: "Web3 authentication",
    questions: [
      {
        questionId: 1,
        question: {
          en: "What does Web3 authentication allow you to do?",
          fr: "Que permet l'authentification Web3 ?",
        },
        options: {
          en: [
            "Sign in to any website or app with a single digital identity",
            "Create multiple accounts for different websites",
            "Use different usernames and passwords for each website",
          ],
          fr: [
            "Se connecter à n'importe quel site web ou application avec une seule identité numérique",
            "Créer plusieurs comptes pour différents sites web",
            "Utiliser différents noms d'utilisateur et mots de passe pour chaque site web",
          ],
        },
      },
      {
        questionId: 2,
        question: {
          en: "How do you verify your identity with Web3 authentication?",
          fr: "Comment vérifiez-vous votre identité avec l'authentification Web3 ?",
        },
        options: {
          en: [
            "By using the private key of your cryptocurrency wallet",
            "By creating multiple accounts with different passwords",
            "By connecting your social media accounts",
          ],
          fr: [
            "En utilisant la clé privée de votre portefeuille de cryptomonnaie",
            "En créant plusieurs comptes avec des mots de passe différents",
            "En connectant vos comptes de médias sociaux",
          ],
        },
      },
      {
        questionId: 3,
        question: {
          en: "What is one advantage of Web3 authentication?",
          fr: "Quel est un avantage de l'authentification Web3 ?",
        },
        options: {
          en: [
            "Easier interaction with websites and apps, and protection from phishing attacks",
            "More complex onboarding process for beginners",
            "Sharing your private key with websites",
          ],
          fr: [
            "Interaction plus facile avec les sites web et les applications, et protection contre les attaques de phishing",
            "Processus d'intégration plus complexe pour les débutants",
            "Partager votre clé privée avec les sites web",
          ],
        },
      },
      {
        questionId: 4,
        question: {
          en: "What is one disadvantage of Web3 authentication?",
          fr: "Quel est un inconvénient de l'authentification Web3 ?",
        },
        options: {
          en: [
            "Can be confusing for beginners, especially when creating a wallet",
            "Simplifies the process for beginners",
            "Requires sharing your private key with websites",
          ],
          fr: [
            "Peut être déroutant pour les débutants, surtout lors de la création d'un portefeuille",
            "Simplifie le processus pour les débutants",
            "Nécessite de partager votre clé privée avec les sites web",
          ],
        },
      },
    ],
  },
  {
    quizId: 6,
    title: "Make your first transaction",
    questions: [
      {
        questionId: 1,
        question: {
          en: "Did you enjoy making your first transaction?",
          fr: "Avez-vous aimé faire votre première transaction?",
        },
        options: {
          en: ["Yes! So simple to send money using the blockchain."],
          fr: [
            "Oui ! C'est si simple d'envoyer de l'argent grâce à a blockchain.",
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
    quizId: 8,
    title: "Consensus Mechanisms",
    questions: [
      {
        questionId: 1,
        question: {
          en: "What does the term consensus mechanism refer to?",
          fr: "À quoi fait référence le terme mécanisme de consensus?",
        },
        options: {
          en: [
            "A stack of ideas, protocols, and incentives facilitating nodes to agree on the blockchain's current state",
            "A protocol for selecting honest validators in a blockchain network",
            "A method for creating new blocks in a blockchain",
            "A rule for deciding the longest chain in Bitcoin",
          ],
          fr: [
            "Un ensemble d'idées, de protocoles et d'incitations facilitant la mise d'accord des nœuds sur l'état actuel de la blockchain",
            "Un protocole pour sélectionner les validateurs honnêtes dans un réseau de blockchain",
            "Une méthode pour créer de nouveaux blocs dans une blockchain",
            "Une règle pour décider de la plus longue chaîne dans Bitcoin",
          ],
        },
      },
      {
        questionId: 2,
        question: {
          en: "What is a consensus?",
          fr: "Qu'est-ce qu'un consensus?",
        },
        options: {
          en: [
            "A general agreement reached among participants",
            "A disagreement among blockchain nodes",
            "A method for validating transactions in a blockchain",
            "A mechanism for preventing Sybil attacks",
          ],
          fr: [
            "Un accord général atteint entre les participants",
            "Un désaccord entre les nœuds de la blockchain",
            "Une méthode pour valider les transactions dans une blockchain",
            "Un mécanisme pour prévenir les attaques Sybil",
          ],
        },
      },
      {
        questionId: 3,
        question: {
          en: "What consensus mechanism does Bitcoin use?",
          fr: "Quel mécanisme de consensus utilise Bitcoin?",
        },
        options: {
          en: [
            "Proof of Work",
            "Proof of Stake",
            "Byzantine Fault Tolerance",
            "Proof of History",
          ],
          fr: [
            "Preuve de travail",
            "Preuve d'enjeu",
            "Tolérance aux fautes byzantines",
            "Preuve d'histoire",
          ],
        },
      },
      {
        questionId: 4,
        question: {
          en: "How is the main chain decided in Proof-of-Work?",
          fr: "Comment la chaîne principale est-elle décidée en Preuve de Travail ?",
        },
        options: {
          en: [
            "By selecting the blocks with the most mining effort",
            "By choosing blocks randomly",
            "By the longest chain rule",
            "By the fork-choice method",
          ],
          fr: [
            "En sélectionnant les blocs avec le plus d'efforts de minage",
            "En choisissant les blocs au hasard",
            "Par la règle de la chaîne la plus longue",
            "Par la méthode de choix de fourche",
          ],
        },
      },
      {
        questionId: 5,
        question: {
          en: "What is Proof of Stake?",
          fr: "Qu'est-ce que la Preuve d'enjeu?",
        },
        options: {
          en: [
            "A consensus mechanism where validators are chosen based on the amount of cryptocurrency they hold",
            "A method for creating new blocks in a blockchain",
            "A rule for deciding the longest chain in Bitcoin",
            "A protocol for selecting honest validators in a blockchain network",
          ],
          fr: [
            "Un mécanisme de consensus où les validateurs sont choisis en fonction du montant de cryptomonnaie qu'ils détiennent",
            "Une méthode pour créer de nouveaux blocs dans une blockchain",
            "Une règle pour décider de la plus longue chaîne dans Bitcoin",
            "Un protocole pour sélectionner les validateurs honnêtes dans un réseau de blockchain",
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
          en: [
            "Trust",
            "No problem",
            "They are not digital",
            "They are not scarce",
          ],
          fr: [
            "Confiance",
            "Pas de problème",
            "Elles ne sont pas numériques",
            "Elles ne sont pas rares",
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
    quizId: 11,
    title: "Introduction to Ethereum",
    questions: [
      {
        questionId: 1,
        question: {
          en: "What is Ethereum primarily known for?",
          fr: "Pour quoi Ethereum est-il principalement connu ?",
        },
        options: {
          en: [
            "Creating smart contracts and dApps",
            "Managing centralized databases",
            "Mining Bitcoin",
            "Developing mobile applications",
          ],
          fr: [
            "Créer des contrats intelligents et des dApps",
            "Gérer des bases de données centralisées",
            "Extraire du Bitcoin",
            "Développer des applications mobiles",
          ],
        },
      },
      {
        questionId: 2,
        question: {
          en: "What are smart contracts?",
          fr: "Que sont les contrats intelligents ?",
        },
        options: {
          en: [
            "Self-executing contracts with the terms in the code",
            "Paper-based contracts",
            "Contracts that require human intervention",
            "Contracts only applicable to real estate",
          ],
          fr: [
            "Des contrats auto-exécutants avec les termes dans le code",
            "Des contrats sur papier",
            "Des contrats nécessitant une intervention humaine",
            "Des contrats uniquement applicables à l'immobilier",
          ],
        },
      },
      {
        questionId: 3,
        question: {
          en: "What can tokens represent on Ethereum?",
          fr: "Que peuvent représenter les jetons sur Ethereum ?",
        },
        options: {
          en: [
            "Assets, voting power, or any form of value",
            "Only physical commodities",
            "Legal documents",
            "Social media accounts",
          ],
          fr: [
            "Des actifs, du pouvoir de vote, ou toute forme de valeur",
            "Uniquement des marchandises physiques",
            "Des documents légaux",
            "Des comptes de médias sociaux",
          ],
        },
      },
      {
        questionId: 4,
        question: {
          en: "What does staking involve in Ethereum?",
          fr: "Que implique le staking sur Ethereum ?",
        },
        options: {
          en: [
            "Participating in the network by locking cryptocurrency to earn rewards",
            "Selling Ethereum tokens",
            "Creating new Ethereum tokens",
            "Transferring tokens between wallets",
          ],
          fr: [
            "Participer au réseau en verrouillant de la cryptomonnaie pour gagner des récompenses",
            "Vendre des jetons Ethereum",
            "Créer de nouveaux jetons Ethereum",
            "Transférer des jetons entre des portefeuilles",
          ],
        },
      },
    ],
  },
  {
    quizId: 12,
    title: "Understand the layers 2",
    questions: [
      {
        questionId: 1,
        question: {
          en: "What are the three properties of a blockchain?",
          fr: "Quels sont les trois propriétés d'une blockchain ?",
        },
        options: {
          en: [
            "Decentralized, secure, scalable",
            "Fast, private, cheap",
            "Centralized, insecure, slow",
            "Scalable, private, cheap",
          ],
          fr: [
            "Décentralisée, sécurisée, scalable",
            "Rapide, privée, bon marché",
            "Centralisée, non sécurisée, lente",
            "Évolutive, privée, bon marché",
          ],
        },
      },
      {
        questionId: 2,
        question: {
          en: "What is the problem called the blockchain trilemma?",
          fr: "Quel est le problème appelé le trilemme de la blockchain ?",
        },
        options: {
          en: [
            "A basic blockchain can only have two of decentralized, secure, scalable",
            "A basic blockchain can have all three aspects",
            "A basic blockchain can have only one aspect",
            "A basic blockchain cannot be secure",
          ],
          fr: [
            "Une blockchain de base ne peut avoir que deux aspects sur trois : décentralisé, sécurisé, évolutive",
            "Une blockchain de base peut avoir les trois aspects",
            "Une blockchain de base peut avoir seulement un aspect",
            "Une blockchain de base ne peut pas être sécurisée",
          ],
        },
      },
      {
        questionId: 3,
        question: {
          en: "What are Layer 2 blockchains mainly built on?",
          fr: "Sur quoi sont construites les blockchains de couche 2 principalement ?",
        },
        options: {
          en: ["Ethereum", "Bitcoin", "Ripple", "Cardano"],
          fr: ["Ethereum", "Bitcoin", "Ripple", "Cardano"],
        },
      },
      {
        questionId: 4,
        question: {
          en: "What are some popular Layer 2 solutions mentioned in the course?",
          fr: "Quelles sont quelques solutions de couche 2 populaires mentionnées dans le cours ?",
        },
        options: {
          en: [
            "Polygon, Arbitrum, Optimism",
            "Bitcoin, Ethereum, Litecoin",
            "Stellar, Dogecoin, Dash",
            "Tezos, EOS, TRON",
          ],
          fr: [
            "Polygon, Arbitrum, Optimism",
            "Bitcoin, Ethereum, Litecoin",
            "Stellar, Dogecoin, Dash",
            "Tezos, EOS, TRON",
          ],
        },
      },
    ],
  },
  {
    quizId: 13,
    title: "Smart Contracts",
    questions: [
      {
        questionId: 1,
        question: {
          en: "What are Smart Contracts?",
          fr: "Qu'est-ce que sont les Contrats Intelligents ?",
        },
        options: {
          en: [
            "Self-executing contracts with code",
            "Contracts signed by smart individuals",
            "Contracts executed manually by lawyers",
            "Contracts without any terms",
          ],
          fr: [
            "Des contrats auto-exécutables avec du code",
            "Des contrats signés par des individus intelligents",
            "Des contrats exécutés manuellement par des avocats",
            "Des contrats sans aucun terme",
          ],
        },
      },
      {
        questionId: 2,
        question: {
          en: "Where do Smart Contracts work?",
          fr: "Où fonctionnent les Contrats Intelligents ?",
        },
        options: {
          en: [
            "On blockchain technology",
            "In traditional legal systems",
            "On social media platforms",
            "In physical contract papers",
          ],
          fr: [
            "Sur la technologie de la blockchain",
            "Dans les systèmes juridiques traditionnels",
            "Sur les plateformes de médias sociaux",
            "Dans des documents de contrat physiques",
          ],
        },
      },
      {
        questionId: 3,
        question: {
          en: "What do Smart Contracts ensure?",
          fr: "Que garantissent les Contrats Intelligents ?",
        },
        options: {
          en: [
            "Trust, transparency, and efficiency",
            "Complexity and confusion",
            "Delays and errors",
            "Interference by intermediaries",
          ],
          fr: [
            "Confiance, transparence et efficacité",
            "Complexité et confusion",
            "Retards et erreurs",
            "Interférence des intermédiaires",
          ],
        },
      },
      {
        questionId: 4,
        question: {
          en: "What challenges do Smart Contracts face?",
          fr: "Quels défis les Contrats Intelligents rencontrent-ils ?",
        },
        options: {
          en: [
            "Security vulnerabilities, legal recognition, scalability, and complexity",
            "Efficiency, trust, transparency",
            "Intermediary involvement, simplicity",
            "Ease of implementation, widespread adoption",
          ],
          fr: [
            "Vulnérabilités de sécurité, reconnaissance légale, évolutivité et complexité",
            "Efficacité, confiance, transparence",
            "Implication des intermédiaires, simplicité",
            "Facilité de mise en œuvre, adoption généralisée",
          ],
        },
      },
    ],
  },
  {
    quizId: 14,
    title: "Introduction to DAOs",
    questions: [
      {
        questionId: 1,
        question: {
          en: "What are DAOs?",
          fr: "Qu'est-ce que sont les DAO ?",
        },
        options: {
          en: [
            "Entities governed by smart contracts and run on blockchain technology",
            "Centralized organizations controlled by governments",
            "Autonomous entities without any governance structure",
            "Entities managed by traditional banking systems",
          ],
          fr: [
            "Des entités gouvernées par des contrats intelligents et fonctionnant sur la technologie de la blockchain",
            "Des organisations centralisées contrôlées par les gouvernements",
            "Des entités autonomes sans aucune structure de gouvernance",
            "Des entités gérées par des systèmes bancaires traditionnels",
          ],
        },
      },
      {
        questionId: 2,
        question: {
          en: "How do DAOs operate?",
          fr: "Comment fonctionnent les DAO ?",
        },
        options: {
          en: [
            "By relying on consensus mechanisms for decision-making",
            "With centralized control",
            "Without any decision-making mechanisms",
            "By avoiding transparency",
          ],
          fr: [
            "En s'appuyant sur des mécanismes de consensus pour la prise de décision",
            "Avec un contrôle centralisé",
            "Sans aucun mécanisme de prise de décision",
            "En évitant la transparence",
          ],
        },
      },
      {
        questionId: 3,
        question: {
          en: "What can participants do in DAOs?",
          fr: "Que peuvent faire les participants dans les DAO ?",
        },
        options: {
          en: [
            "Vote on proposals",
            "Only watch without any participation",
            "Modify smart contracts without consensus",
            "Access centralized control",
          ],
          fr: [
            "Voter sur des propositions",
            "Seulement observer sans aucune participation",
            "Modifier des contrats intelligents sans consensus",
            "Accéder à un contrôle centralisé",
          ],
        },
      },
      {
        questionId: 4,
        question: {
          en: "What are the benefits of DAOs?",
          fr: "Quels sont les avantages des DAO ?",
        },
        options: {
          en: [
            "Promise for various decentralized applications across industries",
            "Increased centralization",
            "Decreased transparency",
            "Limited autonomy",
          ],
          fr: [
            "Promesse pour diverses applications décentralisées dans différents secteurs industriels",
            "Augmentation de la centralisation",
            "Diminution de la transparence",
            "Autonomie limitée",
          ],
        },
      },
    ],
  },
  {
    quizId: 15,
    title: "EVM",
    questions: [
      {
        questionId: 1,
        question: {
          en: "What is the EVM's role within the Ethereum network?",
          fr: "Quel est le rôle de l'EVM au sein du réseau Ethereum ?",
        },
        options: {
          en: [
            "Executing smart contracts",
            "Mining Ethereum",
            "Securing transactions",
            "Managing wallets",
          ],
          fr: [
            "Exécuter les contrats intelligents",
            "Miner Ethereum",
            "Sécuriser les transactions",
            "Gérer les portefeuilles",
          ],
        },
      },
      {
        questionId: 2,
        question: {
          en: "What term is used to describe the unit of computation on the EVM?",
          fr: "Quel terme est utilisé pour décrire l'unité de calcul sur l'EVM ?",
        },
        options: {
          en: ["Gas", "Electricity", "Tokens", "Blocks"],
          fr: ["Gas", "Électricité", "Jetons", "Blocs"],
        },
      },
      {
        questionId: 3,
        question: {
          en: "Which type of applications can run on the Ethereum network using the EVM?",
          fr: "Quel type d'applications peut fonctionner sur le réseau Ethereum en utilisant l'EVM ?",
        },
        options: {
          en: [
            "Decentralized applications (dApps)",
            "Centralized applications",
            "Mobile applications",
            "Web applications",
          ],
          fr: [
            "Applications décentralisées (dApps)",
            "Applications centralisées",
            "Applications mobiles",
            "Applications Web",
          ],
        },
      },
      {
        questionId: 4,
        question: {
          en: "What feature of the EVM makes it capable of executing any computation a Turing machine can?",
          fr: "Quelle fonctionnalité de l'EVM lui permet d'exécuter n'importe quel calcul qu'une machine de Turing peut effectuer ?",
        },
        options: {
          en: [
            "Turing-complete",
            "Turing-incomplete",
            "Fast execution",
            "Parallel processing",
          ],
          fr: [
            "Complétude de Turing",
            "Incomplétude de Turing",
            "Exécution rapide",
            "Traitement parallèle",
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
  {
    quizId: 18,
    title: "Web3 Essentials",
    questions: [
      {
        questionId: 1,
        question: {
          en: "What is Web3 primarily focused on?",
          fr: "Sur quoi se concentre principalement Web3 ?",
        },
        options: {
          en: [
            "Decentralization and control",
            "Centralization and authority",
            "Data consumption",
            "Social media dominance",
          ],
          fr: [
            "La décentralisation et le contrôle",
            "La centralisation et l'autorité",
            "La consommation de données",
            "La domination des réseaux sociaux",
          ],
        },
      },
      {
        questionId: 2,
        question: {
          en: "Which term describes Web2?",
          fr: "Quel terme décrit le Web2 ?",
        },
        options: {
          en: [
            "Big companies and centralized services",
            "Decentralization and control",
            "Freedom and privacy",
            "Interoperability and ownership",
          ],
          fr: [
            "Les grandes entreprises et les services centralisés",
            "La décentralisation et le contrôle",
            "La liberté et la confidentialité",
            "L'interopérabilité et la propriété",
          ],
        },
      },
      {
        questionId: 3,
        question: {
          en: "What is one aspect of Web3 that contrasts with Web2?",
          fr: "Quel est un aspect du Web3 qui contraste avec le Web2 ?",
        },
        options: {
          en: [
            "Ownership of data and identity",
            "Lack of privacy",
            "Dependence on centralized platforms",
            "Limited participation",
          ],
          fr: [
            "La propriété des données et de l'identité",
            "Le manque de confidentialité",
            "La dépendance aux plateformes centralisées",
            "La participation limitée",
          ],
        },
      },
      {
        questionId: 4,
        question: {
          en: "What does Web3 empower individuals to do?",
          fr: "Que permet le Web3 aux individus de faire ?",
        },
        options: {
          en: [
            "Own and shape the fair web",
            "Surrender control to corporations",
            "Be solely consumers",
            "Avoid participation",
          ],
          fr: [
            "Posséder et façonner le web équitable",
            "Donner le contrôle aux entreprises",
            "Être uniquement des consommateurs",
            "Éviter la participation",
          ],
        },
      },
      {
        questionId: 5,
        question: {
          en: "What is one benefit of Web3 for creators?",
          fr: "Quelle est un bénéfice du Web3 pour les créateurs ?",
        },
        options: {
          en: [
            "New ways to monetize their work",
            "Decreased control over their content",
            "Limited opportunities for creativity",
            "Increased reliance on centralized platforms",
          ],
          fr: [
            "De nouvelles façons de monétiser leur travail",
            "Un contrôle diminué sur leur contenu",
            "Des opportunités limitées pour la créativité",
            "Une dépendance accrue aux plateformes centralisées",
          ],
        },
      },
    ],
  },
  {
    quizId: 19,
    title: "Day Trading",
    questions: [
      {
        questionId: 1,
        question: {
          en: "What is the primary activity in day trading?",
          fr: "Quelle est l'activité principale dans le day trading ?",
        },
        options: {
          en: [
            "Making multiple trades within a single day",
            "Long-term investing",
            "Holding assets indefinitely",
            "Speculating on future trends",
          ],
          fr: [
            "Effectuer de multiples transactions en une seule journée",
            "Investissement à long terme",
            "Détenir des actifs indéfiniment",
            "Spéculer sur les tendances futures",
          ],
        },
      },
      {
        questionId: 2,
        question: {
          en: "What is the main goal of day traders?",
          fr: "Quel est l'objectif principal des day traders ?",
        },
        options: {
          en: [
            "Profiting from small price fluctuations",
            "Holding assets for years",
            "Predicting long-term market trends",
            "Avoiding short-term trades",
          ],
          fr: [
            "Tirer profit des petites fluctuations de prix",
            "Détenir des actifs pendant des années",
            "Prédire les tendances du marché à long terme",
            "Éviter les transactions à court terme",
          ],
        },
      },
      {
        questionId: 3,
        question: {
          en: "What historical change has impacted participation in stock trading?",
          fr: "Quel changement historique a impacté la participation au trading boursier ?",
        },
        options: {
          en: [
            "Advancements in technology democratizing access",
            "Increased regulation by governments",
            "Decrease in market volatility",
            "Rise of traditional banking institutions",
          ],
          fr: [
            "Les progrès technologiques démocratisant l'accès",
            "Augmentation de la réglementation par les gouvernements",
            "Baisse de la volatilité du marché",
            "Montée des institutions bancaires traditionnelles",
          ],
        },
      },
      {
        questionId: 4,
        question: {
          en: "What caution should beginners consider before starting day trading?",
          fr: "Quelle prudence les débutants doivent-ils considérer avant de commencer le day trading ?",
        },
        options: {
          en: [
            "Gaining knowledge before starting",
            "Jumping into trading without research",
            "Using all available funds for trading",
            "Ignoring market trends",
          ],
          fr: [
            "Acquérir des connaissances avant de commencer",
            "Se lancer dans le trading sans recherche",
            "Utiliser tous les fonds disponibles pour le trading",
            "Ignorer les tendances du marché",
          ],
        },
      },
      {
        questionId: 5,
        question: {
          en: "What advantage does the cryptocurrency market offer for day trading?",
          fr: "Quel avantage le marché des cryptomonnaies offre-t-il pour le day trading ?",
        },
        options: {
          en: [
            "Operates 24/7 and high volatility",
            "Operates only during business hours",
            "Stable prices with minimal fluctuations",
            "Predictable market movements",
          ],
          fr: [
            "Fonctionne 24h/24 et 7j/7 et haute volatilité",
            "Fonctionne uniquement pendant les heures de travail",
            "Prix stables avec des fluctuations minimales",
            "Mouvements de marché prévisibles",
          ],
        },
      },
      {
        questionId: 6,
        question: {
          en: "What is a key feature of cryptocurrency exchanges for day traders?",
          fr: "Quelle est une caractéristique clé des plateformes d'échange de cryptomonnaies pour les day traders ?",
        },
        options: {
          en: [
            "Transparency and no hidden fees",
            "High fees and lack of transparency",
            "Limited trading hours",
            "Complex trading interfaces",
          ],
          fr: [
            "Transparence et absence de frais cachés",
            "Frais élevés et manque de transparence",
            "Heures de trading limitées",
            "Interfaces de trading complexes",
          ],
        },
      },
    ],
  },
  {
    quizId: 20,
    title: "Censorship Resistance",
    questions: [
      {
        questionId: 1,
        question: {
          en: "What does censorship resistance ensure?",
          fr: "Que garantit la résistance à la censure ?",
        },
        options: {
          en: [
            "Freedom of expression and financial autonomy",
            "Government control over digital transactions",
            "Centralized authority in blockchain networks",
            "Increased censorship by intermediaries",
          ],
          fr: [
            "La liberté d'expression et l'autonomie financière",
            "Le contrôle gouvernemental sur les transactions numériques",
            "L'autorité centralisée dans les réseaux blockchain",
            "Une censure accrue par les intermédiaires",
          ],
        },
      },
      {
        questionId: 2,
        question: {
          en: "What aspect of blockchain determines its censorship resistance?",
          fr: "Quel aspect de la blockchain détermine sa résistance à la censure ?",
        },
        options: {
          en: [
            "Decentralization, immutability, and security",
            "Centralization and flexibility",
            "Government oversight",
            "Public keys",
          ],
          fr: [
            "La décentralisation, l'immutabilité et la sécurité",
            "La centralisation et la flexibilité",
            "La surveillance gouvernementale",
            "Les clés publiques",
          ],
        },
      },
      {
        questionId: 3,
        question: {
          en: "What is the term for the computational power of the network used by miners?",
          fr: "Quel est le terme désignant la puissance de calcul du réseau utilisée par les mineurs ?",
        },
        options: {
          en: ["Hashrate", "Flexibility", "Immutability", "Decentralization"],
          fr: ["Hashrate", "Flexibilité", "Immuabilité", "Décentralisation"],
        },
      },
      {
        questionId: 4,
        question: {
          en: "What risk does a 51% attack pose to a blockchain network?",
          fr: "Quel risque une attaque des 51% pose-t-elle à un réseau blockchain ?",
        },
        options: {
          en: [
            "Compromising transaction integrity",
            "Enhancing network security",
            "Increasing transaction speed",
            "Improving decentralization",
          ],
          fr: [
            "Compromettre l'intégrité des transactions",
            "Améliorer la sécurité du réseau",
            "Augmenter la vitesse des transactions",
            "Améliorer la décentralisation",
          ],
        },
      },
      {
        questionId: 5,
        question: {
          en: "Which blockchain has the highest hashrate, making it highly secure?",
          fr: "Quelle blockchain a le hashrate le plus élevé, la rendant très sécurisée ?",
        },
        options: {
          en: ["Bitcoin", "Ethereum", "Ripple", "Litecoin"],
          fr: ["Bitcoin", "Ethereum", "Ripple", "Litecoin"],
        },
      },
    ],
  },
  {
    quizId: 21,
    title: "Introduction to NFTs",
    questions: [
      {
        questionId: 1,
        question: {
          en: "What do NFTs stand for?",
          fr: "Que signifient les NFTs ?",
        },
        options: {
          en: [
            "Non-Fungible Tokens",
            "Non-Friendly Tokens",
            "New Found Treasures",
            "Never-Fading Tags",
          ],
          fr: [
            "Jetons Non Fongibles",
            "Jetons Non Amicaux",
            "Nouveaux Trésors Trouvés",
            "Étiquettes Jamais Fanées",
          ],
        },
      },
      {
        questionId: 2,
        question: {
          en: "What makes NFTs unique?",
          fr: "Qu'est-ce qui rend les NFTs uniques ?",
        },
        options: {
          en: ["Indivisible", "Divisible", "Interchangeable", "Homogeneous"],
          fr: ["Indivisibles", "Divisibles", "Interchangeables", "Homogènes"],
        },
      },
      {
        questionId: 3,
        question: {
          en: "Which standard is used for NFTs on the Ethereum blockchain?",
          fr: "Quelle norme est utilisée pour les NFTs sur la blockchain Ethereum ?",
        },
        options: {
          en: ["ERC-721", "ERC-20", "ERC-1155", "ERC-666"],
          fr: ["ERC-721", "ERC-20", "ERC-1155", "ERC-666"],
        },
      },
      {
        questionId: 4,
        question: {
          en: "What problem do NFTs solve regarding digital ownership?",
          fr: "Quel problème les NFTs résolvent-ils concernant la propriété numérique ?",
        },
        options: {
          en: [
            "Replication of digital assets",
            "Decrease in digital assets",
            "Loss of digital assets",
            "Leveraging digital assets",
          ],
          fr: [
            "Réplication des actifs numériques",
            "Diminution des actifs numériques",
            "Perte des actifs numériques",
            "Utilisation des actifs numériques",
          ],
        },
      },
      {
        questionId: 5,
        question: {
          en: "What can NFTs be used for?",
          fr: "À quoi peuvent servir les NFTs ?",
        },
        options: {
          en: [
            "All of the answers available",
            "Physical art, payment processing, legal contracts",
            "Social media posts, email encryption, online shopping",
            "Text messaging, video calls, file sharing",
          ],
          fr: [
            "Toutes les réponses disponibles",
            "Art physique, traitement des paiements, contrats juridiques",
            "Publications sur les réseaux sociaux, chiffrement des emails, shopping en ligne",
            "Messages textes, appels vidéo, partage de fichiers",
          ],
        },
      },
    ],
  },
  {
    quizId: 22,
    title: "The halving",
    questions: [
      {
        questionId: 1,
        question: {
          en: "What is Bitcoin?",
          fr: "Qu'est-ce que Bitcoin ?",
        },
        options: {
          en: [
            "A digital currency",
            "A physical coin",
            "A bank account",
            "A stock market",
          ],
          fr: [
            "Une monnaie numérique",
            "Une pièce physique",
            "Un compte bancaire",
            "Un marché boursier",
          ],
        },
      },
      {
        questionId: 2,
        question: {
          en: "How many Bitcoins will ever exist?",
          fr: "Combien de Bitcoins existeront-ils ?",
        },
        options: {
          en: ["21 million", "Unlimited", "100 million", "10 million"],
          fr: ["21 millions", "Illimité", "100 millions", "10 millions"],
        },
      },
      {
        questionId: 3,
        question: {
          en: "What is the purpose of Bitcoin halving?",
          fr: "Quel est le but du halving de Bitcoin ?",
        },
        options: {
          en: [
            "Control the rate of new Bitcoins",
            "Increase inflation",
            "Reduce transaction fees",
            "Boost mining rewards",
          ],
          fr: [
            "Contrôler le taux de nouveaux Bitcoins",
            "Augmenter l'inflation",
            "Réduire les frais de transaction",
            "Augmenter les récompenses minières",
          ],
        },
      },
      {
        questionId: 4,
        question: {
          en: "How often does Bitcoin halving occur?",
          fr: "À quelle fréquence le halving de Bitcoin se produit-il ?",
        },
        options: {
          en: [
            "Approximately every four years",
            "Every year",
            "Every month",
            "Every ten years",
          ],
          fr: [
            "Environ tous les quatre ans",
            "Chaque année",
            "Chaque mois",
            "Tous les dix ans",
          ],
        },
      },
      {
        questionId: 5,
        question: {
          en: "What happens to the mining reward during halving?",
          fr: "Que se passe-t-il avec la récompense minière pendant le halving ?",
        },
        options: {
          en: [
            "It halves",
            "It doubles",
            "It remains the same",
            "It increases",
          ],
          fr: [
            "Elle est réduite de moitié",
            "Elle double",
            "Elle reste la même",
            "Elle augmente",
          ],
        },
      },
    ],
  },
  {
    quizId: 23,
    title: "Price floor",
    questions: [
      {
        questionId: 1,
        question: {
          en: "What is a price floor?",
          fr: "Qu'est-ce qu'un prix plancher?",
        },
        options: {
          en: [
            "The minimum price a seller is willing to accept for an NFT",
            "The maximum price a buyer is willing to pay for an NFT",
            "The average price of an NFT",
            "The fluctuating price of an NFT",
          ],
          fr: [
            "Le prix minimum qu'un vendeur est prêt à accepter pour un NFT",
            "Le prix maximum qu'un acheteur est prêt à payer pour un NFT",
            "Le prix moyen d'un NFT",
            "Le prix fluctuant d'un NFT",
          ],
        },
      },
      {
        questionId: 2,
        question: {
          en: "Why set a price floor for NFTs?",
          fr: "Pourquoi fixer un prix plancher pour les NFTs?",
        },
        options: {
          en: [
            "To protect the value of an NFT",
            "To increase the supply of NFTs",
            "To lower the demand for NFTs",
            "To encourage price fluctuations of NFTs",
          ],
          fr: [
            "Pour protéger la valeur d'un NFT",
            "Pour augmenter l'offre de NFTs",
            "Pour diminuer la demande de NFTs",
            "Pour encourager les fluctuations de prix des NFTs",
          ],
        },
      },
      {
        questionId: 3,
        question: {
          en: "What analogy can be used to explain a price floor?",
          fr: "Quelle analogie peut être utilisée pour expliquer un prix plancher?",
        },
        options: {
          en: [
            "Setting a minimum price to your house to protect its value",
            "Playing a game of cards with friends on the beach",
            "Buying and selling stocks on the stock market",
            "Choosing the best NFT to invest in",
          ],
          fr: [
            "Fixer un prix minimum à votre maison pour protéger sa valeur",
            "Jouer à un jeu de cartes avec des amis sur la plage",
            "Acheter et vendre des actions sur le marché boursier",
            "Choisir le meilleur NFT dans lequel investir",
          ],
        },
      },
    ],
  },
  {
    quizId: 24,
    title: "Soulbound tokens",
    questions: [
      {
        questionId: 1,
        question: {
          en: "What are soulbound tokens?",
          fr: "Qu'est-ce que les jetons soulbound ?",
        },
        options: {
          en: [
            "NFTs locked to a specific account or wallet",
            "Fungible tokens with market value",
            "Cryptocurrencies with high liquidity",
            "Tokens transferable across multiple accounts",
          ],
          fr: [
            "Des NFTs verrouillés sur un compte ou un portefeuille spécifique",
            "Des jetons fongibles avec une valeur marchande",
            "Des cryptomonnaies avec une grande liquidité",
            "Des jetons transférables entre plusieurs comptes",
          ],
        },
      },
      {
        questionId: 2,
        question: {
          en: "What does it mean for a token to be soulbound?",
          fr: "Que signifie pour un jeton d'être soulbound ?",
        },
        options: {
          en: [
            "It cannot be transferred to another account or wallet",
            "It can be freely traded on exchanges",
            "It has high market volatility",
            "It is centrally controlled by an authority",
          ],
          fr: [
            "Il ne peut pas être transféré vers un autre compte ou portefeuille",
            "Il peut être échangé librement sur des plateformes",
            "Il a une forte volatilité sur le marché",
            "Il est contrôlé de manière centralisée par une autorité",
          ],
        },
      },
      {
        questionId: 3,
        question: {
          en: "Why are soulbound tokens used?",
          fr: "Pourquoi utilise-t-on des jetons soulbound ?",
        },
        options: {
          en: [
            "To prevent fraud and protect the value of NFTs",
            "To increase market speculation",
            "To centralize ownership of cryptocurrencies",
            "To facilitate token transfers between accounts",
          ],
          fr: [
            "Pour prévenir la fraude et protéger la valeur des NFTs",
            "Pour augmenter la spéculation sur le marché",
            "Pour centraliser la propriété des cryptomonnaies",
            "Pour faciliter les transferts de jetons entre les comptes",
          ],
        },
      },
      {
        questionId: 4,
        question: {
          en: "How are soulbound tokens created?",
          fr: "Comment sont créés les jetons soulbound ?",
        },
        options: {
          en: [
            "By overriding the transfer function in the smart contract",
            "By minting them on centralized exchanges",
            "By conducting airdrops to token holders",
            "By distributing them through decentralized governance",
          ],
          fr: [
            "En remplaçant la fonction de transfert dans le smart contract",
            "En les émettant sur des plateformes centralisées",
            "En effectuant des airdrops aux détenteurs de jetons",
            "En les distribuant via la gouvernance décentralisée",
          ],
        },
      },
    ],
  },
  {
    quizId: 25,
    title: "Types of DAOs",
    questions: [
      {
        questionId: 1,
        question: {
          en: "What is the main responsibility of Operating system DAOs?",
          fr: "Quelle est la principale responsabilité des DAOs de système d'exploitation?",
        },
        options: {
          en: [
            "Creating, managing, and executing smart contracts",
            "Creating and managing decentralized applications",
            "Creating the underlying protocol of the blockchain",
            "Collecting data for investment decisions",
          ],
          fr: [
            "Créer, gérer et exécuter des contrats intelligents",
            "Créer et gérer des applications décentralisées",
            "Créer le protocole sous-jacent de la blockchain",
            "Collecter des données pour les décisions d'investissement",
          ],
        },
      },
      {
        questionId: 2,
        question: {
          en: "Which DAO type is responsible for creating dApps?",
          fr: "Quel type de DAO est responsable de la création de dApps?",
        },
        options: {
          en: [
            "Application DAOs",
            "Operating system DAOs",
            "Protocol DAOs",
            "Media DAOs",
          ],
          fr: [
            "DAOs d'application",
            "DAOs de système d'exploitation",
            "DAOs de protocole",
            "DAOs de médias",
          ],
        },
      },
      {
        questionId: 3,
        question: {
          en: "What do Collector DAOs collect?",
          fr: "Que collectent les DAOs de collecte?",
        },
        options: {
          en: [
            "Data from surveys or social media",
            "Funds for investment",
            "Content for collaboration",
            "Decisions affecting the community",
          ],
          fr: [
            "Des données provenant d'enquêtes ou de réseaux sociaux",
            "Des fonds pour l'investissement",
            "Du contenu pour la collaboration",
            "Des décisions affectant la communauté",
          ],
        },
      },
      {
        questionId: 4,
        question: {
          en: "What is the main purpose of Social DAOs?",
          fr: "Quel est le but principal des DAOs sociaux?",
        },
        options: {
          en: [
            "Allowing community voting on decisions",
            "Creating decentralized applications",
            "Managing investment funds",
            "Collecting data for product investment",
          ],
          fr: [
            "Permettre le vote communautaire sur les décisions",
            "Créer des applications décentralisées",
            "Gérer les fonds d'investissement",
            "Collecter des données pour l'investissement produit",
          ],
        },
      },
    ],
  },
  {
    quizId: 26,
    title: "Terra Luna crash",
    questions: [
      {
        questionId: 1,
        question: {
          en: "What was Terra Luna primarily used for?",
          fr: "Pour quoi Terra Luna était principalement utilisée?",
        },
        options: {
          en: [
            "Algorithmic stablecoin issuance",
            "Decentralized finance trading",
            "Smart contract development",
            "Cloud computing services",
          ],
          fr: [
            "L'émission de stablecoins algorithmiques",
            "Le trading dans la finance décentralisée",
            "Le développement de contrats intelligents",
            "Les services d'informatique cloud",
          ],
        },
      },
      {
        questionId: 2,
        question: {
          en: "Who was one of the founders of Terra Luna?",
          fr: "Qui était un des fondateurs de Terra Luna?",
        },
        options: {
          en: ["Do Kwon", "Satoshi Nakamoto", "Vitalik Buterin", "Charlie Lee"],
          fr: ["Do Kwon", "Satoshi Nakamoto", "Vitalik Buterin", "Charlie Lee"],
        },
      },
      {
        questionId: 3,
        question: {
          en: "What was the native token of Terra Luna?",
          fr: "Quel était le jeton natif de Terra Luna?",
        },
        options: {
          en: ["LUNA", "BTC", "UST", "ADA"],
          fr: ["LUNA", "BTC", "UST", "ADA"],
        },
      },
      {
        questionId: 4,
        question: {
          en: "Which protocol had over $2 billion worth of UST unstaked on 7th May?",
          fr: "Quel protocole avait plus de 2 milliards de dollars d'UST retirés le 7 mai?",
        },
        options: {
          en: ["Anchor Protocol", "Mirror Protocol", "Pylon", "MakerDAO"],
          fr: ["Anchor Protocol", "Mirror Protocol", "Pylon", "MakerDAO"],
        },
      },
    ],
  },
  {
    quizId: 27,
    title: "5 Cognitive Biases",
    questions: [
      {
        questionId: 1,
        question: {
          en: "What is the Confirmation Bias?",
          fr: "Qu'est-ce que le Biais de confirmation ?",
        },
        options: {
          en: [
            "Seeking and interpreting information to confirm existing beliefs",
            "Seeking and interpreting information to challenge existing beliefs",
            "Ignoring all evidence",
            "Randomly selecting information",
          ],
          fr: [
            "Chercher et interpréter l'information pour confirmer ses croyances existantes",
            "Chercher et interpréter l'information pour remettre en question ses croyances existantes",
            "Ignorer toutes les preuves",
            "Sélectionner l'information au hasard",
          ],
        },
      },
      {
        questionId: 2,
        question: {
          en: "What is Overconfidence Bias?",
          fr: "Qu'est-ce que le Biais de surconfiance ?",
        },
        options: {
          en: [
            "Overestimating predictive abilities and decision-making skills",
            "Underestimating predictive abilities and decision-making skills",
            "Avoiding making any decisions",
            "Relying solely on others' decisions",
          ],
          fr: [
            "Surestimer ses capacités prédictives et ses compétences en matière de prise de décision",
            "Sous-estimer ses capacités prédictives et ses compétences en matière de prise de décision",
            "Éviter de prendre des décisions",
            "Se fier uniquement aux décisions des autres",
          ],
        },
      },
      {
        questionId: 3,
        question: {
          en: "What is Anchoring Bias?",
          fr: "Qu'est-ce que le Biais d'ancrage ?",
        },
        options: {
          en: [
            "Excessively relying on the first information received",
            "Ignoring all information received",
            "Randomly selecting information",
            "Selecting the last information received",
          ],
          fr: [
            "S'appuyer excessivement sur les premières informations reçues",
            "Ignorer toutes les informations reçues",
            "Sélectionner l'information au hasard",
            "Sélectionner la dernière information reçue",
          ],
        },
      },
      {
        questionId: 4,
        question: {
          en: "What is Loss Aversion Bias?",
          fr: "Qu'est-ce que le Biais d'aversion aux pertes ?",
        },
        options: {
          en: [
            "Tendency to avoid losses more than seeking gains",
            "Tendency to seek gains more than avoiding losses",
            "Tendency to ignore both gains and losses",
            "Tendency to randomly choose between gains and losses",
          ],
          fr: [
            "Tendance à éviter les pertes plutôt qu'à rechercher des gains",
            "Tendance à rechercher des gains plutôt qu'à éviter les pertes",
            "Tendance à ignorer à la fois les gains et les pertes",
            "Tendance à choisir au hasard entre les gains et les pertes",
          ],
        },
      },
    ],
  },
  {
    quizId: 28,
    title: "Dollar Cost Averaging",
    questions: [
      {
        questionId: 1,
        question: {
          en: "What is Dollar Cost Averaging?",
          fr: "Qu'est-ce que le Dollar Cost Averaging?",
        },
        options: {
          en: [
            "An investment strategy where you invest regardless of the price of the asset",
            "A strategy of timing the market to maximize profits",
            "An approach that requires constant monitoring of market fluctuations",
            "A method that involves investing only when prices are high",
          ],
          fr: [
            "Une stratégie d'investissement où vous investissez indépendamment du prix de l'actif",
            "Une stratégie de timing du marché pour maximiser les profits",
            "Une approche qui nécessite une surveillance constante des fluctuations du marché",
            "Une méthode qui implique d'investir uniquement lorsque les prix sont élevés",
          ],
        },
      },
      {
        questionId: 2,
        question: {
          en: "How does Dollar Cost Averaging work?",
          fr: "Comment fonctionne le Dollar Cost Averaging?",
        },
        options: {
          en: [
            "Instead of trying to time the market, you invest consistently",
            "By waiting for the perfect moment to invest, irrespective of market conditions",
            "By investing randomly without any fixed schedule",
            "By investing only when prices are at their peak",
          ],
          fr: [
            "Au lieu d'essayer de timer le marché, vous investissez de manière constante",
            "En attendant le moment parfait pour investir, indépendamment des conditions du marché",
            "En investissant de manière aléatoire sans aucun calendrier fixe",
            "En investissant uniquement lorsque les prix sont au plus haut",
          ],
        },
      },
      {
        questionId: 3,
        question: {
          en: "How can DCA help?",
          fr: "Comment le DCA peut-il aider?",
        },
        options: {
          en: [
            "The idea is to reduce the impact of market volatility",
            "To maximize short-term gains",
            "To minimize long-term investment growth",
            "To increase exposure to market fluctuations",
          ],
          fr: [
            "L'idée est de réduire l'impact de la volatilité du marché",
            "Pour maximiser les gains à court terme",
            "Pour minimiser la croissance des investissements à long terme",
            "Pour augmenter l'exposition aux fluctuations du marché",
          ],
        },
      },
      {
        questionId: 4,
        question: {
          en: "How to start with DCA?",
          fr: "Comment commencer avec le DCA?",
        },
        options: {
          en: [
            "Determine how much you want to invest and how often",
            "Start investing without any planning",
            "Invest only when market conditions seem favorable",
            "Wait for the market to stabilize before making any investment",
          ],
          fr: [
            "Déterminez combien vous voulez investir et à quelle fréquence",
            "Commencez à investir sans aucune planification",
            "Investissez uniquement lorsque les conditions du marché semblent favorables",
            "Attendez que le marché se stabilise avant de faire un investissement",
          ],
        },
      },
    ],
  },
  {
    quizId: 29,
    title: "Airdrops",
    questions: [
      {
        questionId: 1,
        question: {
          en: "What are airdrops?",
          fr: "Qu'est-ce que les airdrops ?",
        },
        options: {
          en: [
            "Free token distributions to users",
            "Weather phenomena",
            "Discounts on online purchases",
            "Airplane package deliveries",
          ],
          fr: [
            "Distributions gratuites de tokens aux utilisateurs",
            "Phénomènes météorologiques",
            "Réductions sur les achats en ligne",
            "Livraisons de colis par avion",
          ],
        },
      },
      {
        questionId: 2,
        question: {
          en: "Why do projects conduct airdrops?",
          fr: "Pourquoi les projets organisent-ils des airdrops ?",
        },
        options: {
          en: [
            "To reward loyal users and increase visibility",
            "To predict weather patterns",
            "To reduce project expenses",
            "To increase the token price",
          ],
          fr: [
            "Pour récompenser les utilisateurs fidèles et augmenter la visibilité",
            "Pour prédire les modèles météorologiques",
            "Pour réduire les dépenses du projet",
            "Pour augmenter le prix du token",
          ],
        },
      },
      {
        questionId: 3,
        question: {
          en: "What was the Uniswap airdrop?",
          fr: "Quel était l'airdrop de Uniswap ?",
        },
        options: {
          en: [
            "Distribution of 400 UNI tokens to platform users",
            "Launching metaverse event",
            "Jumping from an airplane called Uniswap",
            "Creating a Uniswap-themed video game",
          ],
          fr: [
            "Distribution de 400 tokens UNI aux utilisateurs de la plateforme",
            "Lancement d'un événement métavers",
            "Sauter d'un avion appelé Uniswap",
            "Création d'un jeu vidéo sur le thème de Uniswap",
          ],
        },
      },
      {
        questionId: 4,
        question: {
          en: "What should users be cautious of regarding airdrops?",
          fr: "Sur quoi les utilisateurs devraient-ils être prudents concernant les airdrops ?",
        },
        options: {
          en: [
            "Scams and valueless tokens",
            "Overwhelming generosity",
            "Predictable weather forecasts",
            "Indiscriminate airdrop acceptance",
          ],
          fr: [
            "Les scams et les tokens sans valeur",
            "La générosité écrasante",
            "Les prévisions météorologiques prévisibles",
            "L'acceptation indiscriminée des airdrops",
          ],
        },
      },
    ],
  },
  {
    quizId: 30,
    title: "ENS - Ethereum Name Service",
    questions: [
      {
        questionId: 1,
        question: {
          en: "What does ENS stand for?",
          fr: "Que signifie ENS ?",
        },
        options: {
          en: [
            "Ethereum Name Service",
            "Ethereum Naming System",
            "Ethereum Network Service",
            "Ethereum Naming Software",
          ],
          fr: [
            "Ethereum Name Service",
            "Ethereum Naming System",
            "Ethereum Network Service",
            "Ethereum Naming Software",
          ],
        },
      },
      {
        questionId: 2,
        question: {
          en: "What does ENS protocol do?",
          fr: "Que fait le protocole ENS ?",
        },
        options: {
          en: [
            "Link Ethereum addresses with domain names",
            "Replaces domain names with Ethereum addresses",
            "Encrypts Ethereum addresses",
            "Sends funds to IP addresses",
          ],
          fr: [
            "Lie les adresses Ethereum avec des noms de domaine",
            "Remplace les noms de domaine par des adresses Ethereum",
            "Crypte les adresses Ethereum",
            "Envoie des fonds aux adresses IP",
          ],
        },
      },
      {
        questionId: 3,
        question: {
          en: "What is an analogy for ENS?",
          fr: "Quelle est l'analogie pour ENS ?",
        },
        options: {
          en: ["DNS", "HTTP", "TCP", "IP"],
          fr: ["DNS", "HTTP", "TCP", "IP"],
        },
      },
      {
        questionId: 4,
        question: {
          en: "What is the main benefit of using ENS?",
          fr: "Quel est le principal avantage d'utiliser ENS ?",
        },
        options: {
          en: [
            "Easier to remember and write domain names",
            "Increased security",
            "Faster transaction times",
            "Higher transaction fees",
          ],
          fr: [
            "Plus facile à retenir et à écrire des noms de domaine",
            "Sécurité accrue",
            "Temps de transaction plus rapide",
            "Frais de transaction plus élevés",
          ],
        },
      },
      {
        questionId: 5,
        question: {
          en: "How can you receive funds using ENS?",
          fr: "Comment pouvez-vous recevoir des fonds en utilisant ENS ?",
        },
        options: {
          en: [
            "By linking an ENS domain name to your Ethereum address",
            "By encrypting your Ethereum address",
            "By sharing your IP address",
            "By using HTTP protocol",
          ],
          fr: [
            "En liant un nom de domaine ENS à votre adresse Ethereum",
            "En cryptant votre adresse Ethereum",
            "En partageant votre adresse IP",
            "En utilisant le protocole HTTP",
          ],
        },
      },
    ],
  },
  {
    quizId: 31,
    title: "IPFS - InterPlanetary File System",
    questions: [
      {
        questionId: 1,
        question: {
          en: "What does IPFS stand for?",
          fr: "Que signifie IPFS ?",
        },
        options: {
          en: [
            "InterPlanetary File System",
            "Internet Protocol File Storage",
            "Integrated Personal File System",
            "International Protocol File Server",
          ],
          fr: [
            "Système de Fichier InterPlanétaire",
            "Stockage de Fichiers par Protocole Internet",
            "Système de Fichiers Personnel Intégré",
            "Serveur de Fichiers par Protocole International",
          ],
        },
      },
      {
        questionId: 2,
        question: {
          en: "How are files stored in IPFS?",
          fr: "Comment les fichiers sont-ils stockés dans IPFS ?",
        },
        options: {
          en: [
            "By dividing them into pieces and storing on different nodes",
            "By encrypting them and storing on centralized servers",
            "By compressing them and storing on cloud servers",
            "By converting them into binary code and storing on blockchain",
          ],
          fr: [
            "En les divisant en morceaux et en les stockant sur différents nœuds",
            "En les cryptant et en les stockant sur des serveurs centralisés",
            "En les compressant et en les stockant sur des serveurs cloud",
            "En les convertissant en code binaire et en les stockant sur la blockchain",
          ],
        },
      },
      {
        questionId: 3,
        question: {
          en: "How do you find a file in IPFS?",
          fr: "Comment retrouver un fichier dans IPFS ?",
        },
        options: {
          en: [
            "By knowing its hash",
            "By searching for its URL",
            "By entering its filename",
            "By using its encryption key",
          ],
          fr: [
            "En connaissant son hash",
            "En recherchant son URL",
            "En entrant son nom de fichier",
            "En utilisant sa clé de cryptage",
          ],
        },
      },
      {
        questionId: 4,
        question: {
          en: "What is the main advantage of using IPFS?",
          fr: "Quel est le principal avantage d'utiliser IPFS ?",
        },
        options: {
          en: [
            "Decentralized file storage",
            "Centralized file storage",
            "Faster data transfer speed",
            "Higher encryption level",
          ],
          fr: [
            "Stockage de fichiers décentralisé",
            "Stockage de fichiers centralisé",
            "Vitesse de transfert de données plus rapide",
            "Niveau de cryptage plus élevé",
          ],
        },
      },
    ],
  },
  {
    quizId: 32,
    title: "The 5 Trading Rules",
    questions: [
      {
        questionId: 1,
        question: {
          en: "What is the primary purpose of risk management in trading?",
          fr: "Quel est le but principal de la gestion du risque en trading?",
        },
        options: {
          en: [
            "To protect your capital and avoid significant losses",
            "To maximize your trade volume",
            "To ensure quick profits",
            "To eliminate all trading risks",
          ],
          fr: [
            "Protéger votre capital et éviter des pertes importantes",
            "Maximiser votre volume de trade",
            "Assurer des profits rapides",
            "Éliminer tous les risques de trading",
          ],
        },
      },
      {
        questionId: 2,
        question: {
          en: "What is the recommended maximum percentage of your capital to risk per trade?",
          fr: "Quel est le pourcentage maximum recommandé de votre capital à risquer par trade?",
        },
        options: {
          en: ["2%", "5%", "10%", "15%"],
          fr: ["2%", "5%", "10%", "15%"],
        },
      },
      {
        questionId: 3,
        question: {
          en: "What does a Stop Loss order do?",
          fr: "Que fait un ordre Stop Loss?",
        },
        options: {
          en: [
            "Limits losses by automatically selling a position",
            "Increases profit by buying more shares",
            "Closes a position at the highest price",
            "Reopens a closed position",
          ],
          fr: [
            "Limite les pertes en vendant automatiquement une position",
            "Augmente le profit en achetant plus d'actions",
            "Ferme une position au prix le plus élevé",
            "Rouvre une position fermée",
          ],
        },
      },
      {
        questionId: 4,
        question: {
          en: "What is the benefit of diversification in trading?",
          fr: "Quel est l'avantage de la diversification en trading?",
        },
        options: {
          en: [
            "Reduces the impact of a loss on your entire portfolio",
            "Increases the chance of quick profits",
            "Focuses your investment on a single asset",
            "Eliminates all trading risks",
          ],
          fr: [
            "Réduit l'impact d'une perte sur l'ensemble de votre portefeuille",
            "Augmente la chance de profits rapides",
            "Concentre votre investissement sur un seul actif",
            "Élimine tous les risques de trading",
          ],
        },
      },
      {
        questionId: 5,
        question: {
          en: "What risk/reward ratio is recommended to limit losses and maximize gains?",
          fr: "Quel ratio risque/rendement est recommandé pour limiter les pertes et maximiser les gains?",
        },
        options: {
          en: ["1:2", "1:1", "4:1", "1:3"],
          fr: ["1:2", "1:1", "4:1", "1:3"],
        },
      },
    ],
  },
  {
    quizId: 33,
    title: "USDC by Circle",
    questions: [
      {
        questionId: 1,
        question: {
          en: "What is USDC?",
          fr: "Qu'est-ce que l'USDC ?",
        },
        options: {
          en: [
            "A stablecoin issued by Circle",
            "A cryptocurrency mining tool",
            "A blockchain technology",
            "A type of financial service",
          ],
          fr: [
            "Un stablecoin émis par Circle",
            "Un outil de minage de cryptomonnaie",
            "Une technologie blockchain",
            "Un type de service financier",
          ],
        },
      },
      {
        questionId: 2,
        question: {
          en: "How is the value of USDC maintained?",
          fr: "Comment la valeur de l'USDC est-elle maintenue ?",
        },
        options: {
          en: [
            "Based on a reserve of US dollars and US Treasury bonds",
            "Through cryptocurrency mining",
            "By government regulation",
            "Using a decentralized network",
          ],
          fr: [
            "Basée sur une réserve de dollars américains et de bons du Trésor américain",
            "Par le minage de cryptomonnaies",
            "Par la réglementation gouvernementale",
            "En utilisant un réseau décentralisé",
          ],
        },
      },
      {
        questionId: 3,
        question: {
          en: "What can you do with USDC?",
          fr: "Que pouvez-vous faire avec l'USDC ?",
        },
        options: {
          en: [
            "Use it for stable, secure, and fast digital payments",
            "Use it for long-term investments only",
            "Mine other cryptocurrencies",
            "Convert it into stocks",
          ],
          fr: [
            "L'utiliser pour des paiements numériques stables, sécurisés et rapides",
            "L'utiliser uniquement pour des investissements à long terme",
            "Miner d'autres cryptomonnaies",
            "Le convertir en actions",
          ],
        },
      },
      {
        questionId: 4,
        question: {
          en: "Who manages USDC?",
          fr: "Qui gère l'USDC ?",
        },
        options: {
          en: [
            "The Centre consortium, including Circle and Coinbase",
            "A single central bank",
            "A decentralized network of miners",
            "A private investment firm",
          ],
          fr: [
            "Le consortium Centre, incluant Circle et Coinbase",
            "Une banque centrale unique",
            "Un réseau décentralisé de mineurs",
            "Une entreprise d'investissement privée",
          ],
        },
      },
    ],
  },
  {
    quizId: 34,
    title: "Snapshot Protocol",
    questions: [
      {
        questionId: 1,
        question: {
          en: "What is Snapshot?",
          fr: "Qu'est-ce que Snapshot ?",
        },
        options: {
          en: [
            "A decentralized governance tool for voting on proposals",
            "A social media platform",
            "A cryptocurrency exchange",
            "A blockchain explorer",
          ],
          fr: [
            "Un outil de gouvernance décentralisée pour voter sur des propositions",
            "Une plateforme de médias sociaux",
            "Un échange de cryptomonnaie",
            "Un explorateur de blockchain",
          ],
        },
      },
      {
        questionId: 2,
        question: {
          en: "Why is Snapshot important?",
          fr: "Pourquoi Snapshot est-il important ?",
        },
        options: {
          en: [
            "It gives the community a voice in decision-making in a decentralized way",
            "It offers free tokens to users",
            "It tracks cryptocurrency prices",
            "It provides technical analysis tools",
          ],
          fr: [
            "Il donne la parole à la communauté pour prendre des décisions de manière décentralisée",
            "Il offre des jetons gratuits aux utilisateurs",
            "Il suit les prix des cryptomonnaies",
            "Il fournit des outils d'analyse technique",
          ],
        },
      },
      {
        questionId: 3,
        question: {
          en: "Which projects use Snapshot?",
          fr: "Quels projets utilisent Snapshot ?",
        },
        options: {
          en: [
            "Uniswap, Yearn Finance, Aave",
            "Facebook, Google, Amazon",
            "Microsoft, Apple, IBM",
            "Tesla, SpaceX, Blue Origin",
          ],
          fr: [
            "Uniswap, Yearn Finance, Aave",
            "Facebook, Google, Amazon",
            "Microsoft, Apple, IBM",
            "Tesla, SpaceX, Blue Origin",
          ],
        },
      },
      {
        questionId: 4,
        question: {
          en: "How can users follow votes?",
          fr: "Comment les utilisateurs peuvent-ils suivre les votes ?",
        },
        options: {
          en: [
            "By subscribing to spaces on the Snapshot website",
            "By checking their email",
            "Through a mobile app only",
            "By attending weekly meetings",
          ],
          fr: [
            "En s'abonnant à des espaces sur le site de Snapshot",
            "En vérifiant leur e-mail",
            "Uniquement via une application mobile",
            "En assistant à des réunions hebdomadaires",
          ],
        },
      },
      {
        questionId: 5,
        question: {
          en: "What can a project decide regarding vote privacy?",
          fr: "Que peut décider un projet concernant la confidentialité des votes ?",
        },
        options: {
          en: [
            "To hide the vote result until the end of the voting period",
            "To require ID verification to view results",
            "To require a password for viewing results",
            "To send results via SMS",
          ],
          fr: [
            "Cacher le résultat des votes jusqu'à la fin de la période de vote",
            "Exiger de donner sa carte d'identité pour voir les résultats",
            "Exiger un mot de passe pour voir les résultats",
            "Envoyer les résultats par SMS",
          ],
        },
      },
    ],
  },
  {
    title: "Fundamental Analysis",
    quizId: 35,
    questions: [
      {
        questionId: 1,
        question: {
          en: "What is fundamental analysis?",
          fr: "Qu'est-ce que l'analyse fondamentale?",
        },
        options: {
          en: [
            "A method of evaluating stocks by studying a company's financial and economic data",
            "A method of technical chart analysis",
            "A way to speculate on short-term price movements",
            "An investment strategy based on market sentiment",
          ],
          fr: [
            "Une méthode d'évaluation des actions en étudiant les données financières et économiques d'une entreprise",
            "Une méthode d'analyse technique des graphiques",
            "Un moyen de spéculer sur les mouvements de prix à court terme",
            "Une stratégie d'investissement basée sur le sentiment du marché",
          ],
        },
      },
      {
        questionId: 2,
        question: {
          en: "Which of these is a key indicator in fundamental analysis?",
          fr: "Lequel de ces indicateurs est un indicateur clé dans l'analyse fondamentale?",
        },
        options: {
          en: [
            "Price-to-earnings ratio",
            "Moving average",
            "Relative strength index",
            "Bollinger bands",
          ],
          fr: [
            "Le ratio cours/bénéfice",
            "La moyenne mobile",
            "L'indice de force relative",
            "Les bandes de Bollinger",
          ],
        },
      },
      {
        questionId: 3,
        question: {
          en: "What does revenue represent in fundamental analysis?",
          fr: "Que représente le chiffre d'affaires dans l'analyse fondamentale?",
        },
        options: {
          en: [
            "The total amount of sales a company makes over a given period",
            "The amount of profit after all expenses",
            "The current market value of the company",
            "The amount of dividends paid to shareholders",
          ],
          fr: [
            "Le montant total des ventes d'une entreprise sur une période donnée",
            "Le montant du bénéfice après toutes les dépenses",
            "La valeur marchande actuelle de l'entreprise",
            "Le montant des dividendes versés aux actionnaires",
          ],
        },
      },
      {
        questionId: 4,
        question: {
          en: "Why is net income important in fundamental analysis?",
          fr: "Pourquoi le bénéfice net est-il important dans l'analyse fondamentale?",
        },
        options: {
          en: [
            "It assesses the company's profitability",
            "It shows the company's revenue growth",
            "It indicates the company's market value",
            "It reflects the company's dividend yield",
          ],
          fr: [
            "Il évalue la rentabilité de l'entreprise",
            "Il montre la croissance des revenus de l'entreprise",
            "Il indique la valeur marchande de l'entreprise",
            "Il reflète le rendement des dividendes de l'entreprise",
          ],
        },
      },
      {
        questionId: 5,
        question: {
          en: "What is the price-to-earnings ratio used for?",
          fr: "À quoi sert le ratio cours/bénéfice?",
        },
        options: {
          en: [
            "To assess if a stock is overvalued or undervalued",
            "To measure the company's revenue",
            "To calculate the company's profit margins",
            "To determine the amount of dividends paid",
          ],
          fr: [
            "Pour évaluer si une action est surévaluée ou sous-évaluée",
            "Pour mesurer le chiffre d'affaires de l'entreprise",
            "Pour calculer les marges bénéficiaires de l'entreprise",
            "Pour déterminer le montant des dividendes versés",
          ],
        },
      },
    ],
  },
  {
    quizId: 36,
    title: "Bonds vs Stocks",
    questions: [
      {
        questionId: 1,
        question: {
          en: "What is a characteristic of stocks?",
          fr: "Quelle est une caractéristique des actions ?",
        },
        options: {
          en: [
            "They represent ownership in a company",
            "They offer fixed interest payments",
            "They are issued by governments",
            "They have a maturity date",
          ],
          fr: [
            "Elles représentent une part de propriété dans une entreprise",
            "Elles offrent des paiements d'intérêts fixes",
            "Elles sont émises par des gouvernements",
            "Elles ont une date d'échéance",
          ],
        },
      },
      {
        questionId: 2,
        question: {
          en: "Which type of investment generally offers higher liquidity?",
          fr: "Quel type d'investissement offre généralement une plus grande liquidité ?",
        },
        options: {
          en: ["Stocks", "Bonds", "Real Estate", "Commodities"],
          fr: [
            "Les actions",
            "Les obligations",
            "L'immobilier",
            "Les matières premières",
          ],
        },
      },
      {
        questionId: 3,
        question: {
          en: "What is a bond?",
          fr: "Qu'est-ce qu'une obligation ?",
        },
        options: {
          en: [
            "A debt security issued by a company or government",
            "An ownership stake in a company",
            "A physical asset like property",
            "A type of insurance policy",
          ],
          fr: [
            "Un titre de créance émis par une entreprise ou un gouvernement",
            "Une part de propriété dans une entreprise",
            "Un actif physique comme un bien immobilier",
            "Un type de police d'assurance",
          ],
        },
      },
      {
        questionId: 4,
        question: {
          en: "What happens to bondholders if a company goes bankrupt?",
          fr: "Que se passe-t-il pour les détenteurs d'obligations si une entreprise fait faillite ?",
        },
        options: {
          en: [
            "They are repaid first before shareholders",
            "They lose all their money",
            "They receive dividends",
            "They gain ownership of company assets",
          ],
          fr: [
            "Ils sont remboursés en priorité avant les actionnaires",
            "Ils perdent tout leur argent",
            "Ils reçoivent des dividendes",
            "Ils deviennent propriétaires des actifs de l'entreprise",
          ],
        },
      },
      {
        questionId: 5,
        question: {
          en: "What is the primary risk associated with stocks?",
          fr: "Quel est le principal risque associé aux actions ?",
        },
        options: {
          en: [
            "Market fluctuations",
            "Fixed interest rates",
            "Low liquidity",
            "Government regulations",
          ],
          fr: [
            "Les fluctuations du marché",
            "Les taux d'intérêt fixes",
            "La faible liquidité",
            "Les réglementations gouvernementales",
          ],
        },
      },
    ],
  },
  {
    quizId: 37,
    title: "The Metaverse",
    questions: [
      {
        questionId: 1,
        question: {
          en: "What is the metaverse?",
          fr: "Qu'est-ce que le metaverse?",
        },
        options: {
          en: [
            "A virtual universe with interaction",
            "A type of cryptocurrency",
            "A new social media platform",
            "A virtual reality headset",
          ],
          fr: [
            "Un univers virtuel avec des intéractions",
            "Un type de cryptomonnaie",
            "Une nouvelle plateforme de médias sociaux",
            "Un casque de réalité virtuelle",
          ],
        },
      },
      {
        questionId: 2,
        question: {
          en: "What do NFTs allow users to do in the metaverse?",
          fr: "Que permettent de faire les NFTs dans le metaverse?",
        },
        options: {
          en: [
            "Own an item in a video game or even virtual land",
            "Mine cryptocurrency",
            "Access exclusive social media features",
            "Control the blockchain",
          ],
          fr: [
            "Posséder un item dans un jeu vidéo ou même un terrain virtuel",
            "Miner de la cryptomonnaie",
            "Accéder à des fonctionnalités exclusives des médias sociaux",
            "Contrôler la blockchain",
          ],
        },
      },
      {
        questionId: 3,
        question: {
          en: "How are some companies utilizing the metaverse for work?",
          fr: "Comment certaines entreprises utilisent-elles le metaverse pour le travail?",
        },
        options: {
          en: [
            "Creating virtual offices for employees to work",
            "Developing new email systems",
            "Building physical office spaces",
            "Organizing outdoor team-building activities",
          ],
          fr: [
            "Créer des bureaux virtuels où les employés peuvent travailler",
            "Développer de nouveaux systèmes de messagerie électronique",
            "Construire des espaces de bureaux physiques",
            "Organiser des activités de team-building en plein air",
          ],
        },
      },
      {
        questionId: 5,
        question: {
          en: "How is the metaverse blending into the real world?",
          fr: "Comment le metaverse se fond-il dans le monde réel?",
        },
        options: {
          en: [
            "Through augmented reality",
            "By replacing physical stores",
            "With new social media platforms",
            "By eliminating physical workspaces",
          ],
          fr: [
            "Grâce à la réalité augmentée",
            "En remplaçant les magasins physiques",
            "Avec de nouvelles plateformes de médias sociaux",
            "En éliminant les espaces de travail physiques",
          ],
        },
      },
    ],
  },
  {
    quizId: 38,
    title: "Oracles",
    questions: [
      {
        questionId: 1,
        question: {
          en: "What is the main function of an oracle in the blockchain?",
          fr: "Quelle est la fonction principale d'un oracle dans la blockchain?",
        },
        options: {
          en: [
            "To provide external data to the blockchain",
            "To create new cryptocurrencies",
            "To verify transactions",
            "To mine blocks",
          ],
          fr: [
            "Fournir des données externes à la blockchain",
            "Créer de nouvelles crypto-monnaies",
            "Vérifier les transactions",
            "Miner des blocs",
          ],
        },
      },
      {
        questionId: 2,
        question: {
          en: "Which of the following is a main oracle provider in the market?",
          fr: "Lequel des suivants est un principal fournisseur d'oracles sur le marché?",
        },
        options: {
          en: ["Chainlink", "Ethereum", "Bitcoin", "Ripple"],
          fr: ["Chainlink", "Ethereum", "Bitcoin", "Ripple"],
        },
      },
      {
        questionId: 3,
        question: {
          en: "What is an API in the context of oracles?",
          fr: "Qu'est-ce qu'une API dans le contexte des oracles?",
        },
        options: {
          en: [
            "A set of rules that allow programs to communicate and exchange data",
            "A programming language",
            "A type of smart contract",
            "A blockchain consensus algorithm",
          ],
          fr: [
            "Un ensemble de règles permettant aux programmes de communiquer et d'échanger des données",
            "Un langage de programmation",
            "Un type de smart contract",
            "Un algorithme de consensus de la blockchain",
          ],
        },
      },
      {
        questionId: 4,
        question: {
          en: "What role do oracles play in smart contracts for insurance?",
          fr: "Quel rôle jouent les oracles dans les smart contracts pour l'assurance?",
        },
        options: {
          en: [
            "They trigger payments based on detected events like tornadoes",
            "They create insurance policies",
            "They verify the identity of policyholders",
            "They calculate insurance premiums",
          ],
          fr: [
            "Ils déclenchent des paiements en fonction d'événements détectés comme des tornades",
            "Ils créent des polices d'assurance",
            "Ils vérifient l'identité des assurés",
            "Ils calculent les primes d'assurance",
          ],
        },
      },
    ],
  },
  {
    quizId: 39,
    title: "Futures Contracts",
    questions: [
      {
        questionId: 1,
        question: {
          en: "What is a futures contract?",
          fr: "Qu'est-ce qu'un contrat à terme ?",
        },
        options: {
          en: [
            "An agreement to buy or sell an asset at an agreed price on a future date",
            "A spot market transaction",
            "A type of insurance policy",
            "An investment in a company's stock",
          ],
          fr: [
            "Un accord pour acheter ou vendre un actif à un prix convenu à une date ultérieure",
            "Une transaction sur le marché au comptant",
            "Un type de police d'assurance",
            "Un investissement dans les actions d'une entreprise",
          ],
        },
      },
      {
        questionId: 2,
        question: {
          en: "What is the primary use of futures contracts?",
          fr: "Quelle est l'utilisation principale des contrats à terme ?",
        },
        options: {
          en: [
            "To hedge against price fluctuations",
            "To buy real estate",
            "To secure bank loans",
            "To invest in mutual funds",
          ],
          fr: [
            "Pour se protéger contre les fluctuations de prix",
            "Pour acheter de l'immobilier",
            "Pour obtenir des prêts bancaires",
            "Pour investir dans des fonds communs de placement",
          ],
        },
      },
      {
        questionId: 3,
        question: {
          en: "What is market risk?",
          fr: "Qu'est-ce que le risque de marché ?",
        },
        options: {
          en: [
            "The risk arising due to market price fluctuations",
            "The risk of a counterparty defaulting",
            "The risk of a natural disaster",
            "The risk of political instability",
          ],
          fr: [
            "Le risque dû aux fluctuations des prix du marché",
            "Le risque de défaillance d'une contrepartie",
            "Le risque de catastrophe naturelle",
            "Le risque d'instabilité politique",
          ],
        },
      },
      {
        questionId: 4,
        question: {
          en: "What does a short position in futures contracts mean?",
          fr: "Que signifie une position longue dans les contrats à terme ?",
        },
        options: {
          en: [
            "You have sold a futures contract",
            "You have bought a futures contract",
            "You have taken out a loan",
            "You have bought a put option",
          ],
          fr: [
            "Vous avez  vendu un contrat à terme",
            "Vous avez acheté un contrat à terme",
            "Vous avez contracté un prêt",
            "Vous avez acheté une option de vente",
          ],
        },
      },
    ],
  },
  {
    title: "What is Proof of Collective Intelligence?",
    quizId: 40,
    questions: [
      {
        questionId: 1,
        question: {
          en: "What is the Proof of Collective Intelligence?",
          fr: "Qu'est-ce que la Preuve d'Intelligence Collective?",
        },
        options: {
          en: [
            "A new concept in decentralized education",
            "A new cryptocurrency",
            "A type of blockchain consensus",
            "A machine learning algorithm",
          ],
          fr: [
            "Un nouveau concept dans l'éducation décentralisée",
            "Une nouvelle cryptomonnaie",
            "Un type de consensus blockchain",
            "Un algorithme d'apprentissage automatique",
          ],
        },
      },
      {
        questionId: 2,
        question: {
          en: "Who can contribute to the Proof of Collective Intelligence?",
          fr: "Qui peut contribuer à la Preuve d'Intelligence Collective?",
        },
        options: {
          en: ["Everyone", "Only experts", "Only educators", "Only students"],
          fr: [
            "Tout le monde",
            "Seuls les experts",
            "Seuls les éducateurs",
            "Seuls les étudiants",
          ],
        },
      },
      {
        questionId: 3,
        question: {
          en: "What technology is used to store data?",
          fr: "Quelle technologie est utilisée pour stocker les données?",
        },
        options: {
          en: ["IPFS", "AWS", "Google Cloud", "Microsoft Azure"],
          fr: ["IPFS", "AWS", "Google Cloud", "Microsoft Azure"],
        },
      },
      {
        questionId: 4,
        question: {
          en: "What determines voting power in the system?",
          fr: "Qu'est-ce qui détermine le pouvoir de vote dans le système?",
        },
        options: {
          en: [
            "Number of TROTEL held and staked",
            "Number of courses created",
            "Number of students taught",
            "Number of rewards earned",
          ],
          fr: [
            "Le nombre de TROTEL détenus et en staking",
            "Le nombre de cours créés",
            "Le nombre d'étudiants enseignés",
            "Le nombre de récompenses gagnées",
          ],
        },
      },
      {
        questionId: 5,
        question: {
          en: "What must a course creator do to put their course online?",
          fr: "Que doit faire un créateur de cours pour mettre son cours en ligne?",
        },
        options: {
          en: [
            "Pay fees",
            "Complete a training",
            "Get a certification",
            "Gain approval from a mentor",
          ],
          fr: [
            "Payer des frais",
            "Suivre une formation",
            "Obtenir une certification",
            "Obtenir l'approbation d'un mentor",
          ],
        },
      },
      {
        questionId: 6,
        question: {
          en: "Who verifies the course once the fees are paid?",
          fr: "Qui vérifie le cours une fois les frais payés?",
        },
        options: {
          en: [
            "DAO governance",
            "Course creator",
            "Students",
            "External auditors",
          ],
          fr: [
            "La gouvernance de la DAO",
            "Le créateur du cours",
            "Les étudiants",
            "Les auditeurs externes",
          ],
        },
      },
    ],
  },
  {
    title: "What is the Lightning Network?",
    quizId: 41,
    questions: [
      {
        questionId: 1,
        question: {
          en: "What is the Lightning Network?",
          fr: "Qu'est-ce que le Lightning Network?",
        },
        options: {
          en: [
            "A second-layer payment solution for Bitcoin.",
            "A cryptocurrency.",
            "A blockchain explorer.",
            "A type of wallet.",
          ],
          fr: [
            "Une solution de paiement de deuxième couche pour Bitcoin.",
            "Une cryptomonnaie.",
            "Un explorateur de blockchain.",
            "Un type de portefeuille.",
          ],
        },
      },
      {
        questionId: 2,
        question: {
          en: "What does the Lightning Network allow?",
          fr: "À quoi sert le Lightning Network?",
        },
        options: {
          en: [
            "Instant and low-cost transactions.",
            "Mining of new Bitcoins.",
            "Storing large amounts of data.",
            "Creating new cryptocurrencies.",
          ],
          fr: [
            "De réaliser des transactions instantanées et à faible coût.",
            "De miner de nouveaux Bitcoins.",
            "De stocker de grandes quantités de données.",
            "De créer de nouvelles cryptomonnaies.",
          ],
        },
      },
      {
        questionId: 3,
        question: {
          en: "What must users pay to use payment channels?",
          fr: "Que doivent payer les utilisateurs pour utiliser les canaux de paiement?",
        },
        options: {
          en: ["Fees.", "Taxes.", "Commissions.", "Interest."],
          fr: ["Des frais.", "Des taxes.", "Des commissions.", "Des intérêts."],
        },
      },
      {
        questionId: 4,
        question: {
          en: "What happens if there are no common payment channels?",
          fr: "Que se passe-t-il s'il n'y a pas de canaux de paiement en commun?",
        },
        options: {
          en: [
            "An intermediary is used.",
            "The transaction is canceled.",
            "The network shuts down.",
            "A new channel is created automatically.",
          ],
          fr: [
            "Un intermédiaire est utilisé.",
            "La transaction est annulée.",
            "Le réseau se ferme.",
            "Un nouveau canal est créé automatiquement.",
          ],
        },
      },
      {
        questionId: 5,
        question: {
          en: "What is a limitation of using intermediaries in the Lightning Network?",
          fr: "Quelle est une limitation de l'utilisation des intermédiaires dans le Lightning Network?",
        },
        options: {
          en: [
            "Transactions cannot be made if the intermediary does not have enough funds",
            "Intermediaries charge high fees",
            "Transactions are very slow",
            "Intermediaries are not secure",
          ],
          fr: [
            "Les transactions ne peuvent pas être effectuées si l'intermédiaire n'a pas assez de fonds",
            "Les intermédiaires facturent des frais élevés",
            "Les transactions sont très lentes",
            "Les intermédiaires ne sont pas sécurisés",
          ],
        },
      },
    ],
  },
  {
    title: "What is BIM Finance?",
    quizId: 42,
    questions: [
      {
        questionId: 1,
        question: {
          en: "What is the primary function of the BIM token within the BIM Protocol?",
          fr: "Quelle est la fonction principale du jeton BIM dans le protocole BIM ?",
        },
        options: {
          en: [
            "Governance and voting",
            "Payment for services",
            "Advertising",
            "Content creation",
          ],
          fr: [
            "Gouvernance et vote",
            "Paiement pour services",
            "Publicité",
            "Création de contenu",
          ],
        },
      },
      {
        questionId: 2,
        question: {
          en: "Which feature allows users to transfer funds between different blockchains on BIM Exchange?",
          fr: "Quelle fonctionnalité permet aux utilisateurs de transférer des fonds entre différentes blockchains sur BIM Exchange ?",
        },
        options: {
          en: ["BIM Bridge", "BIM Swap", "BIM Staking", "BIM Vault"],
          fr: ["BIM Bridge", "BIM Swap", "BIM Staking", "BIM Vault"],
        },
      },
      {
        questionId: 3,
        question: {
          en: "What is the function of the intelligent route scanner on BIM Exchange?",
          fr: "Quelle est la fonction du scanner de route intelligent sur BIM Exchange ?",
        },
        options: {
          en: [
            "Ensures exchanges are instantaneous and at competitive rates",
            "Provides financial advice",
            "Scans for the best fiat exchange rates",
            "Secures the blockchain",
          ],
          fr: [
            "Assure des échanges instantanés et à des taux compétitifs",
            "Fournit des conseils financiers",
            "Recherche les meilleurs taux de change en fiat",
            "Sécurise la blockchain",
          ],
        },
      },
      {
        questionId: 4,
        question: {
          en: "What is a key benefit of the auto compounding feature on BIM Exchange?",
          fr: "Quel est un avantage clé de la fonctionnalité de capitalisation automatique sur BIM Exchange ?",
        },
        options: {
          en: [
            "Maximizes returns by re-staking revenues",
            "Reduces transaction fees",
            "Increases liquidity",
            "Simplifies user interface",
          ],
          fr: [
            "Maximise les rendements en réinvestissant les revenus",
            "Réduit les frais de transaction",
            "Augmente la liquidité",
            "Simplifie l'interface utilisateur",
          ],
        },
      },
      {
        questionId: 5,
        question: {
          en: "Who manages the BIM treasury?",
          fr: "Qui gère le trésor BIM ?",
        },
        options: {
          en: ["BIM DAO", "BIM Foundation", "Core Contributors", "BIM Finance"],
          fr: [
            "BIM DAO",
            "BIM Foundation",
            "Contributeurs principaux",
            "BIM Finance",
          ],
        },
      },
      {
        questionId: 6,
        question: {
          en: "What is the total maximum supply of BIM tokens?",
          fr: "Quelle est l'offre maximale totale de jetons BIM ?",
        },
        options: {
          en: ["34,367,545", "50,000,000", "24,519,255", "10,000,000"],
          fr: ["34,367,545", "50,000,000", "24,519,255", "10,000,000"],
        },
      },
    ],
  },
];

export default quizzes;
