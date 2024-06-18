"use client";

import type { Lang } from "@/types/language/lang";
import Course from "@/app/[lang]/components/courses/courseScreen/course";
import { useEffect, useState } from "react";
import { useAccount, useBlockNumber, useReadContract } from "wagmi";
import trotelCoinStakingV1ABI from "@/abi/staking/trotelCoinStakingV1";
import {
  trotelCoinStakingV1,
  trotelCoinStakingV2
} from "@/data/web3/addresses";
import { polygon } from "wagmi/chains";
import trotelCoinStakingV2ABI from "@/abi/staking/trotelCoinStakingV2";
import { formatEther } from "viem";

const CoursePage = ({ params: { lang } }: { params: { lang: Lang } }) => {
  const [condition, setCondition] = useState<boolean>(false);
  const [totalAmount, setTotalAmount] = useState<number | null>(null);

  const { address } = useAccount();
  const { data: blockNumber } = useBlockNumber({
    chainId: polygon.id,
    watch: true
  });

  const { data: stakingsDataV1, refetch: refetchStakingV1 } = useReadContract({
    chainId: polygon.id,
    abi: trotelCoinStakingV1ABI,
    address: trotelCoinStakingV1,
    functionName: "stakings",
    args: [address]
  });

  const { data: stakingsDataV2, refetch: refetchStakingV2 } = useReadContract({
    chainId: polygon.id,
    abi: trotelCoinStakingV2ABI,
    address: trotelCoinStakingV2,
    functionName: "stakings",
    args: [address]
  });

  useEffect(() => {
    refetchStakingV1();
    refetchStakingV2();
  }, [blockNumber, refetchStakingV1, refetchStakingV2]);

  useEffect(() => {
    const stakingsV1 = stakingsDataV1 as any[];
    const stakingsV2 = stakingsDataV2 as any[];

    if (address && (stakingsV1 || stakingsV2)) {
      const amountV1 = Number(formatEther(stakingsV1[0] as bigint));
      const amountV2 = Number(formatEther(stakingsV2[0] as bigint));

      const totalAmount = Math.floor(amountV1 + amountV2);

      setTotalAmount(totalAmount);

      if (amountV1 > 0 || amountV2 > 0) {
        setCondition(true);
      } else {
        setCondition(false);
      }
    } else {
      setCondition(false);
    }
  }, [address, stakingsDataV1, stakingsDataV2]);

  const cards = {
    en: [
      {
        title: "Introduction",
        text: "You will learn how to stake your TROTEL to earn more, increase your voting power and helping the ecosystem to grow."
      },
      {
        title: "Our staking definition",
        text: "The staking means locking your TROTEL for a while to earn more. The more you stake, the more you earn."
      },
      {
        title: "Earning more",
        text: "Firstly, you earn more TROTEL by staking."
      },
      {
        title: "Voting power",
        text: "Secondly, staking increases your voting power, as the balance of your staked TROTEL + the rewards."
      },
      {
        title: "Helping the ecosystem",
        text: "Lastly, staking helps the ecosystem grow by stabilizing TROTEL's price."
      },
      {
        title: "How to stake?",
        text: "Go to the Wallet page in the staking section, choose the amount you want to stake and the period. The longer you stake, the more you earn."
      },
      {
        title: "Staking data",
        text: "The staking data shows the amount staked, rewards, and time left in the staking period."
      },
      {
        title: "Conditions",
        text: "When you stake TROTEL, you can't retrieve them until staking ends. Connect your wallet and have MATIC to pay the gas fees."
      },
      {
        title: "Staking periods",
        text: "You can stake for 30 days, 3 months, 6 months, or 1 year."
      },
      {
        title: "Approving",
        text: "Approving the staking contract allows it to receive your TROTEL before staking."
      },
      {
        title: "Staking",
        text: "After approving, use the stake button to stake."
      },
      {
        title: "Exercise",
        text: "To access the quiz, you need to stake some TROTEL. Good luck!"
      },
      {
        title: "Your stakings",
        text: (
          <>
            <span>
              You are staking:{" "}
              {totalAmount ? totalAmount.toLocaleString("en-US") : 0} TROTEL
            </span>
          </>
        )
      }
    ],
    fr: [
      {
        title: "Introduction",
        text: "Vous apprendrez à miser vos TROTEL pour en gagner davantage, augmenter votre pouvoir de vote et aider l'écosystème à croître."
      },
      {
        title: "Notre définition du staking",
        text: "Le staking signifie bloquer vos TROTEL pendant un certain temps pour en gagner davantage. Plus vous misez, plus vous gagnez."
      },
      {
        title: "Gagner davantage",
        text: "Premièrement, vous gagnez plus de TROTEL en misant."
      },
      {
        title: "Pouvoir de vote",
        text: "Deuxièmement, le staking augmente votre pouvoir de vote, car le solde de vos TROTEL est ajouté aux récompenses futures."
      },
      {
        title: "Aider l'écosystème",
        text: "Enfin, le staking aide l'écosystème à croître en stabilisant le prix du TROTEL."
      },
      {
        title: "Comment miser ?",
        text: "Allez sur la page Wallet dans la section staking, choisissez le montant que vous voulez et la période à miser. Plus vous misez longtemps, plus vous gagnez."
      },
      {
        title: "Données de staking",
        text: "Les données de staking montrent le montant misé, les récompenses et le temps restant dans la période de staking."
      },
      {
        title: "Conditions",
        text: "Lorsque vous misez des TROTEL, vous ne pouvez pas les récupérer avant la fin du staking. Connectez votre portefeuille et ayez du MATIC pour payer les frais de gaz."
      },
      {
        title: "Périodes de staking",
        text: "Vous pouvez miser pour 30 jours, 3 mois, 6 mois ou 1 an."
      },
      {
        title: "Approbation",
        text: "Approuver le contrat de staking lui permet de recevoir vos TROTEL avant le staking."
      },
      {
        title: "Miser",
        text: "Après l'approbation, utilisez le bouton de staking pour miser."
      },
      {
        title: "Exercice",
        text: "Pour accéder au quiz, vous devez miser des TROTEL. Bonne chance !"
      },
      {
        title: "Vos stakings",
        text: (
          <>
            <span>
              Vous êtes en train de staker :{" "}
              {totalAmount ? totalAmount.toLocaleString("en-US") : 0} TROTEL
            </span>
          </>
        )
      }
    ]
  };

  return (
    <>
      <Course cards={cards} lang={lang} conditionIsOkay={condition} />
    </>
  );
};

export default CoursePage;
