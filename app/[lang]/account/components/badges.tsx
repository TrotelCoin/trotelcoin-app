import { trotelCoinAddress, trotelCoinStakingV1 } from "@/data/web3/addresses";
import { DictType, Lang } from "@/types/types";
import { useAddress } from "@thirdweb-dev/react";
import { Address } from "viem";
import { polygon } from "viem/chains";
import { useContractRead, useBalance } from "wagmi";
import BadgesList from "@/app/[lang]/account/components/badges/badgesList";
import { useContext, useEffect, useState } from "react";
import trotelCoinStakingV1ABI from "@/abi/trotelCoinStakingV1";
import PremiumContext from "@/app/[lang]/contexts/premiumContext";
import StreakContext from "@/app/[lang]/contexts/streakContext";

const BadgesSection = ({ dict, lang }: { dict: DictType; lang: Lang }) => {
  const [quizzesAnswered, setQuizzesAnswered] = useState<number | null>(null);
  const [trotelCoinBalance, setTrotelCoinBalance] = useState<number | null>(
    null
  );
  const [stakedTrotelCoins, setStakedTrotelCoins] = useState<number | null>(
    null
  );
  const [duration, setDuration] = useState<number | null>(null);

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
      setTrotelCoinBalance(null);
    }
  }, [balance]);

  const { isEarly, intermediateBalance, expertBalance } =
    useContext(PremiumContext);

  const { maxStreak } = useContext(StreakContext);

  useEffect(() => {
    const fetchQuizzesAnswered = async () => {
      const result = await fetch(
        `/api/database/getUserNumberOfQuizzesAnswered?wallet=${address}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-store",
          },
          cache: "no-store",
        }
      );
      const data = await result.json();
      setQuizzesAnswered(data);
    };

    if (address) {
      fetchQuizzesAnswered();
    } else {
      setQuizzesAnswered(null);
    }
  }, [address]);

  const { data: getStakingDataNoTyped } = useContractRead({
    address: trotelCoinStakingV1,
    functionName: "stakings",
    args: [address as Address],
    chainId: polygon.id,
    watch: true,
    enabled: Boolean(address),
    abi: trotelCoinStakingV1ABI,
  });

  const getStakingData = getStakingDataNoTyped as any[];

  useEffect(() => {
    if (getStakingData && address) {
      const balance = parseFloat(getStakingData[0].toString()) * 1e-18;
      const duration = parseFloat(getStakingData[2].toString());
      setStakedTrotelCoins(balance);
      setDuration(duration);
    } else {
      setStakedTrotelCoins(null);
      setDuration(null);
    }
  }, [getStakingData, address]);

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
      condition: intermediateBalance && intermediateBalance > 0,
    },
    {
      id: 3,
      name: lang === "en" ? "Expert" : "Expert",
      image: "🦊",
      condition: expertBalance && expertBalance > 0,
    },
    {
      id: 4,
      name: typeof dict?.badges !== "string" && dict?.badges.early,
      image: "🤫",
      condition: isEarly,
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
    {
      id: 19,
      name:
        lang === "en" ? "100 locked TrotelCoins" : "100 TrotelCoins bloqués",
      image: "🦀",
      condition: stakedTrotelCoins && stakedTrotelCoins >= 100,
    },
    {
      id: 20,
      name: lang === "en" ? "1k locked TrotelCoins" : "1k TrotelCoins bloqués",
      image: "🐠",
      condition: stakedTrotelCoins && stakedTrotelCoins >= 1000,
    },
    {
      id: 21,
      name:
        lang === "en" ? "10k locked TrotelCoins" : "10k TrotelCoins bloqués",
      image: "🐬",
      condition: stakedTrotelCoins && stakedTrotelCoins >= 10000,
    },
    {
      id: 22,
      name:
        lang === "en" ? "100k locked TrotelCoins" : "100k TrotelCoins bloqués",
      image: "🦈",
      condition: stakedTrotelCoins && stakedTrotelCoins >= 100000,
    },
    {
      id: 23,
      name: lang === "en" ? "1M locked TrotelCoins" : "1M TrotelCoins bloqués",
      image: "🐳",
      condition: stakedTrotelCoins && stakedTrotelCoins >= 1000000,
    },
    {
      id: 24,
      name: lang === "en" ? "30 days locked" : "30 jours bloqués",
      image: "😪",
      condition: duration && duration >= 2592000,
    },
    {
      id: 25,
      name: lang === "en" ? "3 months locked" : "3 mois bloqués",
      image: "😴",
      condition: duration && duration >= 7862400,
    },
    {
      id: 26,
      name: lang === "en" ? "6 months locked" : "6 mois bloqués",
      image: "⌛️",
      condition: duration && duration >= 15724800,
    },
    {
      id: 27,
      name: lang === "en" ? "1 year locked" : "1 an bloqué",
      image: "⏳",
      condition: duration && duration >= 31536000,
    },
  ];

  return (
    <>
      <h2 className="font-semibold text-gray-900 dark:text-gray-100 text-xl mt-10">
        Badges
      </h2>
      <BadgesList badges={badges} dict={dict} />
    </>
  );
};

export default BadgesSection;
