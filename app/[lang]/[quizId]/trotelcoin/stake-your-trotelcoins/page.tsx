"use client";

import React from "react";
import { Lang } from "@/types/types";
import Image from "next/image";
import Link from "next/link";

const CoursePage = ({ params: { lang } }: { params: { lang: Lang } }) => {
  return (
    <>
      <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
        {lang == "en" ? <>Introduction</> : <>Introduction</>}
      </h1>
      <p className="mt-6 font-light">
        {lang == "en" ? (
          <>
            In this course, you will learn what is the definition of staking for
            TrotelCoin. More than that, you will learn how to stake your
            TrotelCoins to earn more, increase your voting power and help the
            eco system to grow.
          </>
        ) : (
          <>
            Dans ce cours, vous apprendrez ce qu'est la définition du staking de
            TrotelCoin. Plus que cela, vous apprendrez comment staker vos
            TrotelCoins pour en gagner plus, augmenter votre pouvoir de vote et
            aider l'écosystème à grandir.
          </>
        )}
      </p>

      <div className="mt-16 mx-auto">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          {lang == "en" ? (
            <>Definition of TrotelCoin's staking</>
          ) : (
            <>Définition du staking TrotelCoin</>
          )}
        </h1>
        <p className="mt-6 font-light">
          {lang === "en" ? (
            <>
              The definition of staking is to lock your TrotelCoins for a
              certain period of time. During this period, you will earn more and
              more TrotelCoins.
              <br />
              <br />
              The more you stake, the more you will earn. It's a way to reward
              the people who believe in the project and who want to help it to
              grow.
              <br />
              <br />
              The staking was introduced in the TIP-2. We will talk about TIPs
              in another course but to say a little word about it, TIPs are
              proposals to improve the TrotelCoin protocol.
              <br />
              <br />
              Indeed, normally the staking is a way to secure the network and to
              reward the people who help to secure it. But, in this case,
              there's no need to secure the network because we don't have a
              network.
              <br />
              <br />
              However, using the term of staking is familiar to many people.
            </>
          ) : (
            <>
              La définition du staking est de bloquer vos TrotelCoins pour une
              certaine période de temps. Pendant cette période, vous gagnerez de
              plus en plus de TrotelCoins.
              <br />
              <br />
              Plus vous stakez, plus vous gagnerez. C'est une façon de
              récompenser les personnes qui croient en le projet et qui veulent
              l'aider à grandir.
              <br />
              <br />
              Le staking a été introduit dans le TIP-2. Nous parlerons des TIPs
              dans un autre cours mais pour dire un petit mot à ce sujet, les
              TIPs sont des propositions pour améliorer le protocole TrotelCoin.
              <br />
              <br />
              En effet, normalement le staking est une façon de sécuriser le
              réseau et de récompenser les personnes qui aident à le sécuriser.
              Mais, dans ce cas, il n'y a pas besoin de sécuriser le réseau car
              nous n'avons pas de réseau.
              <br />
              <br />
              Cependant, utiliser le terme de staking est familier à beaucoup de
              personnes.
            </>
          )}
        </p>
      </div>

      <div className="mt-16 mx-auto">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          {lang === "en" ? (
            <>Advantages of staking</>
          ) : (
            <>Avantages du staking</>
          )}
        </h1>
        <p className="mt-6 font-light">
          {lang === "en" ? (
            <>
              The advantages of staking are many and could evolve over time.
              <br />
              <br />
              The first advantage is to earn more TrotelCoins. The more you
              stake, the more you will earn. This shows your commitment to the
              project and your belief in it.
              <br />
              <br />
              The second advantage is to increase your voting power. The more
              you stake, the more your voting power will increase.
              <Image
                className="my-4"
                width={1400}
                height={600}
                src="/assets/courses/16/staking-voting-power.png"
                alt="Staking voting power"
              />
              Your voting power is the balance of TrotelCoins you own. But, if
              you stake, the balance of those staked TrotelCoins will double
              your voting power.
              <br />
              <br />
              The third advantage is to help the ecosystem to grow. The more you
              stake, the more the ecosystem will grow.
              <br />
              <br />
              Why ? Because when people stake TrotelCoins, they can't dump them
              on the market. It's a way to stabilize the price of TrotelCoin and
              to make it grow.
              <br />
              <br />
              This has been proved recently. When, introducing staking, the
              token started to rise in price, it was a good sign for the
              project.
            </>
          ) : (
            <>
              Les avantages du staking sont nombreux et pourraient évoluer avec
              le temps.
              <br />
              <br />
              Le premier avantage est de gagner plus de TrotelCoins. Plus vous
              stakez, plus vous gagnerez. Cela montre votre engagement dans le
              projet et votre croyance en lui.
              <br />
              <br />
              Le deuxième avantage est d'augmenter votre pouvoir de vote. Plus
              vous stakez, plus votre pouvoir de vote augmentera.
              <Image
                className="my-4"
                width={1400}
                height={600}
                src="/assets/courses/16/staking-voting-power.png"
                alt="Staking voting power"
              />
              Votre pouvoir de vote est le solde de TrotelCoins que vous
              possédez. Mais, si vous stakez, le solde de ces TrotelCoins stakés
              doublera votre pouvoir de vote.
              <br />
              <br />
              Le troisième avantage est d'aider l'écosystème à grandir. Plus
              vous stakez, plus l'écosystème grandira.
              <br />
              <br />
              Pourquoi ? Parce que lorsque les gens stake des TrotelCoins, ils
              ne peuvent pas les vendre sur le marché. C'est une façon de
              stabiliser le prix du TrotelCoin et de le faire grandir.
              <br />
              <br />
              Cela a été prouvé récemment. Lors de l'introduction du staking, le
              token a commencé à monter en prix, c'était un bon signe pour le
              projet.
            </>
          )}
        </p>
      </div>

      <div className="mt-16 mx-auto">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          {lang === "en" ? <>How to stake ?</> : <>Comment staker ?</>}
        </h1>
        <p className="mt-6 font-light">
          {lang === "en" ? (
            <>
              To stake, you need to have TrotelCoins. If you don't have any, you
              can buy some, another course will explain you how to do that.
              <br />
              <br />
              Then, you can stake your TrotelCoins. To do that, you need to go
              to the{" "}
              <Link
                className="text-blue-500 hover:text-blue-400"
                href={`/${lang}/wallet?category=staking`}
              >
                Wallet
              </Link>{" "}
              page in the staking section.
              <Image
                className="my-4"
                width={1400}
                height={600}
                src="/assets/courses/16/staking-interface.png"
                alt="Staking interface"
              />
              Then, you can choose the amount of TrotelCoins you want to stake
              and the period. The period is the time you want to stake your
              TrotelCoins. The more you stake, the more you will earn.
              <br />
              <br />
              The ROI (Return On Investment) is the percentage of TrotelCoins
              you will earn. It varies depending on the period.
              <br />
              <br />
              Finally, you have some data to help you understand what's going
              on. You can see the amount of TrotelCoins you have staked, the
              rewards you will get. You can also see the remaining time before
              the end of the staking period.
              <br />
              <br />
              You can't get your TrotelCoins back if you stake them, you need to
              wait until the end of the staking period.
              <br />
              <br />
              Also, you have an approve button. You need to approve the staking
              contract to be able to stake your TrotelCoins.
              <br />
              <br />
              Why do you need to approve and what does it mean ? When you stake,
              you are sending your TrotelCoins to a smart contract. This smart
              contract will take your TrotelCoins and give you rewards.
              <br />
              <br />
              But, before sending your TrotelCoins to this smart contract, you
              need to approve it. It's a way to say to the smart contract that
              you are okay to send your TrotelCoins to it.
              <br />
              <br />
              Once it's done, you can stake your TrotelCoins using the lock
              button.
              <br />
              <br />
              For those operations, you need to have a wallet connected and
              MATIC to pay the gas fees.
              <br />
              <br />
              More informations about gas fees in another course but in the
              meantime you can learn it in the vocabulary section in the{" "}
              <Link
                className="text-blue-500 hover:text-blue-400"
                href={`/${lang}/learn?category=vocabulary`}
              >
                Learn
              </Link>{" "}
              page.
            </>
          ) : (
            <>
              Pour staker, vous avez besoin de TrotelCoins. Si vous n'en avez
              pas, vous pouvez en acheter, un autre cours vous expliquera
              comment faire.
              <br />
              <br />
              Ensuite, vous pouvez staker vos TrotelCoins. Pour ce faire, vous
              devez vous rendre sur la page{" "}
              <Link
                className="text-blue-500 hover:text-blue-400"
                href={`/${lang}/wallet?category=staking`}
              >
                Wallet
              </Link>{" "}
              dans la section staking.
              <Image
                className="my-4"
                width={1400}
                height={600}
                src="/assets/courses/16/staking-interface.png"
                alt="Staking interface"
              />
              Ensuite, vous pouvez choisir le montant de TrotelCoins que vous
              voulez staker et la période. La période est le temps pendant
              lequel vous voulez staker vos TrotelCoins. Plus vous stakez, plus
              vous gagnerez.
              <br />
              <br />
              Le ROI (Return On Investment) est le pourcentage de TrotelCoins
              que vous gagnerez. Il varie en fonction de la période.
              <br />
              <br />
              Enfin, vous avez des données pour vous aider à comprendre ce qui
              se passe. Vous pouvez voir le montant de TrotelCoins que vous avez
              staké, les récompenses que vous obtiendrez. Vous pouvez également
              voir le temps restant avant la fin de la période de staking.
              <br />
              <br />
              Vous ne pouvez pas récupérer vos TrotelCoins si vous les staker,
              vous devez attendre la fin de la période de staking.
              <br />
              <br />
              De plus, vous avez un bouton d'approbation. Vous devez approuver
              le contrat de staking pour pouvoir staker vos TrotelCoins.
              <br />
              <br />
              Pourquoi avez-vous besoin d'approuver et qu'est ce que cela veut
              dire ? Lorsque vous staker, vous envoyez vos TrotelCoins à un
              smart contract. Ce smart contract prendra vos TrotelCoins et vous
              donnera des récompenses.
              <br />
              <br />
              Mais, avant d'envoyer vos TrotelCoins à ce smart contract, vous
              devez l'approuver. C'est une façon de dire au smart contract que
              vous êtes d'accord pour lui envoyer vos TrotelCoins.
              <br />
              <br />
              Une fois que c'est fait, vous pouvez staker vos TrotelCoins en
              utilisant le bouton de verrouillage.
              <br />
              <br />
              Pour ces opérations, vous devez avoir un portefeuille connecté et
              du MATIC pour payer les frais de gaz.
              <br />
              <br />
              Plus d'informations sur les frais de gaz dans un autre cours mais
              en attendant vous pouvez l'apprendre dans la section vocabulaire
              dans la page{" "}
              <Link
                className="text-blue-500 hover:text-blue-400"
                href={`/${lang}/learn?category=vocabulary`}
              >
                Learn
              </Link>
              .
            </>
          )}
        </p>
      </div>
    </>
  );
};

export default CoursePage;
