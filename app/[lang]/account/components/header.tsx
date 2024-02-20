import { DictType, Lang } from "@/types/types";
import { shortenAddress } from "@thirdweb-dev/react";
import { useEffect, useState } from "react";
import { Address, Log } from "viem";
import { useAddress } from "@thirdweb-dev/react";
import trotelCoinExpertABI from "@/abi/trotelCoinExpert";
import trotelCoinIntermediateABI from "@/abi/trotelCoinIntermediate";
import trotelCoinLearningABI from "@/abi/trotelCoinLearning";
import {
  trotelCoinIntermediateAddress,
  trotelCoinExpertAddress,
  trotelCoinLearningAddress,
  trotelCoinAddress,
} from "@/data/web3/addresses";
import { polygon } from "viem/chains";
import {
  useEnsName,
  mainnet,
  useContractEvent,
  useContractRead,
  useBalance,
} from "wagmi";

interface HeaderProps {
  dict: DictType | null;
  lang: Lang;
}

type MyLog = Log & {
  args: {
    learner: Address;
    rewardsClaimed: string;
  };
};

const Header: React.FC<HeaderProps> = ({ dict, lang }) => {
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const [logs, setLogs] = useState<MyLog[]>([]);
  const [alreadyAnsweredSatisfaction, setAlreadyAnsweredSatisfaction] =
    useState<boolean>(true);
  const [numberOfQuizzesAnswered, setNumberOfQuizzesAnswered] =
    useState<number>(0);
  const [totalRewardsPending, setTotalRewardsPending] = useState<number>(0);
  const [tokensEarned, setTokensEarned] = useState<number>(0);
  const [totalRewards, setTotalRewards] = useState<number | null>(null);

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
  const { data: learner } = useContractRead({
    chainId: polygon.id,
    abi: trotelCoinLearningABI,
    address: trotelCoinLearningAddress,
    functionName: "learners",
    args: [address],
    account: address as Address,
    enabled: Boolean(address),
    watch: true,
  });
  const { data: ensName } = useEnsName({
    address: address as Address,
    enabled: Boolean(address),
    chainId: mainnet.id,
  });
  const { data: balance } = useBalance({
    chainId: polygon.id,
    token: trotelCoinAddress,
    enabled: Boolean(address),
    address: address as Address,
  });
  useContractEvent({
    chainId: polygon.id,
    address: trotelCoinLearningAddress,
    abi: trotelCoinLearningABI,
    eventName: "RewardsClaimed",
    listener(logs) {
      setLogs(logs as MyLog[]);
    },
  });

  const intermediateBalance: number = parseFloat(intermediate as string);
  const expertBalance: number = parseFloat(expert as string);

  const isNotPremium = intermediateBalance <= 0 && expertBalance <= 0;

  const satisfactionResult = async (number: number) => {
    if (number) {
      await fetch(`/api/database/satisfactionHandler?number=${number}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });

      localStorage.setItem("satisfactionAnswered", "true");
      setAlreadyAnsweredSatisfaction(true);
    } else {
      setAlreadyAnsweredSatisfaction(false);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("satisfactionAnswered") === null) {
      localStorage.setItem("satisfactionAnswered", "false");
    } else {
      setAlreadyAnsweredSatisfaction(
        localStorage.getItem("satisfactionAnswered") === "true"
      );
    }
  }, []);

  useEffect(() => {
    const fetchNumberOfQuizzesAnswered = async () => {
      await fetch(`/api/database/numberOfQuizzesAnswered?wallet=${address}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
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
    const fetchRewardsPending = async () => {
      await fetch(`/api/database/totalRewardsPending?wallet=${address}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      })
        .then((response) => response?.json())
        .then((data) => {
          setTotalRewardsPending(data);
        });
    };

    if (address) {
      fetchRewardsPending();

      const interval = setInterval(fetchRewardsPending, 10000);

      return () => clearInterval(interval);
    } else {
      setTotalRewardsPending(0);
    }
  }, [address]);

  useEffect(() => {
    if (totalRewards && totalRewardsPending) {
      setTokensEarned(totalRewards + totalRewardsPending);
    } else if (totalRewards) {
      setTokensEarned(totalRewards);
    } else if (totalRewardsPending) {
      setTokensEarned(totalRewardsPending);
    } else {
      setTokensEarned(0);
    }
  }, [totalRewards, totalRewardsPending, address]);

  return (
    <>
      <h2 className="font-semibold text-gray-900 dark:text-gray-100 text-xl">
        {typeof dict?.account !== "string" && <>{dict?.account.hello}</>},{" "}
        <span className={`font-bold`}>
          {ensName && ensName !== null ? (
            <>{ensName}</>
          ) : (
            <>{shortenAddress(address)}</>
          )}
        </span>{" "}
        👋
      </h2>
      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 mx-auto">
        <div
          className={`col-span-2 md:col-span-4 bg-gray-50 flex items-center border backdrop-blur-xl border-gray-900/20 dark:border-gray-100/40 text-center rounded-lg p-8 dark:bg-gray-900 text-gray-900 dark:text-gray-100 ${
            alreadyAnsweredSatisfaction &&
            "hidden animate__animated animate__fadeOut"
          }`}
        >
          <div className="flex flex-col gap-4 mx-auto text-center">
            {typeof dict?.account !== "string" && (
              <span className="text-xl font-semibold">
                {dict?.account.satisfaction as string}
              </span>
            )}
            <div className="grid grid-cols-6 lg:grid-cols-11 gap-2 mx-auto mt-2">
              {Array.from(Array(11).keys()).map((number, index) => (
                <div key={index}>
                  <div
                    onClick={() => setSelectedNumber(number)}
                    className={`m-1 w-10 h-10 rounded-lg ${
                      selectedNumber === number
                        ? "bg-black hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-100 text-gray-100 dark:text-gray-900"
                        : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100"
                    } cursor-pointer text-xl flex items-center justify-center`}
                  >
                    {number}
                  </div>
                </div>
              ))}
            </div>
            <div className="w-1/2 mx-auto">
              <button
                onClick={() => satisfactionResult(selectedNumber as number)}
                className="mt-2 text-sm font-semibold rounded-full px-6 py-2 bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200 text-gray-100 dark:text-gray-900"
              >
                {lang === "en" ? <>Submit</> : <>Envoyer</>}
              </button>
            </div>
          </div>
        </div>

        <div
          className={`${
            !isNotPremium && "rainbow-border"
          } col-span-2 md:col-span-4 bg-gray-50 flex items-center border backdrop-blur-xl border-gray-900/20 dark:border-gray-100/40 text-center rounded-lg px-2 py-10 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
        >
          <div className="flex flex-col mx-auto text-center">
            <span
              className={`text-4xl md:text-6xl font-semibold ${
                !isNotPremium && "rainbow-text"
              }`}
            >
              {intermediateBalance > 0 && expertBalance <= 0 && (
                <>
                  {typeof dict?.tier !== "string" && (
                    <>{dict?.tier.intermediate}</>
                  )}
                </>
              )}
              {expertBalance > 0 && (
                <>
                  {typeof dict?.tier !== "string" && <>{dict?.tier.expert}</>}
                </>
              )}
              {isNotPremium && (
                <>
                  {typeof dict?.tier !== "string" && <>{dict?.tier.beginner}</>}
                </>
              )}
            </span>{" "}
            <span>
              {typeof dict?.account !== "string" && <>{dict?.account.rank}</>}
            </span>
          </div>
        </div>
        <div
          className={`bg-gray-50 flex items-center border backdrop-blur-xl border-gray-900/20 dark:border-gray-100/40 text-center rounded-lg px-2 py-10 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
        >
          <div className="flex flex-col mx-auto text-center">
            <span className="text-2xl md:text-4xl">
              <>
                <span className="font-semibold">
                  {balance ? (
                    <span>
                      {Math.floor(parseFloat(balance?.formatted as string))}
                    </span>
                  ) : (
                    <span className="animate__animated animate__flash animate__slower animate__infinite">
                      0
                    </span>
                  )}
                </span>
              </>
            </span>
            <span>
              {typeof dict?.account !== "string" && (
                <>{dict?.account.balance}</>
              )}
            </span>
          </div>
        </div>
        <div
          className={`bg-gray-50 flex items-center border backdrop-blur-xl border-gray-900/20 dark:border-gray-100/40 text-center rounded-lg px-2 py-10 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
        >
          <div className="flex flex-col mx-auto text-center">
            <span className="text-2xl md:text-4xl">
              <>
                <span className="font-semibold">
                  {numberOfQuizzesAnswered ? (
                    <span>{numberOfQuizzesAnswered}</span>
                  ) : (
                    <span className="animate__animated animate__flash animate__slower animate__infinite">
                      0
                    </span>
                  )}
                </span>
              </>
            </span>
            <span>
              {typeof dict?.account !== "string" && (
                <>{dict?.account.quizzesAnswered}</>
              )}
            </span>
          </div>
        </div>
        <div
          className={`bg-gray-50 flex items-center border backdrop-blur-xl border-gray-900/20 dark:border-gray-100/40 text-center rounded-lg px-2 py-10 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
        >
          <div className="flex flex-col mx-auto text-center">
            <span className="text-2xl md:text-4xl">
              <>
                <span className="font-semibold">
                  {tokensEarned ? (
                    <span>{Math.floor(tokensEarned)}</span>
                  ) : (
                    <span className="animate__animated animate__flash animate__slower animate__infinite">
                      0
                    </span>
                  )}
                </span>
              </>
            </span>
            <span>
              {typeof dict?.account !== "string" && (
                <>{dict?.account.totalRewards}</>
              )}
            </span>
          </div>
        </div>
        <div
          className={`bg-gray-50 flex items-center border backdrop-blur-xl border-gray-900/20 dark:border-gray-100/40 text-center rounded-lg px-2 py-10 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
        >
          <div className="flex flex-col mx-auto text-center">
            <span className="text-2xl md:text-4xl">
              <>
                <span className="font-semibold">
                  {totalRewardsPending ? (
                    <span>{Math.floor(totalRewardsPending)}</span>
                  ) : (
                    <span className="animate__animated animate__flash animate__slower animate__infinite">
                      0
                    </span>
                  )}
                </span>
              </>
            </span>
            <span>
              {typeof dict?.account !== "string" && (
                <>{dict?.account.rewardsPending}</>
              )}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
