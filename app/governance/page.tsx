"use client";

import React, { useEffect, useState } from "react";
import ComingSoon from "@/app/ui/interface/comingSoon";
import { useAccount } from "wagmi";
import { unstable_noStore as noStore } from "next/cache";
import { useContractRead } from "wagmi";
import govTrotelCoinABI from "@/app/ui/abi/govTrotelCoin";
import trotelcoin from "@/app/ui/abi/trotelcoin";
import { useContractWrite } from "wagmi";
import { parseEther } from "viem";
import govTrotelStakingABI from "@/app/ui/abi/govTrotelStaking";

const GovTrotelCoinAddress = "0xB16fe47Bfe97BcA2242bb5b3B39B61B52E599F6d";
const TrotelCoinAddress = "0xf04ab1a43cBA1474160B7B8409387853D7Be02d5";
const GovTrotelStakingAddress = "0x15fF980Ac8534242d1A23F172FeCc63501AEF5D3";

export default function Governance() {
  const [warningMessage, setWarningMessage] = useState<string>("");
  const [totalSupplyData, setTotalSupplyData] = useState<number>(0);
  const [govBalanceData, setGovBalanceData] = useState<number>(0);
  const [confirmStaking, setConfirmStaking] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [stakingValidation, setStakingValidation] = useState<boolean>(false);
  const [stakedValue, setStakedValue] = useState<number>(0);
  const [isApproved, setIsApproved] = useState<boolean>(false);

  const handleInputValue = (e: { target: { value: string } }) => {
    setInputValue(e.target.value);
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

  const { write: approveStaking } = useContractWrite({
    address: TrotelCoinAddress,
    abi: trotelcoin,
    functionName: "approve",
  });

  const { write: stake } = useContractWrite({
    address: GovTrotelStakingAddress,
    abi: govTrotelStakingABI,
    functionName: "stake",
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
    const fixedValue = inputValue == "" ? "0" : inputValue;

    if (parseFloat(fixedValue) <= 0) {
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

  const handleApprove = () => {
    const fixedValue = inputValue == "" ? "0" : inputValue;

    if (parseFloat(fixedValue) <= 0) {
      setWarningMessage("Amount needs to be > 0.");
      return;
    }

    if (!isConnected) {
      setWarningMessage("Connect your wallet first!");
      return;
    }

    setWarningMessage("");

    // approve

    const approveValue = parseEther((parseFloat(fixedValue) * 1.05).toString());

    try {
      approveStaking({
        args: [GovTrotelStakingAddress, approveValue],
      });
    } catch (e) {
      setWarningMessage("Transaction rejected.");
      console.log("error", e);
    }

    setConfirmStaking(false);
    setIsApproved(true);
  };

  const handleStakeTransaction = () => {
    const fixedValue = inputValue == "" ? "0" : inputValue;

    if (parseFloat(fixedValue) <= 0) {
      setWarningMessage("Amount needs to be > 0.");
      return;
    }

    if (!isConnected) {
      setWarningMessage("Connect your wallet first!");
      return;
    }

    setWarningMessage("");

    // stake

    const stakeValue = parseEther(fixedValue);

    try {
      stake({ args: [stakeValue] });
    } catch (e) {
      setWarningMessage("Transaction rejected.");
      console.log(e);
    }

    setStakedValue(parseFloat(fixedValue));
    setStakingValidation(true);
  };

  return (
    <>
      <div className="mx-auto">
        <h1 className="flex text-2xl text-gray-900 dark:text-gray-100">
          <span>
            Stake <span className="font-bold">TrotelCoin.</span> Get{" "}
            <span className="font-bold">GovTrotelCoin.</span>
          </span>
        </h1>
        <h2 className="font-semibold mt-10 text-gray-900 dark:text-gray-100">
          Stake
        </h2>
        <div className="flex flex-col mt-4 gap-6">
          <div className="flex flex-wrap gap-4">
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
            {confirmStaking && !isApproved && (
              <button
                className="border border-gray-900/10 dark:border-gray-100/10 bg-gray-50 dark:bg-gray-900 hover:shadow hover:border-gray-900/50 dark:hover:border-gray-100/50 focus:shadow-none focus:border-blue-600 dark:focus:border-blue-200 dark:hover-bg-blue-50 text-sm px-6 py-2 text-gray-900 dark:text-gray-100 rounded-lg font-semibold"
                onClick={handleApprove}
              >
                Approve
              </button>
            )}
            {isApproved && confirmStaking && (
              <button
                className="border border-gray-900/10 dark:border-gray-100/10 bg-gray-50 dark:bg-gray-900 hover:shadow hover:border-gray-900/50 dark:hover:border-gray-100/50 focus:shadow-none focus:border-blue-600 dark:focus:border-blue-200 dark:hover-bg-blue-50 text-sm px-6 py-2 text-gray-900 dark:text-gray-100 rounded-lg font-semibold"
                onClick={handleStakeTransaction}
              >
                Stake
              </button>
            )}
          </div>
          {warningMessage !== "" && (
            <span className="animate__animated animate__fadeIn text-red-600 dark:text-red-200">
              {warningMessage}
            </span>
          )}
          {confirmStaking && !isApproved && warningMessage == "" && (
            <span className="animate__animated animate__fadeIn text-yellow-600 dark:text-yellow-200">
              You need to approve the transaction!
            </span>
          )}
          {isApproved && !stakingValidation && warningMessage == "" && (
            <span className="animate__animated animate__fadeIn text-yellow-600 dark:text-yellow-200">
              Your TrotelCoin will be locked for 30 days!
            </span>
          )}
          {stakingValidation && (
            <span className="animate__animated animate__fadeIn text-green-600 dark:text-green-200">
              You staked {stakedValue} TrotelCoin!
            </span>
          )}
        </div>
        <h2 className="font-semibold mt-10 text-gray-900 dark:text-gray-100">
          Staking dashboard
        </h2>
        <div className="flex flex-wrap justify-evenly sm:justify-start mt-4 items-center gap-4 w-full">
          <div className="flex w-5/12 md:w-1/5 flex-col items-center justify-center gap-1 p-2 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-900/10 dark:border-gray-100/10 hover:border-gray-900/50 dark:hover:border-gray-100/10">
            <h2 className="font-semibold text-xl md:text-6xl text-blue-600 dark:text-blue-200">
              0
            </h2>
            <p className="text-center text-xs md:text-sm text-gray-900 dark:text-gray-100">
              TrotelCoin
            </p>
          </div>
          <div className="flex w-5/12 md:w-1/5 flex-col items-center justify-center gap-1 p-2 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-900/10 dark:border-gray-100/10 hover:border-gray-900/50 dark:hover:border-gray-100/10">
            <h2 className="font-semibold text-xl md:text-6xl text-blue-600 dark:text-blue-200">
              {govBalanceData}
            </h2>
            <p className="text-center text-xs md:text-sm text-gray-900 dark:text-gray-100">
              GovTrotelCoin
            </p>
          </div>
          <div className="flex w-5/12 md:w-1/5 flex-col items-center justify-center gap-1 p-2 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-900/10 dark:border-gray-100/10 hover:border-gray-900/50 dark:hover:border-gray-100/10">
            <h2 className="font-semibold text-xl md:text-6xl text-blue-600 dark:text-blue-200">
              0
            </h2>
            <p className="text-center text-xs md:text-sm text-gray-900 dark:text-gray-100">
              Time until withdrawal
            </p>
          </div>
          <div className="flex w-5/12 md:w-1/5 flex-col items-center justify-center gap-1 p-2 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-900/10 dark:border-gray-100/10 hover:border-gray-900/50 dark:hover:border-gray-100/10">
            <h2 className="font-semibold text-xl md:text-6xl text-blue-600 dark:text-blue-200">
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
