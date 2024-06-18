import PremiumContext from "@/contexts/premium";
import type { Lang } from "@/types/language/lang";
import React, { useContext } from "react";
import { ReactTyped } from "react-typed";

const Rank = ({ lang }: { lang: Lang }) => {
  const { isNotPremium, isIntermediate, isExpert } = useContext(PremiumContext);

  return (
    <>
      <div
        className={`col-span-2 flex h-full items-center justify-center rounded-xl bg-blue-500 px-2 py-10 text-center text-gray-100 shadow backdrop-blur-xl md:col-span-3 md:shadow-lg`}
      >
        <div className="mx-auto flex flex-col gap-1 text-center">
          <span className={`text-4xl font-semibold md:text-6xl`}>
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
                    "इंटरमीडिएट"
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
                    "विशेषज्ञ"
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
