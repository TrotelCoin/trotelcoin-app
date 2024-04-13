import PremiumContext from "@/app/[lang]/contexts/premiumContext";
import type { Lang } from "@/types/lang";
import React, { useContext } from "react";
import { ReactTyped } from "react-typed";

const Rank = ({ lang }: { lang: Lang }) => {
  const { isNotPremium, isIntermediate, isExpert } = useContext(PremiumContext);

  return (
    <>
      <div
        className={`col-span-2 md:col-span-3 bg-blue-500 shadow md:shadow-lg h-full flex items-center justify-center backdrop-blur-xl text-center rounded-xl px-2 py-10 text-gray-100`}
      >
        <div className="flex flex-col mx-auto text-center gap-1">
          <span className={`text-4xl md:text-6xl font-semibold`}>
            {isIntermediate && !isExpert && (
              <>
                <ReactTyped
                  strings={[
                    "Intermediate",
                    "Intermedio",
                    "Intermediário",
                    "Gevorderd",
                    "Промежуточный",
                    "中级",
                    "中級",
                    "중간",
                    "متوسط",
                    "इंटरमीडिएट",
                  ]}
                  shuffle={true}
                  loop={true}
                  cursorChar="."
                  typeSpeed={50}
                  backSpeed={25}
                  startWhenVisible={true}
                />
              </>
            )}
            {isExpert && (
              <>
                <ReactTyped
                  strings={[
                    "Expert",
                    "Esperto",
                    "Especialista",
                    "Deskundige",
                    "Эксперт",
                    "专家",
                    "専門家",
                    "전문가",
                    "خبير",
                    "विशेषज्ञ",
                  ]}
                  shuffle={true}
                  loop={true}
                  cursorChar="."
                  typeSpeed={50}
                  backSpeed={25}
                  startWhenVisible={true}
                />
              </>
            )}
            {isNotPremium && <>{lang === "en" ? "Beginner" : "Débutant"}</>}
          </span>
          <span>{lang === "en" ? "Rank" : "Rang"}</span>
        </div>
      </div>
    </>
  );
};

export default Rank;
