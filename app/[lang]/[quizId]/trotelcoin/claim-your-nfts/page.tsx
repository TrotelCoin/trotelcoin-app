"use client";

import React from "react";
import { Lang } from "@/types/types";
import Link from "next/link";
import Image from "next/image";
import { Address } from "viem";
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
            In this course, you will learn how to claim your TrotelCoin NFTs.
            The 2 NFTs you can claim are the following: Intermediate 🙈 and
            Expert 🦊
            <br />
            <br />
            It's not about understanding what NFTs are in this course but rather
            to show you how to claim them. A dedicated course on NFTs will be
            available.
            <br />
            <br />
            Let's suppose that you already have a crypto wallet and that you
            have the required number of TrotelCoins to claim these NFTs.
          </>
        ) : (
          <>
            Dans ce cours, tu peux apprendre comment récupérer tes NFTs
            TrotelCoin. Les 2 NFTs que tu peux récupérer sont les suivants :
            Intermediate 🙈 et Expert 🦊
            <br />
            <br />
            Il ne s'agit pas vraiment de comprendre ce que sont les NFTs dans ce
            cours mais plutôt de te montrer comment les récupérer. Un cours
            dédié sur les NFTs sera disponible.
            <br />
            <br />
            Nous supposons que tu as déjà un portefeuille crypto et que tu as
            déjà le nombre de TrotelCoins nécessaires pour récupérer ces NFTs.
          </>
        )}
      </p>

      <div className="mt-16 mx-auto">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          {lang == "en" ? (
            <>What are the roles of this NFTs?</>
          ) : (
            <>Quels sont les rôles de ces NFTs ?</>
          )}
        </h1>
        <p className="mt-6 font-light">
          {lang === "en" ? (
            <>
              These NFTs allow you to access more advanced courses and other
              features.
              <br />
              <br />
              For example, some courses on the platform are only available for
              Intermediate and some for Expert.
              <br />
              <br />
              Moreover, some gamification features are only available if you own
              the NFTs. For example, the badges you can earn by completing
              courses, increasing your streaks, etc.
              <Image
                className="my-4"
                width={1400}
                height={600}
                src="/assets/courses/2/advantages.png"
                alt="Advantages"
              ></Image>
              The platform is still in its early stages and new features will be
              added. Intermediate and Expert will have early access to these new
              features.
              <br />
              <br />
              To be aware of the new features and benefits of the NFTs, you can
              look at the documentation. For that, click on this link:{" "}
              <Link
                href="https://docs.trotelcoin.com/overview/tokenomics"
                className="text-blue-500 dark:text-blue-300"
              >
                docs.trotelcoin.com/overview/tokenomics
              </Link>
              .
            </>
          ) : (
            <>
              Ces NFTs te permette d'accéder à des cours plus avancés et à
              d'autres fonctionnalités.
              <br />
              <br />
              Par exemple, certains cours de la plateforme ne sont disponibles
              que pour les Intermediate et certains pour les Expert.
              <br />
              <br />
              De plus, des fonctionnalités de gamification supplémentaires ne
              sont disponibles que si tu détiens les NFTs. Par exemple, les
              badges que tu peux gagner en terminant des cours, en augmentant
              tes séries, etc.
              <Image
                className="my-4"
                width={1400}
                height={600}
                src="/assets/courses/2/advantages.png"
                alt="Advantages"
              ></Image>
              La plateforme n'en est qu'à ses débuts et de nouvelles
              fonctionnalités seront ajoutées. Les Intermediate et Expert auront
              accès à ces nouvelles fonctionnalités en avant-première.
              <br />
              <br />
              Pour être au courant des nouvelles fonctionnalités et avantages
              des NFTs, tu peux regarder la documentation. Pour cela, clique sur
              ce lien :{" "}
              <Link
                href="https://docs.trotelcoin.com/overview/tokenomics"
                className="text-blue-500 dark:text-blue-300"
              >
                docs.trotelcoin.com/overview/tokenomics
              </Link>
              .
            </>
          )}
        </p>
      </div>

      <div className="mt-16 mx-auto">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          {lang === "en" ? (
            <>How to claim the NFTs?</>
          ) : (
            <>Comment récupérer les NFTs ?</>
          )}
        </h1>
        <p className="mt-6 font-light">
          {lang === "en" ? (
            <>
              Finally, the last important thing of this course is to understand
              how to claim these NFTs.
              <br />
              <br />
              For that you need to go to the NFTs claim page by clicking on the
              following link:{" "}
              <Link
                href={`/${lang}/premium`}
                className="text-blue-500 dark:text-blue-300"
              >
                app.trotelcoin.com/premium
              </Link>
              .
              <br />
              <br />
              Once it's done, connect your crypto wallet and authenticate you.
              You must hold the required number of TrotelCoins on the connected
              wallet.
              <br />
              <br />
              If you are connected with your email address or social networks,
              you just have to get the crypto wallet address associated with
              your account.
              <br />
              <br />
              In this case, your address is the following, click on it to copy
              it:{" "}
              <span
                className="font-semibold cursor-pointer"
                onClick={() => {
                  if (address) {
                    navigator.clipboard.writeText(address);
                    setIsCopied(true);
                  }
                }}
              >
                {address ? address : "Connect your wallet"}
              </span>
              .
              {isCopied && (
                <p className="mt-2 text-green-500 dark:text-green-300">
                  Address has been copied.
                </p>
              )}
              <br />
              <br />
              Then, on the NFTs claim page, you just have to check if you have
              the required number of TrotelCoins and click on the button to
              claim your NFTs.
              <br />
              <br />
              If everything goes well, you should see rainbow borders around
              your NFTs.
              <Image
                className="my-4"
                width={1400}
                height={600}
                src="/assets/courses/2/claim.png"
                alt="Claim"
              ></Image>
              Congratulations, you have successfully claimed your NFTs!
            </>
          ) : (
            <>
              Enfin, la dernière chose importante de ce cours est de comprendre
              comment récupérer ces NFTs.
              <br />
              <br />
              Pour cela, tu dois te rendre sur la page de récupération des NFTs
              en cliquant sur le lien suivant :{" "}
              <Link
                href={`/${lang}/premium`}
                className="text-blue-500 dark:text-blue-300"
              >
                app.trotelcoin.com/premium
              </Link>
              .
              <br />
              <br />
              Une fois cela fait, connecte ton portefeuille crypto et
              authentifie-toi. Tu dois détenir le nombre de TrotelCoins requis
              sur le portefeuille connecté.
              <br />
              <br />
              Si tu es connecté avec ton adresse mail ou tes réseaux sociaux, tu
              dois simplement récupérer l'adresse du portefeuille crypto associé
              à ton compte.
              <br />
              <br />
              En l'occurence, ton adresse est la suivante, clique dessus pour la
              copier :{" "}
              <span
                className="font-semibold cursor-pointer"
                onClick={() => {
                  if (address) {
                    navigator.clipboard.writeText(address);
                    setIsCopied(true);
                  }
                }}
              >
                {address ? address : "Connecte ton portefeuille"}
              </span>
              .
              {isCopied && (
                <p className="my-2 text-green-500 dark:text-green-300">
                  L'addresse a été copiée.
                </p>
              )}
              {!isCopied && (
                <>
                  <br />
                  <br />
                </>
              )}
              Ensuite, sur la page de récupération des NFTs, il ne te reste plus
              qu'à vérifier si tu as le nombre de TrotelCoins requis et à
              cliquer sur le bouton pour récupérer tes NFTs.
              <br />
              <br />
              Si tout se passe bien, tu devrais voir apparaître des contours
              arc-en-ciel autour de tes NFTs.
              <Image
                className="my-4"
                width={1400}
                height={600}
                src="/assets/courses/2/claim.png"
                alt="Claim"
              ></Image>
              Félicitations, tu as récupéré tes NFTs avec succès !
            </>
          )}
        </p>
      </div>
    </>
  );
};

export default CoursePage;
