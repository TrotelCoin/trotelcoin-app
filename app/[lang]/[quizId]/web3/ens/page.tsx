"use client";

import type { Lang } from "@/types/language/lang";
import Course from "@/app/[lang]/components/courses/courseScreen/course";
import { useAccount, useBlockNumber, useEnsName } from "wagmi";
import { useEffect, useState } from "react";
import shortenAddress from "@/utils/addresses/shortenAddress";
import { mainnet } from "viem/chains";

const CoursePage = ({ params: { lang } }: { params: { lang: Lang } }) => {
  const [ensName, setEnsName] = useState<string | null>(null);

  const { address } = useAccount();
  const { data: blockNumber } = useBlockNumber({
    chainId: mainnet.id,
    watch: true
  });

  const { data, refetch } = useEnsName({
    address: address,
    chainId: mainnet.id
  });

  useEffect(() => {
    refetch();
  }, [blockNumber, refetch]);

  useEffect(() => {
    if (data && address) {
      setEnsName(data);
    } else {
      setEnsName(null);
    }
  }, [data, address]);

  const cards = {
    en: [
      {
        title: "Introduction",
        text: "Ethereum Name Service (ENS) is a protocol that replaces Ethereum addresses with domain names."
      },
      {
        title: "Explanation",
        text: "Instead of sending funds to an Ethereum address like 0x4A5..., you can send funds to a domain name like alexandretrotel.eth."
      },
      {
        title: "Analogy with IPv4",
        text: "On the Internet, IP addresses are strings of numbers that identify a computer. For example, behind Google.com is an IP address."
      },
      {
        title: "Analogy with DNS",
        text: "DNS is a protocol that translates a domain name into an IP address. For example, when you type google.com in your browser, DNS translates google.com into an IP address."
      },
      {
        title: "ENS",
        text: "Thus, ENS is a protocol that translates a domain name into an Ethereum address. For example, when you type alexandretrotel.eth in your wallet, ENS translates trotelalexandre.eth into an Ethereum address."
      },
      {
        title: "Your ENS domain name",
        text: "In practice, you can buy an ENS domain name and link this domain name to your Ethereum address."
      },
      {
        title: "Example",
        text: (
          <>
            {address ? (
              <>
                {ensName ? (
                  <>
                    <p>Your ENS domain name is {ensName}.</p>
                    <p>You can now receive funds at this address.</p>
                  </>
                ) : (
                  <>
                    <p>Your Ethereum address is {shortenAddress(address)}.</p>
                    <p>You don&apos;t have an ENS domain name.</p>
                  </>
                )}
              </>
            ) : (
              <>
                <p>You are not connected.</p>
              </>
            )}
          </>
        )
      },
      {
        title: "Conclusion",
        text: "In conclusion, ENS makes it easier to send funds by replacing Ethereum addresses with domain names that are easier to remember and write for humans."
      }
    ],
    fr: [
      {
        title: "Introduction",
        text: "Ethereum Name Service (ENS) est un protocole qui permet de remplacer des adresses Ethereum par des noms de domaine."
      },
      {
        title: "Explication",
        text: "Ainsi, au lieu de transférer des fonds à une adresse Ethereum comme 0x4A5..., vous pouvez transférer des fonds à un nom de domaine comme alexandretrotel.eth."
      },
      {
        title: "Analogie avec IPv4",
        text: "Sur Internet, les adresses IP sont des suites de chiffres qui permettent d'identifier un ordinateur. Par exemple, derrière Google.com se cache une adresse IP."
      },
      {
        title: "Analogie avec DNS",
        text: "Le DNS est un protocole qui permet de traduire un nom de domaine en adresse IP. Par exemple, quand vous tapez google.com dans votre navigateur, le DNS traduit google.com en adresse IP."
      },
      {
        title: "ENS",
        text: "Ainsi, ENS est un protocole qui permet de traduire un nom de domaine en adresse Ethereum. Par exemple, quand vous tapez alexandretrotel.eth dans votre portefeuille, ENS traduit trotelalexandre.eth en adresse Ethereum."
      },
      {
        title: "Votre nom de domaine ENS",
        text: "En pratique, vous pouvez acheter un nom de domaine ENS et lier ce nom de domaine à votre adresse Ethereum."
      },
      {
        title: "Exemple",
        text: (
          <>
            {address ? (
              <>
                {ensName ? (
                  <>
                    <p>
                      Votre nom de domaine ENS est {ensName}. Vous pouvez
                      maintenant recevoir des fonds à cette adresse.
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      Votre addresse Ethereum est {shortenAddress(address)}.
                      Vous n&apos;avez pas de nom de domaine ENS.
                    </p>
                  </>
                )}
              </>
            ) : (
              <>
                <p>Vous n&apos;êtes pas connecté.</p>
              </>
            )}
          </>
        )
      },
      {
        title: "Conclusion",
        text: "Pour conclure, ENS facilite l'envoi de fonds en remplaçant des adresses Ethereum par des noms de domaine qui sont plus simples à retenir et à écrire pour les humains."
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
