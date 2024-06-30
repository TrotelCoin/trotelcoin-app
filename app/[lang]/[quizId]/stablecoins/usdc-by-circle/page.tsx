"use client";

import type { Lang } from "@/types/language/lang";
import Course from "@/app/[lang]/components/courses/courseScreen/course";

const cards = {
  en: [
    {
      title: "USDC by Circle",
      text: "USDC is a stablecoin issued by Circle, a financial services company based in Boston."
    },
    {
      title: "How does it work?",
      text: "In fact, for every token on the blockchain, there is a US dollar in a bank account. Its value is therefore based on a reserve of US dollars and US Treasury bonds held by regulated US entities."
    },
    {
      title: "Use case example",
      text: "Suppose you buy 1 USDC. Then, your account will be credited with 1 USDC and Circle will hold your US dollar. If you want to withdraw your US dollar, you can simply exchange your USDC for the US dollar."
    },
    {
      title: "Why use it?",
      text: "USDC is a digital payment method that is stable, secure, and fast. This allows for low-cost and instant money transfers without being exposed to cryptocurrency volatility."
    },
    {
      title: "How to buy USDC?",
      text: "To buy USDC, simply go to a cryptocurrency exchange platform and buy it with US dollars or other cryptocurrencies."
    },
    {
      title: "Who is behind USDC?",
      text: "Circle was founded in 2013 by Jeremy Allaire and Sean Neville. But in reality, USDC is managed by the Centre, a consortium of companies that includes Circle and Coinbase. The Centre is responsible for the issuance and regulation of USDC."
    },
    {
      title: "Which blockchains support USDC?",
      text: "USDC is currently available on Ethereum (and EVM-compatible blockchains), Algorand, Solana, Stellar, and Tron."
    }
  ],
  fr: [
    {
      title: "USDC by Circle",
      text: "L'USDC est un stablecoin émis par Circle, une entreprise de services financiers basée à Boston."
    },
    {
      title: "Comment cela fonctionne ?",
      text: "Enfaite, pour chaque token sur la blockchain, il y a un dollar américain dans un compte bancaire. Sa valeur est donc basée sur une réserve de dollars américains et de bons du Trésor américain détenue par des entités américaines réglementées."
    },
    {
      title: "Exemple d'utilisation",
      text: "Supposons que vous achetez 1 USDC. Alors, votre compte sera crédité de 1 USDC et Circle détiendra votre dollar américain. Si vous souhaitez retirer votre dollar américain, vous pouvez simplement échanger votre USDC contre le dollar américain."
    },
    {
      title: "Pourquoi l'utiliser ?",
      text: "L'USDC est un moyen de paiement numérique qui est stable, sécurisé et rapide. Cela permet de transférer de l'argent à moindre coût et de manière instantanée sans s'exposer à la volatilité des cryptomonnaies."
    },
    {
      title: "Comment acheter de l'USDC ?",
      text: "Pour acheter de l'USDC, il suffit de se rendre sur une plateforme d'échange de cryptomonnaies et de l'acheter avec des dollars américains ou d'autres cryptomonnaies."
    },
    {
      title: "Qui est derrière l'USDC ?",
      text: "Circle a été fondée en 2013 par Jeremy Allaire et Sean Neville. Mais en réalité, l'USDC est géré par le Centre, un consortium de sociétés qui inclut Circle et Coinbase. Le Centre est responsable de l'émission et de la régulation de l'USDC."
    },
    {
      title: "Quelles blockchains supportent l'USDC ?",
      text: "L'USDC est actuellement disponible sur Ethereum (et les blockchains EVM-compatibles), Algorand, Solana, Stellar, et Tron."
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
