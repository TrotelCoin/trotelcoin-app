import { DictType } from "@/types/types";
import React from "react";

const BadgesList = ({
  badges,
  isNotPremium,
  dict,
}: {
  badges: Array<any>;
  isNotPremium: boolean;
  dict: DictType;
}) => {
  return (
    <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 mx-auto">
      {badges &&
        badges.map((badge, index) => {
          if (!badge || !badge.condition) {
            return null;
          }

          return (
            <div
              key={index}
              className={`bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 flex flex-col rounded-lg py-10 px-2 text-center border border-gray-900/20 dark:border-gray-100/20`}
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
