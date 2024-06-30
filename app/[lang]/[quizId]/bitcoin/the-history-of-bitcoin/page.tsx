"use client";

import type { Lang } from "@/types/language/lang";
import Course from "@/app/[lang]/components/courses/courseScreen/course";
import Link from "next/link";

const cards = {
  en: [
    {
      title: "Domain Name Registration",
      text: "It started with the domain name bitcoin.org being registered on the 18th of August 2008."
    },
    {
      title: "Bitcoin Whitepaper",
      text: "On 31st October 2008, an unknown person or group of people using the name Satoshi Nakamoto publishes a paper called Bitcoin: A Peer-to-Peer Electronic Cash System."
    },
    {
      title: "Genesis Block Mined",
      text: "The first block of the blockchain is mined, known as the Genesis Block on 3rd January 2009 with a reward of 50 bitcoins."
    },
    {
      title: "Bitcoin Software Announced",
      text: "The first version of the Bitcoin software is announced on the Cryptography Mailing list and hosted at SourceForge on 9 January 2009."
    },
    {
      title: "Hal Finney",
      text: "On January 2009, Hal Finney, a developer was the first person to receive a Bitcoin transaction receiving 10 bitcoins from Satoshi Nakamoto."
    },
    {
      title: "Pizza Day",
      text: "In 2010, the first transaction using Bitcoin occurred, exchanging 10,000 BTC for two pizzas, establishing May 22 as Bitcoin Pizza Day."
    },
    {
      title: "The Bitcoin Foundation",
      text: "The Bitcoin Foundation was founded in September 2012 to promote bitcoin's development and uptake. In 2013, it was announced that the foundation would accept Bitcoin donations."
    },
    {
      title: "Mt. Gox",
      text: "Launched in July 2010, Mt. Gox was a bitcoin exchange based in Tokyo. In 2014 it was handling over 70% of all bitcoin transactions worldwide. But, in February 2014, Mt. Gox filed for bankruptcy protection from creditors."
    },
    {
      title: "The EFF",
      text: "The Electronic Frontier Foundation began, and then temporarily suspended, accepting bitcoins on 17 May 2013, citing concerns about a lack of legal precedent about new currency systems."
    },
    {
      title: "BitPay",
      text: "BitPay began processing Bitcoin payments for merchants in 2011 and has since become one of the largest Bitcoin payment processors. At the same time, WikiLeaks and other organizations began to accept bitcoins for donations."
    },
    {
      title: "The Halving",
      text: "The first halving occured on 28 November 2012 diminishing the reward from 50 to 25 bitcoins."
    },
    {
      title: "The Bitcoin Cash Fork",
      text: "Bitcoin Cash was created as a result of a hard fork from Bitcoin in August 2017. It increased the block size limit to eight megabytes."
    },
    {
      title: "The Lightning Network",
      text: "In 2018, The Lightning Network was created. It is a second layer to bitcoin's blockchain that proposes to reduce the congestion by creating micropayment channels between two parties."
    },
    {
      title: "Elon Musk",
      text: "Tesla announced that it had acquired $1.5 billion in Bitcoin and would accept Bitcoin as payment for its products in February 2021."
    },
    {
      title: "MicroStrategy",
      text: "MicroStrategy announced that it had purchased over 21,000 bitcoins in August 2020, worth more than $250 million."
    },
    {
      title: "Bitcoin ETFs",
      text: (
        <>
          BlackRock, the world&apos;s largest asset manager, filed documents
          with the SEC and released a iShares Bitcoin Trust. A lot of other ETFs
          have been released, you can find the{" "}
          <Link
            className="dark:hover-text-blue-400 text-blue-500 hover:text-blue-400 dark:text-blue-300"
            href="https://coinmarketcap.com/en/bitcoin-etf/"
            target="_blank"
          >
            list here
          </Link>
          .
        </>
      )
    },
    {
      title: "Conclusion",
      text: "The future of Bitcoin is uncertain, but its past is full of interesting stories and events that have shaped the world of cryptocurrency."
    }
  ],
  fr: [
    {
      title: "Enregistrement du nom de domaine",
      text: "Tout a commencé avec l'enregistrement du nom de domaine bitcoin.org le 18 août 2008."
    },
    {
      title: "Livre blanc Bitcoin",
      text: "Le 31 octobre 2008, une personne ou un groupe de personnes inconnu utilisant le nom de Satoshi Nakamoto publie un document intitulé Bitcoin: A Peer-to-Peer Electronic Cash System."
    },
    {
      title: "Bloc Genesis miné",
      text: "Le premier bloc de la blockchain est miné, connu sous le nom de Bloc Genesis le 3 janvier 2009 avec une récompense de 50 bitcoins."
    },
    {
      title: "Annonce du logiciel Bitcoin",
      text: "La première version du logiciel Bitcoin est annoncée sur la liste de diffusion Cryptography et hébergée sur SourceForge le 9 janvier 2009."
    },
    {
      title: "Hal Finney",
      text: "En janvier 2009, Hal Finney, un développeur, a été la première personne à recevoir une transaction Bitcoin recevant 10 bitcoins de Satoshi Nakamoto."
    },
    {
      title: "Jour de la Pizza",
      text: "En 2010, la première transaction utilisant Bitcoin a eu lieu, échangeant 10 000 BTC contre deux pizzas, établissant le 22 mai comme le Jour de la Pizza Bitcoin."
    },
    {
      title: "La Fondation Bitcoin",
      text: "La Bitcoin Foundation a été fondée en septembre 2012 pour promouvoir le développement et l'adoption du bitcoin. En 2013, il a été annoncé que la fondation accepterait les dons en bitcoins."
    },
    {
      title: "Mt. Gox",
      text: "Lancé en juillet 2010, Mt. Gox était une bourse de bitcoins basée à Tokyo. En 2014, il traitait plus de 70% de toutes les transactions de bitcoins dans le monde. Mais, en février 2014, Mt. Gox a déposé une demande de protection contre la faillite auprès des créanciers."
    },
    {
      title: "L'EFF",
      text: "La Electronic Frontier Foundation a commencé, puis a temporairement suspendu, d'accepter des bitcoins le 17 mai 2013, citant des préoccupations concernant un manque de précédent juridique concernant les nouveaux systèmes de devises."
    },
    {
      title: "BitPay",
      text: "BitPay a commencé à traiter les paiements en bitcoins pour les commerçants en 2011 et est depuis devenu l'un des plus grands processeurs de paiement en bitcoins. En même temps, WikiLeaks et d'autres organisations ont commencé à accepter des bitcoins pour des dons."
    },
    {
      title: "Le Halving",
      text: "Le premier halving a eu lieu le 28 novembre 2012, diminuant la récompense de 50 à 25 bitcoins."
    },
    {
      title: "Le fork Bitcoin Cash",
      text: "Bitcoin Cash a été créé à la suite d'un hard fork de Bitcoin en août 2017. Il a augmenté la limite de taille de bloc à huit mégaoctets."
    },
    {
      title: "Le réseau Lightning",
      text: "En 2018, le réseau Lightning a été créé. Il s'agit d'une deuxième couche de la blockchain de Bitcoin qui propose de réduire la congestion en créant des canaux de micropaiement entre deux parties."
    },
    {
      title: "Elon Musk",
      text: "Tesla a annoncé qu'il avait acquis 1,5 milliard de dollars en bitcoins et accepterait les bitcoins comme paiement pour ses produits en février 2021."
    },
    {
      title: "MicroStrategy",
      text: "MicroStrategy a annoncé qu'il avait acheté plus de 21,000 bitcoins en août 2020, d'une valeur de plus de 250 millions de dollars."
    },
    {
      title: "ETF Bitcoin",
      text: (
        <>
          BlackRock, le plus grand gestionnaire d&apos;actifs au monde, a déposé
          des documents auprès de la SEC et a publié un iShares Bitcoin Trust.
          De nombreux autres ETF ont été publiés, vous pouvez trouver la{" "}
          <Link
            className="dark:hover-text-blue-400 text-blue-500 hover:text-blue-400 dark:text-blue-300"
            href="https://coinmarketcap.com/en/bitcoin-etf/"
            target="_blank"
          >
            liste ici
          </Link>
          .
        </>
      )
    },
    {
      title: "Conclusion",
      text: "L'avenir du Bitcoin est incertain, mais son passé est rempli d'histoires et d'événements intéressants qui ont façonné le monde des cryptomonnaies."
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
