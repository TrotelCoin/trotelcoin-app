import trotelCoinEarlyABI from "@/abi/trotelCoinEarly";
import trotelCoinExpertABI from "@/abi/trotelCoinExpert";
import trotelCoinIntermediateABI from "@/abi/trotelCoinIntermediate";
import trotelCoinLearningABI from "@/abi/trotelCoinLearning";
import {
  trotelCoinLearningAddress,
  trotelCoinEarlyAddress,
  trotelCoinExpertAddress,
  trotelCoinIntermediateAddress,
} from "@/data/web3/addresses";
import { DictType } from "@/types/types";
import { useAddress } from "@thirdweb-dev/react";
import { Address } from "viem";
import { polygon } from "viem/chains";
import { useContractRead } from "wagmi";
import BadgesList from "@/app/[lang]/account/components/badgesList";

interface BadgesSectionProps {
  dict: DictType | null;
}

const BadgesSection: React.FC<BadgesSectionProps> = ({ dict }) => {
  const { address } = useAccount();

  const { data: learner } = useContractRead({
    chainId: polygon.id,
    abi: trotelCoinLearningABI,
    address: trotelCoinLearningAddress,
    functionName: "learners",
    args: [address],
    enabled: Boolean(address),
    account: address as Address,
    watch: true,
  });
  const { data: earlyBalance } = useContractRead({
    chainId: polygon.id,
    abi: trotelCoinEarlyABI,
    address: trotelCoinEarlyAddress,
    functionName: "balanceOf",
    args: [address],
    enabled: Boolean(address),
    account: address as Address,
    watch: true,
  });

  const learnerTuple = learner as [any, any, any];
  const early = parseFloat(earlyBalance as string) > 0;

  const { data: intermediate } = useContractRead({
    chainId: polygon.id,
    abi: trotelCoinIntermediateABI,
    address: trotelCoinIntermediateAddress,
    functionName: "balanceOf",
    args: [address],
    account: address as Address,
    enabled: Boolean(address),
    watch: true,
  });
  const { data: expert } = useContractRead({
    chainId: polygon.id,
    abi: trotelCoinExpertABI,
    address: trotelCoinExpertAddress,
    functionName: "balanceOf",
    args: [address],
    account: address as Address,
    enabled: Boolean(address),
    watch: true,
  });

  const intermediateBalance: number = parseFloat(intermediate as string);
  const expertBalance: number = parseFloat(expert as string);

  const isNotPremium = intermediateBalance <= 0 && expertBalance <= 0;

  const badges = [
    {
      id: 1,
      name: typeof dict?.badges !== "string" && dict?.badges.beginner,
      image: "🐣",
      condition: true,
    },
    {
      id: 2,
      name: typeof dict?.badges !== "string" && dict?.badges.tenQuizzes,
      image: "🌱",
      condition:
        learnerTuple &&
        learnerTuple.length === 3 &&
        learnerTuple[1] &&
        parseFloat(learnerTuple[1] as string) >= 10,
    },
    {
      id: 3,
      name: typeof dict?.badges !== "string" && dict?.badges.hundredTrotelCoins,
      image: "🤑",
      condition:
        learnerTuple &&
        learnerTuple.length === 3 &&
        learnerTuple[2] &&
        parseFloat(learnerTuple[2] as string) * 1e-18 >= 100,
    },
    {
      id: 4,
      name: typeof dict?.badges !== "string" && dict?.badges.early,
      image: "🤫",
      condition: early,
    },
  ];

  return (
    <>
      <h2 className="font-semibold text-gray-900 dark:text-gray-100 text-xl mt-10">
        Badges
      </h2>
      <BadgesList
        badges={badges}
        isNotPremium={isNotPremium}
        dict={dict as DictType}
      />
    </>
  );
};

export default BadgesSection;
