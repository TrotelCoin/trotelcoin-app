import trotelCoinEarlyABI from "@/abi/trotelCoinEarly";
import trotelCoinExpertABI from "@/abi/trotelCoinExpert";
import trotelCoinIntermediateABI from "@/abi/trotelCoinIntermediate";
import {
  trotelCoinAddress,
  trotelCoinEarlyAddress,
  trotelCoinExpertAddress,
  trotelCoinIntermediateAddress,
} from "@/data/web3/addresses";
import { DictType, Lang } from "@/types/types";
import { useAddress } from "@thirdweb-dev/react";
import { Address } from "viem";
import { polygon } from "viem/chains";
import { useContractRead, useBalance } from "wagmi";
import BadgesList from "@/app/[lang]/account/components/badges/badgesList";
import { useEffect, useState } from "react";

const BadgesSection = ({ dict, lang }: { dict: DictType; lang: Lang }) => {
  const [maxStreak, setMaxStreak] = useState<number | null>(null);
  const [quizzesAnswered, setQuizzesAnswered] = useState<number | null>(null);
  const [trotelCoinBalance, setTrotelCoinBalance] = useState<number | null>(
    null
  );

  const address = useAddress();

  const balance = useBalance({
    chainId: polygon.id,
    address: address as Address,
    enabled: Boolean(address),
    watch: true,
    token: trotelCoinAddress,
  });

  useEffect(() => {
    if (balance) {
      setTrotelCoinBalance(parseFloat(balance.data?.formatted as string));
    } else {
      setTrotelCoinBalance(0);
    }
  }, [balance]);

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

  useEffect(() => {
    const fetchMaxStreak = async () => {
      const result = await fetch(
        `/api/database/userMaxStreak?wallet=${address}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          cache: "no-store",
        }
      );

      const data = await result.json();
      setMaxStreak(data);
    };

    if (address) {
      fetchMaxStreak();

      const interval = setInterval(fetchMaxStreak, 10000);

      return () => clearInterval(interval);
    } else {
      setMaxStreak(0);
    }
  }, [address]);

  useEffect(() => {
    const fetchQuizzesAnswered = async () => {
      const result = await fetch(
        `/api/database/numberOfQuizzesAnswered?wallet=${address}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          cache: "no-store",
        }
      );
      const data = await result.json();
      setQuizzesAnswered(data);
    };

    if (address) {
      fetchQuizzesAnswered();

      const interval = setInterval(fetchQuizzesAnswered, 10000);

      return () => clearInterval(interval);
    } else {
      setQuizzesAnswered(0);
    }
  }, [address]);

  const badges = [
    {
      id: 1,
      name: typeof dict?.badges !== "string" && dict?.badges.beginner,
      image: "🐣",
      condition: true,
    },
    {
      id: 2,
      name: lang === "en" ? "Intermediate" : "Intermédiaire",
      image: "🙈",
      condition: intermediateBalance > 0,
    },
    {
      id: 3,
      name: lang === "en" ? "Expert" : "Expert",
      image: "🦊",
      condition: expertBalance > 0,
    },
    {
      id: 4,
      name: typeof dict?.badges !== "string" && dict?.badges.early,
      image: "🤫",
      condition: early,
    },
    {
      id: 5,
      name: typeof dict?.badges !== "string" && dict?.badges.tenQuizzes,
      image: "🌱",
      condition: quizzesAnswered && quizzesAnswered >= 10,
    },
    {
      id: 6,
      name: lang === "en" ? "100 quizzes answered" : "100 quiz répondus",
      image: "🌳",
      condition: quizzesAnswered && quizzesAnswered >= 100,
    },
    {
      id: 7,
      name: lang === "en" ? "50 quizzes answered" : "50 quiz répondus",
      image: "🍄",
      condition: quizzesAnswered && quizzesAnswered >= 50,
    },
    {
      id: 8,
      name: lang === "en" ? "500 quizzes answered" : "500 quiz répondus",
      image: "🌴",
      condition: quizzesAnswered && quizzesAnswered >= 500,
    },
    {
      id: 9,
      name: lang === "en" ? "1000 quizzes answered" : "1000 quiz répondus",
      image: "🌴",
      condition: quizzesAnswered && quizzesAnswered >= 1000,
    },
    {
      id: 10,
      name: lang === "en" ? "7 days of streaks" : "7 jours de série",
      image: "🔥",
      condition: maxStreak && maxStreak >= 7,
    },
    {
      id: 11,
      name: lang === "en" ? "30 days of streaks" : "30 jours de série",
      image: "🔥🔥",
      condition: maxStreak && maxStreak >= 30,
    },
    {
      id: 12,
      name: lang === "en" ? "90 days of streaks" : "90 jours de série",
      image: "🔥🔥🔥",
      condition: maxStreak && maxStreak >= 60,
    },
    {
      id: 13,
      name: lang === "en" ? "1 year of streaks" : "1 an de série",
      image: "🦄",
      condition: maxStreak && maxStreak >= 90,
    },
    {
      id: 14,
      name: lang === "en" ? "100 TrotelCoins" : "100 TrotelCoins",
      image: "🤑",
      condition: trotelCoinBalance && trotelCoinBalance >= 100,
    },
    {
      id: 15,
      name: lang === "en" ? "1k TrotelCoins" : "1k TrotelCoins",
      image: "💸",
      condition: trotelCoinBalance && trotelCoinBalance >= 1000,
    },
    {
      id: 16,
      name: lang === "en" ? "10k TrotelCoins" : "10k TrotelCoins",
      image: "💳",
      condition: trotelCoinBalance && trotelCoinBalance >= 10000,
    },
    {
      id: 17,
      name: lang === "en" ? "100k TrotelCoins" : "100k TrotelCoins",
      image: "💰",
      condition: trotelCoinBalance && trotelCoinBalance >= 100000,
    },
    {
      id: 18,
      name: lang === "en" ? "1M TrotelCoins" : "1M TrotelCoins",
      image: "🏦",
      condition: trotelCoinBalance && trotelCoinBalance >= 1000000,
    },
  ];

  return (
    <>
      <h2 className="font-semibold text-gray-900 dark:text-gray-100 text-xl mt-10">
        Badges
      </h2>
      <BadgesList badges={badges} isNotPremium={isNotPremium} dict={dict} />
    </>
  );
};

export default BadgesSection;
