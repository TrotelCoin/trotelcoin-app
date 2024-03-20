import type { Lang } from "@/types/lang";
import React from "react";
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

const TheAlgorithm = ({ lang }: { lang: Lang }) => {
  return (
    <>
      <div>
        <h2 className="text-gray-900 dark:text-gray-100 font-semibold text-xl">
          {lang === "en" ? "Statistics" : "Statistiques"}
        </h2>
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 mx-auto">
          <Tilt
            glareEnable={true}
            tiltMaxAngleX={5}
            tiltMaxAngleY={5}
            glareMaxOpacity={0.15}
            perspective={800}
          >
            <TrotelCoinsDistributed lang={lang} />
          </Tilt>

          <Tilt
            glareEnable={true}
            tiltMaxAngleX={5}
            tiltMaxAngleY={5}
            glareMaxOpacity={0.15}
            perspective={800}
          >
            <TrotelCoinsPending lang={lang} />
          </Tilt>

          <Tilt
            glareEnable={true}
            tiltMaxAngleX={5}
            tiltMaxAngleY={5}
            glareMaxOpacity={0.15}
            perspective={800}
          >
            <NumberOfQuizzesAnswered lang={lang} />
          </Tilt>

          <Tilt
            glareEnable={true}
            tiltMaxAngleX={5}
            tiltMaxAngleY={5}
            glareMaxOpacity={0.15}
            perspective={800}
          >
            <RemainingRewards lang={lang} />
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
            <MaxStreak lang={lang} />
          </Tilt>

          <Tilt
            glareEnable={true}
            tiltMaxAngleX={5}
            tiltMaxAngleY={5}
            glareMaxOpacity={0.15}
            perspective={800}
          >
            <NumberOfLearners lang={lang} />
          </Tilt>

          <Tilt
            glareEnable={true}
            tiltMaxAngleX={5}
            tiltMaxAngleY={5}
            glareMaxOpacity={0.15}
            perspective={800}
          >
            <Early lang={lang} />
          </Tilt>

          <Tilt
            glareEnable={true}
            tiltMaxAngleX={5}
            tiltMaxAngleY={5}
            glareMaxOpacity={0.15}
            perspective={800}
          >
            <Intermediate lang={lang} />
          </Tilt>

          <Tilt
            glareEnable={true}
            tiltMaxAngleX={5}
            tiltMaxAngleY={5}
            glareMaxOpacity={0.15}
            perspective={800}
          >
            <Expert lang={lang} />
          </Tilt>

          <Tilt
            glareEnable={true}
            tiltMaxAngleX={5}
            tiltMaxAngleY={5}
            glareMaxOpacity={0.15}
            perspective={800}
          >
            <CoursesCount lang={lang} />
          </Tilt>
        </div>
      </div>
    </>
  );
};

export default TheAlgorithm;
