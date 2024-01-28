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
            "TrotelCoin focuses on crypto education.",
            "TrotelCoin wants to build an empowered web3 community.",
            "TrotelCoin wants to maximize profits for token holders.",
            "TrotelCoin lacks a defined mission or vision.",
          ],
          fr: [
            "TrotelCoin se concentre sur l'éducation sur les crypto.",
            "TrotelCoin veut créer une communauté web3.",
            "TrotelCoin veut maximiser les profits pour les détenteurs de jetons.",
            "TrotelCoin n'a pas de mission ou de vision définie.",
          ],
        },
      },
      {
        questionId: 2,
        question: {
          en: "What is the initial distribution of TrotelCoin?",
          fr: "Quelle est la distribution initiale de TrotelCoin?",
        },
        options: {
          en: [
            "TrotelCoin distributed inital tokens for public sale and marketing operations. Other tokens can be minted for users completing quizzes.",
            "TrotelCoin has a fixed 100 million token supply, and no consideration for governance in token holding.",
            "TrotelCoin's distribution is kept secret and governance isn't a factor for token holders.",
            "TrotelCoin has an unlimited supply, and external governance doesn't involve token holders.",
          ],
          fr: [
            "TrotelCoin a distribué des jetons initiaux pour la vente publique et les opérations marketing. D'autres jetons peuvent être créés pour les utilisateurs qui complètent les quiz.",
            "TrotelCoin a une offre fixe de 100 millions de jetons, et aucune considération pour la gouvernance dans la détention de jetons.",
            "La distribution de TrotelCoin est confidentielle, et la gouvernance n'est pas un facteur pour les détenteurs de jetons.",
            "TrotelCoin a une offre illimitée, et la gouvernance externe n'implique pas les détenteurs de jetons.",
          ],
        },
      },
      {
        questionId: 3,
        question: {
          en: "How the distribution algorithm works?",
          fr: "Comment fonctionne l'algorithme de distribution?",
        },
        options: {
          en: [
            "The algorithm generates random rewards linked to quiz completion, managing inflation.",
            "The algorithm distributes tokens linearly, leading to an inflationary model.",
            "TrotelCoin distribution is fixed, and no simulation algorithm is employed.",
            "Quizzes have no impact on TrotelCoin distribution.",
          ],
          fr: [
            "L'algorithme génère des récompenses aléatoires liées à la réalisation du quiz, gérant l'inflation.",
            "L'algorithme distribue les jetons linéairement, ce qui conduit à un modèle inflationniste.",
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
            "Adding liquidity stabilizes trading, earns commissions, but carries risks like impermanent loss.",
            "Adding liquidity has no benefits but poses risks such as losing all invested funds.",
            "Benefits of adding liquidity are unknown, and risks are minimal.",
            "Adding liquidity to Uniswap only benefits the project, with no risks involved.",
          ],
          fr: [
            "L'ajout de liquidité stabilise les échanges, génère des commissions, mais comporte des risques tels que la perte de liquidité.",
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
            "Token burning stabilizes TrotelCoin by preserving supply and preventing disruptions from excessive minting.",
            "Token burning has no impact on stability but increases the overall token supply.",
            "Token burning destabilizes TrotelCoin by reducing its overall supply.",
            "Token burning is irrelevant and doesn't affect TrotelCoin's stability or value.",
          ],
          fr: [
            "La destruction de jetons stabilise TrotelCoin en préservant l'offre et en empêchant les perturbations.",
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
            "Participants answer the questionnaire once, and captcha prevents bot spam.",
            "Anti-fraud measures are absent, and participants can submit the quiz multiple times.",
            "Worldcoin ID adoption is the only anti-fraud measure in place.",
            "Anti-fraud measures are unnecessary and impede participant engagement.",
          ],
          fr: [
            "Les participants répondent au questionnaire une seule fois, et le captcha empêche le spam de bot.",
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
            "TrotelCoin incentivizes progress, guiding users in their learning journey.",
            "TrotelCoin has no utility in education and serves only as a digital asset.",
            "TrotelCoin's utility is only about governance.",
            "The utility of TrotelCoin is solely determined by market trends.",
          ],
          fr: [
            "TrotelCoin incite au progrès, guidant les utilisateurs dans leurs premières transactions.",
            "TrotelCoin n'a aucune utilité dans l'éducation et ne sert que de bien numérique.",
            "L'utilité de TrotelCoin ne concerne que la gouvernance.",
            "L'utilité de TrotelCoin est uniquement déterminée par les tendances du marché.",
          ],
        },
      },
      {
        questionId: 8,
        question: {
          en: "What are potential future features on TrotelCoin?",
          fr: "Quelles sont les fonctionnalités futures potentielles sur TrotelCoin?",
        },
        options: {
          en: [
            "Future features will be there to improving users' learning.",
            "No potential future features are envisioned for project development courses.",
            "Future features are restricted to anti-fraud measures.",
            "Project development courses are unnecessary, and no additional features are required.",
          ],
          fr: [
            "Les fonctionnalités futures seront là pour améliorer l'apprentissage des utilisateurs.",
            "Aucune fonctionnalité future potentielle n'est envisagée pour les cours de développement de projets.",
            "Les fonctionnalités futures sont limitées aux mesures anti-fraude.",
            "Les cours de développement de projets sont inutiles, et aucune fonctionnalité supplémentaire n'est requise.",
          ],
        },
      },
    ],
  },
];

export default quizzes;
