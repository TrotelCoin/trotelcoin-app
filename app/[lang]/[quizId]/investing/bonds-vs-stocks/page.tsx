"use client";

import type { Lang } from "@/types/language/lang";
import Course from "@/app/[lang]/components/courses/courseScreen/course";

const CoursePage = ({ params: { lang } }: { params: { lang: Lang } }) => {
  const cards = {
    en: [
      {
        title: "Introduction",
        text: "Bonds and stocks are two of the main types of investments. Both have their advantages and disadvantages, and it's important to understand the differences between them before deciding where to put your money.",
      },
      {
        title: "Yield",
        text: "Stocks tend to offer a higher yield than bonds, but they are also riskier. Bonds are generally considered safer, but they offer a lower yield.",
      },
      {
        title: "How Bonds work",
        text: "A bond is a debt security issued by a company or government to raise funds. The buyer of the bond lends money to the issuer in exchange for regular interest payments and repayment of the principal at maturity.",
      },
      {
        title: "How Stocks work",
        text: "A stock is an ownership stake in a company. Shareholders have the right to vote at general meetings and receive dividends if the company makes a profit.",
      },
      {
        title: "Diversification",
        text: "It's important to diversify your investment portfolio to reduce risk. Bonds and stocks tend to react differently to market conditions, making them complementary investments.",
      },
      {
        title: "Liquidity",
        text: "Stocks are generally more liquid than bonds, meaning they can be bought and sold more easily. This can be an advantage if you need to access your money quickly.",
      },
      {
        title: "Bond example",
        text: "Suppose you buy a bond from a company that pays an interest rate of 5% per year. You will receive an interest payment of $50 per year for each $1,000 of bonds you hold. At maturity, you will also receive the repayment of the principal.",
      },
      {
        title: "Stock example",
        text: "Suppose you buy a stock from a company that pays a dividend of $2 per share. If you hold 100 shares, you will receive a payment of $200 per year. But the stock price can fluctuate depending on the company's performance.",
      },
      {
        title: "Risk",
        text: "Stocks are generally riskier than bonds because they are more sensitive to market fluctuations. If the company you have invested in goes bankrupt, you could lose all your capital. Bonds are generally considered safer because they are repaid first in the event of bankruptcy.",
      },
      {
        title: "Conclusion",
        text: "Bonds and stocks are different investments that each have their own advantages and disadvantages. It's important to diversify your portfolio to reduce risk and choose investments that align with your financial goals.",
      },
    ],
    fr: [
      {
        title: "Introduction",
        text: "Les obligations et les actions sont deux des principaux types d'investissements. Les deux ont des avantages et des inconvénients, et il est important de comprendre les différences entre eux avant de décider où placer votre argent.",
      },
      {
        title: "Rendement",
        text: "Les actions ont tendance à offrir un rendement plus élevé que les obligations, mais elles sont également plus risquées. Les obligations sont généralement considérées comme plus sûres, mais elles offrent un rendement plus faible.",
      },
      {
        title: "Comment marche une obligation",
        text: "Une obligation est un titre de créance émis par une entreprise ou un gouvernement pour lever des fonds. L'acheteur de l'obligation prête de l'argent à l'émetteur en échange d'un paiement d'intérêts régulier et du remboursement du capital à l'échéance.",
      },
      {
        title: "Comment marche une action",
        text: "Une action est un titre de propriété qui représente une part de propriété dans une entreprise. Les actionnaires ont le droit de voter lors des assemblées générales et de recevoir des dividendes si l'entreprise réalise des bénéfices.",
      },
      {
        title: "Diversification",
        text: "Il est important de diversifier votre portefeuille d'investissement pour réduire le risque. Les obligations et les actions ont tendance à réagir différemment aux conditions du marché, ce qui en fait des investissements complémentaires.",
      },
      {
        title: "Liquidité",
        text: "Les actions sont généralement plus liquides que les obligations, ce qui signifie qu'elles peuvent être achetées et vendues plus facilement. Cela peut être un avantage si vous avez besoin d'accéder rapidement à votre argent.",
      },
      {
        title: "Exemple d'obligation",
        text: "Supposons que vous achetez une obligation d'une entreprise qui paie un taux d'intérêt de 5 % par an. Vous recevrez un paiement d'intérêts de 50 € par an pour chaque tranche de 1 000 € d'obligations que vous détenez. À l'échéance, vous recevrez également le remboursement du capital.",
      },
      {
        title: "Exemple d'action",
        text: "Supposons que vous achetez une action d'une entreprise qui verse un dividende de 2 € par action. Si vous détenez 100 actions, vous recevrez un paiement de 200 € par an. Mais le cours de l'action peut fluctuer en fonction des performances de l'entreprise.",
      },
      {
        title: "Risque",
        text: "Les actions sont généralement plus risquées que les obligations, car elles sont plus sensibles aux fluctuations du marché. Si l'entreprise dans laquelle vous avez investi fait faillite, vous risquez de perdre tout votre capital. Les obligations sont généralement considérées comme plus sûres, car elles sont remboursées en priorité en cas de faillite.",
      },
      {
        title: "Conclusion",
        text: "Les obligations et les actions sont des investissements différents qui ont chacun leurs avantages et leurs inconvénients. Il est important de diversifier votre portefeuille pour réduire le risque et de choisir des investissements qui correspondent à vos objectifs financiers.",
      },
    ],
  };

  return (
    <>
      <Course cards={cards} lang={lang} conditionIsOkay={true} />
    </>
  );
};

export default CoursePage;
