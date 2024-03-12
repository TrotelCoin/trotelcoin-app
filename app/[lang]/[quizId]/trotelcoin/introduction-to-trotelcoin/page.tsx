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
      text: "Blockchain can revolutionize society by giving you control over your data. Web3 promotes transparency and individual data ownership, challenging intermediaries.",
    },
    {
      title: "What's TrotelCoin?",
      text: "TrotelCoin is an educational platform for exploring cryptocurrencies. Access resources, take quizzes, and earn TrotelCoins as rewards.",
    },
    {
      title: "How to get started?",
      text: "To start earning TrotelCoins, create an account. Don't worry, learning is free.",
    },
    {
      title: "Tokenomics",
      text: "TROTEL unlocks platform features and lets holders participate in governance. It also rewards users for learning and contributing to the platform. Finally, it allows to buy items in the shop.",
    },
    {
      title: "Rewards",
      text: "TrotelCoins are given as rewards based on an algorithm. The more tokens left for a cycle, the more rewards you may get. Your reward is random based on a percentage.",
    },
    {
      title: "Liquidity",
      text: "Joining the liquidity pool makes TROTEL trading smoother. Earn commissions on Uniswap transactions. Contributing boosts liquidity, stability, and project growth.",
    },
    {
      title: "Token burning",
      text: "Token burning maintains value and stability. Tokens are essentially burned through buyback and transactions from the shop. This reduces the total supply, increasing the value of the remaining tokens.",
    },
    {
      title: "Fraud prevention",
      text: "One quiz attempt only. Captcha added to block spam bots. Our system discourages spammers, making it fair for all.",
    },
    {
      title: "Conclusion",
      text: "TrotelCoin wants to make learning about cryptocurrencies safe and fun. Our Web3 platform encourages learning. Take the quiz below to earn TrotelCoins and good luck on your learning adventure!",
    },
  ],
  fr: [
    {
      title: "Introduction",
      text: "Bienvenue dans le cours d'introduction de TrotelCoin ! Plongez dans la crypto, le Web3, la DeFi et la blockchain. Si ces concepts vous semblent déroutants, ne vous inquiétez pas - vous êtes prêt à apprendre.",
    },
    {
      title: "Pourquoi vous devriez apprendre le Web3 ?",
      text: "La blockchain peut révolutionner la société en vous donnant le contrôle sur vos données. Le Web3 promeut la transparence et la propriété individuelle des données, remettant en question les intermédiaires.",
    },
    {
      title: "Qu'est-ce que TrotelCoin ?",
      text: "TrotelCoin est une plateforme éducative pour explorer les cryptomonnaies. Accédez à des ressources, passez des quiz et gagnez des TrotelCoins en récompense.",
    },
    {
      title: "Comment commencer ?",
      text: "Pour commencer à gagner des TrotelCoins, créez un compte. Ne vous inquiétez pas, l'apprentissage est gratuit.",
    },
    {
      title: "Tokenomics",
      text: "TROTEL débloque les fonctionnalités de la plateforme et permet aux détenteurs de participer à la gouvernance. Il récompense également les utilisateurs pour l'apprentissage et la contribution à la plateforme. Enfin, il permet d'acheter des articles dans la boutique.",
    },
    {
      title: "Récompenses",
      text: "Les TrotelCoins sont donnés en récompense en fonction d'un algorithme. Plus il reste de tokens pour un cycle, plus vous pouvez obtenir de récompenses. Votre récompense est aléatoire en fonction d'un pourcentage.",
    },
    {
      title: "Liquidité",
      text: "Rejoindre le pool de liquidité rend le trading de TROTEL plus fluide. Gagnez des commissions sur les transactions Uniswap. Contribuer renforce la liquidité, la stabilité et la croissance du projet.",
    },
    {
      title: "Token burning",
      text: "Le token burning maintient la valeur et la stabilité. Les tokens sont essentiellement brûlés via le rachat et les transactions de la boutique. Cela réduit l'offre totale, augmentant la valeur des tokens restants.",
    },
    {
      title: "Prévention de la fraude",
      text: "Une seule tentative de quiz. Captcha ajouté pour bloquer les bots spammeurs. Notre système décourage les spammeurs, rendant le jeu équitable pour tous.",
    },
    {
      title: "Conclusion",
      text: "TrotelCoin veut rendre l'apprentissage des cryptomonnaies sûr et amusant. Notre plateforme Web3 encourage l'apprentissage. Passez le quiz ci-dessous pour gagner des TrotelCoins et bonne chance dans votre aventure d'apprentissage !",
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
