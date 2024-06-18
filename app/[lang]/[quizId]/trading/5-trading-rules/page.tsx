"use client";

import type { Lang } from "@/types/language/lang";
import Course from "@/app/[lang]/components/courses/courseScreen/course";

const CoursePage = ({ params: { lang } }: { params: { lang: Lang } }) => {
  const cards = {
    en: [
      {
        title: "Introduction",
        text: "It is important to know the trading rules to avoid common mistakes and maximize your chances of success. For this, we will adopt the notion of risk management."
      },
      {
        title: "Risk Management",
        text: "Risk management involves identifying, assessing, and controlling the risks associated with your trades to protect your capital. It is essential to avoid significant losses and maximize your gains."
      },
      {
        title: "1. Position Size",
        text: "Position size is the amount of capital you invest in a trade. It is determined by the risk you are willing to take."
      },
      {
        title: "Risk per Trade",
        text: "It is recommended not to risk more than 1% of your capital per trade to limit losses in case of a losing trade on a single transaction. A common rule is to avoid risking more than 2% of your total capital on all your trades."
      },
      {
        title: "2. Stop Loss",
        text: "Stop Loss is an automatic sell order that limits losses in case of a losing trade. It is important to set a stop loss before opening a position to protect your capital."
      },
      {
        title: "3. Diversification",
        text: "Diversification involves spreading your capital among different assets to limit the risks associated with a particular asset. This reduces the impact of a loss on your entire portfolio."
      },
      {
        title: "4. Risk/Reward Ratio",
        text: "The risk/reward ratio allows you to assess the relationship between the risk taken and the potential gain of a trade. It is recommended to aim for a risk/reward ratio of at least 1:2 to limit losses and maximize gains. In short, you are aiming for a gain twice as high as your potential loss."
      },
      {
        title: "5. Review and Adjustments",
        text: "It is important to regularly review your trades to identify errors and adjust your strategy accordingly. This will help you improve your performance and maximize your chances of success."
      },
      {
        title: "Conclusion",
        text: "By following these trading rules, you can avoid common mistakes and maximize your chances of success in the financial markets. Risk management is essential to protect your capital and achieve your trading goals."
      }
    ],
    fr: [
      {
        title: "Introduction",
        text: "Il est important de connaître les règles de trading pour éviter les erreurs courantes et maximiser vos chances de succès. Pour cela, nous adopterons la notion de gestion du risque."
      },
      {
        title: "Gestion du risque",
        text: "La gestion du risque consiste à identifier, évaluer et contrôler les risques liés à vos trades pour protéger votre capital. Elle est essentielle pour éviter les pertes importantes et maximiser vos gains."
      },
      {
        title: "1. Taille de position",
        text: "La taille de position est le montant de capital que vous investissez dans un trade. Elle est déterminée par le risque que vous êtes prêt à prendre."
      },
      {
        title: "Risque par trade",
        text: "Il est recommandé de ne pas risquer plus de 1% de votre capital par trade pour limiter les pertes en cas de trade perdant sur une seule transaction. Une règle courante est d'éviter de risquer plus de 2% de votre capital total sur l'ensemble de vos trades."
      },
      {
        title: "2. Stop Loss",
        text: "Le stop Loss est un ordre de vente automatique qui permet de limiter les pertes en cas de trade perdant. Il est important de définir un stop loss avant d'ouvrir une position pour protéger votre capital."
      },
      {
        title: "3. Diversification",
        text: "La diversification consiste à répartir votre capital entre différents actifs pour limiter les risques liés à un actif en particulier. Cela permet de réduire l'impact d'une perte sur l'ensemble de votre portefeuille."
      },
      {
        title: "4. Ratio risque/rendement",
        text: "Le ratio risque/rendement permet d'évaluer le rapport entre le risque pris et le gain potentiel d'un trade. Il est recommandé de viser un ratio risque/rendement d'au moins 1:2 pour limiter les pertes et maximiser les gains. En gros, vous visez un gain 2 fois supérieur à votre perte potentielle."
      },
      {
        title: "5. Révisions et ajustements",
        text: "Il est important de revoir régulièrement vos trades pour identifier les erreurs et ajuster votre stratégie en conséquence. Cela vous permettra d'améliorer vos performances et de maximiser vos chances de succès."
      },
      {
        title: "Conclusion",
        text: "En respectant ces règles de trading, vous pourrez éviter les erreurs courantes et maximiser vos chances de succès sur les marchés financiers. La gestion du risque est essentielle pour protéger votre capital et atteindre vos objectifs de trading."
      }
    ]
  };

  return (
    <>
      <Course cards={cards} lang={lang} conditionIsOkay={true} />
    </>
  );
};

export default CoursePage;
