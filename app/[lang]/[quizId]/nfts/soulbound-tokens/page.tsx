"use client";

import type { Lang } from "@/types/language/lang";
import Course from "@/app/[lang]/components/courses/courseScreen/course";

const cards = {
  en: [
    {
      title: "Introduction",
      text: "Soulbound tokens are NFTs that are locked to a specific account or wallet."
    },
    {
      title: "What does it mean?",
      text: "It means that the token cannot be transferred to another account or wallet."
    },
    {
      title: "Why are they used?",
      text: "Soulbound tokens are used to prevent fraud and protect the value of an NFT."
    },
    {
      title: "How are they created?",
      text: "To create a soulbound token, the creator of an NFT can choose to make it soulbound in the smart contract by overriding the transfer function."
    },
    {
      title: "Example",
      text: "As an example example, soulbound tokens are used in games to prevent players from selling in-game items for real money."
    },
    {
      title: "Example",
      text: "Also, TrotelCoin is using soulbound tokens to reward you for completing courses and proving ownership of your diplomas."
    },
    {
      title: "Example",
      text: "Lastly, you could represent your digital ID as a soulbound token to prove your identity online."
    },
    {
      title: "Conclusion",
      text: "To conclude, soulbound tokens are a powerful tool to protect the value of NFTs and prevent fraud."
    }
  ],
  fr: [
    {
      title: "Introduction",
      text: "Les jetons soulbound sont des NFTs verrouillés sur un compte ou un portefeuille spécifique."
    },
    {
      title: "Qu'est-ce que cela signifie?",
      text: "Cela signifie que le jeton ne peut pas être transféré vers un autre compte ou portefeuille."
    },
    {
      title: "Pourquoi sont-ils utilisés?",
      text: "Les jetons soulbound sont utilisés pour prévenir la fraude et protéger la valeur d'un NFT."
    },
    {
      title: "Comment sont-ils créés?",
      text: "Pour créer un jeton soulbound, le créateur d'un NFT peut choisir de le rendre soulbound dans le smart contract en remplaçant la fonction de transfert."
    },
    {
      title: "Exemple",
      text: "Par exemple, les jetons soulbound sont utilisés dans les jeux pour empêcher les joueurs de vendre des objets de jeu contre de l'argent réel."
    },
    {
      title: "Exemple",
      text: "De plus, TrotelCoin utilise des jetons soulbound pour vous récompenser lorsque vous terminez des cours et prouvez la détention de vos diplômes."
    },
    {
      title: "Exemple",
      text: "Enfin, vous pourriez représenter votre identité numérique sous forme de jeton soulbound pour prouver votre identité en ligne."
    },
    {
      title: "Conclusion",
      text: "En conclusion, les jetons soulbound sont un outil puissant pour protéger la valeur des NFTs et prévenir la fraude."
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
