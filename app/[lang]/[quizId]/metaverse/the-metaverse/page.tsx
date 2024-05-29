"use client";

import type { Lang } from "@/types/language/lang";
import Course from "@/app/[lang]/components/courses/courseScreen/course";

const CoursePage = ({ params: { lang } }: { params: { lang: Lang } }) => {
  const cards = {
    en: [
      {
        title: "Introduction",
        text: "The metaverse is a virtual universe where users can interact with each other and with digital objects. It is powered by blockchain technology and virtual reality.",
      },
      {
        title: "NFTs in the metaverse",
        text: "For example, NFTs allow users to own an item in a video game or even virtual land. They are stored on the blockchain and their uniqueness is guaranteed by the technology.",
      },
      {
        title: "Commerce in the metaverse",
        text: "Commerce in the metaverse is booming. Users can buy virtual goods, clothing, artwork, and even real estate in digital worlds.",
      },
      {
        title: "Work in the metaverse",
        text: "Moreover, some companies are already trying to create virtual offices where employees can gather, work, and interact in a digital environment.",
      },
      {
        title: "The metaverse in the real world",
        text: "Thanks to augmented reality, the metaverse is starting to blend into the real world. Users can interact with digital objects in their physical environment.",
      },
      {
        title: "Meta (formerly Facebook) and the metaverse",
        text: "For example, Meta, formerly Facebook, is currently focusing on developing this kind of metaverse. It has already invested billions of dollars in this field.",
      },
      {
        title: "The Sandbox",
        text: "Finally, The Sandbox is a game that includes the existence of virtual worlds where players can create, share, and monetize their own games and experiences.",
      },
      {
        title: "Conclusion",
        text: "The metaverse is revolutionizing the way we interact with the digital world. It offers many possibilities for the future.",
      },
    ],
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
