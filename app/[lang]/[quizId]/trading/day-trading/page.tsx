"use client";

import type { Lang } from "@/types/lang";
import Course from "@/app/[lang]/[quizId]/components/course";

const CoursePage = ({ params: { lang } }: { params: { lang: Lang } }) => {
  const cards = {
    en: [
      {
        title: "Introduction",
        text: "Day trading involves investors making multiple trades within a single day.",
      },
      {
        title: "Goals",
        text: "Day traders aim to profit from small price fluctuations.",
      },
      {
        title: "Historical Context",
        text: "Previously, only financial institutions and large organizations could participate in stock trading. However, advancements in technology have democratized access, allowing individuals with minimal funds to participate.",
      },
      {
        title: "Caution",
        text: "While day trading can yield profits, it's not recommended for beginners. It's advisable to gain knowledge before starting.",
      },
      {
        title: "Benefits",
        text: "Day trading offers several advantages. The cryptocurrency market operates 24/7, and cryptocurrencies are highly volatile, which can be advantageous for day traders.",
      },
      {
        title: "Transparency",
        text: "Cryptocurrency exchanges are generally transparent, with no hidden fees, making day trading cost-effective on platforms with low fees.",
      },
      {
        title: "Conclusion",
        text: "In subsequent courses, you'll learn strategies for day trading and also other types of trading. You will also learn to manage risks and be aware of potential pitfalls.",
      },
    ],
    fr: [
      {
        title: "Introduction",
        text: "Le day trading implique que les investisseurs effectuent de multiples transactions en une seule journée.",
      },
      {
        title: "Objectifs",
        text: "Les day traders visent à tirer profit des petites fluctuations de prix.",
      },
      {
        title: "Contexte historique",
        text: "Auparavant, seules les institutions financières et les grandes organisations pouvaient participer au trading boursier. Cependant, les progrès technologiques ont démocratisé l'accès, permettant aux particuliers avec des fonds minimes de participer.",
      },
      {
        title: "Attention",
        text: "Bien que le day trading puisse générer des profits, il n'est pas recommandé aux débutants. Il est conseillé d'acquérir des connaissances avant de commencer.",
      },
      {
        title: "Avantages",
        text: "Le day trading offre plusieurs avantages. Le marché des cryptomonnaies fonctionne 24h/24 et 7j/7, et les cryptomonnaies sont très volatiles, ce qui peut être avantageux pour les day traders.",
      },
      {
        title: "Transparence",
        text: "Les plateformes d'échange de cryptomonnaies sont généralement transparentes, sans frais cachés, ce qui rend le day trading rentable sur des plateformes à faibles frais.",
      },
      {
        title: "Conclusion",
        text: "Dans les cours suivants, vous apprendrez des stratégies pour le day trading ainsi que d'autres types de trading. Vous apprendrez aussi à gérer les risques et serez sensibilisé aux éventuels pièges.",
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
