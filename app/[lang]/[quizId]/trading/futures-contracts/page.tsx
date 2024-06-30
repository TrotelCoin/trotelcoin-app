"use client";

import type { Lang } from "@/types/language/lang";
import Course from "@/app/[lang]/components/courses/courseScreen/course";

const CoursePage = ({ params: { lang } }: { params: { lang: Lang } }) => {
  const cards = {
    en: [
      {
        title: "Introduction",
        text: "Futures contracts are agreements between two parties to buy or sell an asset at an agreed price on a future date."
      },
      {
        title: "What are they used for?",
        text: "They are used to hedge against price fluctuations and speculate on future price movements."
      },
      {
        title: "Example",
        text: "For example, if you are a farmer and want to sell your wheat at a fixed price regardless of market fluctuations, you can enter into a futures contract."
      },
      {
        title: "How do they work?",
        text: "Futures contracts are standardized and traded on regulated exchanges. This means that the terms of the contract are the same for all participants."
      },
      {
        title: "Risks",
        text: "Futures contracts come with risks, including counterparty risk, market risk, and liquidity risk."
      },
      {
        title: "Counterparty risk",
        text: "This risk arises when one of the parties fails to fulfill its obligations under the contract."
      },
      {
        title: "Market risk",
        text: "This risk arises due to market price fluctuations."
      },
      {
        title: "Liquidity risk",
        text: "This risk arises when the market lacks liquidity, making it difficult to enter into a contract."
      },
      {
        title: "Positions",
        text: "There are two types of positions in futures contracts: long and short."
      },
      {
        title: "Long position vs short position",
        text: "A long position means you have bought a futures contract, while a short position means you have sold a futures contract. Essentially, this means you are betting on a price increase or decrease."
      },
      {
        title: "Conclusion",
        text: "Futures contracts are an important tool for managing risks and speculating on future price movements."
      }
    ],
    fr: [
      {
        title: "Introduction",
        text: "Les contrats à terme sont des accords entre deux parties pour acheter ou vendre un actif à un prix convenu à une date ultérieure."
      },
      {
        title: "À quoi servent-ils ?",
        text: "Ils sont utilisés pour se protéger contre les fluctuations de prix et spéculer sur les mouvements de prix futurs."
      },
      {
        title: "Exemple",
        text: "Par exemple, si vous êtes un agriculteur et que vous voulez vendre votre blé à un prix fixe, peu importe les fluctuations du marché, vous pouvez conclure un contrat à terme."
      },
      {
        title: "Comment fonctionnent-ils ?",
        text: "Les contrats à terme sont standardisés et négociés sur des marchés réglementés. Cela signifie que les termes du contrat sont les mêmes pour tous les participants."
      },
      {
        title: "Risques",
        text: "Les contrats à terme comportent des risques, notamment le risque de contrepartie, le risque de marché et le risque de liquidité."
      },
      {
        title: "Risque de contrepartie",
        text: "Ce risque survient lorsque l'une des parties ne remplit pas ses obligations en vertu du contrat."
      },
      {
        title: "Risque de marché",
        text: "Ce risque survient en raison des fluctuations des prix du marché."
      },
      {
        title: "Risque de liquidité",
        text: "Ce risque survient lorsque le marché manque de liquidité, ce qui peut rendre difficile la conclusion d'un contrat."
      },
      {
        title: "Les positions",
        text: "Il existe deux types de positions dans les contrats à terme : longues et courtes."
      },
      {
        title: "Position longue vs position courte",
        text: "Une position longue signifie que vous avez acheté un contrat à terme, tandis qu'une position courte signifie que vous avez vendu un contrat à terme. En gros, cela signifie que vous pariez sur une hausse ou une baisse des prix."
      },
      {
        title: "Conclusion",
        text: "Les contrats à terme sont un outil important pour gérer les risques et spéculer sur les mouvements de prix futurs."
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
