"use client";

import { Lang } from "@/types/types";
import Course from "@/app/[lang]/[quizId]/components/course";

const cards = {
  en: [
    {
      title: "Understanding money and currency",
      text: "Money is a medium of exchange that is widely accepted in transactions. It can be in the form of coins, banknotes, or digital currency. Currency is a system of money in general use in a particular country. It can be in the form of coins, banknotes, or digital currency.",
    },
    {
      title: "More about money",
      text: "Money has three main functions: a medium of exchange, a unit of account, and a store of value. A medium of exchange is something that buyers give to sellers in exchange for goods and services. A unit of account is a standard unit in which prices can be quoted and debts can be recorded. A store of value is something that holds its value over time.",
    },
    {
      title: "Fiat currency",
      text: "Fiat currency is a type of currency that is issued by a government and is not backed by a physical commodity, such as gold or silver. The value of fiat currency is derived from the relationship between supply and demand rather than the value of the material that the money is made of.",
    },
    {
      title: "Commodity money",
      text: "Commodity money is a type of money that is made of a valuable commodity, such as gold or silver. The value of commodity money comes from the material that the money is made of.",
    },
    {
      title: "Representative money",
      text: "Representative money is a type of money that is backed by a physical commodity, such as gold or silver. The value of representative money comes from the fact that it can be exchanged for a valuable commodity.",
    },
    {
      title: "Cryptocurrency",
      text: "Cryptocurrency is a type of digital or virtual currency that uses cryptography for security. It operates on a decentralized network based on blockchain technology. Bitcoin is the first and most well-known cryptocurrency.",
    },
    {
      title: "Fiat currency vs cryptocurrency",
      text: "Fiat currency and cryptocurrency are both mediums of exchange. However, fiat currency is issued by a government and regulated by a central authority, while cryptocurrency is decentralized and operates on a peer-to-peer network.",
    },
    {
      title: "What problems does Bitcoin solve?",
      text: "Bitcoin solves the problem of double-spending, which is the risk that a digital currency can be spent twice. It also solves the problem of trust, as it is based on a decentralized network that is secure and transparent.",
    },
    {
      title: "Bitcoin and inflation",
      text: "Contrary to fiat currencies, Bitcoin has a fixed supply of 21 million coins. This means that it is not subject to inflation, which is the decrease in the purchasing power of a currency over time.",
    },
    {
      title: "Who created Bitcoin?",
      text: "Bitcoin was created by an unknown person or group of people using the name Satoshi Nakamoto. It was released as open-source software in 2009.",
    },
    {
      title: "Technology behind Bitcoin",
      text: "Bitcoin operates on a decentralized network based on blockchain technology. A blockchain is a distributed ledger that records all transactions across multiple computers. Each transaction is recorded in a block, which is then linked to the previous block, creating a chain of blocks.",
    },
    {
      title: "Transactions on the Bitcoin network",
      text: "Transactions on the Bitcoin network are verified by network nodes through cryptography and recorded in a public distributed ledger called a blockchain. Bitcoin transactions are irreversible and cannot be altered or deleted.",
    },
    {
      title: "Why Bitcoin is secure?",
      text: "Bitcoin is secure because it uses cryptographic techniques to secure transactions and prevent unauthorized access. It is also decentralized, meaning that it is not controlled by any single entity, making it secure and resistant to censorship.",
    },
    {
      title: "Security example",
      text: "If you want to send Bitcoin to someone, you need to sign the transaction with your private key. The recipient can then verify the transaction using your public key. This ensures that only you can spend your Bitcoin.",
    },
    {
      title: "Bitcoin trilemna",
      text: "The Bitcoin trilemma refers to the trade-offs between scalability, security, and decentralization. It is difficult to achieve all three at the same time, and changes to one aspect can affect the others.",
    },
    {
      title: "Cryptography in Bitcoin",
      text: "Cryptography is used in Bitcoin to secure transactions and control the creation of new units. It also ensures the integrity and chronological order of the blockchain.",
    },
    {
      title: "Bitcoin mining",
      text: "Bitcoin mining is the process of adding transaction records to Bitcoin's public ledger of past transactions or blockchain. This uses a proof-of-work system, which is a consensus mechanism that requires network nodes to solve complex mathematical problems to verify transactions.",
    },
    {
      title: "Proof of work",
      text: "Proof of work requires network nodes to solve complex mathematical problems to verify transactions and create new blocks.",
    },
    {
      title: "Bitcoin halving",
      text: "Bitcoin halving is the event that occurs approximately every four years when the reward for mining new blocks is halved. This is built into the Bitcoin protocol to control the supply of new coins.",
    },
    {
      title: "Bitcoin in politics",
      text: "Bitcoin is a global currency that is not controlled by any single government or institution. This has led to debates about its regulation and use in politics. The government tends to regulate it to prevent illegal activities and try to control Bitcoin because it is a threat to the traditional financial system.",
    },
    {
      title: "Bitcoin vs Gold",
      text: "Bitcoin and gold are both considered stores of value. However, Bitcoin has the advantage of being easily transferable and divisible, while gold is a physical asset that is difficult to transport and divide. The term mining comes from the fact that Bitcoin is like gold, but in a digital form.",
    },
    {
      title: "Bitcoin divisibility",
      text: "Bitcoin is divisible to eight decimal places, and the smallest unit is called a satoshi. This makes it possible to send very small amounts of Bitcoin.",
    },
    {
      title: "Bitcoin vs traditional banking",
      text: "Bitcoin operates on a decentralized network, while traditional banking is centralized. Bitcoin transactions are irreversible and cannot be altered, while traditional banking transactions can be reversed or altered.",
    },
    {
      title: "Bitcoin and the environment",
      text: "Bitcoin mining consumes a lot of energy and has an impact on the environment. However, there are solutions to make Bitcoin mining more environmentally friendly, such as using renewable energy.",
    },
    {
      title: "Conclusion",
      text: "Bitcoin is a revolutionary technology that has the potential to change the way we think about money and finance. Its decentralized and secure nature makes it an attractive alternative to traditional currencies and financial systems.",
    },
  ],
  fr: [
    {
      title: "Comprendre l'argent et la monnaie",
      text: "L'argent est un moyen d'échange largement accepté dans les transactions. Il peut se présenter sous forme de pièces, de billets de banque ou de monnaie numérique. La monnaie est un système d'argent en usage général dans un pays particulier. Elle peut se présenter sous forme de pièces, de billets de banque ou de monnaie numérique.",
    },
    {
      title: "Plus d'informations sur l'argent",
      text: "L'argent a trois fonctions principales : un moyen d'échange, une unité de compte et une réserve de valeur. Un moyen d'échange est quelque chose que les acheteurs donnent aux vendeurs en échange de biens et services. Une unité de compte est une unité standard dans laquelle les prix peuvent être cités et les dettes enregistrées. Une réserve de valeur est quelque chose qui conserve sa valeur au fil du temps.",
    },
    {
      title: "Monnaie fiduciaire",
      text: "La monnaie fiduciaire est un type de monnaie émise par un gouvernement et qui n'est pas adossée à une marchandise physique, telle que l'or ou l'argent. La valeur de la monnaie fiduciaire découle de la relation entre l'offre et la demande plutôt que de la valeur du matériau dont est faite la monnaie.",
    },
    {
      title: "Monnaie marchandise",
      text: "La monnaie marchandise est un type de monnaie constituée d'une marchandise précieuse, telle que l'or ou l'argent. La valeur de la monnaie marchandise provient du matériau dont est faite la monnaie.",
    },
    {
      title: "Monnaie représentative",
      text: "La monnaie représentative est un type de monnaie adossée à une marchandise physique, telle que l'or ou l'argent. La valeur de la monnaie représentative provient du fait qu'elle peut être échangée contre une marchandise précieuse.",
    },
    {
      title: "Cryptomonnaie",
      text: "La cryptomonnaie est un type de monnaie numérique ou virtuelle qui utilise la cryptographie en terme de sécurité. Elle fonctionne sur un réseau décentralisé basé sur la technologie de la blockchain. Le Bitcoin est la première et la plus connue des cryptomonnaies.",
    },
    {
      title: "Monnaie fiduciaire vs cryptomonnaie",
      text: "La monnaie fiduciaire et la cryptomonnaie sont toutes deux des moyens d'échange. Cependant, la monnaie fiduciaire est émise par un gouvernement et régulée par une autorité centrale, tandis que la cryptomonnaie est décentralisée et fonctionne sur un réseau pair à pair.",
    },
    {
      title: "Quels problèmes résout le Bitcoin ?",
      text: "Le Bitcoin résout le problème du double dépense, qui est le risque qu'une monnaie numérique puisse être dépensée deux fois. Il résout également le problème de la confiance, car il repose sur un réseau décentralisé qui est sécurisé et transparent.",
    },
    {
      title: "Bitcoin et l'inflation",
      text: "Contrairement aux monnaies fiduciaires, le Bitcoin a une offre fixe de 21 millions de pièces. Cela signifie qu'il n'est pas sujet à l'inflation, qui est la diminution du pouvoir d'achat d'une monnaie au fil du temps.",
    },
    {
      title: "Qui a créé le Bitcoin ?",
      text: "Le Bitcoin a été créé par une personne inconnue ou un groupe de personnes utilisant le nom de Satoshi Nakamoto. Il a été publié en tant que logiciel open-source en 2009.",
    },
    {
      title: "Technologie derrière le Bitcoin",
      text: "Le Bitcoin fonctionne sur un réseau décentralisé basé sur la technologie de la blockchain. Une blockchain est un registre distribué qui enregistre toutes les transactions sur plusieurs ordinateurs. Chaque transaction est enregistrée dans un bloc, qui est ensuite lié au bloc précédent, créant ainsi une chaîne de blocs.",
    },
    {
      title: "Transactions sur le réseau Bitcoin",
      text: "Les transactions sur le réseau Bitcoin sont vérifiées par des nœuds du réseau par cryptographie et enregistrées dans un registre distribué public appelé blockchain. Les transactions Bitcoin sont irréversibles et ne peuvent pas être modifiées ou supprimées.",
    },
    {
      title: "Pourquoi le Bitcoin est-il sécurisé ?",
      text: "Le Bitcoin est sécurisé car il utilise des techniques cryptographiques pour sécuriser les transactions et empêcher l'accès non autorisé. Il est également décentralisé, ce qui signifie qu'il n'est pas contrôlé par une seule entité, le rendant sécurisé et résistant à la censure.",
    },
    {
      title: "Exemple de sécurité",
      text: "Si vous voulez envoyer du Bitcoin à quelqu'un, vous devez signer la transaction avec votre clé privée. Le destinataire peut ensuite vérifier la transaction à l'aide de votre clé publique. Cela garantit que seul vous pouvez dépenser votre Bitcoin.",
    },
    {
      title: "Trilemme Bitcoin",
      text: "Le trilemme Bitcoin fait référence aux compromis entre la scalabilité, la sécurité et la décentralisation. Il est difficile de réaliser les trois en même temps, et des changements dans un aspect peuvent affecter les autres.",
    },
    {
      title: "Cryptographie dans le Bitcoin",
      text: "La cryptographie est utilisée dans le Bitcoin pour sécuriser les transactions et contrôler la création de nouvelles unités. Elle garantit également l'intégrité et l'ordre chronologique de la blockchain.",
    },
    {
      title: "Minage de Bitcoin",
      text: "Le minage de Bitcoin est le processus d'ajout d'enregistrements de transactions à la blockchain publique de Bitcoin. Cela utilise un système de preuve de travail, qui est un mécanisme de consensus qui exige des nœuds du réseau de résoudre des problèmes mathématiques complexes pour vérifier les transactions.",
    },
    {
      title: "Preuve de travail",
      text: "La preuve de travail exige des nœuds du réseau de résoudre des problèmes mathématiques complexes pour vérifier les transactions et créer de nouveaux blocs.",
    },
    {
      title: "Halving Bitcoin",
      text: "Le halving Bitcoin est l'événement qui se produit environ tous les quatre ans lorsque la récompense pour le minage de nouveaux blocs est divisée par deux. Cela est intégré dans le protocole Bitcoin pour contrôler l'offre de nouvelles pièces.",
    },
    {
      title: "Bitcoin en politique",
      text: "Le Bitcoin est une monnaie mondiale qui n'est pas contrôlée par un seul gouvernement ou institution. Cela a conduit à des débats sur sa réglementation et son utilisation en politique. Le gouvernement a tendance à le réglementer pour prévenir les activités illégales et tenter de le contrôler car il constitue une menace pour le système financier traditionnel.",
    },
    {
      title: "Bitcoin vs Or",
      text: "Le Bitcoin et l'or sont tous deux considérés comme des réserves de valeur. Cependant, le Bitcoin a l'avantage d'être facilement transférable et divisible, tandis que l'or est un actif physique difficile à transporter et à diviser. Le terme minage vient du fait que le Bitcoin est comme l'or, mais sous forme numérique.",
    },
    {
      title: "Divisibilité du Bitcoin",
      text: "Le Bitcoin est divisible jusqu'à huit décimales, et l'unité la plus petite est appelée un satoshi. Cela rend possible l'envoi de très petites quantités de Bitcoin.",
    },
    {
      title: "Bitcoin vs banque traditionnelle",
      text: "Le Bitcoin fonctionne sur un réseau décentralisé, tandis que la banque traditionnelle est centralisée. Les transactions Bitcoin sont irréversibles et ne peuvent pas être modifiées, tandis que les transactions bancaires traditionnelles peuvent être annulées ou modifiées.",
    },
    {
      title: "Bitcoin et l'environnement",
      text: "Le minage de Bitcoin consomme beaucoup d'énergie et a un impact sur l'environnement. Cependant, il existe des solutions pour rendre le minage de Bitcoin plus respectueux de l'environnement, telles que l'utilisation d'énergies renouvelables.",
    },
    {
      title: "Conclusion",
      text: "Le Bitcoin est une technologie révolutionnaire qui a le potentiel de changer notre façon de penser l'argent et la finance. Sa nature décentralisée et sécurisée en fait une alternative attrayante aux monnaies et systèmes financiers traditionnels.",
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
