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
      {
        questionId: 6,
        question: {
          en: "What is Sybil Resistance?",
          fr: "Qu'est-ce que la résistance Sybil?",
        },
        options: {
          en: [
            "A feature of Proof-of-Work and Proof-of-Stake mechanisms to prevent Sybil attacks",
            "A protocol for selecting honest validators in a blockchain network",
            "A method for validating transactions in a blockchain",
            "A mechanism for creating a fingerprint of information in a blockchain",
          ],
          fr: [
            "Une caractéristique des mécanismes de Preuve de travail et de Preuve d'enjeu pour prévenir les attaques Sybil",
            "Un protocole pour sélectionner les validateurs honnêtes dans un réseau de blockchain",
            "Une méthode pour valider les transactions dans une blockchain",
            "Un mécanisme pour créer une empreinte digitale d'informations dans une blockchain",
          ],
        },
      },
      {
        questionId: 7,
        question: {
          en: "What is the role of Tower BFT in Solana's design?",
          fr: "Quel est le rôle de Tower BFT dans la conception de Solana?",
        },
        options: {
          en: [
            "To handle transactions simultaneously and improve scalability",
            "To prevent Sybil attacks",
            "To decide the longest chain in a blockchain",
            "To select honest validators in a blockchain network",
          ],
          fr: [
            "Pour gérer les transactions simultanément et améliorer la scalabilité",
            "Pour prévenir les attaques Sybil",
            "Pour décider de la plus longue chaîne dans une blockchain",
            "Pour sélectionner les validateurs honnêtes dans un réseau de blockchain",
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
          fr: "Quels sont les contrats intelligents ?",
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
          en: "What are the three good things about a blockchain?",
          fr: "Quels sont les trois bons aspects d'une blockchain ?",
        },
        options: {
          en: [
            "Decentralized, secure, scalable",
            "Fast, private, cheap",
            "Centralized, insecure, slow",
            "Scalable, private, cheap",
          ],
          fr: [
            "Décentralisée, sécurisée, évolutive",
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
          en: "What analogy is used to explain a Layer 2 solution?",
          fr: "Quelle analogie est utilisée pour expliquer une solution de couche 2 ?",
        },
        options: {
          en: [
            "Friends helping carry a heavy backpack",
            "Fish swimming in the sea",
            "Cars racing on a track",
            "Birds flying in the sky",
          ],
          fr: [
            "Des amis aidant à porter un sac à dos lourd",
            "Des poissons nageant dans la mer",
            "Des voitures courant sur une piste",
            "Des oiseaux volant dans le ciel",
          ],
        },
      },
      {
        questionId: 5,
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
          fr: "Qu'est-ce que les Contrats Intelligents ?",
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
      {
        questionId: 5,
        question: {
          en: "What happened to The DAO?",
          fr: "Qu'est-il arrivé à The DAO ?",
        },
        options: {
          en: [
            "It got hacked and lost $50 million worth of cryptocurrency",
            "It became the largest DAO in history",
            "It was never hacked",
            "It was unaffected by any security breaches",
          ],
          fr: [
            "Elle a été piraté et a perdu l'équivalent de 50 millions de dollars en cryptomonnaie",
            "Elle est devenu le plus grand DAO de l'histoire",
            "Elle n'a jamais été piraté",
            "Elle n'a pas été affecté par des violations de sécurité",
          ],
        },
      },
      {
        questionId: 6,
        question: {
          en: "How was the issue with The DAO resolved?",
          fr: "Comment le problème avec The DAO a-t-il été résolu ?",
        },
        options: {
          en: [
            "By hardforking the Ethereum blockchain and restoring the funds",
            "By abandoning the Ethereum blockchain",
            "By splitting the Ethereum blockchain",
            "By ignoring the security breach",
          ],
          fr: [
            "En forkant la blockchain Ethereum et en restaurant les fonds",
            "En abandonnant la blockchain Ethereum",
            "En divisant la blockchain Ethereum",
            "En ignorant la violation de sécurité",
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
];

export default quizzes;
