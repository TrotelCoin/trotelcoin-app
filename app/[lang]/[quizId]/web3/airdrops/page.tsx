"use client";

import type { Lang } from "@/types/language/lang";
import Course from "@/app/[lang]/components/courses/courseScreen/course";

const CoursePage = ({ params: { lang } }: { params: { lang: Lang } }) => {
  const cards = {
    en: [
      {
        title: "Introduction",
        text: "You may have already heard of airdrops but do you know what they are? Do you know how to participate in them?"
      },
      {
        title: "Why do projects airdrop tokens?",
        text: "Projects airdrop tokens for various reasons. Some of the most common reasons are to reward loyal users, to increase the project's visibility, and to distribute tokens in a fair way."
      },
      {
        title: "Uniswap airdrop",
        text: "A well-known airdrop is the Uniswap airdrop. Indeed, Uniswap distributed 400 UNI tokens to each user who had used the platform before a certain date. At the time, it felt like a Christmas gift for DeFi users."
      },
      {
        title: "How to participate in an airdrop?",
        text: "Participating in airdrops depends on the projects. Some projects simply ask you to sign up for their newsletter, while others ask you to perform certain actions to be eligible for the airdrop."
      },
      {
        title: "Example",
        text: "Imagine a bridge that plans an airdrop. To be eligible, you might have to make a transaction on the bridge. It could also be 10 transactions. In reality, we don't really know."
      },
      {
        title: "Farming and airdrops",
        text: "Thus, to be eligible for a maximum of airdrops and hope to win a lot, users can farm using a maximum of protocols."
      },
      {
        title: "TrotelCoin helps you",
        text: "TrotelCoin helps you participate in airdrops through integrated activities into our courses with partner protocols. Farm, with ease!"
      },
      {
        title: "Risks",
        text: "However, there are risks, some projects may be scams and the tokens distributed may have no value, we filter them on TrotelCoin."
      },
      {
        title: "Controversies",
        text: "Likewise, another risk is that users expect an airdrop from each project even though it is not planned. This can create controversies and tensions between users and projects."
      },
      {
        title: "Secondary markets",
        text: "Sometimes, projects allocate forecast points for airdrops. These points can be traded on secondary markets. This can be an opportunity for users to make money."
      },
      {
        title: "Conclusion",
        text: "Airdrops are an opportunity for users to earn tokens for free and for projects to gain visibility. However, it is important to remain vigilant and not fall for scams."
      }
    ],
    fr: [
      {
        title: "Introduction",
        text: "Vous avez peut-être déjà entendu parler des airdrops, mais savez-vous ce que c'est ? Savez-vous comment y participer ?"
      },
      {
        title: "Pourquoi les projets distribuent-ils des tokens ?",
        text: "Les projets distribuent des tokens pour diverses raisons. Certaines des raisons les plus courantes sont de récompenser les utilisateurs fidèles, d'augmenter la visibilité du projet et de distribuer des tokens de manière équitable."
      },
      {
        title: "L'airdrop de Uniswap",
        text: "Un airdrop bien connu est celui de Uniswap. En effet, Uniswap a distribué 400 tokens UNI à chaque utilisateur qui avait utilisé la plateforme avant une certaine date. À l'époque, cela ressemblait à un cadeau de Noël pour les utilisateurs de DeFi."
      },
      {
        title: "Comment participer à un airdrop ?",
        text: "La participation aux airdrops dépend des projets. Certains projets demandent simplement de s'inscrire à leur newsletter, tandis que d'autres demandent de réaliser certaines actions pour être éligible à l'airdrop."
      },
      {
        title: "Exemple",
        text: "Imaginons un bridge qui prévoit un airdrop. Pour être éligible, vous pourriez devoir réaliser une transaction sur le bridge. Cela pourrait aussi être 10 transactions. En réalité, on ne sait pas vraiment."
      },
      {
        title: "Farming et airdrops",
        text: "Ainsi, pour être éligible à un maximum d'airdrops et espérer gagner beaucoup, les utilisateurs peuvent farmer en utilisant un maximum de protocoles."
      },
      {
        title: "TrotelCoin vous accompagne",
        text: "TrotelCoin vous aide à participer aux airdrops grâce aux activités intégrées dans nos cours avec les protocoles partenaires. Farmez, en toute simplicité !"
      },
      {
        title: "Risques",
        text: "Il existe cependant des risques, certains projets peuvent être des scams et les tokens distribués peuvent ne pas avoir de valeur, nous les filtrons sur TrotelCoin."
      },
      {
        title: "Controverses",
        text: "De même, un autre risque est que les utilisateurs attendent de chaque projet un airdrop alors même que cela n'est pas prévu. Cela peut créer des controverses et des tensions entre les utilisateurs et les projets."
      },
      {
        title: "Marchés secondaires",
        text: "Parfois, les projets attribuent des points prévisionnels pour les airdrops. Ces points peuvent être échangés sur des marchés secondaires. Cela peut être une opportunité pour les utilisateurs de gagner de l'argent."
      },
      {
        title: "Conclusion",
        text: "Les airdrops sont une opportunité pour les utilisateurs de gagner des tokens gratuitement et pour les projets pour gagner en visibilité. Cependant, il est important de rester vigilant et de ne pas tomber dans des scams."
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
