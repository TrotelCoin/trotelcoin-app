import PremiumContext from "@/app/[lang]/contexts/premiumContext";
import { DictType, Badges, Badge } from "@/types/types";
import React, { useContext } from "react";

const BadgesList = ({ badges, dict }: { badges: Badges; dict: DictType }) => {
  const { isNotPremium } = useContext(PremiumContext);

  return (
    <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 mx-auto">
      {badges &&
        badges.map((badge: Badge, index: number) => {
          if (!badge || !badge.condition) {
            return null;
          }

          return (
            <div
              key={index}
              className={`bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 flex flex-col rounded-xl py-10 px-2 text-center border border-gray-900/10 dark:border-gray-100/10`}
            >
              <div className="flex flex-col gap-2 text-center items-center">
                <span
                  className={`text-gray-900 dark:text-gray-100 text-4xl ${
                    isNotPremium && "blur hover:blur-none duration-500"
                  }`}
                >
                  {!isNotPremium && badge.image}
                </span>
                <span
                  className={`text-sm ${
                    isNotPremium && "blur hover:blur-none duration-500"
                  }`}
                >
                  {!isNotPremium && badge.name ? (
                    <>{badge.name}</>
                  ) : typeof dict?.account !== "string" &&
                    typeof dict?.account.notPremium === "string" ? (
                    <>{dict?.account.notPremium}</>
                  ) : (
                    <>Loading...</>
                  )}
                </span>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default BadgesList;
