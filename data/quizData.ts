const quizzes = [
  {
    quizId: 1,
    title: "Introduction to TrotelCoin", // not used (to make things simpler)
    questions: [
      {
        questionId: 1,
        question: {
          en: "What is the mission of TrotelCoin and its vision for the future?",
          fr: "Quelle est la mission de TrotelCoin et sa vision pour l'avenir?",
        },
        options: {
          en: [
            "TrotelCoin aims to create a world where individuals have the knowledge and tools to thrive in the web3 space. Its vision is to revolutionize the cryptocurrency education landscape.",
            "TrotelCoin's mission is to maximize profits for token holders, and its vision is centered around becoming the most valuable cryptocurrency in the market.",
            "TrotelCoin's mission is solely to provide a cryptocurrency learning platform, and its vision is limited to being an educational resource.",
            "TrotelCoin has no specific mission or vision outlined.",
          ],
          fr: [
            "TrotelCoin vise à créer un monde où les individus ont les connaissances et les outils pour prospérer dans l'espace web3. Sa vision est de révolutionner le paysage de l'éducation sur les crypto-monnaies.",
            "La mission de TrotelCoin est de maximiser les profits des détenteurs de jetons, et sa vision est centrée sur le fait de devenir la crypto-monnaie la plus précieuse du marché.",
            "La mission de TrotelCoin est uniquement de fournir une plateforme d'apprentissage sur les crypto-monnaies, et sa vision se limite à être une ressource éducative.",
            "TrotelCoin n'a aucune mission ou vision spécifique.",
          ],
        },
      },
      {
        questionId: 2,
        question: {
          en: "Explain the tokenomics of TrotelCoin, including its distribution and governance participation.",
          fr: "Expliquez la tokenomie de TrotelCoin, y compris sa distribution et sa participation à la gouvernance.",
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
          en: "Simulate the TrotelCoin distribution algorithm for a given number of quizzes answered.",
          fr: "Simulez l'algorithme de distribution de TrotelCoin pour un nombre donné de quiz répondu.",
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
          en: "Discuss the benefits and risks of adding liquidity to the Uniswap pool.",
          fr: "Discutez des avantages et des risques d'ajouter de la liquidité au pool Uniswap.",
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
          en: "Evaluate the impact of token burning on TrotelCoin's stability and value.",
          fr: "Évaluez l'impact de la destruction de jetons sur la stabilité et la valeur de TrotelCoin.",
        },
        options: {
          en: [
            "Token burning stabilizes TrotelCoin's value by maintaining the existing supply and avoiding disruptions caused by excessive minting.",
            "Token burning has no impact on stability but increases the overall token supply.",
            "Token burning destabilizes TrotelCoin by reducing its overall supply.",
            "Token burning is irrelevant and doesn't affect TrotelCoin's stability or value.",
          ],
          fr: [
            "La destruction de jetons stabilise la valeur de TrotelCoin en maintenant l'offre existante et en évitant les perturbations causées par une frappe excessive.",
            "La destruction de jetons n'a aucun impact sur la stabilité mais augmente l'offre totale de jetons.",
            "La destruction de jetons déstabilise TrotelCoin en réduisant son offre globale.",
            "La destruction de jetons est sans rapport et n'affecte pas la stabilité ou la valeur de TrotelCoin.",
          ],
        },
      },
      {
        questionId: 6,
        question: {
          en: "Describe the anti-fraud measures in place and their importance.",
          fr: "Décrivez les mesures anti-fraude en place et leur importance.",
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
