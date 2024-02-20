import { DictType } from "@/types/types";
import React, { useEffect, useState } from "react";
import TrotelCoinsDistributed from "@/app/[lang]/statistics/components/trotelCoinsDistributed";
import TrotelCoinsPending from "@/app/[lang]/statistics/components/trotelCoinsPending";
import NumberOfQuizzesAnswered from "@/app/[lang]/statistics/components/numberOfQuizzesAnswered";
import RemainingRewards from "@/app/[lang]/statistics/components/remainingRewards";
import EstimatedRewards from "@/app/[lang]/statistics/components/estimatedRewards";
import MaxStreak from "@/app/[lang]/statistics/components/maxStreak";
import NumberOfLearners from "@/app/[lang]/statistics/components/numberOfLearners";

const TheAlgorithm = ({ dict }: { dict: DictType }) => {
  return (
    <>
      <div>
        <h2 className="text-gray-900 dark:text-gray-100 font-semibold text-xl">
          {typeof dict?.algorithm !== "string" && <>{dict?.algorithm.title}</>}
        </h2>
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 mx-auto">
          <TrotelCoinsDistributed dict={dict as DictType} />

          <TrotelCoinsPending dict={dict as DictType} />

          <NumberOfQuizzesAnswered dict={dict as DictType} />

          <RemainingRewards dict={dict as DictType} />

          <EstimatedRewards dict={dict as DictType} />

          <MaxStreak dict={dict as DictType} />

          <NumberOfLearners dict={dict as DictType} />
        </div>
      </div>
    </>
  );
};

export default TheAlgorithm;
