"use client";

import type { Lang } from "@/types/language/lang";
import Course from "@/app/[lang]/components/courses/courseScreen/course";

const CoursePage = ({ params: { lang } }: { params: { lang: Lang } }) => {
  const cards = {
    en: [],
    fr: [
      {
        title: "Introduction",
        text: "Le metaverse est un univers virtuel où les utilisateurs peuvent interagir entre eux et avec des objets numériques. Il est alimenté par la technologie blockchain et la réalité virtuelle.",
      },
      {
        title: "Les NFTs dans le metaverse",
        text: "Par exemple, les NFTs permettent aux utilisateurs de posséder un item dans un jeu vidéo ou même un terrain virtuel. Ils sont stockés sur la blockchain et leur unicité est garantie par la technologie.",
      },
      {
        title: "Le commerce dans le metaverse",
        text: "Le commerce dans le metaverse est en plein essor. Les utilisateurs peuvent acheter des biens virtuels, des vêtements, des œuvres d'art et même des propriétés immobilières dans des mondes numériques.",
      },
      {
        title: "Le travail dans le metaverse",
        text: "De pus, certaines entreprises essayent déjà de créer des bureaux virtuels où les employés peuvent se réunir, travailler et interagir dans un environnement numérique.",
      },
      {
        title: "Le metaverse dans le monde réel",
        text: "Grâce à la réalité augmentée, le metaverse commence à se fondre dans le monde réel. Les utilisateurs peuvent interagir avec des objets numériques dans leur environnement physique.",
      },
      {
        title: "Meta (ex-Facebook) et le metaverse",
        text: "Par exemple, Meta, anciennement Facebook, se concentre actuellement sur le développement de ce genre de metaverse. Elle a déjà investi des milliards de dollars dans ce domaine.",
      },
      {
        title: "The Sandbox",
        text: "Enfin, The Sandbox est un jeu comprenant l'existance de mondes virtuels où les joueurs peuvent créer, partager et monétiser leurs propres jeux et expériences.",
      },
      {
        title: "Conclusion",
        text: "Le metaverse est en train de révolutionner la façon dont nous interagissons avec le monde numérique. Il offre de nombreuses possibilités pour le futur.",
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
