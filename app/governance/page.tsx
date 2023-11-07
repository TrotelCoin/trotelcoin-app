"use client";

import React, { useEffect, useState } from "react";
import ComingSoon from "@/app/ui/interface/comingSoon";
import { useAccount } from "wagmi";
import { unstable_noStore as noStore } from "next/cache";
import { useContractRead } from "wagmi";
import govTrotelCoinABI from "@/app/ui/abi/govTrotelCoin";
import { ethers } from "ethers";

const GovTrotelCoinAddress = "0xB16fe47Bfe97BcA2242bb5b3B39B61B52E599F6d";

export default function Governance() {
  const [isConnectedMessage, setIsConnectedMessage] = useState<string>("");
  const [totalSupplyData, setTotalSupplyData] = useState<number>(0);
  const [govBalanceData, setGovBalanceData] = useState<number>(0);
  const [confirmStaking, setConfirmStaking] = useState<boolean>(false);

  const { address, isConnected } = useAccount();

  const {
    data: totalSupply,
    isError: isTotalSupplyError,
    isLoading: isTotalSupplyLoading,
  } = useContractRead({
    address: GovTrotelCoinAddress,
    abi: govTrotelCoinABI,
    functionName: "getTotalSupply",
  });

  const {
    data: govBalance,
    isError: govBalanceError,
    isLoading: govBalanceLoading,
  } = useContractRead({
    address: GovTrotelCoinAddress,
    abi: govTrotelCoinABI,
    functionName: "balanceOf",
    args: [address],
  });

  console.log(totalSupply);
  console.log(govBalance);

  useEffect(() => {
    const fetchTotalSupplyData = async () => {
      if (isTotalSupplyError || isTotalSupplyLoading) {
        setTotalSupplyData(0);
      } else {
        setTotalSupplyData((totalSupply as BigNumber).toNumber());
      }
    };

    const fetchGovBalanceData = async () => {
      if (isTotalSupplyError || isTotalSupplyLoading) {
        setGovBalanceData(0);
      } else {
        setGovBalanceData((govBalance as BigNumber).toNumber());
      }
    };

    fetchTotalSupplyData();
    fetchGovBalanceData();
  }, [
    totalSupply,
    isTotalSupplyError,
    isTotalSupplyLoading,
    govBalance,
    govBalanceError,
    govBalanceLoading,
  ]);

  const handleStake = () => {
    if (!isConnected) {
      setIsConnectedMessage("Connect your wallet first!");
    }

    setConfirmStaking(true);
  };

  const handleConfirm = () => {
    if (!isConnected) {
      setIsConnectedMessage("Connect your wallet first!");
    }
  };

  return (
    <>
      <h1 className="flex text-2xl text-gray-900 dark:text-gray-100">
        <span>
          Stake <span className="font-semibold">TrotelCoin.</span> Get{" "}
          <span className="font-semibold">GovTrotelCoin.</span>
        </span>
      </h1>
      <div className="flex justify-center">
        <h2 className="font-semibold mt-10 text-gray-900 dark:text-gray-100">
          Stake
        </h2>
        <div className="flex flex-col mt-4 items-center gap-6">
          <div className="flex gap-4">
            <input
              className="px-4 py-2 rounded-lg"
              placeholder="Amount"
            ></input>
            {!confirmStaking && (
              <button
                className="flex border border-gray-900/10 dark:border-gray-100/10 bg-gray-50 dark:bg-gray-900 hover:shadow hover:border-gray-900/50 dark:hover:border-gray-100/50 focus:shadow-none focus:border-blue-600 dark:focus:border-blue-200 dark:hover-bg-blue-50 text-sm px-6 py-2 text-gray-900 dark:text-gray-100 rounded-lg font-semibold"
                onClick={handleStake}
              >
                Stake
              </button>
            )}
            {confirmStaking && (
              <button
                className="flex border border-gray-900/10 dark:border-gray-100/10 bg-gray-50 dark:bg-gray-900 hover:shadow hover:border-gray-900/50 dark:hover:border-gray-100/50 focus:shadow-none focus:border-blue-600 dark:focus:border-blue-200 dark:hover-bg-blue-50 text-sm px-6 py-2 text-gray-900 dark:text-gray-100 rounded-lg font-semibold"
                onClick={handleConfirm}
              >
                Confirm
              </button>
            )}
          </div>
          {isConnectedMessage && (
            <span className="animate__animated animate__fadeIn text-red-600 dark:text-red-200">
              Connect your wallet first!
            </span>
          )}
          {confirmStaking && (
            <span className="animate__animated animate__fadeIn text-yellow-600 dark:text-yellow-200">
              Your TrotelCoin will be locked for 30 days!
            </span>
          )}
        </div>
        <h2 className="font-semibold mt-10 text-gray-900 dark:text-gray-100">
          Staking dashboard
        </h2>
        <div className="flex flex-wrap mt-4 items-center gap-4 w-full">
          <div className="flex w-full md:w-1/5 flex-col items-center justify-center gap-1 p-2 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-900/10 dark:border-gray-100/10 hover:border-gray-900/50 dark:hover:border-gray-100/10 hover:shadow">
            <h2 className="font-semibold text-6xl text-blue-600 dark:text-blue-200">
              0
            </h2>
            <p className="text-center text-xs md:text-sm text-gray-900 dark:text-gray-100">
              TrotelCoin
            </p>
          </div>
          <div className="flex w-full md:w-1/5 flex-col items-center justify-center gap-1 p-2 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-900/10 dark:border-gray-100/10 hover:border-gray-900/50 dark:hover:border-gray-100/10 hover:shadow">
            <h2 className="font-semibold text-6xl text-blue-600 dark:text-blue-200">
              {govBalanceData}
            </h2>
            <p className="text-center text-xs md:text-sm text-gray-900 dark:text-gray-100">
              GovTrotelCoin
            </p>
          </div>
          <div className="flex w-full md:w-1/5 flex-col items-center justify-center gap-1 p-2 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-900/10 dark:border-gray-100/10 hover:border-gray-900/50 dark:hover:border-gray-100/10 hover:shadow">
            <h2 className="font-semibold text-6xl text-blue-600 dark:text-blue-200">
              0
            </h2>
            <p className="text-center text-xs md:text-sm text-gray-900 dark:text-gray-100">
              Time until withdrawal
            </p>
          </div>
          <div className="flex w-full md:w-1/5 flex-col items-center justify-center gap-1 p-2 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-900/10 dark:border-gray-100/10 hover:border-gray-900/50 dark:hover:border-gray-100/10 hover:shadow">
            <h2 className="font-semibold text-6xl text-blue-600 dark:text-blue-200">
              {totalSupplyData}
            </h2>
            <p className="text-center text-xs md:text-sm text-gray-900 dark:text-gray-100">
              GovTrotelCoin supply
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
