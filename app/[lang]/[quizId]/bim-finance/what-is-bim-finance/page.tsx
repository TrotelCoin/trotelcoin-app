"use client";

import type { Lang } from "@/types/language/lang";
import Course from "@/app/[lang]/components/courses/courseScreen/course";

const cards = {
  en: [
    {
      title: "Introduction",
      text: "BIM Protocol is a DeFi protocol where BIM is the central governance token of the ecosystem. It enables holders to vote on important decisions and benefit from the revenues generated by the protocol's various activities.",
    },
    {
      title: "What can you do with BIM Exchange?",
      text: "BIM Exchange lets you buy and sell crypto-currencies with fiat currencies (EUR, USD, CHF, GBP, ARS). Thanks to an intelligent route scanner, exchanges are instantaneous and benefit from the most competitive rates.",
    },
    {
      title: "Stake with BIM Exchange",
      text: "Users can also stake their tokens on BIM Exchange to earn rewards. Thanks to auto compounding, revenues are directly re-staked and users maximize their returns.",
    },
    {
      title: "Bridge with BIM Exchange",
      text: "BIM Exchange also offers a Bridge protocol for transferring funds securely between chains. It facilitates token transfers without the need for call data or target contracts, simplifying cross-chain exchanges.",
    },
    {
      title: "What is the BIM DAO?",
      text: "The BIM DAO is a decentralized, autonomous organization that enables BIM token holders to vote and influence key decisions concerning the development and enhancements of the BIM protocol, ensuring participative governance.",
    },
    {
      title: "The treasury",
      text: "BIM's treasury, managed by the DAO, funds development, security and other platform initiatives. Decisions on resource allocation are taken by community vote, guaranteeing transparent use of funds.",
    },
    {
      title: "Why should you hold BIM?",
      text: "BIM holders benefit from governance rights, reduced transaction fees and staking rewards. They can also provide liquidity to pools and earn fees on trading activity.",
    },
    {
      title: "BIM Tokenomics",
      text: "The maximum supply of BIM tokens is 34,367,545. The BIM protocol also has a burn policy, which reduces the number of BIM tokens in circulation, thereby increasing its long-term price.",
    },
  ],
  fr: [
    {
      title: "Introduction",
      text: "BIM Protocol est un protocole DeFi où BIM est le jeton de gouvernance central de l'écosystème. Il permet aux détenteurs de voter sur des décisions importantes et de bénéficier des revenus générés par les diverses activités du protocole.",
    },
    {
      title: "Que pouvez-vous faire avec BIM Exchange?",
      text: "BIM Exchange vous permet d'acheter et de vendre des crypto-monnaies avec des monnaies fiduciaires (EUR, USD, CHF, GBP, ARS). Grâce à un scanner de route intelligent, les échanges sont instantanés et bénéficient des taux les plus compétitifs.",
    },
    {
      title: "Stakez avec BIM Exchange",
      text: "Les utilisateurs peuvent également staker leurs jetons sur BIM Exchange pour gagner des récompenses. Grâce à l'auto-compound, les revenus sont directement restakés et les utilisateurs maximisent leurs rendements.",
    },
    {
      title: "Bridgez avec BIM Exchange",
      text: "BIM Exchange propose également un protocole de Bridge pour transférer des fonds en toute sécurité entre les chaînes. Il facilite les transferts de jetons sans nécessiter de données d'appel ou de contrats cibles, simplifiant les échanges inter-chaînes.",
    },
    {
      title: "Qu'est-ce que la DAO BIM?",
      text: "La DAO BIM est une organisation décentralisée et autonome qui permet aux détenteurs de jetons BIM de voter et d'influencer les décisions clés concernant le développement et les améliorations du protocole BIM, garantissant une gouvernance participative.",
    },
    {
      title: "La trésorerie",
      text: "La trésorerie de BIM, gérée par la DAO, finance le développement, la sécurité et d'autres initiatives de la plateforme. Les décisions sur l'allocation des ressources sont prises par un vote communautaire, garantissant une utilisation transparente des fonds.",
    },
    {
      title: "Pourquoi devriez-vous détenir du BIM?",
      text: "Les détenteurs de BIM bénéficient de droits de gouvernance, de frais de transaction réduits et de récompenses de staking. Ils peuvent également fournir de la liquidité aux pools et gagner des frais sur l'activité de trading.",
    },
    {
      title: "BIM Tokenomics",
      text: "L'offre maximale de jetons BIM est de 34 367 545. Le protocole BIM a également une politique de burn, qui réduit le nombre de jetons BIM en circulation, augmentant ainsi son prix à long terme.",
    },
  ],
};

const CoursePage = ({ params: { lang } }: { params: { lang: Lang } }) => {
  return (
    <>
      <Course cards={cards} lang={lang} conditionIsOkay={true} />
    </>
  );
};

export default CoursePage;
