"use client";

import { Lang } from "@/types/types";
import Course from "@/app/[lang]/[quizId]/components/course";

const cards = {
  en: [
    {
      title: "Introduction",
      text: "Welcome to TrotelCoin's introduction course! Dive into crypto, Web3, DeFi, and blockchain. If these concepts seem puzzling, fear not - you're ready to learn.",
    },
    {
      title: "Why should you learn about Web3?",
      text: "Blockchain can revolutionize society by giving you control over your data. Unlike GAFAM, Web3 promotes transparency and individual data ownership, challenging intermediaries. Taking control means responsibility.",
    },
    {
      title: "What's TrotelCoin?",
      text: "TrotelCoin is an educational platform for exploring cryptocurrencies. Access resources, take quizzes, and earn TrotelCoins as rewards. Incentives boost learning, and earning crypto motivates you to understand and use it effectively.",
    },
    {
      title: "How to get started?",
      text: "To start earning TrotelCoins, get a crypto wallet. Don't worry, learning is free without earning TrotelCoins. For the full experience, explore the 'Wallet' category to learn about wallets and their uses in website sign-ins and crypto transactions.",
    },
    {
      title: "Tokenomics",
      text: "TrotelCoin has its own token, TROTEL. This token unlocks platform features and lets holders participate in governance. It also rewards users for learning and contributing to the platform. Finally, it allows to buy items in the shop.",
    },
    {
      title: "Rewards",
      text: "TrotelCoins are given as rewards based on an algorithm. The more tokens left, the more rewards you may get, like a game. This prevents spam. A separate program sets minimum and maximum rewards using percentages, and a random number in that range becomes your reward.",
    },
    {
      title: "Liquidity",
      text: "To support TrotelCoin, add equal MATIC and TROTEL tokens to Uniswap. Joining the pool makes TROTEL trading smoother. Earn commissions on Uniswap transactions. Contributing boosts liquidity, stability, and project growth.",
    },
    {
      title: "Token burning",
      text: "Token burning maintains value and stability, ensuring a reliable experience for the community. Tokens are essentially burned through buyback and transactions from the shop. This reduces the total supply, increasing the value of the remaining tokens.",
    },
    {
      title: "Fraud prevention",
      text: "One quiz attempt only. Captcha added to block spam bots, ensuring fairness. Our system discourages spammers, making it fair for all. We'll enhance security for future quizzes.",
    },
    {
      title: "Conclusion",
      text: "TrotelCoin wants to make learning about cryptocurrencies safe and fun. Our Web3 platform encourages learning. Take the quiz below to earn TrotelCoins and good luck on your learning adventure!"
    },
  ],
  fr: [
    {
      title: "Introduction",
      text: "Bienvenue dans le cours d'introduction à TrotelCoin ! Plongez dans la crypto, le Web3, la DeFi et la blockchain. Si ces concepts vous semblent déconcertants, ne craignez rien - vous êtes prêt à apprendre.",
    },
    {
      title: "Pourquoi vous devriez apprendre le Web3 ?",
      text: "La blockchain peut révolutionner la société en vous donnant le contrôle sur vos données. Contrairement au GAFAM, le Web3 promeut la transparence et la propriété individuelle des données, remettant en question les intermédiaires. Prendre le contrôle signifie avoir de la responsabilité.",
    },
    {
      title: "Qu'est-ce que TrotelCoin ?",
      text: "TrotelCoin est une plateforme éducative pour explorer les cryptomonnaies. Accédez à des ressources, passez des quiz et gagnez des TrotelCoins en récompense. Les incitations stimulent l'apprentissage, et gagner de la cryptomonnaie vous motive à la comprendre et à l'utiliser efficacement.",
    },
    {
      title: "Comment commencer ?",
      text: "Pour commencer à gagner des TrotelCoins, obtenez un portefeuille de cryptomonnaie. Ne vous inquiétez pas, l'apprentissage est gratuit sans gagner de TrotelCoins. Pour une expérience complète, explorez la catégorie 'Portefeuille' pour en apprendre plus sur les portefeuilles et leurs utilisations dans les connexions de site web et les transactions de cryptomonnaie.",
    },
    {
      title: "Tokenomics",
      text: "TrotelCoin a son propre token, TROTEL. Ce token débloque des fonctionnalités de la plateforme et permet aux détenteurs de participer à la gouvernance. Il récompense également les utilisateurs pour l'apprentissage et la contribution à la plateforme. Enfin, il permet d'acheter des objets dans la boutique.",
    },
    {
      title: "Récompenses",
      text: "Les TrotelCoins sont donnés en récompense en fonction d'un algorithme. Plus il reste de tokens, plus vous pouvez obtenir de récompenses, comme dans un jeu. Cela empêche le spam. Un programme séparé définit des récompenses minimales et maximales en utilisant des pourcentages, et un nombre aléatoire dans cette fourchette devient votre récompense.",
    },
    {
      title: "Liquidité",
      text: "Pour soutenir TrotelCoin, ajoutez des tokens MATIC et TROTEL équivalents à Uniswap. Rejoindre le pool rend le trading de TROTEL plus fluide. Gagnez des commissions sur les transactions Uniswap. Contribuer renforce la liquidité, la stabilité et la croissance du projet.",
    },
    {
      title: "Token burning",
      text: "Le token burning maintient la valeur et la stabilité, assurant une expérience fiable pour la communauté. Les tokens sont essentiellement brûlés via des rachats et des transactions de la boutique. Cela réduit l'offre totale, augmentant la valeur des tokens restants.",
    },
    {
      title: "Prévention de la fraude",
      text: "Une seule tentative de quiz. Captcha ajouté pour bloquer les bots spam, assurant l'équité. Notre système décourage les spammeurs, rendant le quiz équitable pour tous. Nous améliorerons la sécurité pour les futurs quiz.",
    },
    {
      title: "Conclusion",
      text: "TrotelCoin veut rendre l'apprentissage des cryptomonnaies sûr et amusant. Notre plateforme Web3 encourage l'apprentissage. Passez le quiz ci-dessous pour gagner des TrotelCoins et bonne chance dans votre aventure d'apprentissage !"
    },
  ],
};

const CoursePage = ({ params: { lang } }: { params: { lang: Lang } }) => {
  return (
    <>
      <Course cards={cards} lang={lang} />
    </>
  );
};

export default CoursePage;
