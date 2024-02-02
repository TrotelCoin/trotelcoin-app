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
            "TrotelCoin wants to maximize profits for TrotelCoin's holders.",
            "TrotelCoin lacks a defined mission or vision.",
          ],
          fr: [
            "TrotelCoin se concentre sur l'éducation crypto.",
            "TrotelCoin veut créer une communauté web3.",
            "TrotelCoin veut maximiser les profits pour les détenteurs du TrotelCoin.",
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
            "Additionnaly to the initial distribution, other tokens can be minted for users completing quizzes.",
            "TrotelCoin has a fixed 100 million token supply.",
            "TrotelCoin's distribution is kept secret.",
            "TrotelCoin has an unlimited supply.",
          ],
          fr: [
            "En plus de la distribution initiale, des jetons supplémentaires sont créés pour les utilisateurs qui complètent les quiz.",
            "TrotelCoin a une offre fixe de 100 millions de jetons.",
            "La distribution de TrotelCoin est confidentielle.",
            "TrotelCoin n'a pas de limite de jetons.",
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
            "The algorithm generates random rewards linked to quiz completion.",
            "The algorithm distributes tokens linearly.",
            "TrotelCoin distribution is fixed.",
            "Quizzes have no impact on TrotelCoin distribution.",
          ],
          fr: [
            "L'algorithme génère des récompenses aléatoires liées à la réalisation du quiz.",
            "L'algorithme distribue les jetons linéairement.",
            "La distribution de TrotelCoin est fixe.",
            "Les quiz n'ont aucun impact sur la distribution de TrotelCoin.",
          ],
        },
      },
      {
        questionId: 4,
        question: {
          en: "What is the aim of adding liquidity to the Uniswap pool?",
          fr: "Quel est l'objectif de l'ajout de liquidité à la pool Uniswap?",
        },
        options: {
          en: [
            "Adding liquidity stabilizes trading, earns commissions, but carries risks like impermanent loss.",
            "Adding liquidity has no benefits but poses risks such as losing all invested funds.",
            "Benefits of adding liquidity are unknown, and risks are minimal.",
            "Adding liquidity to Uniswap only benefits the project, with no risks involved.",
          ],
          fr: [
            "L'ajout de liquidité stabilise les échanges, génère des commissions, mais comporte des risques tels que l'impermanent loss'.",
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
          fr: "Quel est l'impact du burning sur la stabilité et la valeur de TrotelCoin?",
        },
        options: {
          en: [
            "Token burning stabilizes TrotelCoin by preserving supply and preventing disruptions from excessive minting.",
            "Token burning has no impact on stability but increases the overall token supply.",
            "Token burning destabilizes TrotelCoin by reducing its overall supply.",
            "Token burning is irrelevant and doesn't affect TrotelCoin's stability or value.",
          ],
          fr: [
            "Le burning stabilise TrotelCoin en préservant l'offre et en empêchant les perturbations.",
            "Le burning n'a aucun impact sur la stabilité mais augmente l'offre totale de jetons.",
            "Le burning déstabilise TrotelCoin en réduisant son offre globale.",
            "Le burning est sans rapport et n'affecte pas la stabilité ou la valeur de TrotelCoin.",
          ],
        },
      },
      {
        questionId: 6,
        question: {
          en: "What are the anti-fraud measures in place?",
          fr: "Quelles sont les mesures anti-fraude en place?",
        },
        options: {
          en: [
            "Participants answer the questionnaire once, and captcha prevents bot spam.",
            "There are no measures and participants can submit the quiz multiple times.",
            "Worldcoin ID adoption is the only anti-fraud measure in place.",
            "Anti-fraud measures are not necessary and limit participant engagement.",
          ],
          fr: [
            "Les participants répondent au questionnaire une seule fois, et le captcha empêche le spam de bot.",
            "Il n'y pas de mesure et les participants peuvent soumettre le quiz plusieurs fois.",
            "L'adoption de Worldcoin ID est la seule mesure anti-fraude en place.",
            "Les mesures anti-fraude sont inutiles et entravent l'engagement des learners.",
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
            "TrotelCoin incentivizes progress and permit governance.",
            "TrotelCoin has no utility in education and serves only as a digital asset.",
            "TrotelCoin's utility is only about governance.",
            "The utility of TrotelCoin is solely determined by market trends.",
          ],
          fr: [
            "TrotelCoin incite au progrès et permet la gouvernance du projet.",
            "TrotelCoin n'a aucune utilité dans l'éducation et n'est qu'un token.",
            "L'utilité de TrotelCoin ne concerne que la gouvernance.",
            "L'utilité de TrotelCoin est uniquement déterminée par les tendances du marché.",
          ],
        },
      },
    ],
  },
];

export default quizzes;
