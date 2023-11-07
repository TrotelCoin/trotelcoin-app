import React from "react";
import ComingSoon from "@/app/ui/interface/comingSoon";
import { useAccount } from "wagmi";

export default function Governance() {
  const { address, isConnected } = useAccount();

  return (
    <>
      <h1 className="flex text-2xl text-gray-900 dark:text-gray-100">
        <span>
          Stake <span className="font-semibold">TrotelCoin.</span> Get{" "}
          <span className="font-semibold">GovTrotelCoin.</span>
        </span>
      </h1>
      <h2 className="font-semibold mt-10 text-gray-900 dark:text-gray-100">
        Stake
      </h2>
      <div className="flex mt-4 items-center gap-x-4">
        <input className="px-4 py-2 rounded-lg" placeholder="Amount"></input>
        <button className="flex border border-gray-900/10 dark:border-gray-100/10 bg-gray-50 dark:bg-gray-900 hover:shadow hover:border-gray-900/50 dark:hover:border-gray-100/50 focus:shadow-none focus:border-blue-600 dark:focus:border-blue-200 dark:hover-bg-blue-50 text-sm px-6 py-2 text-gray-900 dark:text-gray-100 rounded-lg font-semibold">
          Stake
        </button>
        {!isConnected && (
          <span className="mt-6 animate__animated animate__fadeIn text-red-600 dark:text-red-200">
            Connect your wallet first!
          </span>
        )}
      </div>
      <h2 className="font-semibold mt-10 text-gray-900 dark:text-gray-100">
        Staking dashboard
      </h2>
      <div className="flex flex-wrap mt-4 items-center gap-4 w-full md:w-9/12">
        <div className="flex w-full md:w-1/4 flex-col items-center justify-center gap-1 p-2 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-900/10 dark:border-gray-100/10 hover:border-gray-900/50 dark:hover:border-gray-100/10 hover:shadow">
          <h2 className="font-semibold text-6xl text-blue-600 dark:text-blue-200">
            0
          </h2>
          <p className="text-center text-xs md:text-sm text-gray-900 dark:text-gray-100">
            TrotelCoin
          </p>
        </div>
        <div className="flex w-full md:w-1/4 flex-col items-center justify-center gap-1 p-2 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-900/10 dark:border-gray-100/10 hover:border-gray-900/50 dark:hover:border-gray-100/10 hover:shadow">
          <h2 className="font-semibold text-6xl text-blue-600 dark:text-blue-200">
            0
          </h2>
          <p className="text-center text-xs md:text-sm text-gray-900 dark:text-gray-100">
            GovTrotelCoin
          </p>
        </div>
        <div className="flex w-full md:w-1/4 flex-col items-center justify-center gap-1 p-2 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-900/10 dark:border-gray-100/10 hover:border-gray-900/50 dark:hover:border-gray-100/10 hover:shadow">
          <h2 className="font-semibold text-6xl text-blue-600 dark:text-blue-200">
            0
          </h2>
          <p className="text-center text-xs md:text-sm text-gray-900 dark:text-gray-100">
            Time until withdrawal
          </p>
        </div>
      </div>
    </>
  );
}
