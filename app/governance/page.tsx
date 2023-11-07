"use client";

import React, { useEffect, useState } from "react";
import ComingSoon from "@/app/ui/interface/comingSoon";
import { useAccount } from "wagmi";
import { unstable_noStore as noStore } from "next/cache";
import { useContractRead } from "wagmi";
import govTrotelCoinABI from "@/app/ui/abi/govTrotelCoin";

const BigNumber = require("bignumber.js");

const GovTrotelCoinAddress = "0xB16fe47Bfe97BcA2242bb5b3B39B61B52E599F6d";

export default function Governance() {
  const [warningMessage, setWarningMessage] = useState<string>("");
  const [totalSupplyData, setTotalSupplyData] = useState<number>(0);
  const [govBalanceData, setGovBalanceData] = useState<number>(0);
  const [confirmStaking, setConfirmStaking] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputValue = (e: { target: { value: string } }) => {
    if (e.target.value == "") {
      setInputValue("0");
    } else {
      setInputValue(e.target.value);
    }
  };

  const { address, isConnected } = useAccount();

  const {
    data: totalSupply,
    isError: isTotalSupplyError,
    isLoading: isTotalSupplyLoading,
  } = useContractRead({
    address: GovTrotelCoinAddress,
    abi: govTrotelCoinABI,
    functionName: "getTotalSupply",
    watch: true,
  });

  const {
    data: govBalance,
    isError: govBalanceError,
    isLoading: govBalanceLoading,
  } = useContractRead({
    address: GovTrotelCoinAddress,
    abi: govTrotelCoinABI,
    functionName: "balanceOf",
    watch: true,
    args: [address],
  });

  useEffect(() => {
    const fetchTotalSupplyData = async () => {
      if (isTotalSupplyError || isTotalSupplyLoading) {
        setTotalSupplyData(0);
      } else {
        setTotalSupplyData((govBalance as any).toNumber());
      }
    };

    const fetchGovBalanceData = async () => {
      if (isTotalSupplyError || isTotalSupplyLoading) {
        setGovBalanceData(0);
      } else {
        setGovBalanceData((govBalance as any).toNumber());
      }
    };

    if (isConnected) {
      fetchTotalSupplyData();
      fetchGovBalanceData();
    }
  }, [
    totalSupply,
    isTotalSupplyError,
    isTotalSupplyLoading,
    govBalance,
    govBalanceError,
    govBalanceLoading,
    isConnected,
  ]);

  const handleStake = () => {
    if (parseFloat(inputValue) <= 0) {
      setWarningMessage("Amount needs to be > 0.");
      return;
    }

    if (!isConnected) {
      setWarningMessage("Connect your wallet first!");
      return;
    }

    setWarningMessage("");
    setConfirmStaking(true);
  };

  const handleConfirm = () => {
    if (parseFloat(inputValue) <= 0) {
      setWarningMessage("Amount needs to be > 0.");
      return;
    }

    if (!isConnected) {
      setWarningMessage("Connect your wallet first!");
      return;
    }

    setWarningMessage("");

    // approve

    // stake
  };

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
      <div className="flex flex-col mt-4 gap-6">
        <div className="flex gap-4">
          <input
            className="block px-4 py-2 focus:shadow focus:border-gray-900/50 dark:focus:border-gray-100/50 text-sm text-gray-900 border border-gray-900/10 rounded-lg bg-gray-50 dark:bg-gray-900 dark:border-gray-100/10 dark:placeholder-gray-400 dark:text-white focus:outline-none"
            placeholder="Amount"
            onChange={handleInputValue}
          ></input>
          {!confirmStaking && (
            <button
              className="border border-gray-900/10 dark:border-gray-100/10 bg-gray-50 dark:bg-gray-900 hover:shadow hover:border-gray-900/50 dark:hover:border-gray-100/50 focus:shadow-none focus:border-blue-600 dark:focus:border-blue-200 dark:hover-bg-blue-50 text-sm px-6 py-2 text-gray-900 dark:text-gray-100 rounded-lg font-semibold"
              onClick={handleStake}
            >
              Stake
            </button>
          )}
          {confirmStaking && (
            <button
              className="border border-gray-900/10 dark:border-gray-100/10 bg-gray-50 dark:bg-gray-900 hover:shadow hover:border-gray-900/50 dark:hover:border-gray-100/50 focus:shadow-none focus:border-blue-600 dark:focus:border-blue-200 dark:hover-bg-blue-50 text-sm px-6 py-2 text-gray-900 dark:text-gray-100 rounded-lg font-semibold"
              onClick={handleConfirm}
            >
              Confirm
            </button>
          )}
        </div>
        {warningMessage !== "" && (
          <span className="animate__animated animate__fadeIn text-red-600 dark:text-red-200">
            {warningMessage}
          </span>
        )}
        {confirmStaking && warningMessage == "" && (
          <span className="animate__animated animate__fadeIn text-yellow-600 dark:text-yellow-200">
            Your TrotelCoin will be locked for 30 days!
          </span>
        )}
      </div>
      <h2 className="font-semibold mt-10 text-gray-900 dark:text-gray-100">
        Staking dashboard
      </h2>
      <div className="flex flex-wrap mt-4 items-center gap-4 w-full">
        <div className="flex w-full md:w-1/2 flex-col items-center justify-center gap-1 p-2 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-900/10 dark:border-gray-100/10 hover:border-gray-900/50 dark:hover:border-gray-100/10 hover:shadow">
          <h2 className="font-semibold text-6xl text-blue-600 dark:text-blue-200">
            0
          </h2>
          <p className="text-center text-xs md:text-sm text-gray-900 dark:text-gray-100">
            TrotelCoin
          </p>
        </div>
        <div className="flex w-full md:w-1/2 flex-col items-center justify-center gap-1 p-2 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-900/10 dark:border-gray-100/10 hover:border-gray-900/50 dark:hover:border-gray-100/10 hover:shadow">
          <h2 className="font-semibold text-6xl text-blue-600 dark:text-blue-200">
            {govBalanceData}
          </h2>
          <p className="text-center text-xs md:text-sm text-gray-900 dark:text-gray-100">
            GovTrotelCoin
          </p>
        </div>
        <div className="flex w-full md:w-1/2 flex-col items-center justify-center gap-1 p-2 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-900/10 dark:border-gray-100/10 hover:border-gray-900/50 dark:hover:border-gray-100/10 hover:shadow">
          <h2 className="font-semibold text-6xl text-blue-600 dark:text-blue-200">
            0
          </h2>
          <p className="text-center text-xs md:text-sm text-gray-900 dark:text-gray-100">
            Time until withdrawal
          </p>
        </div>
        <div className="flex w-full md:w-1/2 flex-col items-center justify-center gap-1 p-2 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-900/10 dark:border-gray-100/10 hover:border-gray-900/50 dark:hover:border-gray-100/10 hover:shadow">
          <h2 className="font-semibold text-6xl text-blue-600 dark:text-blue-200">
            {totalSupplyData}
          </h2>
          <p className="text-center text-xs md:text-sm text-gray-900 dark:text-gray-100">
            GovTrotelCoin supply
          </p>
        </div>
      </div>
    </>
  );
}
