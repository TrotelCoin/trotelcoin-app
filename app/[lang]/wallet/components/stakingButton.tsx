import { Lang } from "@/types/types";
import React from "react";
import { Web3Button } from "@thirdweb-dev/react";
import { trotelCoinStaking } from "@/data/web3/addresses";

const StakingButton = ({ lang }: { lang: Lang }) => {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <Web3Button
          contractAddress={trotelCoinStaking}
          action={() => null}
          className="!bg-blue-500 !hover:bg-blue-400 !dark:bg-blue-300 !dark:hover:bg-blue-400 !hover:border-gray-900/50 !dark:hover:border-gray-100/50 !focus:border-blue-500 !dark:focus:border-blue-300 !text-sm !px-6 !py-2 !text-gray-100 !dark:text-gray-900 !rounded-lg !font-semibold"
          style={{}}
        >
          {lang === "en" ? "Stake" : "Staker"}
        </Web3Button>
        <Web3Button
          contractAddress={trotelCoinStaking}
          action={() => null}
          className="!bg-blue-500 !hover:bg-blue-400 !dark:bg-blue-300 !dark:hover:bg-blue-400 !hover:border-gray-900/50 !dark:hover:border-gray-100/50 !focus:border-blue-500 !dark:focus:border-blue-300 !text-sm !px-6 !py-2 !text-gray-100 !dark:text-gray-900 !rounded-lg !font-semibold"
          style={{}}
        >
          {lang === "en" ? "Claim" : "Réclamer"}
        </Web3Button>
      </div>
    </>
  );
};

export default StakingButton;
