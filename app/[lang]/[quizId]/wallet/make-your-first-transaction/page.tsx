"use client";

import type { Lang } from "@/types/lang";
import Course from "@/app/[lang]/[quizId]/components/course";
import Link from "next/link";
import { useEffect, useState } from "react";
import BlueButton from "@/app/[lang]/components/blueButton";
import { useAccount, useSendTransaction } from "wagmi";
import { polygon } from "viem/chains";
import { trotelCoinDAOAddress } from "@/data/web3/addresses";
import { parseEther } from "viem";
import Success from "@/app/[lang]/components/modals/success";
import Fail from "@/app/[lang]/components/modals/fail";
import Wallet from "@/app/[lang]/components/header/wallet";

const CoursePage = ({ params: { lang } }: { params: { lang: Lang } }) => {
  const [condition, setCondition] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { address } = useAccount();
  const { sendTransactionAsync } = useSendTransaction({
    mutation: {
      onSuccess: () => {
        setCondition(true);
        setSuccessMessage(true);
        setIsLoading(false);
      },
      onMutate: () => {
        setIsLoading(true);
      },
      onError: () => {
        setErrorMessage(true);
        setCondition(false);
        setIsLoading(false);
      },
    },
  });

  useEffect(() => {
    if (address) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [address]);

  const cards = {
    en: [
      {
        title: "Introduction",
        text: "Once upon a time, Alexandre wanted to surprise his friend, Kylian, with some Polygon tokens.",
      },
      {
        title: "Surprise",
        text: "Excited, Alexandre opened his crypto wallet on his smartphone.",
      },
      {
        title: "Smile",
        text: "With a smile, he tapped to send tokens. Carefully, he entered Kylian's wallet address and the amount for his small surprise.",
      },
      {
        title: "Memories",
        text: "Suddenly, memories of their adventures flooded Alexandre's mind as he double-checked. With a determined nod, he confirmed the transaction.",
      },
      {
        title: "Validators",
        text: "His wallet quickly created a digital signature, entering Polygon's validator network.",
      },
      {
        title: "In the meantime...",
        text: "Meanwhile, Kylian remained busy, unaware of Alexandre's digital surprise. Validators diligently worked to confirm the transaction in the background until confirmation!",
      },
      {
        title: "Ending",
        text: "Alexandre imagined Kylian's surprise, symbolizing their friendship digitally. With a smile, he imagined Kylian finding the unexpected gift in his wallet.",
      },
      {
        title: "Challenge",
        text: "Now, it's your time to make the transaction! You will send us 0.01 MATIC symbolizing your first transaction.",
      },
      {
        title: "Making the transaction",
        text: (
          <>
            <span className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Make your first transaction
            </span>
            <div className="mt-4">
              {address ? (
                <BlueButton
                  disabled={disabled}
                  isLoading={isLoading}
                  lang={lang}
                  text="Send transaction"
                  onClick={async () => {
                    await sendTransactionAsync({
                      chainId: polygon.id,
                      to: trotelCoinDAOAddress,
                      value: parseEther("0.01"),
                    });
                  }}
                />
              ) : (
                <Wallet lang={lang} isCentered={true} />
              )}
            </div>

            <Success
              title="Success"
              message="The transaction has been done. Congrats!"
              lang={lang}
              onClose={() => setSuccessMessage(false)}
              show={successMessage}
            />
            <Fail
              title="Error"
              message="An error occured"
              lang={lang}
              onClose={() => setErrorMessage(false)}
              show={errorMessage}
            />
          </>
        ),
      },
    ],
    fr: [
      {
        title: "Introduction",
        text: "Un jour, Alexandre voulait surprendre son ami Kylian en lui offrant des jetons Polygon.",
      },
      {
        title: "La surprise",
        text: "Tout excité, Alexandre a ouvert son portefeuille crypto sur son smartphone.",
      },
      {
        title: "Le sourire",
        text: "Avec un sourire, il tapota pour envoyer les jetons. Avec précaution, il entra l'adresse du portefeuille de Kylian et le montant pour sa petite surprise.",
      },
      {
        title: "Les souvenirs",
        text: "D'un coup, les souvenirs de leurs aventures envahissent l'esprit d'Alexandre, qui procède à une double vérification. D'un signe de tête déterminé, il confirme la transaction.",
      },
      {
        title: "Les validateurs",
        text: "Son portefeuille a rapidement créé une signature numérique, entrant dans le réseau de validateurs de Polygon.",
      },
      {
        title: "En attendant...",
        text: "Pendant ce temps, Kylian reste occupé, ignorant la surprise numérique d'Alexandre. Les validateurs ont travaillé avec diligence pour confirmer la transaction en arrière-plan jusqu'à la confirmation !",
      },
      {
        title: "La fin",
        text: "Alexandre imagine la surprise de Kylian, symbolisant numériquement leur amitié. Avec un sourire, il imagine Kylian découvrant le cadeau inattendu dans son portefeuille.",
      },
      {
        title: "Le défi",
        text: "Maintenant, c'est à vous d'effectuer la transaction ! Vous nous enverrez 0,01 MATIC symbolisant votre première transaction.",
      },
      {
        title: "Faire la transaction",
        text: (
          <>
            <span className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Faîtes votre première transaction
            </span>
            <div className="mt-4">
              {address ? (
                <BlueButton
                  disabled={disabled}
                  isLoading={isLoading}
                  lang={lang}
                  text="Send transaction"
                  onClick={async () => {
                    await sendTransactionAsync({
                      chainId: polygon.id,
                      to: trotelCoinDAOAddress,
                      value: parseEther("0.01"),
                    });
                  }}
                />
              ) : (
                <Wallet lang={lang} isCentered={true} />
              )}
            </div>
            <Success
              title="Succès"
              message="La transaction a été effectuée. Félicitations!"
              lang={lang}
              onClose={() => setSuccessMessage(false)}
              show={successMessage}
            />
            <Fail
              title="Erreur"
              message="Une erreur est survenue"
              lang={lang}
              onClose={() => setErrorMessage(false)}
              show={errorMessage}
            />
          </>
        ),
      },
    ],
  };

  return (
    <>
      <Course cards={cards} lang={lang} conditionIsOkay={condition} />
    </>
  );
};

export default CoursePage;
