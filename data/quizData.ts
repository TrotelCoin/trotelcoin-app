const quizzes = [
  {
    quizId: 1,
    title: "Introduction to TrotelCoin", // not used (to make things simpler)
    questions: [
      {
        questionId: 1,
        question: {
          en: "What is the mission of TrotelCoin and its vision?",
          fr: "Quelle est la mission de TrotelCoin et sa vision?",
        },
        options: {
          en: [
            "TrotelCoin focuses on cryptocurrency education, aspiring to be a key educational resource.",
            "TrotelCoin envisions an empowered web3 community through knowledge and tools.",
            "TrotelCoin strives to be the top cryptocurrency, maximizing profits for token holders.",
            "TrotelCoin lacks a defined mission or vision.",
          ],
          fr: [
            "TrotelCoin se concentre sur l'éducation aux crypto-monnaies, aspirant à être une ressource éducative clé.",
            "TrotelCoin envisage une communauté web3 autonomisée grâce aux connaissances et aux outils.",
            "TrotelCoin s'efforce d'être la meilleure crypto-monnaie, maximisant les profits pour les détenteurs de jetons.",
            "TrotelCoin n'a pas de mission ou de vision définie.",
          ],
        },
      },
      {
        questionId: 2,
        question: {
          en: "What is the tokenomics of TrotelCoin?",
          fr: "Quelle est la tokenomie de TrotelCoin?",
        },
        options: {
          en: [
            "The TrotelCoin distribution includes 50% in the Uniswap liquidity pool, 5% reserved for platform rewards, and private sales. Governance participation is determined by the number of TrotelCoin tokens.",
            "TrotelCoin has a fixed supply of 100 million tokens with no distribution strategy. Governance participation is not a consideration for token holders.",
            "The distribution of TrotelCoin is not disclosed, and governance participation is not a feature of the token.",
            "TrotelCoin has an unlimited supply, and governance is managed externally without token holder involvement.",
          ],
          fr: [
            "La distribution de TrotelCoin comprend 50% dans le pool de liquidité Uniswap, 5% réservés aux récompenses de la plateforme et aux ventes privées. La participation à la gouvernance est déterminée par le nombre de jetons TrotelCoin.",
            "TrotelCoin a une offre fixe de 100 millions de jetons sans stratégie de distribution. La participation à la gouvernance n'est pas une considération pour les détenteurs de jetons.",
            "La distribution de TrotelCoin n'est pas divulguée, et la participation à la gouvernance n'est pas une fonctionnalité du jeton.",
            "TrotelCoin a une offre illimitée, et la gouvernance est gérée de manière externe sans la participation des détenteurs de jetons.",
          ],
        },
      },
      {
        questionId: 3,
        question: {
          en: "How the distribution algorithm works and what its impact on inflation?",
          fr: "Comment fonctionne l'algorithme de distribution et quel est son impact sur l'inflation?",
        },
        options: {
          en: [
            "The algorithm generates random rewards based on the number of quizzes answered, controlling inflation and encouraging user participation.",
            "The algorithm distributes tokens linearly regardless of quiz performance, leading to an inflationary model.",
            "TrotelCoin distribution is fixed, and no simulation algorithm is employed.",
            "Quizzes have no impact on TrotelCoin distribution.",
          ],
          fr: [
            "L'algorithme génère des récompenses aléatoires en fonction du nombre de quiz répondu, contrôlant l'inflation et encourageant la participation des utilisateurs.",
            "L'algorithme distribue les jetons linéairement indépendamment des performances du quiz, ce qui conduit à un modèle inflationniste.",
            "La distribution de TrotelCoin est fixe, et aucun algorithme de simulation n'est utilisé.",
            "Les quiz n'ont aucun impact sur la distribution de TrotelCoin.",
          ],
        },
      },
      {
        questionId: 4,
        question: {
          en: "What is the aim of adding liquidity to the Uniswap pool?",
          fr: "Quel est l'objectif de l'ajout de liquidité au pool Uniswap?",
        },
        options: {
          en: [
            "Adding liquidity enhances stability, enables seamless trading, and allows users to earn commissions. Risks include potential impermanent loss.",
            "Adding liquidity has no benefits but poses risks such as losing all invested funds.",
            "Benefits of adding liquidity are unknown, and risks are minimal.",
            "Adding liquidity to Uniswap only benefits the project, with no risks involved.",
          ],
          fr: [
            "L'ajout de liquidité améliore la stabilité, permet des échanges transparents et permet aux utilisateurs de gagner des commissions. Les risques incluent une perte potentielle d'impermanence.",
            "L'ajout de liquidité n'a aucun avantage mais présente des risques tels que la perte de tous les fonds investis.",
            "Les avantages de l'ajout de liquidité sont inconnus, et les risques sont minimes.",
            "L'ajout de liquidité à Uniswap ne profite qu'au projet, sans risque.",
          ],
        },
      },
      {
        questionId: 5,
        question: {
          en: "What is the impact of token burning on TrotelCoin's stability and value?",
          fr: "Quel est l'impact de la destruction de jetons sur la stabilité et la valeur de TrotelCoin?",
        },
        options: {
          en: [
            "Token burning stabilizes TrotelCoin's value by maintaining the existing supply and avoiding disruptions caused by excessive minting.",
            "Token burning has no impact on stability but increases the overall token supply.",
            "Token burning destabilizes TrotelCoin by reducing its overall supply.",
            "Token burning is irrelevant and doesn't affect TrotelCoin's stability or value.",
          ],
          fr: [
            "La destruction de jetons stabilise la valeur de TrotelCoin en maintenant l'offre existante et en évitant les perturbations causées par une mise en circulation excessive.",
            "La destruction de jetons n'a aucun impact sur la stabilité mais augmente l'offre totale de jetons.",
            "La destruction de jetons déstabilise TrotelCoin en réduisant son offre globale.",
            "La destruction de jetons est sans rapport et n'affecte pas la stabilité ou la valeur de TrotelCoin.",
          ],
        },
      },
      {
        questionId: 6,
        question: {
          en: "What are the anti-fraud measures in place and their importance?",
          fr: "Quelles sont les mesures anti-fraude en place et leur importance?",
        },
        options: {
          en: [
            "Participants can only answer the questionnaire once, and captcha is used to prevent bot spam. These measures ensure fairness and honesty.",
            "Anti-fraud measures are absent, and participants can submit the quiz multiple times.",
            "Worldcoin ID adoption is the only anti-fraud measure in place.",
            "Anti-fraud measures are unnecessary and impede participant engagement.",
          ],
          fr: [
            "Les participants ne peuvent répondre au questionnaire qu'une seule fois, et le captcha est utilisé pour empêcher le spam de bot. Ces mesures garantissent l'équité et l'honnêteté.",
            "Les mesures anti-fraude sont absentes, et les participants peuvent soumettre le quiz plusieurs fois.",
            "L'adoption de Worldcoin ID est la seule mesure anti-fraude en place.",
            "Les mesures anti-fraude sont inutiles et entravent l'engagement des participants.",
          ],
        },
      },
      {
        questionId: 7,
        question: {
          en: "What is the purpose of the TrotelCoin token?",
          fr: "Quel est le but du jeton TrotelCoin?",
        },
        options: {
          en: [
            "TrotelCoin provides incentives for progress, guiding users through their first transactions and serving as an accessible entry point for new cryptocurrency users.",
            "TrotelCoin has no utility in education and serves only as a digital asset.",
            "TrotelCoin's utility is limited to a single aspect of cryptocurrency education, and it doesn't contribute to navigating the landscape.",
            "The utility of TrotelCoin is solely determined by market trends.",
          ],
          fr: [
            "TrotelCoin offre des incitations pour progresser, guidant les utilisateurs dans leurs premières transactions et servant de point d'entrée accessible pour les nouveaux utilisateurs de crypto-monnaies.",
            "TrotelCoin n'a aucune utilité dans l'éducation et ne sert que de bien numérique.",
            "L'utilité de TrotelCoin se limite à un seul aspect de l'éducation sur les crypto-monnaies, et elle ne contribue pas à la navigation dans l'écosystème.",
            "L'utilité de TrotelCoin est uniquement déterminée par les tendances du marché.",
          ],
        },
      },
      {
        questionId: 8,
        question: {
          en: "What are potential future features for courses development on TrotelCoin?",
          fr: "Quelles sont les fonctionnalités futures potentielles pour le développement de cours sur TrotelCoin?",
        },
        options: {
          en: [
            "Future features may include advanced project development courses, providing guidance and support for launching unique crypto projects.",
            "No potential future features are envisioned for project development courses.",
            "Future features are restricted to basic educational resources without expanding into project development.",
            "Project development courses are unnecessary, and no additional features are required.",
          ],
          fr: [
            "Les fonctionnalités futures peuvent inclure des cours de développement de projets avancés, fournissant des conseils et un soutien pour le lancement de projets crypto uniques.",
            "Aucune fonctionnalité future potentielle n'est envisagée pour les cours de développement de projets.",
            "Les fonctionnalités futures sont limitées aux ressources éducatives de base sans s'étendre au développement de projets.",
            "Les cours de développement de projets sont inutiles, et aucune fonctionnalité supplémentaire n'est requise.",
          ],
        },
      },
    ],
  },
];

export default quizzes;
