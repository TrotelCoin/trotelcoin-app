import PremiumContext from "@/contexts/premium";
import type { Badges, Badge } from "@/types/components/badges";
import type { Lang } from "@/types/language/lang";
import React, { useContext } from "react";
import Tilt from "react-parallax-tilt";

const BadgesList = ({ badges, lang }: { badges: Badges; lang: Lang }) => {
  const { isNotPremium } = useContext(PremiumContext);

  return (
    <div className="mx-auto mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
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
                className={`flex h-full flex-col items-center justify-center rounded-xl border border-gray-900/10 bg-white px-2 py-10 text-center text-gray-900 dark:border-gray-100/10 dark:bg-gray-800 dark:text-gray-100`}
              >
                <div className="flex w-full items-center gap-4 px-4 text-center">
                  <span
                    className={`text-4xl text-gray-900 dark:text-gray-100 ${
                      isNotPremium && "blur duration-500 hover:blur-none"
                    }`}
                  >
                    {!isNotPremium && badge.image}
                  </span>
                  <div className="flex w-full flex-col items-start justify-center gap-2">
                    <span
                      className={`font-semibold ${
                        isNotPremium && "blur duration-500 hover:blur-none"
                      }`}
                    >
                      {!isNotPremium && badge.name ? (
                        <>{badge.name}</>
                      ) : (
                        <>{lang === "en" ? "Not premium" : "Non premium"}</>
                      )}
                    </span>
                    <div className="flex w-full items-center justify-start gap-2">
                      <div
                        className={`flex h-2 w-full overflow-hidden rounded-full bg-gray-400 text-xs ${
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
                            transition: "width 0.7s ease-in"
                          }}
                          className="h-2 rounded-full bg-blue-500"
                        />
                      </div>
                      <span
                        className={`text-xs ${
                          isNotPremium && "blur duration-500 hover:blur-none"
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
