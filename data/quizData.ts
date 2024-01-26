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
            "TrotelCoin allocates 50% to Uniswap, 5% for rewards, and private sales, with governance tied to token count.",
            "TrotelCoin has a fixed 100 million token supply, and no consideration for governance in token holding.",
            "TrotelCoin's distribution is undisclosed, and governance isn't a factor for token holders.",
            "TrotelCoin has an unlimited supply, and external governance doesn't involve token holders.",
          ],
          fr: [
            "TrotelCoin alloue 50% à Uniswap, 5% pour les récompenses et les ventes privées, la gouvernance étant liée au nombre de jetons.",
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
            "TrotelCoin incentivizes progress, guiding users in their first transactions for new cryptocurrency users.",
            "TrotelCoin has no utility in education and serves only as a digital asset.",
            "TrotelCoin's utility is confined to one aspect of cryptocurrency education, lacking broader contributions to navigation.",
            "The utility of TrotelCoin is solely determined by market trends.",
          ],
          fr: [
            "TrotelCoin incite au progrès, guidant les utilisateurs dans leurs premières transactions.",
            "TrotelCoin n'a aucune utilité dans l'éducation et ne sert que de bien numérique.",
            "L'utilité de TrotelCoin se limite à un aspect de l'éducation aux crypto-monnaies.",
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
            "Future features may include advanced courses, and support for launching unique crypto projects.",
            "No potential future features are envisioned for project development courses.",
            "Future features are restricted to basic educational resources without expanding into project development.",
            "Project development courses are unnecessary, and no additional features are required.",
          ],
          fr: [
            "Les fonctionnalités futures peuvent inclure des cours avancés, et un soutien pour le lancement de projets crypto uniques.",
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
