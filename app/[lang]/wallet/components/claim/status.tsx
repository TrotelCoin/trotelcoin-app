import type { Lang } from "@/types/lang";
import React from "react";

const canClaim =
  "inline-flex items-center rounded-xl bg-green-400 px-2 py-1 text-xs font-medium text-gray-100";
const cannotClaim =
  "inline-flex items-center rounded-xl bg-red-400 px-2 py-1 text-xs font-medium text-gray-100";

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
