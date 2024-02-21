import React from "react";
import { Lang } from "@/types/types";
import RewardsButton from "@/app/[lang]/wallet/components/rewardsButton";
import AvailableToClaim from "@/app/[lang]/wallet/components/availableToClaim";
import Balance from "@/app/[lang]/wallet/components/balance";

const Claim = ({ lang }: { lang: Lang }) => {
  return (
    <>
      <div className="mt-4 w-full flex flex-col flex-wrap gap-4 bg-gray-50 border backdrop-blur-xl divide-y divide-gray-900/20 dark:divide-gray-100/20 border-gray-900/20 dark:border-gray-100/20 rounded-lg py-4 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        {" "}
        <div className="flex flex-col flex-wrap gap-4 px-4">
          <span className="font-bold text-xl">
            {lang === "en" ? (
              <>Claim your TrotelCoins</>
            ) : (
              <>Récupère tes TrotelCoins</>
            )}
          </span>
          <div>
            <AvailableToClaim lang={lang} />
          </div>
          <div>
            <Balance lang={lang} />
          </div>
          <div>
            <RewardsButton lang={lang} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Claim;
