import type { Lang } from "@/types/lang";
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
import { fetcher, refreshIntervalTime } from "@/lib/axios/fetcher";
import {
  StatisticsDataType,
  StatisticsType,
} from "@/types/statistics/statistics";

const TheAlgorithm = ({ lang }: { lang: Lang }) => {
  const [statsMap, setStatsMap] = useState<Map<StatisticsType, number> | null>(
    null
  );

  const { data: evolution } = useSWR("/api/statistics/getStatistics", fetcher, {
    refreshInterval: refreshIntervalTime,
    revalidateIfStale: true,
    revalidateOnMount: true,
    revalidateOnFocus: true,
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
        <h2 className="text-gray-900 dark:text-gray-100 font-semibold text-xl">
          {lang === "en" ? "Statistics" : "Statistiques"}
        </h2>
        <span className="text-gray-700 dark:text-gray-300 text-sm">
          {lang === "en"
            ? "Percentage change is computed weekly."
            : "La variation en pourcentage est calculée hebdomadairement."}
        </span>
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 mx-auto">
          <Tilt
            glareEnable={true}
            tiltMaxAngleX={5}
            tiltMaxAngleY={5}
            glareMaxOpacity={0.15}
            perspective={800}
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
          >
            <CoursesCount
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
