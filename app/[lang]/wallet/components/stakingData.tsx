import { Lang } from "@/types/types";
import React, { useState } from "react";

const StakingData = ({ lang }: { lang: Lang }) => {
  const [stakedTrotelCoins, setStakedTrotelCoins] = useState<number>(0);
  const [earnedTrotelCoins, setEarnedTrotelCoins] = useState<number>(0);

  return (
    <>
      <div className="flex flex-col flex-wrap gap-2">
        <div className="flex justify-between">
          <span>{lang === "en" ? "Your deposit" : "Ton dépôt"}</span>
          <span className="font-semibold">{stakedTrotelCoins} TROTEL</span>
        </div>
        <div className="flex justify-between">
          <span>
            {lang === "en" ? "Earned rewards" : "Récompenses gagnées"}
          </span>
          <span className="font-semibold">{earnedTrotelCoins} TROTEL</span>
        </div>
        <div className="flex justify-between">
          <span>{lang === "en" ? "Staking period" : "Temps de staking"}</span>
          <span className="font-semibold">{earnedTrotelCoins} time left</span>
        </div>
      </div>
    </>
  );
};

export default StakingData;
