import { Lang } from "@/types/types";
import React from "react";

const canClaim =
  "inline-flex items-center rounded-xl bg-green-50 dark:bg-green-300/10 px-2 py-1 text-xs font-medium text-green-500 dark:text-green-300 ring-1 ring-inset ring-green-500/20 dark:ring-green-300/40";
const cannotClaim =
  "inline-flex items-center rounded-xl bg-red-50 dark:bg-red-300/10 px-2 py-1 text-xs font-medium text-red-500 dark:text-red-300 ring-1 ring-inset ring-red-500/20 dark:ring-red-300/40";

const Status = ({
  lang,
  availableToClaim,
}: {
  lang: Lang;
  availableToClaim: number;
}) => {
  return (
    <>
      <div className="flex justify-between">
        <span>{lang === "en" ? "Status" : "Statut"}</span>
        <div>
          <span
            className={`${
              (availableToClaim as number) > 0 ? canClaim : cannotClaim
            }`}
          >
            {(availableToClaim as number) > 0 ? "Claimable" : "Not claimable"}
          </span>
        </div>
      </div>
    </>
  );
};

export default Status;
