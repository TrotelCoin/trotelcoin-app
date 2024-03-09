"use client";

import { Lang } from "@/types/types";
import Course from "@/app/[lang]/[quizId]/components/course";

const cards = {
  en: [
    {
      title: "Introduction",
      text: "In this course, you will learn what is the definition of staking for TrotelCoin. More than that, you will learn how to stake your TrotelCoins to earn more, increase your voting power and help the ecosystem to grow.",
    },
    {
      title: "Definition of TrotelCoin's staking",
      text: 'Staking means locking your TrotelCoins for a while to earn more. The more you stake, the more you earn. It\'s a reward for supporting and growing the project. Staking started with TIP-2, part of proposals to enhance TrotelCoin. Usually, staking secures networks, but here, no network exists. Still, we use "staking" for familiarity.',
    },
    {
      title: "Advantages of staking",
      text: "Staking has many benefits that may change over time. Firstly, you earn more TrotelCoins by staking, showing your commitment to and belief in the project. Secondly, staking increases your voting power, as the balance of your staked TrotelCoins doubles it. Lastly, staking helps the ecosystem grow by stabilizing TrotelCoin prices, preventing people from selling them.",
    },
    {
      title: "How to stake?",
      text: "To stake, get TrotelCoins. Buy them if you don't have any; a different lesson explains how. Go to the Wallet page in the staking section, choose the amount how you want and period to stake. The longer you stake, the more you earn. ROI varies with the period. Check data to see staked amount, rewards, and time left in the staking period.",
    },
    {
      title: "Conditions",
      text: 'When you stake TrotelCoins, you can\'t retrieve them until staking ends. To start staking, click "Approve" for the staking contract. Approval tells the smart contract it\'s okay to receive your TrotelCoins for rewards. After approval, use the "Lock" button to stake. Connect your wallet and have MATIC to pay the gas fees. You can stake for 30 days, 3 months, 6 months or 1 year.',
    },
  ],
  fr: [
    {
      title: "Introduction",
      text: "Dans ce cours, vous apprendrez ce qu'est la définition du staking sur TrotelCoin. De plus, vous apprendrez comment staker vos TrotelCoins pour en gagner plus, augmenter votre pouvoir de vote et aider l'écosystème à croître.",
    },
    {
      title: "Définition du staking de TrotelCoin",
      text: "Staking signifie bloquer vos TrotelCoins pendant un certain temps pour en gagner plus. Plus vous stakez, plus vous gagnez. C'est une récompense pour soutenir et faire croître le projet. Le staking a commencé avec le TIP-2, faisant partie des propositions pour améliorer TrotelCoin. Habituellement, le staking sécurise les réseaux, mais ici, il n'y a pas de réseaux. Néanmoins, nous utilisons le terme \"staking\" tout de même.",
    },
    {
      title: "Avantages du staking",
      text: "Le staking présente de nombreux avantages qui pourront changer avec le temps. Tout d'abord, vous gagnez plus de TrotelCoins en stakant, montrant votre engagement et votre soutien au projet. Deuxièmement, le staking augmente votre pouvoir de vote, car le solde de vos TrotelCoins misés le double. Enfin, le staking aide l'écosystème à croître en stabilisant le prix du TrotelCoin, empêchant les gens de les vendre.",
    },
    {
      title: "Comment staker ?",
      text: "Pour staker, obtenez des TrotelCoins. Achetez-en si vous n'en avez pas ; un autre cours explique comment faire. Allez sur la page Wallet dans la section staking, choisissez le montant que vous voulez et la période de staking. Plus vous stakez longtemps, plus vous gagnez. Le retour sur investissement varie avec la période. Consultez les données pour voir le montant misé, les récompenses et le temps restant dans la période de staking.",
    },
    {
      title: "Conditions",
      text: 'Lorsque vous misez des TrotelCoins, vous ne pouvez pas les récupérer avant la fin de la période de staking. Pour commencer à staker, cliquez sur "Approuver". L\'approbation indique au smart contract qu\'il est OK pour recevoir vos TrotelCoins en échange de récompenses. Après l\'approbation, utilisez le bouton "Bloquer" pour miser. Connectez votre portefeuille et ayez du MATIC pour payer les frais de gaz. Vous pouvez staker pendant 30 jours, 3 mois, 6 mois ou 1 an.',
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
