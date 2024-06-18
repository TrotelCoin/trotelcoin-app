"use client";

import type { Lang } from "@/types/language/lang";
import Course from "@/app/[lang]/components/courses/courseScreen/course";

const CoursePage = ({ params: { lang } }: { params: { lang: Lang } }) => {
  const cards = {
    en: [
      {
        title: "Introduction",
        text: "Fundamental analysis is a method of evaluating stocks that involves studying a company's financial and economic data to determine its intrinsic value."
      },
      {
        title: "Example of fundamental analysis",
        text: "For example, if you want to invest in a company, you can examine its financial statements, growth history, financial ratios, and future prospects to assess its value."
      },
      {
        title: "Key indicators",
        text: "Some of the key indicators used in fundamental analysis include revenue, net income, profit margins, price-to-earnings ratio, and dividend yield."
      },
      {
        title: "Revenue",
        text: "Revenue is the total amount of sales a company makes over a given period. It is used to assess the company's growth and its ability to generate revenue."
      },
      {
        title: "Net income",
        text: "Net income is the amount of money a company makes after paying all its expenses. It is used to assess the company's profitability."
      },
      {
        title: "Linking net income to revenue",
        text: "You understand the importance of linking net income to revenue to assess the company's profitability since it helps determine if the company can generate profits from its sales."
      },
      {
        title: "Profit margins",
        text: "This is where profit margins come in. These are ratios that measure a company's profitability. They compare the company's net income to its revenue to assess its operational efficiency."
      },
      {
        title: "Price-to-earnings ratio",
        text: "The price-to-earnings ratio is a key indicator used to assess the value of a stock. It compares the current price of the stock to the company's earnings per share to determine if the stock is overvalued or undervalued."
      },
      {
        title: "Dividend yield",
        text: "Finally, the dividend yield is the amount of dividends a company pays to its shareholders relative to the stock price. It is used to assess the return on an equity investment."
      },
      {
        title: "Advantages of fundamental analysis",
        text: "Thus, fundamental analysis allows you to make informed and pragmatic investment decisions based on solid financial and economic data."
      },
      {
        title: "Where to find financial data",
        text: "You can find a company's financial data in its annual reports, financial statements, press releases, and investor presentations. Sites like TradingView, Yahoo Finance, and Bloomberg can also be helpful."
      },
      {
        title: "Conclusion",
        text: "In conclusion, fundamental analysis is an essential method for evaluating stocks and making informed investment decisions. It allows you to understand a company's financial health and identify investment opportunities."
      }
    ],
    fr: [
      {
        title: "Introduction",
        text: "L'analyse fondamentale est une méthode d'évaluation des actions qui consiste à étudier les données financières et économiques d'une entreprise pour déterminer sa valeur intrinsèque."
      },
      {
        title: "Exemple d'analyse fondamentale",
        text: "Par exemple, si vous souhaitez investir dans une entreprise, vous pouvez examiner ses états financiers, son historique de croissance, ses ratios financiers et ses perspectives d'avenir pour évaluer sa valeur."
      },
      {
        title: "Les principaux indicateurs",
        text: "Certains des principaux indicateurs utilisés dans l'analyse fondamentale comprennent le chiffre d'affaires, le bénéfice net, les marges bénéficiaires, le ratio cours/bénéfice et le rendement des dividendes."
      },
      {
        title: "Le chiffre d'affaires",
        text: "Le chiffre d'affaires est le montant total des ventes d'une entreprise sur une période donnée. Il est utilisé pour évaluer la croissance de l'entreprise et sa capacité à générer des revenus."
      },
      {
        title: "Le bénéfice net",
        text: "Ainsi, le bénéfice net est le montant d'argent qu'une entreprise réalise après avoir payé toutes ses dépenses. Il est utilisé pour évaluer la rentabilité de l'entreprise."
      },
      {
        title: "Relier le bénéfice net au chiffre d'affaires",
        text: "Vous comprenez alors l'importance de relier le bénéfice net au chiffre d'affaires pour évaluer la rentabilité de l'entreprise puisque cela permet de déterminer si l'entreprise est capable de générer des bénéfices à partir de ses ventes."
      },
      {
        title: "Les marges bénéficiaires",
        text: "On parle alors de marges bénéficiaires. Ce sont des ratios qui mesurent la rentabilité d'une entreprise. En effet, ils comparent le bénéfice net de l'entreprise à son chiffre d'affaires pour évaluer son efficacité opérationnelle."
      },
      {
        title: "Le ratio cours/bénéfice",
        text: "Le ratio cours/bénéfice est un indicateur clé utilisé pour évaluer la valeur d'une action. Il compare le cours actuel de l'action au bénéfice par action de l'entreprise pour déterminer si l'action est surévaluée ou sous-évaluée."
      },
      {
        title: "Le rendement des dividendes",
        text: "Enfin, le rendement des dividendes est le montant des dividendes qu'une entreprise verse à ses actionnaires par rapport au cours de l'action. Il est utilisé pour évaluer le rendement d'un investissement en actions."
      },
      {
        title: "Les avantages de l'analyse fondamentale",
        text: "Ainsi, l'analyse fondamentale vous permet de prendre des décisions d'investissement éclairées et pragmatiques en vous basant sur des données financières et économiques solides."
      },
      {
        title: "Où trouver les données financières",
        text: "Vous pouvez trouver les données financières d'une entreprise dans ses rapports annuels, ses états financiers, ses communiqués de presse et ses présentations aux investisseurs. Des sites comme TradingView, Yahoo Finance et Bloomberg peuvent également être utiles."
      },
      {
        title: "Conclusion",
        text: "En conclusion, l'analyse fondamentale est une méthode essentielle pour évaluer les actions et prendre des décisions d'investissement éclairées. Elle vous permet de comprendre la santé financière d'une entreprise et d'identifier les opportunités d'investissement."
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
