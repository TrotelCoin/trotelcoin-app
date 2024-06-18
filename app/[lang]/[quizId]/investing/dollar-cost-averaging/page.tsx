"use client";

import type { Lang } from "@/types/language/lang";
import Course from "@/app/[lang]/components/courses/courseScreen/course";

const CoursePage = ({ params: { lang } }: { params: { lang: Lang } }) => {
  const cards = {
    en: [
      {
        title: "Introduction",
        text: "In this course, you will discover the Dollar Cost Averaging strategy and how it can help you easily invest in cryptos or stocks without any hassle."
      },
      {
        title: "What is Dollar Cost Averaging?",
        text: "Dollar Cost Averaging (DCA) is an investment strategy where you invest a fixed amount of money at regular intervals, regardless of the price of the asset."
      },
      {
        title: "How does Dollar Cost Averaging work?",
        text: "Instead of trying to time the market, you invest consistently, buying more when prices are low and fewer when prices are high."
      },
      {
        title: "How can DCA help?",
        text: "The idea is to reduce the impact of market volatility on your portfolio potentially lowering your average cost."
      },
      {
        title: "Getting started with DCA",
        text: "First, determine how much you want to invest and how often. Then, set up automatic transfers or purchases on your platform of choice."
      },
      {
        title: "Monitoring your DCA strategy",
        text: "It's also important to regularly review your DCA strategy to ensure it aligns with your investment goals and risk tolerance. Adjust your investment amount or frequency as needed."
      },
      {
        title: "Understanding the risks",
        text: "Caution! DCA does not guarantee profit or protect against losses in a declining market."
      },
      {
        title: "Example of Dollar Cost Averaging",
        text: "Let's say you invest $100 each month in Bitcoin. When the price is high, you buy less, and when the price is low, you buy more. Over time, this strategy can help you build a diversified portfolio at an average cost."
      },
      {
        title: "Some numbers",
        text: "Let's imagine that you started a DCA on Bitcoin on 8th August 2021 investing $100 for 3 years each month. Now the value of your investment on 8th May 2024 would be $7,620. You would have invested $3,600 in total which is a 112% return on investment."
      },
      {
        title: "Conclusion",
        text: "By using Dollar Cost Averaging, you can avoid emotions in investing and build your wealth over time. Remember to stay disciplined and follow your investment plan."
      }
    ],
    fr: [
      {
        title: "Introduction",
        text: "Dans ce cours, vous allez découvrir la stratégie du Dollar Cost Averaging et comment cela peut vous aider à investir facilement dans les cryptos ou les actions sans prise de tête."
      },
      {
        title: "Qu'est-ce que le Dollar Cost Averaging?",
        text: "Le Dollar Cost Averaging (DCA) est une stratégie d'investissement où vous investissez un montant fixe d'argent à intervalles réguliers, indépendamment du prix de l'actif."
      },
      {
        title: "Comment fonctionne le Dollar Cost Averaging?",
        text: "Au lieu d'essayer de timer le marché, vous investissez de manière constante, achetant plus lorsque les prix sont bas et moins lorsque les prix sont élevés."
      },
      {
        title: "Comment le DCA peut-il aider?",
        text: "L'idée est de réduire l'impact de la volatilité du marché sur votre portefeuille en abaissant votre coût moyen."
      },
      {
        title: "Commencer avec le DCA",
        text: "D'abord, déterminez combien vous voulez investir et à quelle fréquence. Ensuite, mettez en place des transferts ou achats automatiques sur la plateforme de votre choix."
      },
      {
        title: "Surveiller votre stratégie DCA",
        text: "Il est également important de revoir régulièrement votre stratégie DCA pour vous assurer qu'elle est en phase avec vos objectifs d'investissement et votre tolérance au risque. Ajustez votre montant d'investissement ou votre fréquence si nécessaire."
      },
      {
        title: "Comprendre les risques",
        text: "Attention ! Le DCA ne garantit pas de profit ou ne protège pas contre les pertes sur un marché en baisse."
      },
      {
        title: "Exemple de Dollar Cost Averaging",
        text: "Supposons que vous investissiez 100$ chaque mois dans le Bitcoin. Lorsque le prix est élevé, vous en achetez moins, et lorsque le prix est bas, vous en achetez plus. Avec le temps, cette stratégie peut vous aider à construire un portefeuille diversifié à un coût moyen."
      },
      {
        title: "Quelques chiffres",
        text: "Imaginons que vous avez commencé un DCA sur le Bitcoin le 8 août 2021 en investissant 100$ pendant 3 ans chaque mois. Maintenant, la valeur de votre investissement le 8 mai 2024 serait de 7 620$. Vous auriez investi 3 600$ au total, ce qui représente un retour sur investissement de 112%."
      },
      {
        title: "Conclusion",
        text: "En utilisant le Dollar Cost Averaging, vous pouvez éviter les émotions dans l'investissement et construire votre richesse au fil du temps. N'oubliez pas de rester discipliné et de suivre votre plan d'investissement."
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
