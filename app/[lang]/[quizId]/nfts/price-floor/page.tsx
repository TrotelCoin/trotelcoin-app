"use client";

import type { Lang } from "@/types/language/lang";
import Course from "@/app/[lang]/components/courses/courseScreen/course";

const cards = {
  en: [
    {
      title: "Introduction",
      text: "Price floors are the minimum price that a seller is willing to accept for an NFT. They are set by the seller and are usually non-negotiable."
    },
    {
      title: "Trading cards example",
      text: "Imagine you have a collection of trading cards, like Pokémon cards. Each card is unique and has its own value."
    },
    {
      title: "Price floor",
      text: 'Think of the "price floor" like the lowest price someone is willing to sell their card for.'
    },
    {
      title: "Bob & Alice",
      text: "For instannce, Bob says that he won't sell this card for less than $10 to Alice."
    },
    {
      title: "Collection floor price",
      text: "So, if all the cards in a collection have a price floor, it means none of them will be sold for less than that amount."
    },
    {
      title: "What's a collection?",
      text: "A collection is a group of NFTs that are related in some way. For example, they could all be from the same artist or part of the same series."
    },
    {
      title: "Pokemons example",
      text: "For example, if the price floor for a Pikachu card is $50, even if someone really wants a Pikachu card, they can't buy it for less than $50 because that's the lowest price anyone is willing to sell it for."
    },
    {
      title: "Why set a price floor?",
      text: "So, setting a price floor can help protecting the value of an NFT. It can also help to prevent the price of an NFT from dropping too low."
    },
    {
      title: "Analogy",
      text: "It is like setting a minimum price to your house protecting its value."
    }
  ],
  fr: [
    {
      title: "Introduction",
      text: "Les prix planchers sont le prix minimum qu'un vendeur est prêt à accepter pour un NFT. Ils sont fixés par le vendeur et sont généralement non négociables."
    },
    {
      title: "Exemple d'un jeu de cartes",
      text: "Imaginez que vous avez un jeu de cartes à échanger, comme des cartes Pokémon. Chaque carte est unique et a sa propre valeur."
    },
    {
      title: "Prix plancher",
      text: "Le prix plancher est le prix le plus bas auquel quelqu'un est prêt à vendre sa carte."
    },
    {
      title: "Bob & Alice",
      text: "Par exemple, Bob pourrait dire qu'il ne vendra pas cette carte à Alice pour moins de $10."
    },
    {
      title: "Prix plancher d'une collection",
      text: "Ainsi, si toutes les cartes d'une collection ont un prix plancher, cela signifie que aucune d'entre elles ne sera vendue pour moins que ce montant."
    },
    {
      title: "Qu'est-ce qu'une collection?",
      text: "Une collection est un groupe de NFTs liés d'une manière ou d'une autre. Par exemple, ils pourraient tous être du même artiste ou faire partie de la même série."
    },
    {
      title: "Exemple de Pokemons",
      text: "Par exemple, si le prix plancher pour une carte Pikachu est de $50, même si quelqu'un veut vraiment une carte Pikachu, il ne peut pas l'acheter pour moins de $50 car c'est le prix le plus bas auquel quelqu'un est prêt à la vendre."
    },
    {
      title: "Pourquoi fixer un prix plancher?",
      text: "Alors, fixer un prix plancher peut aider à protéger la valeur d'un NFT. Cela peut également aider à empêcher le prix d'un NFT de chuter trop bas."
    },
    {
      title: "Analogie",
      text: "C'est comme fixer un prix minimum à votre maison pour protéger sa valeur."
    }
  ]
};

const CoursePage = ({ params: { lang } }: { params: { lang: Lang } }) => {
  return (
    <>
      <Course cards={cards} lang={lang} conditionIsOkay={true} />
    </>
  );
};

export default CoursePage;
