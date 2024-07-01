"use client";

import type { Lang } from "@/types/language/lang";
import Course from "@/app/[lang]/components/courses/courseScreen/course";

const CoursePage = ({ params: { lang } }: { params: { lang: Lang } }) => {
  const cards = {
    en: [
      {
        title: "Introduction",
        text: "Solana is a blockchain that aims to make transactions faster and cheaper. It is designed to be scalable and secure."
      },
      {
        title: "Founding date",
        text: "Solana was founded in 2017 by Anatoly Yakovenko, a software engineer with experience in compression algorithms and distributed systems. It was launched in March 2020 and has seen rapid growth since then."
      },
      {
        title: "Key features",
        text: "The key features of Solana include a unique architecture based on Proof of History, low transaction fees, high scalability, low latency, and enhanced security. We will explore these features in more detail in the upcoming courses."
      },
      {
        title: "Speed",
        text: "In the meantime, Solana was designed to be fast. It can handle up to 65,000 transactions per second, making it one of the fastest blockchains in the market. This is much more than Ethereum or Bitcoin."
      },
      {
        title: "Scalability",
        text: "Solana is also designed to be scalable. It can adapt to a large number of users and transactions without compromising its performance. This is a major advantage for decentralized applications and games."
      },
      {
        title: "Security",
        text: "Finally, Solana is designed to be secure. It uses robust consensus mechanisms to ensure the integrity of the blockchain and the security of transactions. This is an essential element for user trust."
      },
      {
        title: "The SOL token",
        text: "And that's not all, Solana also has its own token, SOL. It is used to pay transaction fees and to participate in the network as a validator. This is a key element of the Solana ecosystem."
      },
      {
        title: "The team",
        text: "One can compare Solana to a startup. Indeed, the team is composed of experienced engineers coming straight from big companies like Apple, Microsoft, Google, Twitter, Dropbox, and Intel. For example, Anatoly has worked at Qualcomm and Dropbox."
      },
      {
        title: "Conclusion",
        text: "In conclusion, Solana is a promising blockchain that offers unique and interesting features. It has the potential to revolutionize the world of decentralized finance and decentralized applications. We will explore these aspects in more detail in the upcoming courses."
      }
    ],
    fr: [
      {
        title: "Introduction",
        text: "Solana est une blockchain qui vise à rendre les transactions plus rapides et moins chères. Elle est conçue pour être évolutive et sécurisée."
      },
      {
        title: "Date de création",
        text: "Solana a été créée en 2017 par Anatoly Yakovenko, un ingénieur logiciel ayant de l'expérience dans les algorithmes de compression et les systèmes distribués. Elle a été lancée en mars 2020 et a connu une croissance rapide depuis."
      },
      {
        title: "Caractéristiques clés",
        text: "Les caractéristiques clés de Solana sont les suivantes: une architecture unique basée sur Proof of History, des frais de transaction bas, une scalabilité élevée, une latence faible et une sécurité renforcée. Nous allons explorer ces caractéristiques plus en détail dans les prochains cours."
      },
      {
        title: "Vitesse",
        text: "En attendant, Solana a été conçue pour être rapide. Elle peut gérer jusqu'à 65 000 transactions par seconde, ce qui la rend l'une des blockchains les plus rapides du marché. C'est bien plus qu'Ethereum ou Bitcoin."
      },
      {
        title: "Évolutivilité",
        text: "Solana est également conçue pour être évolutive. Elle peut s'adapter à un grand nombre d'utilisateurs et de transactions sans compromettre ses performances. C'est un avantage majeur pour les applications décentralisées et les jeux."
      },
      {
        title: "Sécurité",
        text: "Enfin, Solana est conçue pour être sécurisée. Elle utilise des mécanismes de consensus robustes pour garantir l'intégrité de la blockchain et la sécurité des transactions. C'est un élément essentiel pour la confiance des utilisateurs."
      },
      {
        title: "Le token SOL",
        text: "Et ce n'est pas tout, Solana dispose également de son propre token, le SOL. Il est utilisé pour payer les frais de transaction et pour participer au réseau en tant que validateur. C'est un élément clé de l'écosystème de Solana."
      },
      {
        title: "L'équipe",
        text: "On peut comparer Solana à une startup. D'ailleurs, l'équipe est composée d'ingénieurs expérimentés venant tout droit de grandes entreprises comme Apple, Microsoft, Google, Twitter, Dropbox et Intel. Par exemple, Anatoly a travaillé chez Qualcomm et Dropbox."
      },
      {
        title: "Conclusion",
        text: "En conclusion, Solana est une blockchain prometteuse qui offre des caractéristiques uniques et intéressantes. Elle a le potentiel de révolutionner le monde de la finance décentralisée et des applications décentralisées. Nous allons explorer ces aspects plus en détail dans les prochains cours."
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
