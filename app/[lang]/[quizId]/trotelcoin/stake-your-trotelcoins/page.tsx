"use client";

import { Lang } from "@/types/types";
import Course from "@/app/[lang]/[quizId]/components/course";

const cards = {
  en: [
    {
      title: "Introduction",
      text: "You will learn how to stake your TrotelCoins to earn more, increase your voting power and helping the ecosystem to grow.",
    },
    {
      title: "Definition of TrotelCoin's staking",
      text: "Staking means locking your TrotelCoins for a while to earn more. The more you stake, the more you earn.",
    },
    {
      title: "Earning more",
      text: "Firstly, you earn more TrotelCoins by staking.",
    },
    {
      title: "Voting power",
      text: "Secondly, staking increases your voting power, as the balance of your staked TrotelCoins doubles it.",
    },
    {
      title: "Helping the ecosystem",
      text: "Lastly, staking helps the ecosystem grow by stabilizing TrotelCoin prices.",
    },
    {
      title: "How to stake?",
      text: "Go to the Wallet page in the staking section, choose the amount you want to stake and the period. The longer you stake, the more you earn.",
    },
    {
      title: "Staking data",
      text: "The staking data shows the amount staked, rewards, and time left in the staking period.",
    },
    {
      title: "Conditions",
      text: "When you stake TrotelCoins, you can't retrieve them until staking ends. Connect your wallet and have MATIC to pay the gas fees.",
    },
    {
      title: "Staking periods",
      text: "You can stake for 30 days, 3 months, 6 months, or 1 year.",
    },
    {
      title: "Approving",
      text: "Approving the staking contract allows it to receive your TrotelCoins.",
    },
    {
      title: "Staking",
      text: "After approving, use the stake button to stake.",
    },
  ],
  fr: [
    {
      title: "Introduction",
      text: "Vous apprendrez à miser vos TrotelCoins pour en gagner davantage, augmenter votre pouvoir de vote et aider l'écosystème à croître.",
    },
    {
      title: "Définition du staking de TrotelCoin",
      text: "Staking signifie bloquer vos TrotelCoins pendant un certain temps pour en gagner davantage. Plus vous misez, plus vous gagnez.",
    },
    {
      title: "Gagner davantage",
      text: "Premièrement, vous gagnez plus de TrotelCoins en misant.",
    },
    {
      title: "Pouvoir de vote",
      text: "Deuxièmement, le staking augmente votre pouvoir de vote, car le solde de vos TrotelCoins misés le double.",
    },
    {
      title: "Aider l'écosystème",
      text: "Enfin, le staking aide l'écosystème à croître en stabilisant les prix des TrotelCoins.",
    },
    {
      title: "Comment miser ?",
      text: "Allez sur la page Wallet dans la section staking, choisissez le montant que vous voulez et la période à miser. Plus vous misez longtemps, plus vous gagnez.",
    },
    {
      title: "Données de staking",
      text: "Les données de staking montrent le montant misé, les récompenses et le temps restant dans la période de staking.",
    },
    {
      title: "Conditions",
      text: "Lorsque vous misez des TrotelCoins, vous ne pouvez pas les récupérer avant la fin du staking. Connectez votre portefeuille et ayez du MATIC pour payer les frais de gaz.",
    },
    {
      title: "Périodes de staking",
      text: "Vous pouvez miser pour 30 jours, 3 mois, 6 mois ou 1 an.",
    },
    {
      title: "Approbation",
      text: "Approuver le contrat de staking lui permet de recevoir vos TrotelCoins.",
    },
    {
      title: "Miser",
      text: "Après l'approbation, utilisez le bouton de mise pour miser.",
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
