"use client";

import { Lang } from "@/types/types";
import Course from "@/app/[lang]/[quizId]/components/course";
import Link from "next/link";

const cards = {
  en: [
    {
      title: "Domain Name Registration",
      text: "The domain name bitcoin.org is registered on the 18th of August 2008. The domain was registered at anonymousspeech.com, a site that allows users to register domain names anonymously.",
    },
    {
      title: "Bitcoin Whitepaper",
      text: "An unknown person or group of people using the name Satoshi Nakamoto publishes a paper called Bitcoin: A Peer-to-Peer Electronic Cash System on 31st October 2008.",
    },
    {
      title: "Genesis Block Mined",
      text: "The first block of the blockchain is mined, known as the Genesis Block on 3rd January 2009. It was the block number 0 and had a reward of 50 bitcoins.",
    },
    {
      title: "Genesis Block Text",
      text: "The Times 03/Jan/2009 Chancellor on brink of second bailout for banks. This text refers to a headline in The Times newspaper published on the same date.",
    },
    {
      title: "Bitcoin Software Announced",
      text: "The first version of the Bitcoin software is announced on the Cryptography Mailing list and hosted at SourceForge on 9 January 2009.",
    },
    {
      title: "Hal Finney",
      text: "Hal Finney was a developer and the first person to receive a Bitcoin transaction. He received 10 bitcoins from Satoshi Nakamoto on 12 January 2009.",
    },
    {
      title: "Early Supporters",
      text: "Other early supporters were Wei Dai, creator of b-money, and Nick Szabo, creator of bit gold.",
    },
    {
      title: "The Enigma of Satoshi Nakamoto",
      text: "Satoshi Nakamoto is the name used by the unknown person or people who designed bitcoin and created its original reference implementation. As part of the implementation, they also devised the first blockchain database.",
    },
    {
      title: "Investigations and Suspects",
      text: "The real identity of Satoshi Nakamoto remains unknown. There have been many investigations and suspects, but none have been confirmed. Suspects include Nick Szabo, Hal Finney, and Dorian Nakamoto because of their involvement in the cryptocurrency space.",
    },
    {
      title: "Pizza Day",
      text: "In 2010, the first retail transaction with physical goods using Bitcoin occurred, exchanging 10,000 BTC for two pizzas, establishing May 22 as Bitcoin Pizza Day.",
    },
    {
      title: "The Bitcoin Foundation",
      text: "The Bitcoin Foundation was founded in September 2012 to promote bitcoin's development and uptake. In 2013, it was announced that the foundation would accept Bitcoin donations.",
    },
    {
      title: "Mt. Gox",
      text: "Mt. Gox was a bitcoin exchange based in Shibuya, Tokyo, Japan. Launched in July 2010, by 2013 and into 2014 it was handling over 70% of all bitcoin transactions worldwide. In February 2014, Mt. Gox filed for bankruptcy protection from creditors.",
    },
    {
      title: "The EFF",
      text: "The Electronic Frontier Foundation began, and then temporarily suspended, accepting bitcoins on 17 May 2013, citing concerns about a lack of legal precedent about new currency systems.",
    },
    {
      title: "BitPay",
      text: "BitPay began processing Bitcoin payments for merchants in 2011 and has since become one of the largest Bitcoin payment processors. WikiLeaks and other organizations began to accept bitcoins for donations.",
    },
    {
      title: "Rise of Altcoins and Regulation",
      text: "The first altcoin, Namecoin, was created in April 2011. Soon after, many other cryptocurrencies were created, including Litecoin, Peercoin, and Feathercoin. The first regulated bitcoin fund was established in Jersey in July 2014 and approved by the Jersey Financial Services Commission.",
    },
    {
      title: "The Halving",
      text: "The first block reward halving occurred on 28 November 2012. The second halving occurred in July 2016, and the third in May 2020.",
    },
    {
      title: "The Network",
      text: "The network exceeded 1 exahash/sec on 16 June 2016. The price of Bitcoin reached a new all-time high of $19,783.06 on 17 December 2017.",
    },
    {
      title: "The Bitcoin Cash Fork",
      text: "Bitcoin Cash was created as a result of a hard fork from Bitcoin in August 2017. It increased the block size limit to eight megabytes.",
    },
    {
      title: "Cryptocurrency Bubble",
      text: "The price of Bitcoin fell to $5,851 on 5 February 2018, and then to $3,000 on 7 February. It reached a low of $3,122 on 7 December 2018.",
    },
    {
      title: "The Lightning Network",
      text: "The Lightning Network is a second layer to bitcoin's blockchain that proposes to decongest its network by creating micropayment channels between two parties. It was released in 2018.",
    },
    {
      title: "Elon Musk",
      text: "Elon Musk's Tesla announced that it had acquired $1.5 billion in Bitcoin and would accept Bitcoin as payment for its products in February 2021.",
    },
    {
      title: "MicroStrategy",
      text: "MicroStrategy announced that it had purchased over 21,000 bitcoins in August 2020, worth more than $250 million.",
    },
    {
      title: "The Bitcoin ETF",
      text: "The first Bitcoin ETF was approved in Canada in February 2021. The first Bitcoin ETF in the United States was approved in October 2021.",
    },
    {
      title: "Bitcoin ETFs",
      text: (
        <>
          BlackRock, the world's largest asset manager, filed documents with the
          SEC and released a iShares Bitcoin Trust. A lot of other ETFs have
          been released, you can find the{" "}
          <Link
            className="text-blue-500 dark:text-blue-300 hover:text-blue-400 dark:hover-text-blue-400"
            href="https://coinmarketcap.com/en/bitcoin-etf/"
            target="_blank"
          >
            list here
          </Link>
          .
        </>
      ),
    },
    {
      title: "Conclusion",
      text: "The history of Bitcoin is a fascinating journey that has seen the cryptocurrency go from being a niche interest to a global phenomenon. The future of Bitcoin is uncertain, but its past is full of interesting stories and events that have shaped the world of cryptocurrency.",
    },
  ],
  fr: [
    {
      title: "Enregistrement du nom de domaine",
      text: "Le nom de domaine bitcoin.org est enregistré le 18 août 2008. Le domaine a été enregistré sur anonymousspeech.com, un site qui permet aux utilisateurs d'enregistrer des noms de domaine de manière anonyme.",
    },
    {
      title: "Livre blanc sur le Bitcoin",
      text: "Une personne ou un groupe de personnes inconnu utilisant le nom de Satoshi Nakamoto publie un document intitulé Bitcoin: A Peer-to-Peer Electronic Cash System le 31 octobre 2008.",
    },
    {
      title: "Bloc Genesis miné",
      text: "Le premier bloc de la blockchain est miné, connu sous le nom de bloc Genesis le 3 janvier 2009. C'était le bloc numéro 0 et avait une récompense de 50 bitcoins.",
    },
    {
      title: "Texte du bloc Genesis",
      text: "The Times 03/Jan/2009 Chancellor on brink of second bailout for banks. Ce texte fait référence à un titre du journal The Times publié le même jour.",
    },
    {
      title: "Annonce du logiciel Bitcoin",
      text: "La première version du logiciel Bitcoin est annoncée sur la liste de diffusion Cryptography et hébergée sur SourceForge le 9 janvier 2009.",
    },
    {
      title: "Hal Finney",
      text: "Hal Finney était un développeur et la première personne à recevoir une transaction Bitcoin. Il a reçu 10 bitcoins de Satoshi Nakamoto le 12 janvier 2009.",
    },
    {
      title: "Premiers partisans",
      text: "D'autres premiers partisans étaient Wei Dai, créateur de b-money, et Nick Szabo, créateur de bit gold.",
    },
    {
      title: "L'énigme de Satoshi Nakamoto",
      text: "Satoshi Nakamoto est le nom utilisé par la personne ou les personnes inconnues qui ont conçu le bitcoin et créé sa première implémentation de référence. Dans le cadre de l'implémentation, ils ont également conçu la première base de données blockchain.",
    },
    {
      title: "Enquêtes et suspects",
      text: "La véritable identité de Satoshi Nakamoto reste inconnue. Il y a eu de nombreuses enquêtes et suspects, mais aucun n'a été confirmé. Les suspects incluent Nick Szabo, Hal Finney et Dorian Nakamoto en raison de leur implication dans l'espace des cryptomonnaies.",
    },
    {
      title: "Jour de la pizza",
      text: "En 2010, la première transaction de détail avec des biens physiques utilisant Bitcoin a eu lieu, échangeant 10 000 BTC contre deux pizzas, établissant le 22 mai comme le Bitcoin Pizza Day.",
    },
    {
      title: "La Fondation Bitcoin",
      text: "La Bitcoin Foundation a été fondée en septembre 2012 pour promouvoir le développement et l'adoption du bitcoin. En 2013, il a été annoncé que la fondation accepterait les dons en bitcoins.",
    },
    {
      title: "Mt. Gox",
      text: "Mt. Gox était une bourse de bitcoins basée à Shibuya, Tokyo, Japon. Lancée en juillet 2010, en 2013 et en 2014, elle traitait plus de 70% de toutes les transactions de bitcoins dans le monde. En février 2014, Mt. Gox a déposé une demande de protection contre les créanciers.",
    },
    {
      title: "L'EFF",
      text: "L'Electronic Frontier Foundation a commencé, puis a temporairement suspendu, à accepter des bitcoins le 17 mai 2013, citant des préoccupations concernant l'absence de précédent juridique concernant les nouveaux systèmes monétaires.",
    },
    {
      title: "BitPay",
      text: "BitPay a commencé à traiter les paiements en bitcoins pour les commerçants en 2011 et est depuis devenu l'un des plus grands processeurs de paiements en bitcoins. WikiLeaks et d'autres organisations ont commencé à accepter des bitcoins pour des dons.",
    },
    {
      title: "Montée des altcoins et réglementation",
      text: "Le premier altcoin, Namecoin, a été créé en avril 2011. Peu de temps après, de nombreuses autres cryptomonnaies ont été créées, notamment Litecoin, Peercoin et Feathercoin. Le premier fonds de bitcoins réglementé a été créé à Jersey en juillet 2014 et approuvé par la Jersey Financial Services Commission.",
    },
    {
      title: "Le Halving",
      text: "Le premier halving de la récompense de bloc a eu lieu le 28 novembre 2012. Le deuxième halving a eu lieu en juillet 2016, et le troisième en mai 2020.",
    },
    {
      title: "Le réseau",
      text: "Le réseau a dépassé 1 exahash/sec le 16 juin 2016. Le prix du Bitcoin a atteint un nouveau record de 19 783,06 $ le 17 décembre 2017.",
    },
    {
      title: "La fourchette Bitcoin Cash",
      text: "Bitcoin Cash a été créé à la suite d'une scission de Bitcoin en août 2017. Il a augmenté la limite de taille des blocs à huit mégaoctets.",
    },
    {
      title: "Bulle des cryptomonnaies",
      text: "Le prix du Bitcoin est tombé à 5 851 $ le 5 février 2018, puis à 3 000 $ le 7 février. Il a atteint un creux de 3 122 $ le 7 décembre 2018.",
    },
    {
      title: "Le réseau Lightning",
      text: "Le Lightning Network est une deuxième couche de la blockchain du bitcoin qui propose de désengorger son réseau en créant des canaux de micropaiement entre deux parties. Il a été publié en 2018.",
    },
    {
      title: "Elon Musk",
      text: "Tesla d'Elon Musk a annoncé qu'elle avait acquis 1,5 milliard de dollars en bitcoins et accepterait le bitcoin comme paiement pour ses produits en février 2021.",
    },
    {
      title: "MicroStrategy",
      text: "MicroStrategy a annoncé qu'elle avait acheté plus de 21 000 bitcoins en août 2020, d'une valeur de plus de 250 millions de dollars.",
    },
    {
      title: "Le Bitcoin ETF",
      text: "Le premier Bitcoin ETF a été approuvé au Canada en février 2021. Le premier Bitcoin ETF aux États-Unis a été approuvé en octobre 2021.",
    },
    {
      title: "ETF Bitcoin",
      text: (
        <>
          BlackRock, le plus grand gestionnaire d'actifs au monde, a déposé des
          documents auprès de la SEC et a publié un iShares Bitcoin Trust. De
          nombreux autres ETF ont été publiés, vous pouvez trouver la{" "}
          <Link
            className="text-blue-500 dark:text-blue-300 hover:text-blue-400 dark:hover-text-blue-400"
            href="https://coinmarketcap.com/en/bitcoin-etf/"
            target="_blank"
          >
            liste ici
          </Link>
          .
        </>
      ),
    },
    {
      title: "Conclusion",
      text: "L'histoire du Bitcoin est un voyage fascinant qui a vu la cryptomonnaie passer d'un intérêt de niche à un phénomène mondial. L'avenir du Bitcoin est incertain, mais son passé est plein d'histoires et d'événements intéressants qui ont façonné le monde des cryptomonnaies.",
    },
  ],
};

const CoursePage = ({ params: { lang } }: { params: { lang: Lang } }) => {
  return (
    <>
      <Course cards={cards} lang={lang} />
    </>
  );
};

export default CoursePage;
