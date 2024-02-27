import PremiumContext from "@/app/[lang]/contexts/premiumContext";
import { DictType } from "@/types/types";
import React, { useContext } from "react";

const Rank = ({ dict }: { dict: DictType }) => {
  const { isNotPremium, intermediateBalance, expertBalance } =
    useContext(PremiumContext);

  return (
    <>
      <div
        className={`${
          !isNotPremium && "rainbow-border"
        } col-span-2 md:col-span-4 bg-gray-100 flex items-center border backdrop-blur-xl border-gray-900/20 dark:border-gray-100/20 text-center rounded-lg px-2 py-10 dark:bg-gray-800 text-gray-900 dark:text-gray-100`}
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
              <>{typeof dict?.tier !== "string" && <>{dict?.tier.expert}</>}</>
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
    </>
  );
};

export default Rank;
