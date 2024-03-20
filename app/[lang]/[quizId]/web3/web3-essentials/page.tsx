"use client";

import { Lang } from "@/types/lang";
import Course from "@/app/[lang]/[quizId]/components/course";

const cards = {
  en: [
    {
      title: "Web3 Essentials",
      text: "Web3 is much more than a set of technologies and protocols. It's a new way of thinking about the internet and the world.",
    },
    {
      title: "Empowerment",
      text: "Web3 changes trust, letting you check without trusting one group. TrotelCoin helps you own and shape this fair web, encouraging you to explore and take part in its possibilities.",
    },
    {
      title: "Ownership",
      text: "Web3 is also about owning your data and identity. You're not a consumer anymore like on Instagram for instance, you're a participant.",
    },
    {
      title: "Privacy",
      text: "Your wallet let you share only what you want to share. You can be anonymous or not, it's up to you.",
    },
    {
      title: "Creator Economy",
      text: "Creators are also empowered by this new economy. Indeed, web3 allows a way to monetize their work and get paid for their creativity.",
    },
    {
      title: "Interoperability",
      text: "Web3 is about connecting different technologies such as blockchains and protocols. It's about making them work together.",
    },
    {
      title: "Origin",
      text: "Web3 is also an umbrella term for a set of emerging technologies that, together, extend the capabilities of the web we all use today in important and meaningful ways.",
    },
    {
      title: "Thematics",
      text: "Web3 is about finance, art, gaming, social networks, and much more. It's about the future of the web.",
    },
    {
      title: "Web2 vs Web3",
      text: "Currently, the web we know is referred to as Web2. It's the model made of big companies and centralized services.",
    },
    {
      title: "Example",
      text: "Let's say you wanna move your Instagram account to another platform. You can't do it. With Web3, you can.",
    },
    {
      title: "Conclusion",
      text: "Finally, Web3 is about freedom, privacy, and control. It's about a fairer internet. It's about you.",
    },
  ],
  fr: [
    {
      title: "Les bases du Web3",
      text: "Le Web3 est bien plus qu'un ensemble de technologies et de protocoles. C'est une nouvelle manière de penser Internet et le monde.",
    },
    {
      title: "Autonomie",
      text: "Le Web3 change la notion de confiance, vous permettant de vérifier sans avoir à faire confiance à un groupe. TrotelCoin vous aide à posséder et à façonner ce web équitable, vous encourageant à explorer et à participer à ses possibilités.",
    },
    {
      title: "Propriété",
      text: "Il s'agit aussi de posséder vos données et votre identité. Vous n'êtes plus un simple consommateur comme sur Instagram par exemple, vous êtes acteur.",
    },
    {
      title: "Vie privée",
      text: "Votre portefeuille vous permet de partager uniquement ce que vous souhaitez partager. Vous pouvez être anonyme ou non, c'est à vous de décider.",
    },
    {
      title: "Économie des créateurs",
      text: "Les créateurs sont aussi avantagés par cette nouvelle économique. En effet, le web3 permet une manière de monétiser leur travail et d'être rémunéré pour leur créativité.",
    },
    {
      title: "Interopérabilité",
      text: "Le Web3 consiste à connecter différentes technologies telles que les blockchains et les protocoles. Il s'agit de les faire fonctionner ensemble.",
    },
    {
      title: "Origine",
      text: "Le Web3 est aussi un terme générique pour un ensemble de technologies émergentes qui, ensemble, étendent les capacités du web que nous utilisons tous aujourd'hui de manière importante et significative.",
    },
    {
      title: "Thématiques",
      text: "Le Web3 porte sur la finance, l'art, les jeux vidéos, les réseaux sociaux, et bien plus encore. C'est l'avenir du web.",
    },
    {
      title: "Web2 vs Web3",
      text: "Actuellement, le web que nous connaissons est qualifié de Web2. C'est le modèle composé des grandes entreprises et des services centralisés.",
    },
    {
      title: "Exemple",
      text: "Imaginons que vous souhaitiez déplacer votre compte Instagram vers une autre plateforme. Vous ne pouvez pas le faire. Avec le Web3, vous le pourriez.",
    },
    {
      title: "Conclusion",
      text: "Enfin, Le Web3 est synonyme de liberté, de vie privée et de contrôle. Il s'agit d'un Internet plus équitable. Il s'agit de vous.",
    },
  ],
};

const CoursePage = ({ params: { lang } }: { params: { lang: Lang } }) => {
  return (
    <>
      <Course cards={cards} lang={lang} />
    </>
  );
};

export default CoursePage;
