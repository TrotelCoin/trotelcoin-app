import PremiumContext from "@/contexts/premium";
import type { Badges, Badge } from "@/types/components/badges";
import type { Lang } from "@/types/language/lang";
import React, { useContext } from "react";
import Tilt from "react-parallax-tilt";

const BadgesList = ({ badges, lang }: { badges: Badges; lang: Lang }) => {
  const { isNotPremium } = useContext(PremiumContext);

  return (
    <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 mx-auto">
      {badges &&
        badges.map((badge: Badge, index: number) => {
          return (
            <Tilt
              key={index}
              glareEnable={true}
              tiltMaxAngleX={5}
              tiltMaxAngleY={5}
              glareMaxOpacity={0.15}
              perspective={800}
              className="h-full"
            >
              <div
                className={`h-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 flex flex-col items-center justify-center rounded-xl py-10 px-2 text-center border border-gray-900/10 dark:border-gray-100/10
                `}
              >
                <div className="flex w-full gap-4 text-center items-center px-4">
                  <span
                    className={`text-gray-900 dark:text-gray-100 text-4xl ${
                      isNotPremium && "blur hover:blur-none duration-500"
                    }`}
                  >
                    {!isNotPremium && badge.image}
                  </span>
                  <div className="flex flex-col justify-center items-start gap-2 w-full">
                    <span
                      className={`font-semibold ${
                        isNotPremium && "blur hover:blur-none duration-500"
                      }`}
                    >
                      {!isNotPremium && badge.name ? (
                        <>{badge.name}</>
                      ) : (
                        <>{lang === "en" ? "Not premium" : "Non premium"}</>
                      )}
                    </span>
                    <div className="flex gap-2 justify-start items-center w-full">
                      <div
                        className={`overflow-hidden w-full h-2 text-xs bg-gray-400 flex rounded-full ${
                          isNotPremium && "mt-4"
                        }`}
                      >
                        <div
                          style={{
                            width: isNotPremium
                              ? "0%"
                              : `${Math.min(
                                  (badge.progress / badge.maxProgress) * 100,
                                  100
                                )}%`,
                            transition: "width 0.7s ease-in",
                          }}
                          className="rounded-full h-2 bg-blue-500"
                        />
                      </div>
                      <span
                        className={`text-xs ${
                          isNotPremium && "blur hover:blur-none duration-500"
                        }`}
                      >
                        {!isNotPremium &&
                          Math.min(
                            (badge.progress / badge.maxProgress) * 100,
                            100
                          ).toFixed(0)}
                        %
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Tilt>
          );
        })}
    </div>
  );
};

export default BadgesList;
