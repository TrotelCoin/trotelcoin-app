"use client";

import type { Lang } from "@/types/language/lang";
import Course from "@/app/[lang]/components/courses/courseScreen/course";

const CoursePage = ({ params: { lang } }: { params: { lang: Lang } }) => {
  const cards = {
    en: [
      {
        title: "Introduction",
        text: "IPFS (InterPlanetary File System) is a decentralized file storage protocol."
      },
      {
        title: "Database",
        text: "Usually, websites store their files on servers. These servers are centralized and can be attacked."
      },
      {
        title: "AWS",
        text: "For example, Amazon Web Services (AWS) is a centralized file storage service. Files are stored on Amazon's servers."
      },
      {
        title: "IPFS",
        text: "In the case of IPFS, files are stored on a network of nodes, i.e. several computers. Thus, if a node is attacked, the files remain accessible on the other nodes."
      },
      {
        title: "How does it work?",
        text: "Concretely, IPFS stores files by dividing them into pieces. These pieces are then stored on different nodes of the network."
      },
      {
        title: "How to find a file?",
        text: "Unlike a centralized server, there is no URL to find a file. To find a file, you need to know its hash. The hash is a series of numbers that identifies a file."
      },
      {
        title: "Example",
        text: "For example, I upload a photo of a cat on IPFS. This photo is divided into pieces and stored on different nodes and to find this photo, you just need to know its hash."
      },
      {
        title: "Advantages",
        text: "Thus, IPFS allows you to store files in a decentralized way. This means that files are more secure and resistant to attacks and censorship."
      },
      {
        title: "Example",
        text: "For example, imagine a thief wants to steal your treasures. If the treasures are stored in a single house, the thief only has to enter it to steal them. On the other hand, if they are stored in several houses, the thief will have to enter all the houses to steal them. This is much more difficult."
      },
      {
        title: "Why use IPFS rather than the blockchain?",
        text: "Even though a blockchain can store data, it remains primarily (generally) a transaction ledger. It is therefore not suitable for storing files. Indeed, files are too large to be stored on the blockchain."
      },
      {
        title: "So why not use AWS?",
        text: "Remember the course on Web3, AWS is centralized and can be attacked. IPFS is decentralized and resistant to attacks. This is the philosophy of Web3."
      },
      {
        title: "Conclusion",
        text: "Thus, IPFS is a decentralized file storage protocol. It allows you to store files securely and resists attacks and censorship."
      }
    ],
    fr: [
      {
        title: "Introduction",
        text: "IPFS (InterPlanetary File System) est un protocole de stockage de fichiers décentralisé."
      },
      {
        title: "Base de données",
        text: "Habituellement, les sites web stockent leurs fichiers sur des serveurs. Ces serveurs sont centralisés et peuvent être attaqués."
      },
      {
        title: "AWS",
        text: "Par exemple, Amazon Web Services (AWS) est un service de stockage de fichiers centralisé. Les fichiers sont stockés sur les serveurs d'Amazon."
      },
      {
        title: "IPFS",
        text: "Dans le cas d'IPFS, les fichiers sont stockés sur un réseau de nœuds, c'est-à-dire plusieurs ordinateurs. Ainsi, si un nœud est attaqué, les fichiers restent accessibles sur les autres nœuds."
      },
      {
        title: "Fonctionnement",
        text: "Concrètement, IPFS stocke les fichiers en les divisant en morceaux. Ces morceaux sont ensuite stockés sur différents nœuds du réseau."
      },
      {
        title: "Comment retrouver un fichier ?",
        text: "Contrairement à un serveur centralisé, il n'y a pas d'URL pour retrouver un fichier. Pour retrouver un fichier, il faut connaître son hash. Le hash est une suite de chiffres qui identifie un fichier."
      },
      {
        title: "Exemple",
        text: "Par exemple, j'upload une photo de chat sur IPFS. Cette photo est divisée en morceaux et stockée sur différents nœuds et pour retrouver cette photo, il suffit de connaître son hash."
      },
      {
        title: "Avantages",
        text: "Ainsi, IPFS permet de stocker des fichiers de manière décentralisée. Cela signifie que les fichiers sont plus sécurisés et résistants aux attaques et à la censure."
      },
      {
        title: "Exemple",
        text: "À titre d'exemple, imaginons qu'un voleur veuille voler vos trésors. Si les trésors sont stockés dans une seule maison, le voleur n'a qu'à y entrer pour les voler. En revanche, si ils sont stockés dans plusieurs maisons, le voleur devra entrer dans toutes les maisons pour les voler. Cela est beaucoup plus difficile."
      },
      {
        title: "Pourquoi utiliser IPFS plutôt que la blockchain ?",
        text: "Même si une blockchain peut stocker des données, elle reste avant tout (en général) un registre de transactions. Elle n'est donc pas adaptée pour stocker des fichiers. En effet, les fichiers sont trop volumineux pour être stockés sur la blockchain."
      },
      {
        title: "Alors pourquoi ne pas utiliser AWS ?",
        text: "Rappelez vous le cours sur le Web3, AWS est centralisé et peut être attaqué. IPFS est décentralisé et résistant aux attaques. C'est la philosophie du Web3."
      },
      {
        title: "Conclusion",
        text: "Ainsi, IPFS est un protocole de stockage de fichiers décentralisé. Il permet de stocker des fichiers de manière sécurisée et résiste aux attaques et à la censure."
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
