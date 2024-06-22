import type { Lang } from "@/types/language/lang";
import React from "react";
import { Skeleton } from "@radix-ui/themes";

const canClaim =
  "inline-flex items-center rounded-xl bg-green-400 px-2 py-1 text-xs font-medium text-gray-100";
const cannotClaim =
  "inline-flex items-center rounded-xl bg-red-400 px-2 py-1 text-xs font-medium text-gray-100";

const Status = ({
  lang,
  availableToClaim,
  isLoading
}: {
  lang: Lang;
  availableToClaim: number | null;
  isLoading: boolean;
}) => {
  return (
    <>
      <div className="flex justify-between">
        <span>{lang === "en" ? "Status" : "Statut"}</span>
        <div>
          <Skeleton loading={isLoading}>
            <span
              className={`${
                availableToClaim && availableToClaim > 0
                  ? canClaim
                  : cannotClaim
              }`}
            >
              {availableToClaim && availableToClaim > 0
                ? "Claimable"
                : "Not claimable"}
            </span>
            {!availableToClaim && (
              <span className="text-xs text-gray-700 dark:text-gray-300">
                {lang === "en" ? "Not claimable" : "Non réclamable"}
              </span>
            )}
          </Skeleton>
        </div>
      </div>
    </>
  );
};

export default Status;
