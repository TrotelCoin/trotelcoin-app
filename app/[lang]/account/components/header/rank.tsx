import PremiumContext from "@/app/[lang]/contexts/premiumContext";
import { Lang } from "@/types/types";
import React, { useContext } from "react";

const Rank = ({ lang }: { lang: Lang }) => {
  const { isNotPremium, isIntermediate, isExpert } = useContext(PremiumContext);

  return (
    <>
      <div
        className={`${
          !isNotPremium && "rainbow-border"
        } col-span-2 md:col-span-4 bg-gray-100 flex items-center border backdrop-blur-xl border-gray-900/10 dark:border-gray-100/10 text-center rounded-xl px-2 py-10 dark:bg-gray-800 text-gray-900 dark:text-gray-100`}
      >
        <div className="flex flex-col mx-auto text-center">
          <span
            className={`text-4xl md:text-6xl font-semibold ${
              !isNotPremium && "rainbow-text"
            }`}
          >
            {isIntermediate && !isExpert && (
              <>{lang === "en" ? "Intermediate" : "Intermédiaire"}</>
            )}
            {isExpert && <>{lang === "en" ? "Expert" : "Expert"}</>}
            {isNotPremium && <>{lang === "en" ? "Beginner" : "Débutant"}</>}
          </span>{" "}
          <span>{lang === "en" ? "Rank" : "Rang"}</span>
        </div>
      </div>
    </>
  );
};

export default Rank;
