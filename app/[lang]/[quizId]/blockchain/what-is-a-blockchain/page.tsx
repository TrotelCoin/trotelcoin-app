"use client";

import React, { Fragment, useEffect, useState } from "react";
import { Lang } from "@/types/types";
import GetStarted from "@/app/[lang]/[quizId]/components/getStarted";
import Card from "@/app/[lang]/[quizId]/components/card";
import { Dialog, Transition } from "@headlessui/react";
import {
  useCourseFinished,
  CourseFinishedContextType,
} from "@/app/[lang]/[quizId]/layout";
import Confetti from "react-dom-confetti";

const cards = {
  en: [
    {
      title: "What is a blockchain?",
      text: "Blockchain is a distributed ledger used to record transactions across multiple computers. Each transaction is recorded in a block, which is then linked to the previous block, creating a chain of blocks.",
    },
    {
      title: "Block",
      text: "A block is a collection of transactions. Each block contains a list of transactions, a timestamp, and a reference to the previous block. Once a block is added to the blockchain, it cannot be altered.",
    },
    {
      title: "Immutable",
      text: "The blockchain is immutable, meaning that once a block is added to the blockchain, it cannot be altered. This makes the blockchain secure and tamper-resistant.",
    },
    {
      title: "Decentralized",
      text: "The blockchain is decentralized, meaning that it is not controlled by any single entity. Instead, it is maintained by a network of computers, making it secure and resistant to censorship.",
    },
    {
      title: "Transparent",
      text: "The blockchain is transparent, meaning that all transactions are publicly available. This transparency helps to prevent fraud and corruption.",
    },
    {
      title: "Secure",
      text: "The blockchain uses cryptographic techniques to secure transactions and prevent unauthorized access. This makes the blockchain secure and resistant to hacking.",
    },
    {
      title: "Consensus Mechanisms",
      text: "Consensus mechanisms are the protocols that consider a transaction as legitimate and add them to the block. The most common consensus mechanisms are Proof of Work (PoW) and Proof of Stake (PoS).",
    },
    {
      title: "Cryptocurrencies",
      text: "Blockchain technology is the foundation of cryptocurrencies. Cryptocurrencies are digital or virtual currencies that use cryptography for security and operate on a blockchain.",
    },
    {
      title: "Use cases",
      text: "Blockchain technology has a wide range of use cases, including supply chain management, voting systems, identity verification, and more.",
    },
  ],
  fr: [
    {
      title: "Qu'est-ce qu'une blockchain ?",
      text: "La blockchain est un registre distribué utilisé pour enregistrer des transactions sur plusieurs ordinateurs. Chaque transaction est enregistrée dans un bloc, qui est ensuite lié au bloc précédent, créant ainsi une chaîne de blocs.",
    },
    {
      title: "Bloc",
      text: "Un bloc est une collection de transactions. Chaque bloc contient une liste de transactions, une horodatage et une référence au bloc précédent. Une fois qu'un bloc est ajouté à la blockchain, il ne peut pas être modifié.",
    },
    {
      title: "Immuable",
      text: "La blockchain est immuable, ce qui signifie qu'une fois qu'un bloc est ajouté à la blockchain, il ne peut pas être modifié. Cela rend la blockchain sécurisée et résistante à la falsification.",
    },
    {
      title: "Décentralisé",
      text: "La blockchain est décentralisée, ce qui signifie qu'elle n'est pas contrôlée par une seule entité. Au lieu de cela, elle est entretenue par un réseau d'ordinateurs, ce qui la rend sécurisée et résistante à la censure.",
    },
    {
      title: "Transparent",
      text: "La blockchain est transparente, ce qui signifie que toutes les transactions sont publiquement disponibles. Cette transparence contribue à prévenir la fraude et la corruption.",
    },
    {
      title: "Sécurisé",
      text: "La blockchain utilise des techniques cryptographiques pour sécuriser les transactions et empêcher l'accès non autorisé. Cela rend la blockchain sécurisée et résistante au piratage.",
    },
    {
      title: "Mécanismes de consensus",
      text: "Les mécanismes de consensus sont les protocoles qui considèrent une transaction comme légitime et les ajoutent au bloc. Les mécanismes de consensus les plus courants sont la preuve de travail (PoW) et la preuve d'enjeu (PoS).",
    },
    {
      title: "Cryptomonnaies",
      text: "La technologie blockchain est la base des cryptomonnaies. Les cryptomonnaies sont des monnaies numériques ou virtuelles qui utilisent la cryptographie pour la sécurité et fonctionnent sur une blockchain.",
    },
    {
      title: "Cas d'utilisation",
      text: "La technologie blockchain a une large gamme de cas d'utilisation, y compris la gestion de la chaîne d'approvisionnement, les systèmes de vote, la vérification d'identité, et plus encore.",
    },
  ],
};

