import { trotelCoinAddress, trotelCoinStakingV1 } from "@/data/web3/addresses";
import type { Badge, Badges, BadgesNames } from "@/types/components/badges";
import type { Lang } from "@/types/lang";
import { Address, formatEther } from "viem";
import { polygon } from "viem/chains";
import { useReadContract, useBalance, useAccount, useBlockNumber } from "wagmi";
import BadgesList from "@/app/[lang]/account/components/badges/badgesList";
import { useContext, useEffect, useState } from "react";
import trotelCoinStakingV1ABI from "@/abi/trotelCoinStakingV1";
import PremiumContext from "@/app/[lang]/contexts/premiumContext";
import StreakContext from "@/app/[lang]/contexts/streakContext";
import UserContext from "@/app/[lang]/contexts/userContext";

const BadgesSection = ({ lang }: { lang: Lang }) => {
  const [trotelCoinBalance, setTrotelCoinBalance] = useState<number | null>(
    null
  );
  const [stakedTrotelCoins, setStakedTrotelCoins] = useState<number | null>(
    null
  );
  const [duration, setDuration] = useState<number | null>(null);
  const [badgesName, setBadgesName] = useState<BadgesNames>("ranks");

  const { address } = useAccount();
  const { averageMark, learningTime } = useContext(UserContext);

  const { data: blockNumber } = useBlockNumber({
    watch: true,
    chainId: polygon.id,
  });

  const { data: balance, refetch: refetchBalance } = useBalance({
    chainId: polygon.id,
    address: address as Address,
    token: trotelCoinAddress,
  });

  useEffect(() => {
    refetchBalance();
  }, [blockNumber, address]);

  useEffect(() => {
    if (balance) {
      setTrotelCoinBalance(parseFloat(balance.formatted));
    } else {
      setTrotelCoinBalance(null);
    }
  }, [balance]);

  const { isEarly, isIntermediate, isExpert } = useContext(PremiumContext);

  const { maxStreak } = useContext(StreakContext);
  const { userNumberOfQuizzesAnswered: quizzesAnswered } =
    useContext(UserContext);

  const { data: getStakingDataNoTyped, refetch: refetchStakings } =
    useReadContract({
      address: trotelCoinStakingV1,
      functionName: "stakings",
      args: [address as Address],
      chainId: polygon.id,
      abi: trotelCoinStakingV1ABI,
    });

  useEffect(() => {
    refetchStakings();
  }, [blockNumber, address]);

  useEffect(() => {
    if (getStakingDataNoTyped && address) {
      const getStakingData = getStakingDataNoTyped as any[];
      const balance = Number(formatEther(getStakingData[0]));
      const duration = parseFloat(String(getStakingData[2]));
      setStakedTrotelCoins(balance);
      setDuration(duration);
    } else {
      setStakedTrotelCoins(null);
      setDuration(null);
    }
  }, [getStakingDataNoTyped, address]);

  const badgesRanks: Badges = [
    {
      id: 1,
      name: lang === "en" ? "Beginner" : "Débutant",
      image: "🐣",
      condition: true,
      progress: 1,
      maxProgress: 1,
    },
    {
      id: 2,
      name: lang === "en" ? "Intermediate" : "Intermédiaire",
      image: "🙈",
      condition: isIntermediate,
      progress: isIntermediate ? 1 : 0,
      maxProgress: 1,
    },
    {
      id: 3,
      name: lang === "en" ? "Expert" : "Expert",
      image: "🦊",
      condition: isExpert,
      progress: isExpert ? 1 : 0,
      maxProgress: 1,
    },
    {
      id: 4,
      name: lang === "en" ? "Early access" : "Accès anticipé",
      image: "🤫",
      condition: isEarly,
      progress: isEarly ? 1 : 0,
      maxProgress: 1,
    },
  ];

  const badgesQuizzes: Badges = [
    {
      id: 1,
      name: lang === "en" ? "10 quizzes answered" : "10 quiz répondus",
      image: "🌱",
      condition: quizzesAnswered ? quizzesAnswered >= 10 : null,
      progress: quizzesAnswered ?? 0,
      maxProgress: 10,
    },
    {
      id: 2,
      name: lang === "en" ? "50 quizzes answered" : "50 quiz répondus",
      image: "🍄",
      condition: quizzesAnswered ? quizzesAnswered >= 50 : null,
      progress: quizzesAnswered ?? 0,
      maxProgress: 50,
    },
    {
      id: 3,
      name: lang === "en" ? "100 quizzes answered" : "100 quiz répondus",
      image: "🌳",
      condition: quizzesAnswered ? quizzesAnswered >= 100 : null,
      progress: quizzesAnswered ?? 0,
      maxProgress: 100,
    },
    {
      id: 4,
      name: lang === "en" ? "500 quizzes answered" : "500 quiz répondus",
      image: "🌴",
      condition: quizzesAnswered ? quizzesAnswered >= 500 : null,
      progress: quizzesAnswered ?? 0,
      maxProgress: 500,
    },
    {
      id: 5,
      name: lang === "en" ? "1000 quizzes answered" : "1000 quiz répondus",
      image: "🌴",
      condition: quizzesAnswered ? quizzesAnswered >= 1000 : null,
      progress: quizzesAnswered ?? 0,
      maxProgress: 1000,
    },
  ];

  const badgesStreaks: Badges = [
    {
      id: 1,
      name: lang === "en" ? "7 days of streaks" : "7 jours de série",
      image: "🔥",
      condition: maxStreak ? maxStreak >= 7 : null,
      progress: maxStreak ?? 0,
      maxProgress: 7,
    },
    {
      id: 2,
      name: lang === "en" ? "30 days of streaks" : "30 jours de série",
      image: "🔥",
      condition: maxStreak ? maxStreak >= 30 : null,
      progress: maxStreak ?? 0,
      maxProgress: 30,
    },
    {
      id: 3,
      name: lang === "en" ? "90 days of streaks" : "90 jours de série",
      image: "🔥",
      condition: maxStreak ? maxStreak >= 60 : null,
      progress: maxStreak ?? 0,
      maxProgress: 90,
    },
    {
      id: 4,
      name: lang === "en" ? "1 year of streaks" : "1 an de série",
      image: "🦄",
      condition: maxStreak ? maxStreak >= 365 : null,
      progress: maxStreak ?? 0,
      maxProgress: 365,
    },
  ];

  const badgesTrotelCoins: Badges = [
    {
      id: 1,
      name: lang === "en" ? "100 TrotelCoins" : "100 TrotelCoins",
      image: "🤑",
      condition: trotelCoinBalance ? trotelCoinBalance >= 100 : null,
      progress: trotelCoinBalance ?? 0,
      maxProgress: 100,
    },
    {
      id: 2,
      name: lang === "en" ? "1k TrotelCoins" : "1k TrotelCoins",
      image: "💸",
      condition: trotelCoinBalance ? trotelCoinBalance >= 1000 : null,
      progress: trotelCoinBalance ?? 0,
      maxProgress: 1000,
    },
    {
      id: 3,
      name: lang === "en" ? "10k TrotelCoins" : "10k TrotelCoins",
      image: "💳",
      condition: trotelCoinBalance ? trotelCoinBalance >= 10000 : null,
      progress: trotelCoinBalance ?? 0,
      maxProgress: 10000,
    },
    {
      id: 4,
      name: lang === "en" ? "100k TrotelCoins" : "100k TrotelCoins",
      image: "💰",
      condition: trotelCoinBalance ? trotelCoinBalance >= 100000 : null,
      progress: trotelCoinBalance ?? 0,
      maxProgress: 100000,
    },
    {
      id: 5,
      name: lang === "en" ? "1M TrotelCoins" : "1M TrotelCoins",
      image: "🏦",
      condition: trotelCoinBalance ? trotelCoinBalance >= 1000000 : null,
      progress: trotelCoinBalance ?? 0,
      maxProgress: 1000000,
    },
  ];

  const badgesStaking: Badges = [
    {
      id: 1,
      name:
        lang === "en" ? "100 locked TrotelCoins" : "100 TrotelCoins bloqués",
      image: "🦀",
      condition: stakedTrotelCoins ? stakedTrotelCoins >= 100 : null,
      progress: stakedTrotelCoins ?? 0,
      maxProgress: 100,
    },
    {
      id: 2,
      name: lang === "en" ? "1k locked TrotelCoins" : "1k TrotelCoins bloqués",
      image: "🐠",
      condition: stakedTrotelCoins ? stakedTrotelCoins >= 1000 : null,
      progress: stakedTrotelCoins ?? 0,
      maxProgress: 1000,
    },
    {
      id: 3,
      name:
        lang === "en" ? "10k locked TrotelCoins" : "10k TrotelCoins bloqués",
      image: "🐬",
      condition: stakedTrotelCoins ? stakedTrotelCoins >= 10000 : null,
      progress: stakedTrotelCoins ?? 0,
      maxProgress: 10000,
    },
    {
      id: 4,
      name:
        lang === "en" ? "100k locked TrotelCoins" : "100k TrotelCoins bloqués",
      image: "🦈",
      condition: stakedTrotelCoins ? stakedTrotelCoins >= 100000 : null,
      progress: stakedTrotelCoins ?? 0,
      maxProgress: 100000,
    },
    {
      id: 5,
      name: lang === "en" ? "1M locked TrotelCoins" : "1M TrotelCoins bloqués",
      image: "🐳",
      condition: stakedTrotelCoins ? stakedTrotelCoins >= 1000000 : null,
      progress: stakedTrotelCoins ?? 0,
      maxProgress: 1000000,
    },
  ];

  const badgesStakingDuration: Badges = [
    {
      id: 1,
      name: lang === "en" ? "30 days locked" : "30 jours bloqués",
      image: "😪",
      condition: duration ? duration >= 2592000 : null,
      progress: duration ?? 0,
      maxProgress: 2592000,
    },
    {
      id: 2,
      name: lang === "en" ? "3 months locked" : "3 mois bloqués",
      image: "😴",
      condition: duration ? duration >= 7862400 : null,
      progress: duration ?? 0,
      maxProgress: 7862400,
    },
    {
      id: 3,
      name: lang === "en" ? "6 months locked" : "6 mois bloqués",
      image: "⌛️",
      condition: duration ? duration >= 15724800 : null,
      progress: duration ?? 0,
      maxProgress: 15724800,
    },
    {
      id: 4,
      name: lang === "en" ? "1 year locked" : "1 an bloqué",
      image: "⏳",
      condition: duration ? duration >= 31536000 : null,
      progress: duration ?? 0,
      maxProgress: 31536000,
    },
  ];

  const badgesMarks: Badges = [
    {
      id: 1,
      name: lang === "en" ? "5/20 min." : "5/20 min.",
      image: "🫠",
      condition: averageMark ? averageMark >= 5 : null,
      progress: averageMark ?? 0,
      maxProgress: 5,
    },
    {
      id: 2,
      name: lang === "en" ? "10/20 min." : "10/20 min.",
      image: "😣",
      condition: averageMark ? averageMark >= 10 : null,
      progress: averageMark ?? 0,
      maxProgress: 10,
    },
    {
      id: 3,
      name: lang === "en" ? "15/20 min." : "15/20 min.",
      image: "🫨",
      condition: averageMark ? averageMark >= 15 : null,
      progress: averageMark ?? 0,
      maxProgress: 15,
    },
    {
      id: 4,
      name: lang === "en" ? "18/20 min." : "18/20 min.",
      image: "🫡",
      condition: averageMark ? averageMark >= 18 : null,
      progress: averageMark ?? 0,
      maxProgress: 18,
    },
    {
      id: 5,
      name: lang === "en" ? "20/20 min." : "20/20 min.",
      image: "🤓",
      condition: averageMark ? averageMark >= 20 : null,
      progress: averageMark ?? 0,
      maxProgress: 20,
    },
  ];

  const badgesLearningTime: Badges = [
    {
      id: 1,
      name: lang === "en" ? "1 hour" : "1 heure",
      image: "⌛️",
      condition: learningTime ? learningTime >= 3600000 : null,
      progress: learningTime ?? 0,
      maxProgress: 3600000,
    },
    {
      id: 2,
      name: lang === "en" ? "1 day" : "1 jour",
      image: "⏳",
      condition: learningTime ? learningTime >= 86400000 : null,
      progress: learningTime ?? 0,
      maxProgress: 86400000,
    },
    {
      id: 3,
      name: lang === "en" ? "1 week" : "1 semaine",
      image: "🕰️",
      condition: learningTime ? learningTime >= 604800000 : null,
      progress: learningTime ?? 0,
      maxProgress: 604800000,
    },
    {
      id: 4,
      name: lang === "en" ? "1 month" : "1 mois",
      image: "⌚️",
      condition: learningTime ? learningTime >= 2629746000 : null,
      progress: learningTime ?? 0,
      maxProgress: 2629746000,
    },
  ];

  const [badges, setBadges] = useState<Badge[]>(badgesRanks);

  return (
    <>
      <h2 className="font-semibold text-gray-900 dark:text-gray-100 text-xl mt-10">
        {lang === "en" ? "Badges" : "Badges"}
      </h2>
      <div className="flex items-center flex-wrap gap-2 mt-2">
        <button
          onClick={() => {
            setBadges(badgesRanks);
            setBadgesName("ranks");
          }}
          className={`${
            badgesName === "ranks"
              ? "bg-gray-900 hover:bg-gray-900 dark:bg-gray-50 dark:hover:bg-gray-50 text-gray-300 dark:text-gray-700"
              : "bg-gray-100 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300"
          } inline-flex items-center rounded-xl px-2 py-1 text-xs font-medium ring-1 ring-inset ring-gray-500/10`}
        >
          {lang === "en" ? "Ranks" : "Rangs"}
        </button>
        <button
          onClick={() => {
            setBadges(badgesQuizzes);
            setBadgesName("quizzes");
          }}
          className={`${
            badgesName === "quizzes"
              ? "bg-gray-900 hover:bg-gray-900 dark:bg-gray-50 dark:hover:bg-gray-50 text-gray-300 dark:text-gray-700"
              : "bg-gray-100 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300"
          } inline-flex items-center rounded-xl px-2 py-1 text-xs font-medium ring-1 ring-inset ring-gray-500/10`}
        >
          {lang === "en" ? "Quizzes" : "Quiz"}
        </button>
        <button
          onClick={() => {
            setBadges(badgesStreaks);
            setBadgesName("streaks");
          }}
          className={`${
            badgesName === "streaks"
              ? "bg-gray-900 hover:bg-gray-900 dark:bg-gray-50 dark:hover:bg-gray-50 text-gray-300 dark:text-gray-700"
              : "bg-gray-100 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300"
          } inline-flex items-center rounded-xl px-2 py-1 text-xs font-medium ring-1 ring-inset ring-gray-500/10`}
        >
          {lang === "en" ? "Streaks" : "Séries"}
        </button>
        <button
          onClick={() => {
            setBadges(badgesTrotelCoins);
            setBadgesName("trotelCoins");
          }}
          className={`${
            badgesName === "trotelCoins"
              ? "bg-gray-900 hover:bg-gray-900 dark:bg-gray-50 dark:hover:bg-gray-50 text-gray-300 dark:text-gray-700"
              : "bg-gray-100 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300"
          } inline-flex items-center rounded-xl px-2 py-1 text-xs font-medium ring-1 ring-inset ring-gray-500/10`}
        >
          {lang === "en" ? "Balance" : "Solde"}
        </button>
        <button
          onClick={() => {
            setBadges(badgesStaking);
            setBadgesName("staking");
          }}
          className={`${
            badgesName === "staking"
              ? "bg-gray-900 hover:bg-gray-900 dark:bg-gray-50 dark:hover:bg-gray-50 text-gray-300 dark:text-gray-700"
              : "bg-gray-100 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300"
          } inline-flex items-center rounded-xl px-2 py-1 text-xs font-medium ring-1 ring-inset ring-gray-500/10`}
        >
          {lang === "en" ? "Staking" : "Staking"}
        </button>
        <button
          onClick={() => {
            setBadges(badgesStakingDuration);
            setBadgesName("stakingDuration");
          }}
          className={`${
            badgesName === "stakingDuration"
              ? "bg-gray-900 hover:bg-gray-900 dark:bg-gray-50 dark:hover:bg-gray-50 text-gray-300 dark:text-gray-700"
              : "bg-gray-100 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300"
          } inline-flex items-center rounded-xl px-2 py-1 text-xs font-medium ring-1 ring-inset ring-gray-500/10`}
        >
          {lang === "en" ? "Staking duration" : "Durée de staking"}
        </button>
        <button
          onClick={() => {
            setBadges(badgesMarks);
            setBadgesName("marks");
          }}
          className={`${
            badgesName === "marks"
              ? "bg-gray-900 hover:bg-gray-900 dark:bg-gray-50 dark:hover:bg-gray-50 text-gray-300 dark:text-gray-700"
              : "bg-gray-100 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300"
          } inline-flex items-center rounded-xl px-2 py-1 text-xs font-medium ring-1 ring-inset ring-gray-500/10`}
        >
          {lang === "en" ? "Marks" : "Marks"}
        </button>
        <button
          onClick={() => {
            setBadges(badgesLearningTime);
            setBadgesName("learningTime");
          }}
          className={`${
            badgesName === "learningTime"
              ? "bg-gray-900 hover:bg-gray-900 dark:bg-gray-50 dark:hover:bg-gray-50 text-gray-300 dark:text-gray-700"
              : "bg-gray-100 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300"
          } inline-flex items-center rounded-xl px-2 py-1 text-xs font-medium ring-1 ring-inset ring-gray-500/10`}
        >
          {lang === "en" ? "Learning time" : "Learning time"}
        </button>
      </div>
      <BadgesList badges={badges} lang={lang} />
    </>
  );
};

export default BadgesSection;
