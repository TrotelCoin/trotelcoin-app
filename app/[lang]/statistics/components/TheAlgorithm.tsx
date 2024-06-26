import type { Lang } from "@/types/language/lang";
import React, { useEffect, useState } from "react";
import TrotelCoinsDistributed from "@/app/[lang]/statistics/components/statistics/trotelCoinsDistributed";
import TrotelCoinsPending from "@/app/[lang]/statistics/components/statistics/trotelCoinsPending";
import NumberOfQuizzesAnswered from "@/app/[lang]/statistics/components/statistics/numberOfQuizzesAnswered";
import RemainingRewards from "@/app/[lang]/statistics/components/statistics/remainingRewards";
import EstimatedRewards from "@/app/[lang]/statistics/components/statistics/estimatedRewards";
import MaxStreak from "@/app/[lang]/statistics/components/statistics/maxStreak";
import NumberOfLearners from "@/app/[lang]/statistics/components/statistics/numberOfLearners";
import Expert from "@/app/[lang]/statistics/components/statistics/expert";
import Intermediate from "@/app/[lang]/statistics/components/statistics/intermediate";
import Early from "@/app/[lang]/statistics/components/statistics/early";
import CoursesCount from "@/app/[lang]/statistics/components/statistics/coursesCount";
import Tilt from "react-parallax-tilt";
import useSWR from "swr";
import { fetcher, refreshIntervalTime } from "@/utils/axios/fetcher";
import {
  StatisticsDataType,
  StatisticsType
} from "@/types/statistics/statistics";
import NetPromoterScore from "@/app/[lang]/statistics/components/statistics/netPromoterScore";
import AverageMark from "@/app/[lang]/statistics/components/statistics/averageMark";
import TotalLearningTime from "@/app/[lang]/statistics/components/statistics/totalLearningTime";

