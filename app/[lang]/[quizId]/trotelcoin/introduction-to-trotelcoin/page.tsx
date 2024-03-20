"use client";

import { Lang } from "@/types/lang";
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
      text: "To start earning TrotelCoins, create an account. Don't worry, you can learn for free.",
    },
    {
      title: "Tokenomics",
      text: "TROTEL token unlocks app features and let you participate in governance. It also rewards users for their learning and their contribution to the platform. Finally, it allows transactions in the shop.",
    },
    {
      title: "Rewards",
      text: "TrotelCoins are distributed as rewards based on an algorithm. The more tokens left for a cycle, the more rewards you may get. Your reward is random based on a percentage.",
    },
    {
      title: "Liquidity",
      text: "Joining the liquidity pool makes TROTEL trading smoother. You can earn commissions on Uniswap transactions.",
    },
    {
      title: "Token burning",
      text: "Token burning maintains value and stability. Tokens are essentially burned through buyback and transactions from the shop. This reduces the total supply, increasing the value of the remaining tokens.",
    },
    {
      title: "Conclusion",
      text: "Take the quiz to earn TrotelCoins and good luck on your learning adventure!",
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
      text: "TrotelCoin est une plateforme éducative pour explorer les cryptomonnaies. Vous pourrez accéder à des ressources, faire des quiz et gagner des TrotelCoins en récompense.",
    },
    {
      title: "Comment commencer ?",
      text: "Pour commencer à gagner des TrotelCoins, créez un compte. Ne vous inquiétez pas, vous pouvez apprendre gratuitement.",
    },
    {
      title: "Tokenomics",
      text: "Le token TROTEL débloque des fonctionnalités de l'app et vous permet de participer à la gouvernance. Il récompense également les utilisateurs pour leur apprentissage et leur contribution à la plateforme. Enfin, il permet de faire des transactions dans la boutique.",
    },
    {
      title: "Récompenses",
      text: "Les TrotelCoins sont donnés distribués en fonction d'un algorithme. Plus il reste de tokens pour un cycle, plus vous pouvez obtenir de récompenses. Votre récompense est aléatoire en fonction d'un pourcentage.",
    },
    {
      title: "Liquidité",
      text: "Rejoindre la pool de liquidité rend le trading de TROTEL plus fluide. Vous pourrez gagner des commissions sur les transactions Uniswap.",
    },
    {
      title: "Token burning",
      text: "Le burning maintient la valeur et la stabilité du token. Les tokens sont essentiellement brûlés via le rachat et les transactions de la boutique. Cela réduit l'offre totale, augmentant la valeur des tokens restants.",
    },
    {
      title: "Conclusion",
      text: "Faîtes le quiz pour gagner des TrotelCoins et bonne chance dans votre aventure d'apprentissage !",
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
