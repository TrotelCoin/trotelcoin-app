import trotelCoinExpertABI from "@/abi/trotelCoinExpert";
import trotelCoinIntermediateABI from "@/abi/trotelCoinIntermediate";
import {
  trotelCoinIntermediateAddress,
  trotelCoinExpertAddress,
} from "@/data/web3/addresses";
import { DictType } from "@/types/types";
import { calculateUserLevel, calculateProgressPercentage } from "@/utils/level";
import { useAddress } from "@thirdweb-dev/react";
import { useEffect, useState } from "react";
import { Address } from "viem";
import { polygon } from "viem/chains";
import { useContractRead } from "wagmi";

interface LevelSectionProps {
  dict: DictType | null;
}

const LevelSection: React.FC<LevelSectionProps> = ({ dict }) => {
  const [width, setWidth] = useState<number>(0);
  const [numberOfQuizzesAnswered, setNumberOfQuizzesAnswered] =
    useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userLevel, setUserLevel] = useState<number | null>(1);
  const [quizzesRemaining, setQuizzesRemaining] = useState<number | null>(1);

  const address = useAddress();

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

  useEffect(() => {
    const fetchNumberOfQuizzesAnswered = async () => {
      await fetch(`/api/database/numberOfQuizzesAnswered?wallet=${address}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store",
        },
        cache: "no-store",
      })
        .then((response) => response?.json())
        .then((data) => {
          setNumberOfQuizzesAnswered(data);
        });
    };

    if (address) {
      fetchNumberOfQuizzesAnswered();

      const interval = setInterval(fetchNumberOfQuizzesAnswered, 10000);

      return () => clearInterval(interval);
    } else {
      setNumberOfQuizzesAnswered(0);
    }
  }, [address]);

  useEffect(() => {
    if (numberOfQuizzesAnswered) {
      const { userLevel, quizzesRemaining } = calculateUserLevel(
        numberOfQuizzesAnswered
      );
      const width = calculateProgressPercentage(numberOfQuizzesAnswered);
      setWidth(width);
      setUserLevel(userLevel);
      setQuizzesRemaining(quizzesRemaining);
    } else {
      setWidth(0);
      setUserLevel(1);
      setQuizzesRemaining(0);
    }
  }, [numberOfQuizzesAnswered]);

  return (
    <>
      <h2 className="font-semibold text-gray-900 dark:text-gray-100 text-xl mt-10">
        {typeof dict?.account !== "string" && <>{dict?.account.level}</>}
      </h2>
      <div
        className={`mt-4 bg-gray-100 flex flex-col border backdrop-blur-xl border-gray-900/20 dark:border-gray-100/20 text-center rounded-lg p-10 dark:bg-gray-800 text-gray-900 dark:text-gray-100`}
      >
        <div className="flex justify-between">
          <div
            className={`flex gap-1 ${
              isNotPremium && "blur hover:blur-none duration-500"
            }`}
          >
            {isNotPremium && (
              <p>
                {typeof dict?.account !== "string" && (
                  <>{dict?.account.notPremium}</>
                )}
              </p>
            )}
            {!isNotPremium && (
              <>
                <p>
                  {typeof dict?.account !== "string" && (
                    <>{dict?.account.youAreLevel}</>
                  )}
                </p>
                {userLevel ? (
                  <>{userLevel}</>
                ) : (
                  <span className="animate__animated animate__flash animate__slower animate__infinite">
                    0
                  </span>
                )}
              </>
            )}
          </div>
          <p
            className={`hidden md:block ${
              isNotPremium && "blur hover:blur-none duration-500"
            }`}
          >
            {quizzesRemaining && quizzesRemaining > 0 && !isNotPremium
              ? `${quizzesRemaining.toFixed(0)} ${
                  typeof dict?.account !== "string" &&
                  dict?.account.trotelCoinsLeft
                }`
              : `${
                  typeof dict?.account !== "string" && dict?.account.notPremium
                }`}
          </p>
        </div>
        <div
          className={`overflow-hidden h-2 text-xs bg-gray-400 mt-2 flex rounded-full ${
            isNotPremium && "mt-4"
          }`}
        >
          <div
            style={{
              width: isNotPremium ? "0%" : `${width}%`,
              transition: "width 1s ease-in",
            }}
            className="rounded-full h-2 bg-blue-500 dark:bg-blue-300"
          ></div>
        </div>
      </div>
    </>
  );
};

export default LevelSection;