const TheAlgorithm = ({ lang }: { lang: Lang }) => {
  const [statsMap, setStatsMap] = useState<Map<StatisticsType, number> | null>(
    null
  );

  const { data: evolution } = useSWR("/api/statistics", fetcher, {
    refreshInterval: refreshIntervalTime,
    revalidateIfStale: true,
    revalidateOnMount: true,
    revalidateOnFocus: true
  });

  useEffect(() => {
    if (evolution) {
      const statistics: StatisticsDataType[] = evolution;
      const statisticsMap: Map<StatisticsType, number> = new Map();

      statistics.forEach((statistics) => {
        statisticsMap.set(
          statistics.statistics as StatisticsType,
          statistics.statistics_number
        );
      });

      setStatsMap(statisticsMap);
    }
  }, [evolution]);

  return (
    <>
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          {lang === "en" ? "Statistics" : "Statistiques"}
        </h2>
        <span className="text-sm text-gray-700 dark:text-gray-300">
          {lang === "en"
            ? "Percentage change is computed weekly."
            : "La variation en pourcentage est calculée hebdomadairement."}
        </span>
        <div className="mx-auto mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
          <Tilt
            glareEnable={true}
            tiltMaxAngleX={5}
            tiltMaxAngleY={5}
            glareMaxOpacity={0.15}
            perspective={800}
            className="h-full"
          >
            <TrotelCoinsDistributed
              lang={lang}
              statsMap={statsMap as unknown as Map<StatisticsType, number>}
            />
          </Tilt>

          <Tilt
            glareEnable={true}
            tiltMaxAngleX={5}
            tiltMaxAngleY={5}
            glareMaxOpacity={0.15}
            perspective={800}
            className="h-full"
          >
            <TrotelCoinsPending
              lang={lang}
              statsMap={statsMap as unknown as Map<StatisticsType, number>}
            />
          </Tilt>

          <Tilt
            glareEnable={true}
            tiltMaxAngleX={5}
            tiltMaxAngleY={5}
            glareMaxOpacity={0.15}
            perspective={800}
            className="h-full"
          >
            <NumberOfQuizzesAnswered
              lang={lang}
              statsMap={statsMap as unknown as Map<StatisticsType, number>}
            />
          </Tilt>

          <Tilt
            glareEnable={true}
            tiltMaxAngleX={5}
            tiltMaxAngleY={5}
            glareMaxOpacity={0.15}
            perspective={800}
            className="h-full"
          >
            <RemainingRewards
              lang={lang}
              statsMap={statsMap as unknown as Map<StatisticsType, number>}
            />
          </Tilt>

          <Tilt
            glareEnable={true}
            tiltMaxAngleX={5}
            tiltMaxAngleY={5}
            glareMaxOpacity={0.15}
            perspective={800}
            className="h-full"
          >
            <EstimatedRewards lang={lang} />
          </Tilt>

          <Tilt
            glareEnable={true}
            tiltMaxAngleX={5}
            tiltMaxAngleY={5}
            glareMaxOpacity={0.15}
            perspective={800}
          >
            <MaxStreak
              lang={lang}
              statsMap={statsMap as unknown as Map<StatisticsType, number>}
            />
          </Tilt>

          <Tilt
            glareEnable={true}
            tiltMaxAngleX={5}
            tiltMaxAngleY={5}
            glareMaxOpacity={0.15}
            perspective={800}
            className="h-full"
          >
            <NumberOfLearners
              lang={lang}
              statsMap={statsMap as unknown as Map<StatisticsType, number>}
            />
          </Tilt>

          <Tilt
            glareEnable={true}
            tiltMaxAngleX={5}
            tiltMaxAngleY={5}
            glareMaxOpacity={0.15}
            perspective={800}
            className="h-full"
          >
            <Early
              lang={lang}
              statsMap={statsMap as unknown as Map<StatisticsType, number>}
            />
          </Tilt>

          <Tilt
            glareEnable={true}
            tiltMaxAngleX={5}
            tiltMaxAngleY={5}
            glareMaxOpacity={0.15}
            perspective={800}
            className="h-full"
          >
            <Intermediate
              lang={lang}
              statsMap={statsMap as unknown as Map<StatisticsType, number>}
            />
          </Tilt>

          <Tilt
            glareEnable={true}
            tiltMaxAngleX={5}
            tiltMaxAngleY={5}
            glareMaxOpacity={0.15}
            perspective={800}
            className="h-full"
          >
            <Expert
              lang={lang}
              statsMap={statsMap as unknown as Map<StatisticsType, number>}
            />
          </Tilt>

          <Tilt
            glareEnable={true}
            tiltMaxAngleX={5}
            tiltMaxAngleY={5}
            glareMaxOpacity={0.15}
            perspective={800}
            className="h-full"
          >
            <CoursesCount
              lang={lang}
              statsMap={statsMap as unknown as Map<StatisticsType, number>}
            />
          </Tilt>

          <Tilt
            glareEnable={true}
            tiltMaxAngleX={5}
            tiltMaxAngleY={5}
            glareMaxOpacity={0.15}
            perspective={800}
            className="h-full"
          >
            <NetPromoterScore
              lang={lang}
              statsMap={statsMap as unknown as Map<StatisticsType, number>}
            />
          </Tilt>

          <Tilt
            glareEnable={true}
            tiltMaxAngleX={5}
            tiltMaxAngleY={5}
            glareMaxOpacity={0.15}
            perspective={800}
            className="h-full"
          >
            <AverageMark
              lang={lang}
              statsMap={statsMap as unknown as Map<StatisticsType, number>}
            />
          </Tilt>

          <Tilt
            glareEnable={true}
            tiltMaxAngleX={5}
            tiltMaxAngleY={5}
            glareMaxOpacity={0.15}
            perspective={800}
            className="h-full"
          >
            <TotalLearningTime
              lang={lang}
              statsMap={statsMap as unknown as Map<StatisticsType, number>}
            />
          </Tilt>
        </div>
      </div>
    </>
  );
};

export default TheAlgorithm;
