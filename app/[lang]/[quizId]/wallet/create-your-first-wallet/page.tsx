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
      title: "Types of wallet",
      text: "There are two types of wallets: hot and cold. Hot wallets are connected to the internet, while cold wallets are not. Hot wallets are convenient for everyday use, while cold wallets are more secure for long-term storage. Examples of hot wallets include mobile wallets and web wallets. Examples of cold wallets include hardware wallets and paper wallets.",
    },
    {
      title: "Setting up a software wallet",
      text: "First, you need to choose a wallet. Then, download and install the wallet software. Next, create a new wallet and set a strong password. Finally, back up your wallet and store the backup in a safe place. We will cover 3 wallets in this course: MetaMask, Trust Wallet, and Rabby Wallet.",
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
      text: "After downloading the wallet, you will be given a 12-word recovery phrase. Write down the recovery phrase and store it in a safe place. Do not share the recovery phrase with anyone. The recovery phrase is the only way to recover your wallet if you lose access to your device. You will also need to enter a strong password to secure your wallet locally.",
    },
    {
      title: "Seed phrase",
      text: "The seed phrase is a list of 12 or 24 words that can be used to recover your wallet. It is important to store the seed phrase in a safe place. Anyone who has access to your seed phrase can access your funds.",
    },
    {
      title: "Public and private keys",
      text: "A public key is your wallet address. It is used to receive funds. A private key is used to sign transactions and prove ownership of the wallet. Never share your private key with anyone. Anyone who has access to your private key can access your funds.",
    },
    {
      title: "Backing up your wallet",
      text: "It is important to back up your wallet to avoid losing access to your funds. The backup can be a file that contains your private keys and recovery phrase. Store the backup in a safe place. Some wallets allow you to backup through cloud services, but it is not recommended as it is less secure even if it is encrypted.",
    },
    {
      title: "Hardware wallets",
      text: "Hardware wallets are the most secure type of wallet. They are physical devices that store your private keys offline. They are immune to computer viruses and malware. Examples of hardware wallets include Ledger and Trezor.",
    },
    {
      title: "Ledger",
      text: (
        <>
          Ledger is a hardware wallet that supports a wide range of
          cryptocurrencies. To buy and set up{" "}
          <Link
            href="https://www.ledger.com/"
            target="_blank"
            className="text-blue-500 dark:text-blue-300 hover:text-blue-400 dark:hover:text-blue-400"
          >
            Ledger
          </Link>
          , go to the website and follow the instructions to purchase a device.
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
      title: "Types de portefeuille",
      text: "Il existe deux types de portefeuilles : chaud et froid. Les portefeuilles chauds sont connectés à Internet, tandis que les portefeuilles froids ne le sont pas. Les portefeuilles chauds sont pratiques pour un usage quotidien, tandis que les portefeuilles froids sont plus sécurisés pour le stockage à long terme. Les exemples de portefeuilles chauds incluent les portefeuilles mobiles et les portefeuilles web. Les exemples de portefeuilles froids incluent les portefeuilles matériels et les portefeuilles papier.",
    },
    {
      title: "Configuration d'un portefeuille logiciel",
      text: "Tout d'abord, vous devez choisir un portefeuille. Ensuite, téléchargez et installez le logiciel du portefeuille. Puis, créez un nouveau portefeuille et définissez un mot de passe fort. Enfin, sauvegardez votre portefeuille et stockez la sauvegarde dans un endroit sûr. Nous couvrirons 3 portefeuilles dans ce cours : MetaMask, Trust Wallet et Rabby Wallet.",
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
      text: "Après avoir téléchargé le portefeuille, vous recevrez une phrase de récupération de 12 mots. Notez la phrase de récupération et stockez-la dans un endroit sûr. Ne partagez pas la phrase de récupération avec qui que ce soit. La phrase de récupération est le seul moyen de récupérer votre portefeuille si vous perdez l'accès à votre appareil. Vous devrez également saisir un mot de passe fort pour sécuriser votre portefeuille localement.",
    },
    {
      title: "Phrase de récupération",
      text: "La phrase de récupération est une liste de 12 ou 24 mots qui peut être utilisée pour récupérer votre portefeuille. Il est important de stocker la phrase de récupération dans un endroit sûr. Toute personne ayant accès à votre phrase de récupération peut accéder à vos fonds.",
    },
    {
      title: "Clés publiques et privées",
      text: "Une clé publique est l'adresse de votre portefeuille. Elle est utilisée pour recevoir des fonds. Une clé privée est utilisée pour signer des transactions et prouver la propriété du portefeuille. Ne partagez jamais votre clé privée avec qui que ce soit. Toute personne ayant accès à votre clé privée peut accéder à vos fonds.",
    },
    {
      title: "Sauvegarde de votre portefeuille",
      text: "Il est important de sauvegarder votre portefeuille pour éviter de perdre l'accès à vos fonds. La sauvegarde peut être un fichier qui contient vos clés privées et votre phrase de récupération. Stockez la sauvegarde dans un endroit sûr. Certains portefeuilles vous permettent de sauvegarder via des services cloud, mais ce n'est pas recommandé car c'est moins sécurisé même si c'est chiffré.",
    },
    {
      title: "Portefeuilles matériels",
      text: "Les portefeuilles matériels sont le type de portefeuille le plus sécurisé. Ce sont des appareils physiques qui stockent vos clés privées hors ligne. Ils sont immunisés contre les virus informatiques et les logiciels malveillants. Les exemples de portefeuilles matériels incluent Ledger et Trezor.",
    },
    {
      title: "Ledger",
      text: (
        <>
          Ledger est un portefeuille matériel qui prend en charge une large
          gamme de cryptomonnaies. Pour acheter et configurer{" "}
          <Link
            href="https://www.ledger.com/"
            target="_blank"
            className="text-blue-500 dark:text-blue-300 hover:text-blue-400 dark:hover:text-blue-400"
          >
            Ledger
          </Link>
          , allez sur le site et suivez les instructions pour acheter un
          appareil.
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
