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

interface BadgesSectionProps {
  dict: DictType | null;
}

const BadgesSection: React.FC<BadgesSectionProps> = ({ dict }) => {
  const address = useAddress();

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
      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 mx-auto">
        {badges.map(
          (badge, index) =>
            badge.condition && (
              <div
                key={index}
                className={`bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col rounded-lg py-10 px-2 text-center border border-gray-900/20 dark:border-gray-100/40`}
              >
                <div className="flex flex-col gap-2 text-center items-center">
                  <span
                    className={`text-gray-900 dark:text-gray-100 text-4xl ${
                      isNotPremium && "blur hover:blur-none duration-500"
                    }`}
                  >
                    {!isNotPremium && badge.image}
                  </span>
                  <span
                    className={`text-sm ${
                      isNotPremium && "blur hover:blur-none duration-500"
                    }`}
                  >
                    {!isNotPremium ? (
                      <>{badge.name}</>
                    ) : typeof dict?.account !== "string" &&
                      typeof dict?.account.notPremium === "string" ? (
                      <>{dict?.account.notPremium}</>
                    ) : (
                      <>Loading...</>
                    )}
                  </span>
                </div>
              </div>
            )
        )}
      </div>
    </>
  );
};

export default BadgesSection;
