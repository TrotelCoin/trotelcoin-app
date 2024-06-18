"use client";

import type { Lang } from "@/types/language/lang";
import Course from "@/app/[lang]/components/courses/courseScreen/course";

const CoursePage = ({ params: { lang } }: { params: { lang: Lang } }) => {
  const cards = {
    en: [
      {
        title: "Introduction",
        text: "When trading, it's important to know about cognitive biases, which are systematic errors in thinking that affect your decision-making."
      },
      {
        title: "5 Cognitive Biases",
        text: "Here are five cognitive biases that can affect you when trading."
      },
      {
        title: "Confirmation Bias",
        text: "We tend to seek and interpret information in a way that confirms our existing beliefs and assumptions, rather than objectively examining all evidence."
      },
      {
        title: "Overconfidence Bias",
        text: "We tend to overestimate our predictive abilities and decision-making skills, which can lead us to take excessive risks."
      },
      {
        title: "Anchoring Bias",
        text: "We excessively rely on the first information we receive to make decisions, even if this information is arbitrary or irrational."
      },
      {
        title: "Loss Aversion Bias",
        text: "We tend to avoid losses more than we seek gains, which can prevent us from making rational decisions."
      },
      {
        title: "Familiarity Bias",
        text: "We tend to prefer investments or assets that we are familiar with, regardless of their objective merit or potential risks. This bias can lead us to overlook other opportunities and limit our investment diversification."
      },
      {
        title: "Conclusion",
        text: "These cognitive biases can lead us to make irrational and emotional decisions when trading cryptocurrencies, rather than relying on objective analysis of facts. It's important to be aware of them to try to overcome them and adopt a more disciplined approach."
      }
    ],
    fr: [
      {
        title: "Introduction",
        text: "Lorsque vous tradez, il est important de connaître les biais cognitifs, qui sont des erreurs systématiques de pensée qui affectent votre prise de décision."
      },
      {
        title: "5 Biais Cognitifs",
        text: "Voici cinq biais cognitifs qui peuvent vous affecter lorsque vous tradez."
      },
      {
        title: "Biais de confirmation",
        text: "Nous avons tendance à chercher et interpréter l'information de manière à confirmer nos croyances et hypothèses existantes, plutôt que d'examiner objectivement toutes les preuves."
      },
      {
        title: "Biais de surconfiance",
        text: "Nous avons tendance à surestimer nos capacités prédictives et nos compétences en matière de prise de décision, ce qui peut nous amener à prendre des risques excessifs."
      },
      {
        title: "Biais d'ancrage",
        text: "Nous nous appuyons excessivement sur les premières informations que nous recevons pour prendre des décisions, même si ces informations sont arbitraires ou irrationnelles."
      },
      {
        title: "Biais d'aversion aux pertes",
        text: "Nous avons tendance à éviter les pertes plus que nous ne cherchons les gains, ce qui peut nous empêcher de prendre des décisions rationnelles."
      },
      {
        title: "Biais de familiarité",
        text: "Nous avons tendance à préférer les investissements ou les actifs avec lesquels nous sommes familiers, indépendamment de leur mérite objectif ou des risques potentiels. Ce biais peut nous amener à négliger d'autres opportunités et à limiter notre diversification des investissements."
      },
      {
        title: "Conclusion",
        text: "Ces biais cognitifs peuvent nous amener à prendre des décisions irrationnelles et émotionnelles lors du trading de cryptomonnaies, plutôt que de nous appuyer sur une analyse objective des faits. Il est important d'en être conscient pour essayer de les surmonter et adopter une approche plus disciplinée."
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
