import trotelCoinLearningABI from "@/abi/trotelCoinLearning";
import { trotelCoinLearningAddress } from "@/data/addresses";
import { polygon } from "viem/chains";
import { useContractRead } from "wagmi";

export default function QuizStatus({
  index,
  address,
}: {
  index: number;
  address: string;
}) {
  const { data: quizCompleted } = useContractRead({
    chainId: polygon.id,
    address: trotelCoinLearningAddress,
    abi: trotelCoinLearningABI,
    args: [address, parseFloat(index.toString()) + 1],
    enabled: Boolean(address),
    functionName: "quizzesIdAnsweredPerLearner",
    watch: true,
  });

  return quizCompleted ? "Finished" : "Not started";
}