const CoursePage = ({ params: { lang } }: { params: { lang: Lang } }) => {
  const [fullscreen, setFullScreen] = useState<boolean>(false);
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
  const [width, setWidth] = useState<number>(0);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);

  const courseFinishedContext = useCourseFinished();
  const { setIsCourseFinished } =
    courseFinishedContext as CourseFinishedContextType;

  const handleNext = () => {
    if (currentCardIndex < cards.en.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    } else {
      setShowConfetti(true);
      setFullScreen(false);
      setIsCourseFinished(true);
    }
  };

  const handlePrevious = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      setShowConfetti(false);
    }
  };

  useEffect(() => {
    if (currentCardIndex === 0) {
      setWidth(0);
    } else {
      const width = ((currentCardIndex + 1) / cards.en.length) * 100;
      setWidth(width);
    }
  }, [currentCardIndex]);

  useEffect(() => {
    if (fullscreen) {
      setShowConfetti(false);
    }
  }, [fullscreen]);

  return (
    <>
      <GetStarted lang={lang} setFullScreen={setFullScreen} />

      <Transition
        as={Fragment}
        show={fullscreen}
        enter="transition-opacity duration-1000"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Dialog
          as="div"
          className="z-50 fixed top-0 left-0 w-full h-screen bg-white dark:bg-gray-900"
          onClose={() => setFullScreen(false)}
        >
          <div className="flex justify-between items-center gap-6 p-6 border-b border-gray-900/10 dark:border-gray-100/10">
            <div className="overflow-hidden w-full h-2 text-xs bg-gray-400 flex rounded-full">
              <div
                style={{
                  width: `${width}%`,
                  transition: "width 0.1s ease-in",
                }}
                className="rounded-full h-2 bg-blue-500"
              />
            </div>

            <button
              onClick={() => setFullScreen(false)}
              className="p-2 rounded-full bg-white dark:bg-gray-900 focus:bg-white dark:focus:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
              </svg>
            </button>
          </div>
          <div className="my-32 flex justify-center max-w-xl mx-auto items-center text-center">
            <div className="mx-8">
              {lang === "en" ? (
                <Card
                  title={cards.en[currentCardIndex].title}
                  text={cards.en[currentCardIndex].text}
                />
              ) : (
                <Card
                  title={cards.fr[currentCardIndex].title}
                  text={cards.fr[currentCardIndex].text}
                />
              )}
            </div>
          </div>
          <div className="fixed bottom-0 left-0 right-0 p-6 border-t border-gray-900/10 dark:border-gray-100/10">
            <div className="flex justify-between items-center mx-auto">
              <button
                onClick={() => handlePrevious()}
                className="flex text-sm font-semibold justify-center rounded-full text-gray-100 backdrop-blur-xl px-6 py-2 bg-blue-500 hover:bg-blue-400"
              >
                {lang === "en" ? "Previous" : "Précédent"}
              </button>
              <button
                onClick={() => handleNext()}
                className="flex text-sm font-semibold justify-center rounded-full text-gray-100 backdrop-blur-xl px-6 py-2 bg-blue-500 hover:bg-blue-400"
              >
                {currentCardIndex < cards.en.length - 1
                  ? lang === "en"
                    ? "Next"
                    : "Suivant"
                  : lang === "en"
                  ? "Take the quiz"
                  : "Faire le quiz"}
                <Confetti active={showConfetti} />
              </button>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default CoursePage;
