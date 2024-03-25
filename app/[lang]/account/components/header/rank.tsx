import PremiumContext from "@/app/[lang]/contexts/premiumContext";
import type { Lang } from "@/types/lang";
import React, { useContext } from "react";

const Rank = ({ lang }: { lang: Lang }) => {
  const { isNotPremium, isIntermediate, isExpert } = useContext(PremiumContext);

  return (
    <>
      <div
        className={`col-span-2 md:col-span-4 bg-blue-500 flex items-center backdrop-blur-xl text-center rounded-xl px-2 py-16 text-gray-100`}
      >
        <div className="flex flex-col mx-auto text-center">
          <span className={`text-4xl md:text-6xl font-semibold`}>
            {isIntermediate && !isExpert && (
              <>{lang === "en" ? "Intermediate" : "Intermédiaire"}</>
            )}
            {isExpert && <>{lang === "en" ? "Expert" : "Expert"}</>}
            {isNotPremium && <>{lang === "en" ? "Beginner" : "Débutant"}</>}
          </span>
        </div>
      </div>
    </>
  );
};

export default Rank;
