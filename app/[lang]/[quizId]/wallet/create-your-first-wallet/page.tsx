"use client";

import { Lang } from "@/types/types";
import Course from "@/app/[lang]/[quizId]/components/course";
import Link from "next/link";

const cards = {
  en: [
    {
      title: "Introduction",
      text: "A crypto wallet is your gateway to the blockchain and a secure way to store your assets. Let's learn what it is and the different types of wallets it exists.",
    },
    {
      title: "Hot wallets",
      text: "Hot wallets are connected to the internet. They are convenient for everyday use.",
    },
    {
      title: "Cold wallets",
      text: "Cold wallets are not connected to the internet. They are more secure for long-term storage.",
    },
    {
      title: "Setting up a software wallet",
      text: "We will cover 3 wallets in this course: MetaMask, Trust Wallet, and Rabby Wallet.",
    },
    {
      title: "MetaMask",
      text: (
        <>
          MetaMask is a popular web3 wallet that allows you to interact with
          decentralized applications. It is available as a browser extension for
          Chrome, Firefox, and Brave. To set up MetaMask, go to the{" "}
          <Link
            className="text-blue-500 dark:text-blue-300 hover:text-blue-400 dark:hover:text-blue-400"
            href="https://metamask.io/"
            target="_blank"
          >
            MetaMask
          </Link>{" "}
          website and follow the instructions to install the extension.
        </>
      ),
    },
    {
      title: "Trust Wallet",
      text: (
        <>
          Trust Wallet is a mobile wallet that supports Ethereum other
          blockchains natively. It is available for iOS and Android. To set up{" "}
          <Link
            href="https://trustwallet.com/"
            target="_blank"
            className="text-blue-500 dark:text-blue-300 hover:text-blue-400 dark:hover:text-blue-400"
          >
            Trust Wallet
          </Link>
          , download the app from the App Store or Google Play Store and follow
          the instructions to create a new wallet.
        </>
      ),
    },
    {
      title: "Rabby Wallet",
      text: (
        <>
          Rabby Wallet is an easy to use web3 wallet that supports a lot of
          blockchain and features. To set up{" "}
          <Link
            href="https://rabby.io/"
            target="_blank"
            className="text-blue-500 dark:text-blue-300 hover:text-blue-400 dark:hover:text-blue-400"
          >
            Rabby Wallet
          </Link>
          , go to the website and follow the instructions to create a new
          wallet.
        </>
      ),
    },
    {
      title: "Creating your wallet",
      text: "After downloading the wallet, you will be given a 12-word recovery phrase. You will also need to enter a strong password to secure your wallet locally.",
    },
    {
      title: "Seed phrase",
      text: "The seed phrase is a list of 12 or 24 words that can be used to recover your wallet. It is important to store the seed phrase in a safe place. Anyone who has access to your seed phrase can access your funds so do not share it.",
    },
    {
      title: "Public keys",
      text: "A public key is your wallet address. It is used to receive funds. A private key is used to sign transactions and prove ownership of the wallet.",
    },
    {
      title: "Private keys",
      text: "A private key is used to sign transactions and prove ownership of the wallet. Never share your private key with anyone. Anyone who has access to your private key can access your funds.",
    },
    {
      title: "Backing up your wallet",
      text: "It is important to back up your wallet to avoid losing access to your funds. Some wallets allow you to backup through cloud services, but it is not recommended as it is less secure even if it is encrypted.",
    },
    {
      title: "Hardware wallets",
      text: "Hardware wallets are the most secure type of wallet. They are physical devices that store your private keys offline. They are immune to computer viruses and malware.",
    },
    {
      title: "Ledger",
      text: (
        <>
          Ledger is a hardware wallet that supports a wide range of
          cryptocurrencies. To buy a key and set it up, go to the{" "}
          <Link
            href="https://www.ledger.com/"
            target="_blank"
            className="text-blue-500 dark:text-blue-300 hover:text-blue-400 dark:hover:text-blue-400"
          >
            Ledger
          </Link>{" "}
          website and follow the instructions to purchase a device.
        </>
      ),
    },
    {
      title: "Trezor",
      text: (
        <>
          Trezor is also a hardware wallet that supports a wide range of
          cryptocurrencies. To buy and set up{" "}
          <Link
            href="https://trezor.io/"
            target="_blank"
            className="text-blue-500 dark:text-blue-300 hover:text-blue-400 dark:hover:text-blue-400"
          >
            Trezor
          </Link>
          , go to the website and follow the instructions to purchase a device.
        </>
      ),
    },
    {
      title: "Paper wallets",
      text: "Paper wallets are physical documents that contain your public and private keys. They are not recommended for beginners as they are less user-friendly and can be easily damaged or lost.",
    },
    {
      title: "Conclusion",
      text: "A crypto wallet is essential for managing your assets and interacting with the blockchain. We will see what you can do with your wallet later.",
    },
  ],
  fr: [
    {
      title: "Introduction",
      text: "Un portefeuille crypto est votre passerelle vers la blockchain et un moyen sécurisé de stocker vos actifs. Nous allons voir ce que c'est et les différents types de portefeuilles qui existent.",
    },
    {
      title: "Portefeuilles chauds",
      text: "Les portefeuilles chauds sont connectés à Internet. Ils sont pratiques pour un usage quotidien.",
    },
    {
      title: "Portefeuilles froids",
      text: "Les portefeuilles froids ne sont pas connectés à Internet. Ils sont plus sécurisés pour le stockage à long terme.",
    },
    {
      title: "Configuration d'un portefeuille logiciel",
      text: "Nous couvrirons 3 portefeuilles dans ce cours : MetaMask, Trust Wallet et Rabby Wallet.",
    },
    {
      title: "MetaMask",
      text: (
        <>
          MetaMask est un portefeuille web3 populaire qui vous permet
          d'interagir avec des applications décentralisées. Il est disponible en
          tant qu'extension de navigateur pour Chrome, Firefox et Brave. Pour
          configurer MetaMask, allez sur le site{" "}
          <Link
            className="text-blue-500 dark:text-blue-300 hover:text-blue-400 dark:hover:text-blue-400"
            href="https://metamask.io/"
            target="_blank"
          >
            MetaMask
          </Link>{" "}
          et suivez les instructions pour installer l'extension.
        </>
      ),
    },
    {
      title: "Trust Wallet",
      text: (
        <>
          Trust Wallet est un portefeuille mobile qui prend en charge Ethereum
          et d'autres blockchains nativement. Il est disponible pour iOS et
          Android. Pour configurer{" "}
          <Link
            href="https://trustwallet.com/"
            target="_blank"
            className="text-blue-500 dark:text-blue-300 hover:text-blue-400 dark:hover:text-blue-400"
          >
            Trust Wallet
          </Link>
          , téléchargez l'application depuis l'App Store ou le Google Play Store
          et suivez les instructions pour créer un nouveau portefeuille.
        </>
      ),
    },
    {
      title: "Rabby Wallet",
      text: (
        <>
          Rabby Wallet est un portefeuille web3 simple d'utilisation qui prend
          en charge plein de blockchains et de fonctionnalités. Pour configurer{" "}
          <Link
            href="https://rabby.io/"
            target="_blank"
            className="text-blue-500 dark:text-blue-300 hover:text-blue-400 dark:hover:text-blue-400"
          >
            Rabby Wallet
          </Link>
          , allez sur le site et suivez les instructions pour créer un nouveau
          portefeuille.
        </>
      ),
    },
    {
      title: "Création de votre portefeuille",
      text: "Après avoir téléchargé le portefeuille, vous recevrez une phrase de récupération de 12 mots. Vous devrez également entrer un mot de passe fort pour sécuriser votre portefeuille localement.",
    },
    {
      title: "Phrase de récupération",
      text: "La phrase de récupération est une liste de 12 ou 24 mots qui peut être utilisée pour récupérer votre portefeuille. Il est important de stocker la phrase de récupération dans un endroit sûr. Toute personne ayant accès à votre phrase de récupération peut accéder à vos fonds, alors ne la partagez pas.",
    },
    {
      title: "Clés publiques",
      text: "Une clé publique est l'adresse de votre portefeuille. Elle est utilisée pour recevoir des fonds.",
    },
    {
      title: "Clés privées",
      text: "Une clé privée est utilisée pour signer des transactions et prouver la propriété du portefeuille. Ne partagez jamais votre clé privée avec qui que ce soit. Toute personne ayant accès à votre clé privée peut accéder à vos fonds.",
    },
    {
      title: "Sauvegarde de votre portefeuille",
      text: "Il est important de sauvegarder votre portefeuille pour éviter de perdre l'accès à vos fonds. Certains portefeuilles vous permettent de sauvegarder via des services cloud, mais ce n'est pas recommandé car c'est moins sécurisé même si c'est chiffré.",
    },
    {
      title: "Portefeuilles matériels",
      text: "Les portefeuilles matériels sont le type de portefeuille le plus sécurisé. Ce sont des appareils physiques qui stockent vos clés privées hors ligne. Ils sont immunisés contre les virus informatiques et les logiciels malveillants.",
    },
    {
      title: "Ledger",
      text: (
        <>
          Ledger est un portefeuille matériel qui prend en charge une large
          gamme de cryptomonnaies. Pour acheter une clé et la configurer, allez
          sur le site{" "}
          <Link
            href="https://www.ledger.com/"
            target="_blank"
            className="text-blue-500 dark:text-blue-300 hover:text-blue-400 dark:hover:text-blue-400"
          >
            Ledger
          </Link>{" "}
          et suivez les instructions pour acheter un appareil.
        </>
      ),
    },
    {
      title: "Trezor",
      text: (
        <>
          Trezor est également un portefeuille matériel qui prend en charge une
          large gamme de cryptomonnaies. Pour acheter et configurer{" "}
          <Link
            href="https://trezor.io/"
            target="_blank"
            className="text-blue-500 dark:text-blue-300 hover:text-blue-400 dark:hover:text-blue-400"
          >
            Trezor
          </Link>
          , allez sur le site et suivez les instructions pour acheter un
          appareil.
        </>
      ),
    },
    {
      title: "Portefeuilles papier",
      text: "Les portefeuilles papier sont des documents physiques qui contiennent vos clés publiques et privées. Ils ne sont pas recommandés pour les débutants car ils sont moins conviviaux et peuvent être facilement endommagés ou perdus.",
    },
    {
      title: "Conclusion",
      text: "Un portefeuille crypto est essentiel pour gérer vos actifs et interagir avec la blockchain. Nous verrons ce que vous pouvez faire avec votre portefeuille plus tard.",
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
