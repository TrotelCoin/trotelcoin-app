"use client";

import React from "react";
import { Lang } from "@/types/types";
import Link from "next/link";
import Image from "next/image";
import { useAddress } from "@thirdweb-dev/react";

const CoursePage = ({ params: { lang } }: { params: { lang: Lang } }) => {
  const address = useAddress();
  const [isCopied, setIsCopied] = React.useState(false);

  return (
    <>
      <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
        {lang == "en" ? <>Introduction</> : <>Introduction</>}
      </h1>
      <p className="mt-6 font-light">
        {lang == "en" ? (
          <>
            Welcome to the most important course. In this lesson, we'll
            understand the mystery behind what a cryptocurrency wallet truly is.
            <br />
            <br />
            Think of it as your digital safe, a place where you store and manage
            your virtual coins.
            <br />
            <br />
            We'll explore the fundamental role it plays in the world of
            cryptocurrencies and set the stage for the exciting journey ahead.
          </>
        ) : (
          <>
            Bienvenue dans le cours le plus important. Dans cette leçon, nous
            allons comprendre le mystère derrière les portefeuilles de
            cryptomonnaie.
            <br />
            <br />
            Pensez-y comme à votre coffre-fort numérique, un endroit où vous
            stockez et gérez vos pièces virtuelles.
            <br />
            <br />
            Nous explorerons le rôle fondamental qu'il joue dans le monde des
            cryptomonnaies et préparerons le terrain pour le voyage passionnant
            à venir de votre apprentissage.
          </>
        )}
      </p>

      <div className="mt-16 mx-auto">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          {lang == "en" ? (
            <>Types of wallets and their use cases</>
          ) : (
            <>Types de portefeuilles et leurs cas d'utilisation</>
          )}
        </h1>
        <p className="mt-6 font-light">
          {lang === "en" ? (
            <>
              Not all wallets are created equal. However, they are all designed
              the same way. For instance, they all have a private key and a
              public key. The private key is used to access your wallet and the
              public key is used to receive funds.
              <br />
              <br />
              In this lesson, we'll break down the different types of
              cryptocurrency wallets, such as software wallets that live on your
              computer or phone, hardware wallets that come in a physical form,
              and even paper wallets.
              <Image
                className="my-4"
                width={1400}
                height={600}
                src="/assets/courses/3/wallet.png"
                alt="Wallet"
              />
              Each type has its unique strengths and use cases. By understanding
              these distinctions, you'll be better equipped to choose the wallet
              that aligns with your needs and preferences.
            </>
          ) : (
            <>
              Tous les portefeuilles ne sont pas pareils. Cependant, ils sont
              tous conçus de la même manière. Par exemple, ils ont tous une clé
              privée et une clé publique. La clé privée est utilisée pour
              accéder à votre portefeuille et la clé publique est utilisée pour
              recevoir des fonds.
              <br />
              <br />
              Dans cette leçon, nous allons décomposer les différents types de
              portefeuilles de cryptomonnaie, tels que les portefeuilles
              software qui sont sur votre ordinateur ou votre téléphone, les
              portefeuilles hardware qui prennent une forme physique, et même
              les portefeuilles papier.
              <Image
                className="my-4"
                width={1400}
                height={600}
                src="/assets/courses/3/wallet.png"
                alt="Wallet"
              />
              Chaque type a ses forces et ses cas d'utilisation uniques. En
              comprenant ces distinctions, vous serez mieux équipé pour choisir
              le portefeuille qui correspond à vos besoins et à vos préférences.
            </>
          )}
        </p>
      </div>

      <div className="mt-16 mx-auto">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          {lang === "en" ? (
            <>Setting up a software wallet</>
          ) : (
            <>Configuration d'un portefeuille logiciel</>
          )}
        </h1>
        <p className="mt-6 font-light">
          {lang === "en" ? (
            <>
              It's time to get hands-on! In this lesson, we'll guide you through
              the step-by-step process of setting up a software wallet.
              <br />
              <br />
              Whether you're using your computer or mobile device, we'll ensure
              you understand the ins and outs of creating a digital vault for
              your cryptocurrencies.
              <br />
              <br />
              This is a crucial step in your journey, and we're here to make it
              simple and enjoyable.
              <h3 className="my-4 font-semibold text-xl">
                Step 1: Choosing your software wallet
              </h3>
              The first decision on your wallet journey is selecting the right
              software wallet for you. We'll discuss popular options and
              considerations, whether you're leaning towards a desktop version
              or a mobile app.
              <Link
                href="https://metamask.io/"
                target="_blank"
                className="hover:text-blue-500 dark:hover:text-blue-300"
              >
                <h4 className="my-4 font-semibold">MetaMask</h4>
              </Link>
              Ideal for those navigating the world of decentralized applications
              (DApps) on the Ethereum or EVM blockchains. MetaMask is a browser
              extension that offers a user-friendly interface for managing your
              Ether and ERC-20 tokens.
              <Link
                href="https://rabby.io/"
                target="_blank"
                className="hover:text-blue-500 dark:hover:text-blue-300"
              >
                <h4 className="my-4 font-semibold">Rabby Wallet</h4>
              </Link>
              If you're looking for a wallet that focuses on simplicity and
              security, Rabby Wallet is a great choice. With a clean design and
              easy-to-use features, it's suitable for both beginners and
              experienced users.
              <Link
                href="https://trustwallet.com/"
                target="_blank"
                className="hover:text-blue-500 dark:hover:text-blue-300"
              >
                <h4 className="my-4 font-semibold">Trust Wallet</h4>
              </Link>
              Known for its compatibility with various blockchains, Trust Wallet
              is a mobile wallet that supports a wide range of cryptocurrencies.
              It's especially popular for its user-friendly interface and
              built-in decentralized exchange.
              <h3 className="my-4 font-semibold text-xl">
                Step 2: Download and installation
              </h3>
              Once you've chosen your wallet, it's time to bring it to life on
              your device. We'll guide you through the download and installation
              process, ensuring a smooth transition from a virtual idea to a
              tangible tool.
              <br />
              <br />
              Those software wallets are browser extensions or mobile apps so
              you already know how to install them. Just click on the title of
              the wallet and you will be redirected to the official website.
              <br />
              <br />
              If you need more guidance, follow the instructions in the above
              video.
              <h3 className="my-4 font-semibold text-xl">
                Step 3: Creating your wallet
              </h3>
              Now comes the exciting part - creating your digital vault! You
              will have to generate your wallet address and set up your security
              measures. We'll demystify the technical jargon, making sure you
              understand each detail.
              <br />
              <br />
              First, you will need to create a password to secure your wallet.
              The password must be strong and unique but don't worry, if you
              lose it, you can recover your wallet with a recovery phrase.
              <br />
              <br />
              Then, you will be given a recovery phrase. This is a series of 12
              or 24 words that you must write down and keep in a safe place.
              This is the only way to recover your wallet if you lose your
              password.
              <br />
              <br />
              So, the difference between a password and a recovery phrase is the
              following: the password is used to access your wallet and the
              recovery phrase is used to recover your wallet.
              <br />
              <br />
              Finally, you will have to confirm your recovery phrase by typing
              it in the correct order. This is to ensure that you have written
              it down correctly.
              <h3 className="my-4 font-semibold text-xl">
                Step 4: Backing up your seed phrase
              </h3>
              Make sure to keep your recovery phrase safe and never share it. If
              you lose it, you will lose access to your wallet and your funds.
              <Image
                className="my-4"
                width={1400}
                height={600}
                src="/assets/courses/3/seed-phrase.png"
                alt="Seed phrase"
              />
              Thus, don't store it on your computer or phone, write it down on a
              piece of paper and keep it in a safe place. Don't give it to
              anyone, not even to the support of the wallet.
              <br />
              <br />
              You will be able to learn more about securing your wallet in
              another lesson.
            </>
          ) : (
            <>
              Il est temps de mettre les mains à la pâte ! Dans cette leçon,
              nous vous guiderons à travers le processus étape par étape de la
              configuration d'un portefeuille software.
              <br />
              <br />
              Que vous utilisiez votre ordinateur ou votre appareil mobile, nous
              nous assurerons que vous comprenez les tenants et les aboutissants
              de la création d'un portefeuille numérique pour vos
              cryptomonnaies.
              <br />
              <br />
              Il s'agit d'une étape cruciale dans votre parcours, et nous sommes
              là pour la rendre simple et agréable.
              <h3 className="my-4 font-semibold text-xl">
                Étape 1: Choix de votre portefeuille software
              </h3>
              La première décision de votre parcours de portefeuille est de
              choisir le bon portefeuille software pour vous. Nous discuterons
              des options populaires et des considérations, que vous penchiez
              pour une version de bureau ou une application mobile.
              <Link
                href="https://metamask.io/"
                target="_blank"
                className="hover:text-blue-500 dark:hover:text-blue-300"
              >
                <h4 className="my-4 font-semibold">MetaMask</h4>
              </Link>
              Idéal pour ceux qui naviguent dans le monde des applications
              décentralisées (DApps) sur les blockchains Ethereum ou EVM.
              MetaMask est une extension de navigateur qui offre une interface
              conviviale pour gérer votre Ether et vos jetons ERC-20.
              <Link
                href="https://rabby.io/"
                target="_blank"
                className="hover:text-blue-500 dark:hover:text-blue-300"
              >
                <h4 className="my-4 font-semibold">Rabby Wallet</h4>
              </Link>
              Si vous cherchez un portefeuille qui se concentre sur la
              simplicité et la sécurité, Rabby Wallet est un excellent choix.
              Avec un design épuré et des fonctionnalités faciles à utiliser, il
              convient aussi bien aux débutants qu'aux utilisateurs
              expérimentés.
              <Link
                href="https://trustwallet.com/"
                target="_blank"
                className="hover:text-blue-500 dark:hover:text-blue-300"
              >
                <h4 className="my-4 font-semibold">Trust Wallet</h4>
              </Link>
              Connu pour sa compatibilité avec diverses blockchains, Trust
              Wallet est un portefeuille mobile qui prend en charge une large
              gamme de cryptomonnaies. Il est particulièrement populaire pour
              son interface conviviale et son échange décentralisé intégré.
              <h3 className="my-4 font-semibold text-xl">
                Étape 2: Téléchargement et installation
              </h3>
              Une fois que vous avez choisi votre portefeuille, il est temps de
              le mettre en place sur votre appareil. Nous vous guiderons à
              travers le processus de téléchargement et d'installation, en
              veillant à une transition en douceur d'une idée virtuelle à un
              outil tangible.
              <br />
              <br />
              Ces portefeuilles software sont des extensions de navigateur ou
              des applications mobiles, vous savez déjà comment les installer.
              Cliquez simplement sur le titre du portefeuille et vous serez
              redirigé vers le site officiel.
              <br />
              <br />
              Si vous avez besoin de plus de conseils, suivez les instructions
              dans la vidéo ci-dessus.
              <h3 className="my-4 font-semibold text-xl">
                Étape 3: Création de votre portefeuille
              </h3>
              Maintenant vient la partie excitante - la création de votre
              coffre-fort numérique ! Vous devrez générer votre adresse de
              portefeuille et mettre en place vos mesures de sécurité. Nous
              démystifierons le jargon technique, en veillant à ce que vous
              compreniez chaque détail.
              <br />
              <br />
              Tout d'abord, vous devrez créer un mot de passe pour sécuriser
              votre portefeuille. Le mot de passe doit être fort et unique mais
              ne vous inquiétez pas, si vous le perdez, vous pouvez récupérer
              votre portefeuille avec une phrase de récupération.
              <br />
              <br />
              Ensuite, vous recevrez une phrase de récupération. Il s'agit d'une
              série de 12 ou 24 mots que vous devez écrire et conserver dans un
              endroit sûr. C'est le seul moyen de récupérer votre portefeuille
              si vous perdez votre mot de passe.
              <br />
              <br />
              Ainsi, la différence entre un mot de passe et une phrase de
              récupération est la suivante : le mot de passe est utilisé pour
              accéder à votre portefeuille et la phrase de récupération est
              utilisée pour récupérer votre portefeuille.
              <br />
              <br />
              Enfin, vous devrez confirmer votre phrase de récupération en la
              tapant dans le bon ordre, cela a pour but de vérifier la
              sauvegarde de votre phrase.
              <h3 className="my-4 font-semibold text-xl">
                Étape 4: Sauvegarde de votre phrase de récupération
              </h3>
              Assurez-vous de conserver votre phrase de récupération en lieu sûr
              et de ne jamais la partager. Si vous la perdez, vous perdrez
              l'accès à votre portefeuille et à vos fonds.
              <Image
                className="my-4"
                width={1400}
                height={600}
                src="/assets/courses/3/seed-phrase.png"
                alt="Seed phrase"
              />
              Ainsi, ne la stockez pas sur votre ordinateur ou votre téléphone,
              écrivez-la sur un morceau de papier et gardez-la dans un endroit
              sûr. Ne la donnez à personne, pas même au support du portefeuille.
              <br />
              <br />
              Vous pourrez en apprendre davantage sur la sécurisation de votre
              portefeuille dans une autre leçon.
            </>
          )}
        </p>
      </div>

      <div className="mt-16 mx-auto">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          {lang === "en" ? (
            <>Exploring hardware wallets</>
          ) : (
            <>Explorer les portefeuilles hardware</>
          )}
        </h1>
        <p className="mt-6 font-light">
          {lang === "en" ? (
            <>
              Hardware wallets are physical devices that store your
              cryptocurrencies offline. They're considered the most secure
              option, as they're immune to hacking and malware attacks.
              <br />
              <br />
              In this lesson, we'll explore the different types of hardware
              wallets available and how to set them up. We'll also discuss the
              advantages and disadvantages of using a hardware wallet, helping
              you make an informed decision.
              <h3 className="my-4 font-semibold text-xl">
                Step 1: Choosing your hardware wallet
              </h3>
              The first decision on your hardware wallet journey is selecting
              the right hardware wallet for you. We'll discuss popular options
              and considerations, whether you're leaning towards a Ledger or a
              Trezor.
              <Link
                href="https://www.ledger.com/"
                target="_blank"
                className="hover:text-blue-500 dark:hover:text-blue-300"
              >
                <h4 className="my-4 font-semibold">Ledger</h4>
              </Link>
              Known for its security features and user-friendly interface,
              Ledger is a popular choice for those looking to store their
              cryptocurrencies offline. It supports a wide range of digital
              assets and is compatible with various third-party applications.
              <Link
                href="https://trezor.io/"
                target="_blank"
                className="hover:text-blue-500 dark:hover:text-blue-300"
              >
                <h4 className="my-4 font-semibold">Trezor</h4>
              </Link>
              Trezor is another leading hardware wallet that offers a secure and
              intuitive way to store your digital assets. It's known for its
              open-source approach and compatibility with various
              cryptocurrencies.
              <h3 className="my-4 font-semibold text-xl">
                Step 2: Download and installation
              </h3>
              Once you've chosen your hardware wallet, it's time to bring it to
              a tangible form. We'll guide you through the download and
              installation process, ensuring a smooth transition from a virtual
              idea to a tangible tool.
              <br />
              <br />
              Those hardware wallets are physical devices so you will have to
              buy them. Just click on the title of the wallet and you will be
              redirected to the official website.
              <br />
              <br />
              If you need more guidance, follow the instructions in the above
              video.
              <h3 className="my-4 font-semibold text-xl">
                Step 3: Creating your wallet
              </h3>
              Now comes the exciting part - creating your hardware wallet! It's
              very similar to creating a software wallet but you will have to
              follow the instructions on the device.
              <br />
              <br />
              First, you will have to generate your wallet address and set up a
              PIN code. The PIN code is used to access your wallet and the
              wallet address is used to receive funds.
              <br />
              <br />
              Then, you will be given a recovery phrase. This is a series of 12
              or 24 words that you must write down and keep in a safe place.
              This is the only way to recover your wallet if you lose your PIN
              like a software wallet.
              <br />
              <br />
              Finally, you will have to confirm your recovery phrase by typing
              it in the correct order. This is to ensure that you have written
              it down correctly.
            </>
          ) : (
            <>
              Les portefeuilles hardware sont des appareils physiques qui
              stockent vos cryptomonnaies hors ligne. Ils sont considérés comme
              l'option la plus sécurisée, car ils sont immunisés contre les
              attaques de piratage et de logiciels malveillants.
              <br />
              <br />
              Dans cette leçon, nous explorerons les différents types de
              portefeuilles hardware disponibles et comment les configurer. Nous
              discuterons également des avantages et des inconvénients de
              l'utilisation d'un portefeuille hardware, vous aidant à prendre
              une décision éclairée.
              <h3 className="my-4 font-semibold text-xl">
                Étape 1: Choix de votre portefeuille hardware
              </h3>
              La première décision de votre parcours de portefeuille hardware
              est de choisir le bon portefeuille hardware pour vous. Nous
              discuterons des options populaires et des considérations, que vous
              penchiez pour un Ledger ou un Trezor.
              <Link
                href="https://www.ledger.com/"
                target="_blank"
                className="hover:text-blue-500 dark:hover:text-blue-300"
              >
                <h4 className="my-4 font-semibold">Ledger</h4>
              </Link>
              Connu pour ses fonctionnalités de sécurité et son interface
              conviviale, Ledger est un choix populaire pour ceux qui cherchent
              à stocker leurs cryptomonnaies hors ligne. Il prend en charge une
              large gamme d'actifs numériques et est compatible avec diverses
              applications tierces.
              <Link
                href="https://trezor.io/"
                target="_blank"
                className="hover:text-blue-500 dark:hover:text-blue-300"
              >
                <h4 className="my-4 font-semibold">Trezor</h4>
              </Link>
              Trezor est un autre portefeuille hardware de premier plan qui
              offre un moyen sécurisé et intuitif de stocker vos actifs
              numériques. Il est connu pour son approche open-source et sa
              compatibilité avec diverses cryptomonnaies.
              <h3 className="my-4 font-semibold text-xl">
                Étape 2: Téléchargement et installation
              </h3>
              Une fois que vous avez choisi votre portefeuille hardware, il est
              temps de le mettre en place sous une forme tangible. Nous vous
              guiderons à travers le processus de téléchargement et
              d'installation, en veillant à une transition en douceur d'une idée
              virtuelle à un outil tangible.
              <br />
              <br />
              Ces portefeuilles hardware sont des appareils physiques, vous
              devrez donc les acheter. Cliquez simplement sur le titre du
              portefeuille et vous serez redirigé vers le site officiel.
              <br />
              <br />
              Si vous avez besoin de plus de conseils, suivez les instructions
              dans la vidéo ci-dessus.
              <h3 className="my-4 font-semibold text-xl">
                Étape 3: Création de votre portefeuille
              </h3>
              Maintenant vient la partie excitante - la création de votre
              portefeuille hardware ! C'est très similaire à la création d'un
              portefeuille software mais vous devrez suivre les instructions sur
              l'appareil.
              <br />
              <br />
              Tout d'abord, vous devrez générer votre adresse de portefeuille et
              configurer un code PIN. Le code PIN est utilisé pour accéder à
              votre portefeuille et l'adresse de portefeuille est utilisée pour
              recevoir des fonds.
              <br />
              <br />
              Ensuite, vous recevrez une phrase de récupération. Il s'agit d'une
              série de 12 ou 24 mots que vous devez écrire et conserver dans un
              endroit sûr. C'est le seul moyen de récupérer votre portefeuille
              si vous perdez votre code PIN comme un portefeuille software.
              <br />
              <br />
              Enfin, vous devrez confirmer votre phrase de récupération en la
              tapant dans le bon ordre, cela a pour but de vérifier la
              sauvegarde de votre phrase.
            </>
          )}
        </p>
      </div>

      <div className="mt-16 mx-auto">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          {lang === "en" ? (
            <>Crafting a secure paper wallet</>
          ) : (
            <>Créer un portefeuille papier sécurisé</>
          )}
        </h1>
        <p className="mt-6 font-light">
          {lang === "en" ? (
            <>
              Lastly, we'll explore the concept of a paper wallet. It's a form
              of cold storage that involves printing your wallet's private and
              public keys on a piece of paper.
              <br />
              <br />
              We'll discuss the advantages and disadvantages of using a paper
              wallet and guide you through the process of creating one. By the
              end of this lesson, you'll have a comprehensive understanding of
              the different types of wallets and how to use them.
              <h3 className="my-4 font-semibold text-xl">
                Step 1: Generating your paper wallet
              </h3>
              The first step in creating a paper wallet is generating your keys.
              We'll guide you through the process, ensuring you understand each
              detail.
              <br />
              <br />
              You will have to go to a website that generates paper wallets and
              follow the instructions.
              <br />
              <br />
              If you need more guidance, follow the instructions in the above
              video.
              <h3 className="my-4 font-semibold text-xl">
                Step 2: Printing your paper wallet
              </h3>
              Once you've generated your keys, it's time to print them. We'll go
              over the best practices for printing and storing your paper
              wallet, ensuring it remains secure and accessible.
              <br />
              <br />
              Make sure to print your paper wallet on a secure printer and store
              it in a safe place. Don't share it with anyone and don't take a
              picture of it.
              <br />
              <br />
              You will be able to learn more about securing your wallet in the
              next lesson.
            </>
          ) : (
            <>
              Enfin, nous explorerons le concept d'un portefeuille papier. Il
              s'agit d'une forme de stockage à froid qui consiste à imprimer les
              clés privées et publiques de votre portefeuille sur un morceau de
              papier.
              <br />
              <br />
              Nous discuterons des avantages et des inconvénients de
              l'utilisation d'un portefeuille papier et vous guiderons à travers
              le processus de création. À la fin de cette leçon, vous aurez une
              compréhension complète des différents types de portefeuilles et de
              la manière de les utiliser.
              <h3 className="my-4 font-semibold text-xl">
                Étape 1: Génération de votre portefeuille papier
              </h3>
              La première étape dans la création d'un portefeuille papier est la
              génération de vos clés. Nous vous guiderons à travers le
              processus, en veillant à ce que vous compreniez chaque détail.
              <br />
              <br />
              Vous devrez vous rendre sur un site web qui génère des
              portefeuilles papier et suivre les instructions.
              <br />
              <br />
              Si vous avez besoin de plus de conseils, suivez les instructions
              dans la vidéo ci-dessus.
              <h3 className="my-4 font-semibold text-xl">
                Étape 2: Impression de votre portefeuille papier
              </h3>
              Une fois que vous avez généré vos clés, il est temps de les
              imprimer. Nous passerons en revue les meilleures pratiques
              d'impression et de stockage de votre portefeuille papier, en
              veillant à ce qu'il reste sécurisé et accessible.
              <br />
              <br />
              Assurez-vous d'imprimer votre portefeuille papier sur une
              imprimante sécurisée et de le stocker dans un endroit sûr. Ne le
              partagez avec personne et ne prenez pas de photo.
              <br />
              <br />
              Vous pourrez en apprendre davantage sur la sécurisation de votre
              portefeuille dans la prochaine leçon.
            </>
          )}
        </p>
      </div>

      <div className="mt-16 mx-auto">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          {lang === "en" ? (
            <>Understand how to use your wallet</>
          ) : (
            <>Comprendre comment utiliser votre portefeuille</>
          )}
        </h1>
        <p className="mt-6 font-light">
          {lang === "en" ? (
            <>
              Now that you have your wallet set up, it's time to learn how to
              use it. We'll guide you through the process of sending and
              receiving your digital assets in the next course.
              <br />
              <br />
              In the meantime, you can watch the video that shows you how to
              create your wallet in details. Make sure to answer the quiz to
              test your knowledge and earn rewards.
            </>
          ) : (
            <>
              Maintenant que vous avez configuré votre portefeuille, il est
              temps d'apprendre à l'utiliser. Nous vous guiderons à travers le
              processus d'envoi et de réception de vos actifs numériques dans le
              prochain cours.
              <br />
              <br />
              En attendant, vous pouvez regarder la vidéo qui vous montre
              comment créer votre portefeuille en détail. Assurez-vous de
              répondre au quiz pour tester vos connaissances et gagner des
              récompenses.
            </>
          )}
        </p>
      </div>
    </>
  );
};

export default CoursePage;
