"use client";

import type { Lang } from "@/types/language/lang";
import Course from "@/app/[lang]/components/courses/courseScreen/course";
import Link from "next/link";

const CoursePage = ({ params: { lang } }: { params: { lang: Lang } }) => {
  const cards = {
    en: [
      {
        title: "Introduction",
        text: "Stablecoins are cryptocurrencies designed to minimize the volatility of the price of the stablecoin, relative to some stable asset or basket of assets.",
      },
      {
        title: "Understanding Stablecoins",
        text: "Stablecoins are a type of cryptocurrency that are designed to be less volatile than other cryptocurrencies. They are typically pegged to a fiat currency like the US dollar or a commodity like gold.",
      },
      {
        title: "Famous Stablecoins",
        text: (
          <>
            Some of the most famous stablecoins include{" "}
            <Link
              href="https://tether.to/en/"
              target="_blank"
              className="text-blue-500 dark:blue-400 hover:text-blue-400 dark:hover:text-blue-400"
            >
              Tether
            </Link>{" "}
            (USDT),{" "}
            <Link
              href="https://www.circle.com/en/usdc"
              target="_blank"
              className="text-blue-500 dark:blue-400 hover:text-blue-400 dark:hover:text-blue-400"
            >
              USD Coin
            </Link>{" "}
            (USDC), and{" "}
            <Link
              href="https://makerdao.com/en/"
              target="_blank"
              className="text-blue-500 dark:blue-400 hover:text-blue-400 dark:hover:text-blue-400"
            >
              DAI
            </Link>
            .
          </>
        ),
      },
      {
        title: "Types of Stablecoins",
        text: "There are different types of stablecoins, including centralized, decentralized, and algorithmic stablecoins.",
      },
      {
        title: "Centralized Stablecoins",
        text: "Centralized stablecoins are backed by a reserve of assets, which are held by a central entity.",
      },
      {
        title: "Decentralized Stablecoins",
        text: "Decentralized stablecoins are not backed by a reserve of assets and are instead backed by collateral.",
      },
      {
        title: "Algorithmic Stablecoins",
        text: "Algorithmic stablecoins are not backed by a reserve of assets or collateral. Instead, they use algorithms to maintain their stability.",
      },
      {
        title: "Advantages of Stablecoins",
        text: "Stablecoins have several advantages, including low volatility, fast and cheap transactions, and the ability to be used as a store of value.",
      },
      {
        title: "Why are Stablecoins Important?",
        text: "Stablecoins are important because they provide a way to use cryptocurrency without being exposed to the volatility of other cryptocurrencies.",
      },
      {
        title: "Risks of Stablecoins",
        text: "There are several risks associated with stablecoins, including regulatory risks, counterparty risks, and smart contract risks.",
      },
      {
        title: "Practical Uses of Stablecoins",
        text: "Stablecoins have several practical uses, including remittances, trading, and as a store of value. For instance, they can be used to send money across borders quickly and cheaply.",
      },
      {
        title: "Earn Interest on Stablecoins",
        text: "You can earn interest on your stablecoins by lending them out to others. This can be done through a centralized or decentralized lending platform.",
      },
      {
        title: "Conclusion",
        text: "Stablecoins are an important part of the cryptocurrency ecosystem. They provide a way to use cryptocurrency without being exposed to the volatility of other cryptocurrencies.",
      },
    ],
    fr: [
      {
        title: "Introduction",
        text: "Les stablecoins sont des cryptomonnaies conçues pour minimiser la volatilité du prix du stablecoin, par rapport à un actif ou un panier d'actifs stables.",
      },
      {
        title: "Comprendre les stablecoins",
        text: "Les stablecoins sont un type de cryptomonnaie conçus pour être moins volatils que d'autres cryptomonnaies. Ils sont généralement indexés sur une monnaie fiduciaire comme le dollar américain ou une matière première comme l'or.",
      },
      {
        title: "Stablecoins célèbres",
        text: (
          <>
            Certains des stablecoins les plus célèbres incluent{" "}
            <Link
              href="https://tether.to/en/"
              target="_blank"
              className="text-blue-500 dark:blue-400 hover:text-blue-400 dark:hover:text-blue-400"
            >
              Tether
            </Link>{" "}
            (USDT),{" "}
            <Link
              href="https://www.circle.com/en/usdc"
              target="_blank"
              className="text-blue-500 dark:blue-400 hover:text-blue-400 dark:hover:text-blue-400"
            >
              USD Coin
            </Link>{" "}
            (USDC), et{" "}
            <Link
              href="https://makerdao.com/en/"
              target="_blank"
              className="text-blue-500 dark:blue-400 hover:text-blue-400 dark:hover:text-blue-400"
            >
              DAI
            </Link>
            .
          </>
        ),
      },
      {
        title: "Types de stablecoins",
        text: "Il existe différents types de stablecoins, y compris les stablecoins centralisés, décentralisés et algorithmiques.",
      },
      {
        title: "Stablecoins centralisés",
        text: "Les stablecoins centralisés sont adossés à une réserve d'actifs, détenue par une entité centrale.",
      },
      {
        title: "Stablecoins décentralisés",
        text: "Les stablecoins décentralisés ne sont pas adossés à une réserve d'actifs et sont plutôt adossés à des collatéraux.",
      },
      {
        title: "Stablecoins algorithmiques",
        text: "Les stablecoins algorithmiques ne sont pas adossés à une réserve d'actifs ou à des collatéraux. Au lieu de cela, ils utilisent des algorithmes pour maintenir leur stabilité.",
      },
      {
        title: "Avantages des stablecoins",
        text: "Les stablecoins présentent plusieurs avantages, notamment une faible volatilité, des transactions rapides et bon marché, et la capacité à être utilisés comme réserve de valeur.",
      },
      {
        title: "Pourquoi les stablecoins sont-ils importants?",
        text: "Les stablecoins sont importants car ils offrent un moyen d'utiliser des cryptomonnaies sans être exposé à la volatilité d'autres cryptomonnaies.",
      },
      {
        title: "Risques des stablecoins",
        text: "Il existe plusieurs risques associés aux stablecoins, notamment les risques réglementaires, les risques de contrepartie et les risques de contrats intelligents.",
      },
      {
        title: "Utilisations pratiques des stablecoins",
        text: "Les stablecoins ont plusieurs utilisations pratiques, notamment les transferts de fonds, le trading et comme réserve de valeur. Par exemple, ils peuvent être utilisés pour envoyer de l'argent à travers les frontières rapidement et à moindre coût.",
      },
      {
        title: "Gagner des intérêts sur les stablecoins",
        text: "Vous pouvez gagner des intérêts sur vos stablecoins en les prêtant à d'autres. Cela peut être fait via une plateforme de prêt centralisée ou décentralisée.",
      },
      {
        title: "Conclusion",
        text: "Les stablecoins sont un élément important de l'écosystème des cryptomonnaies. Ils offrent un moyen d'utiliser des cryptomonnaies sans être exposé à la volatilité d'autres cryptomonnaies.",
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
