/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import React, { useState } from "react";
import { useAccount } from "wagmi";
import { useContractRead } from "wagmi";
import govTrotelCoinABI from "@/abi/govTrotelCoin.json";
import trotelcoin from "@/abi/trotelcoin.json";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { parseEther } from "viem";
import govTrotelStakingABI from "@/abi/govTrotelStaking.json";

const GovTrotelCoinAddress = "0xB16fe47Bfe97BcA2242bb5b3B39B61B52E599F6d";
const TrotelCoinAddress = "0xf04ab1a43cBA1474160B7B8409387853D7Be02d5";
const GovTrotelStakingAddress = "0x15fF980Ac8534242d1A23F172FeCc63501AEF5D3";

export default function Governance() {
  const [warningMessage, setWarningMessage] = useState<string>("");
  const [confirmStaking, setConfirmStaking] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [stakingValidation, setStakingValidation] = useState<boolean>(false);
  const [stakedValue, setStakedValue] = useState<number>(0);
  const [isApproved, setIsApproved] = useState<boolean>(false);
  const [withdrawMessage, setWithdrawMessage] = useState<boolean>(false);

  const handleInputValue = (e: { target: { value: string } }) => {
    setInputValue(e.target.value);
  };

  const { address, isConnected } = useAccount();

  const {
    data: totalSupply,
    isError: isTotalSupplyError,
    isLoading: isTotalSupplyLoading,
  } = useContractRead({
    address: GovTrotelCoinAddress as `0x${string}`,
    abi: govTrotelCoinABI,
    functionName: "getTotalSupply()",
    chainId: 56,
    watch: true,
  });

  const {
    data: govBalance,
    isError: govBalanceError,
    isLoading: govBalanceLoading,
  } = useContractRead({
    address: GovTrotelCoinAddress as `0x${string}`,
    abi: govTrotelCoinABI,
    functionName: "balanceOf(address)",
    chainId: 56,
    watch: true,
    args: [address as `0x${string}`],
  });

  const {
    data: govRewards,
    isError: govRewardsError,
    isLoading: govRewardsLoading,
  } = useContractRead({
    address: GovTrotelStakingAddress as `0x${string}`,
    abi: govTrotelStakingABI,
    functionName: "calculateRewards(address)",
    chainId: 56,
    watch: true,
    args: [address as `0x${string}`],
  });

  const {
    data: stakingBalance,
    isError: stakingBalanceError,
    isLoading: stakingBalanceLoading,
  } = useContractRead({
    address: GovTrotelStakingAddress as `0x${string}`,
    abi: govTrotelStakingABI,
    functionName: "stakingBalance(address)",
    chainId: 56,
    watch: true,
    args: [address as `0x${string}`],
  });

  const {
    data: timeLeft,
    isError: timeLeftError,
    isLoading: timeLeftLoading,
  } = useContractRead({
    address: GovTrotelStakingAddress as `0x${string}`,
    abi: govTrotelStakingABI,
    functionName: "getTimeUntilWithdrawal(address)",
    chainId: 56,
    watch: true,
    args: [address as `0x${string}`],
  });

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

    const { config: approveStakingConfig } = usePrepareContractWrite({
      address: TrotelCoinAddress,
      abi: trotelcoin,
      functionName: "approve(address,uint256)",
      args: [GovTrotelStakingAddress, approveValue],
      chainId: 56,
      enabled: Boolean(approveValue),
    });

    const { data: approveStakingData, write: approveStaking } =
      useContractWrite(approveStakingConfig);

    try {
      if (approveStaking) {
        approveStaking();
      } else {
        console.error("approveStaking function is undefined");
      }
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

    const { config: stakeConfig } = usePrepareContractWrite({
      address: GovTrotelStakingAddress,
      abi: govTrotelStakingABI,
      functionName: "stake(uint256)",
      args: [stakeValue],
      chainId: 56,
      enabled: Boolean(stakeValue),
    });

    const { data: stakeData, write: stake } = useContractWrite(stakeConfig);

    try {
      if (stake) {
        stake();
      } else {
        console.error("stake function is undefined");
      }
    } catch (e) {
      setWarningMessage("Transaction rejected.");
      console.log(e);
    }

    setStakedValue(parseFloat(fixedValue));
    setStakingValidation(true);
  };

  const handleWithdraw = () => {
    const { config: withdrawConfig } = usePrepareContractWrite({
      address: GovTrotelStakingAddress as `0x${string}`,
      abi: govTrotelStakingABI,
      functionName: "withdraw()",
      chainId: 56,
    });

    const { data: withdrawData, write: withdraw } =
      useContractWrite(withdrawConfig);

    try {
      if (withdraw) {
        withdraw();
      } else {
        console.error("withdraw function is undefined");
      }
    } catch (e) {
      setWarningMessage("Transaction rejected.");
      console.log(e);
    }

    setWithdrawMessage(true);
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
        <p className="mt-10 text-gray-900 dark:text-gray-100">
          Follow this link to{" "}
          <a
            target="_blank"
            href="https://vote.trotelcoin.com"
            className="underline text-blue-600 dark:text-blue-200 hover:underline hover:text-blue-600/80 dark:hover:text-blue-200/80"
          >
            vote
          </a>
          .
        </p>
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
            <button
              className="border border-gray-900/10 dark:border-gray-100/10 bg-gray-50 dark:bg-gray-900 hover:shadow hover:border-gray-900/50 dark:hover:border-gray-100/50 focus:shadow-none focus:border-blue-600 dark:focus:border-blue-200 dark:hover-bg-blue-50 text-sm px-6 py-2 text-gray-900 dark:text-gray-100 rounded-lg font-semibold"
              onClick={handleWithdraw}
            >
              Withdraw
            </button>
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
          {withdrawMessage && (
            <span className="animate__animated animate__fadeIn text-green-600 dark:text-green-200">
              You withdrew your TrotelCoin and got{" "}
              {(govBalance as any).toNumber() + (govRewards as any).toNumber()}!
            </span>
          )}
        </div>
        <h2 className="font-semibold mt-10 text-gray-900 dark:text-gray-100">
          Staking dashboard
        </h2>
        <div className="flex flex-wrap justify-evenly sm:justify-start mt-4 items-center gap-4 w-full">
          <div className="flex w-5/12 md:w-1/5 flex-col items-center justify-center gap-1 p-2 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-900/10 dark:border-gray-100/10 hover:border-gray-900/50 dark:hover:border-gray-100/10">
            <h2 className="font-semibold text-xl md:text-6xl text-blue-600 dark:text-blue-200">
              {stakingBalance === undefined
                ? 0
                : (stakingBalance as any).toNumber()}
            </h2>
            <p className="text-center text-xs md:text-sm text-gray-900 dark:text-gray-100">
              TrotelCoin
            </p>
          </div>
          <div className="flex w-5/12 md:w-1/5 flex-col items-center justify-center gap-1 p-2 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-900/10 dark:border-gray-100/10 hover:border-gray-900/50 dark:hover:border-gray-100/10">
            <h2 className="font-semibold text-xl md:text-6xl text-blue-600 dark:text-blue-200">
              {govBalance === undefined ? 0 : (govBalance as any).toNumber()}
            </h2>
            <p className="text-center text-xs md:text-sm text-gray-900 dark:text-gray-100">
              GovTrotelCoin
            </p>
          </div>
          <div className="flex w-5/12 md:w-1/5 flex-col items-center justify-center gap-1 p-2 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-900/10 dark:border-gray-100/10 hover:border-gray-900/50 dark:hover:border-gray-100/10">
            <h2 className="font-semibold text-xl md:text-6xl text-blue-600 dark:text-blue-200">
              {timeLeft === undefined ? 0 : (timeLeft as any).toNumber()}
            </h2>
            <p className="text-center text-xs md:text-sm text-gray-900 dark:text-gray-100">
              Seconds left until withdrawal
            </p>
          </div>
          <div className="flex w-5/12 md:w-1/5 flex-col items-center justify-center gap-1 p-2 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-900/10 dark:border-gray-100/10 hover:border-gray-900/50 dark:hover:border-gray-100/10">
            <h2 className="font-semibold text-xl md:text-6xl text-blue-600 dark:text-blue-200">
              {totalSupply === undefined ? 0 : (totalSupply as any).toNumber()}
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
