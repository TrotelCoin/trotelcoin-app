"use client";

import React, { useEffect, useState } from "react";
import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import "animate.css";
import govTrotelCoinABI from "@/abi/govTrotelCoin";
import trotelCoinABI from "@/abi/trotelCoin";
import govTrotelStakingABI from "@/abi/govTrotelStaking";
import { bsc } from "wagmi/chains";
import { parseEther, Hash } from "viem";
import useDebounce from "@/utils/useDebounce";

const TrotelCoinAddress = "0xf04ab1a43cBA1474160B7B8409387853D7Be02d5";
const GovTrotelCoinAddress = "0x25912243E6BbEC694d7098B4297974b37FC2cD50";
const GovTrotelStakingAddress = "0x9668D972CB2247F4686977Ccc0e08D9691Ff0041";

export default function Governance() {
  const [warningMessage, setWarningMessage] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState<string>("0");
  const [stakedValue, setStakedValue] = useState<number>(0);
  const [informationMessage, setInformationMessage] = useState<string | null>(
    null
  );
  const [totalLocked, setTotalLocked] = useState<number>(0);
  const [totalSupply, setTotalSupply] = useState<number>(0);
  const [govBalance, setGovBalance] = useState<number>(0);
  const [govRewards, setGovRewards] = useState<number>(0);
  const [stakingBalance, setStakingBalance] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const debouncedValue: string = useDebounce(inputValue, 500);

  const handleInputValue = (e: { target: { value: string } }) => {
    setInputValue(e.target.value);
  };

  const { address: userAddress, isConnected, isDisconnected } = useAccount();

  const { data: totalLockedData, isSuccess: totalLockedFetched } =
    useContractRead({
      address: GovTrotelStakingAddress as Hash,
      abi: govTrotelStakingABI,
      chainId: bsc.id,
      functionName: "getTotalStaked",
      watch: true,
    });

  const { data: totalSupplyData, isSuccess: totalSupplyFetched } =
    useContractRead({
      address: GovTrotelCoinAddress as Hash,
      abi: govTrotelCoinABI,
      functionName: "getTotalSupply",
      chainId: bsc.id,
      watch: true,
    });

  const { data: govBalanceData, isSuccess: govBalanceFetched } =
    useContractRead({
      address: GovTrotelCoinAddress as Hash,
      abi: govTrotelCoinABI,
      functionName: "balanceOf",
      chainId: bsc.id,
      watch: true,
      args: [userAddress as Hash],
      enabled: Boolean(userAddress),
    });

  const { data: govRewardsData, isSuccess: govRewardsFetched } =
    useContractRead({
      address: GovTrotelStakingAddress as Hash,
      abi: govTrotelStakingABI,
      functionName: "calculateRewards",
      chainId: bsc.id,
      watch: true,
      args: [userAddress as Hash],
      enabled: Boolean(userAddress),
    });

  const { data: stakingBalanceData, isSuccess: stakingBalanceFetched } =
    useContractRead({
      address: GovTrotelStakingAddress as Hash,
      abi: govTrotelStakingABI,
      functionName: "stakingBalance",
      chainId: bsc.id,
      watch: true,
      args: [userAddress as Hash],
      enabled: Boolean(userAddress),
    });

  const { data: timeLeftData, isSuccess: timeLeftFetched } = useContractRead({
    address: GovTrotelStakingAddress as Hash,
    abi: govTrotelStakingABI,
    functionName: "getTimeUntilWithdrawal",
    chainId: bsc.id,
    watch: true,
    args: [userAddress as Hash],
    enabled: Boolean(userAddress),
  });

  const approveFixedValue = debouncedValue === "" ? "0" : debouncedValue;

  const parsedApproveValue = isNaN(parseFloat(approveFixedValue))
    ? "0"
    : (parseFloat(approveFixedValue) * 1.05).toString();

  const approveValueInEther = parseEther(parsedApproveValue);

  const { config: approveStakingConfig } = usePrepareContractWrite({
    address: TrotelCoinAddress as Hash,
    abi: trotelCoinABI,
    functionName: "approve",
    args: [GovTrotelStakingAddress as Hash, approveValueInEther],
    chainId: bsc.id,
    account: userAddress as Hash,
    enabled: Boolean(userAddress),
  });

  const parsedStakeValue = isNaN(parseFloat(approveFixedValue))
    ? "0"
    : parseFloat(approveFixedValue).toString();

  const stakingValueInEther = parseEther(parsedStakeValue);

  const {
    write: approveStaking,
    isSuccess: successApprove,
    isLoading: approveLoading,
    isError: approveError,
  } = useContractWrite(approveStakingConfig);

  const { config: stakeConfig } = usePrepareContractWrite({
    address: GovTrotelStakingAddress as Hash,
    abi: govTrotelStakingABI,
    functionName: "stake",
    args: [stakingValueInEther],
    chainId: bsc.id,
    account: userAddress as Hash,
    enabled: Boolean(userAddress),
  });

  const {
    write: stake,
    isSuccess: successStake,
    isError: stakeError,
    isLoading: stakeLoading,
  } = useContractWrite(stakeConfig);

  const { config: withdrawConfig } = usePrepareContractWrite({
    address: GovTrotelStakingAddress as Hash,
    abi: govTrotelStakingABI,
    functionName: "withdraw",
    args: [stakingValueInEther],
    account: userAddress as Hash,
    chainId: bsc.id,
    enabled: Boolean(userAddress),
  });

  const {
    write: withdraw,
    isSuccess: successWithdraw,
    isLoading: withdrawLoading,
    isError: withdrawError,
  } = useContractWrite(withdrawConfig);

  const { config: claimRewardsConfig } = usePrepareContractWrite({
    address: GovTrotelStakingAddress as Hash,
    abi: govTrotelStakingABI,
    functionName: "claimRewards",
    account: userAddress as Hash,
    chainId: bsc.id,
    enabled: Boolean(userAddress),
  });

  const {
    write: claimRewards,
    isSuccess: successClaimRewards,
    isLoading: claimRewardsLoading,
    isError: claimRewardsError,
  } = useContractWrite(claimRewardsConfig);

  useEffect(() => {
    if (totalLockedFetched)
      setTotalLocked(parseFloat(totalLockedData?.toString() as string) * 1e-18);
    if (totalSupplyFetched)
      setTotalSupply(parseFloat(totalSupplyData?.toString() as string) * 1e-18);
    if (govBalanceFetched)
      setGovBalance(parseFloat(govBalanceData?.toString() as string) * 1e-18);
    if (govRewardsFetched)
      setGovRewards(parseFloat(govRewardsData?.toString() as string) * 1e-18);
    if (stakingBalanceFetched)
      setStakingBalance(
        parseFloat(stakingBalanceData?.toString() as string) * 1e-18
      );
    if (timeLeftFetched)
      setTimeLeft(parseFloat(timeLeftData?.toString() as string));
  }, [
    totalLockedFetched,
    totalSupplyFetched,
    govBalanceFetched,
    govRewardsFetched,
    stakingBalanceFetched,
    timeLeftFetched,
    totalLocked,
    totalSupply,
    govBalance,
    govRewards,
    stakingBalance,
    timeLeft,
    totalLockedData,
    totalSupplyData,
    govBalanceData,
    govRewardsData,
    stakingBalanceData,
    timeLeftData,
  ]);

  useEffect(() => {
    if (!approveLoading && !stakeLoading && !withdrawLoading) {
      const timeout = setTimeout(() => {
        setWarningMessage(null);
      }, 5000);
      return () => clearTimeout(timeout);
    }

    const timeout = setTimeout(() => {
      setInformationMessage("");
    }, 5000);

    return () => clearTimeout(timeout);
  }, [approveLoading, stakeLoading, warningMessage, withdrawLoading]);

  useEffect(() => {
    if (approveError || stakeError || withdrawError || claimRewardsError) {
      setWarningMessage("Transaction error!");
    }
  }, [approveError, claimRewardsError, stakeError, withdrawError]);

  const handleApprove = () => {
    const fixedValue = debouncedValue == "" ? "0" : debouncedValue;

    if (parseFloat(fixedValue) <= 0) {
      setWarningMessage("Amount needs to be > 0.");
      return;
    }

    if (!isConnected) {
      setWarningMessage("Connect your wallet first!");
      return;
    }

    setWarningMessage(null);

    // approve

    try {
      if (approveStaking) {
        approveStaking();
      } else {
        console.error("approveStaking function is undefined");
      }
    } catch (e) {
      console.log("error", e);
    }
  };

  const handleStakeTransaction = () => {
    const fixedValue = debouncedValue == "" ? "0" : debouncedValue;

    if (parseFloat(fixedValue) <= 0) {
      setWarningMessage("Amount needs to be > 0.");
      return;
    }

    if (!isConnected) {
      setWarningMessage("Connect your wallet first!");
      return;
    }

    setWarningMessage(null);
    setStakedValue(parseFloat(fixedValue));

    // stake

    try {
      if (stake) {
        stake();
      } else {
        console.error("stake function is undefined");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleWithdraw = () => {
    const fixedValue = debouncedValue == "" ? "0" : debouncedValue;

    if (parseFloat(fixedValue) <= 0) {
      setWarningMessage("Amount needs to be > 0.");
      return;
    }

    if (!isConnected) {
      setWarningMessage("Connect your wallet first!");
      return;
    }

    if (parseFloat(timeLeft?.toString() as string) > 0) {
      setWarningMessage("Staking duration is not finished.");
      return;
    }

    if (parseFloat(stakingBalance?.toString() as string) <= 0) {
      setWarningMessage("Nothing to withdraw.");
      return;
    }

    setInformationMessage(
      `You will withdraw ${parseFloat(debouncedValue)} TrotelCoin.`
    );

    // withdraw

    try {
      if (withdraw) {
        if (parseFloat(timeLeft?.toString() as string) <= 0) {
          withdraw();
        }
      } else {
        console.error("withdraw function is undefined");
      }
    } catch (e) {
      setWarningMessage("Transaction rejected.");
      console.log(e);
    }
  };

  const handleClaimRewards = () => {
    if (!isConnected) {
      setWarningMessage("Connect your wallet first!");
      return;
    }

    if (parseFloat(govRewards?.toString() as string) <= 0) {
      setWarningMessage("Nothing to claim.");
      return;
    }

    // claimRewards

    try {
      if (claimRewards) {
        claimRewards();
      } else {
        console.error("claim rewards function is undefined");
      }
    } catch (e) {
      setWarningMessage("Transaction rejected.");
      console.log(e);
    }
  };

  {
    /*const convertTimeToDays = (timeInSeconds: string) => {
    const secondsInDay = 86400;
    return Math.floor(parseFloat(timeInSeconds) / secondsInDay);
  };*/
  }

  const convertTimeToHours = (timeInSeconds: string) => {
    const secondsInHours = 3600;
    return Math.floor(parseFloat(timeInSeconds) / secondsInHours);
  };

  function formatNumber(number: string): string {
    const numberFixed = parseFloat(number).toFixed(0).toString();

    const formattedNumber: string = numberFixed.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      " "
    );

    return formattedNumber;
  }

  return (
    <>
      <div className="mx-auto">
        <h1 className="flex text-2xl md:text-4xl text-gray-900 dark:text-gray-100">
          <span>
            Stake <span className="font-bold">TrotelCoin.</span> Get{" "}
            <span className="font-bold">GovTrotelCoin.</span>
          </span>
        </h1>
        <h2 className="font-semibold mt-10 text-gray-900 dark:text-gray-100">
          Statistics
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 justify-evenly sm:justify-start mt-4 items-center gap-4 w-full">
          <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-900/10 dark:border-gray-100/10 hover:border-gray-900/50 dark:hover:border-gray-100/50">
            <h2 className="font-semibold text-4xl md:text-6xl text-blue-600 dark:text-blue-200">
              {totalSupply.toFixed(2)}
            </h2>
            <p className="text-center text-xs md:text-base text-gray-900 dark:text-gray-100">
              govTROTEL minted
            </p>
          </div>
          <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-900/10 dark:border-gray-100/10 hover:border-gray-900/50 dark:hover:border-gray-100/50">
            <h2 className="font-semibold text-4xl md:text-6xl text-blue-600 dark:text-blue-200">
              {totalLocked.toFixed(0)}
            </h2>
            <p className="text-center text-xs md:text-base text-gray-900 dark:text-gray-100">
              TROTEL locked
            </p>
          </div>
          <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-900/10 dark:border-gray-100/10 hover:border-gray-900/50 dark:hover:border-gray-100/50">
            <h2 className="font-semibold text-4xl md:text-6xl text-blue-600 dark:text-blue-200">
              100%
            </h2>
            <p className="text-center text-xs md:text-base text-gray-900 dark:text-gray-100">
              APR
            </p>
          </div>
        </div>
        <p className="mt-4 text-gray-900 dark:text-gray-100">
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
          My dashboard
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 justify-evenly sm:justify-start mt-4 items-center gap-4 w-full">
          <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-900/10 dark:border-gray-100/10 hover:border-gray-900/50 dark:hover:border-gray-100/50">
            <h2 className="font-semibold text-4xl md:text-6xl text-blue-600 dark:text-blue-200">
              {isDisconnected ? "0" : stakingBalance.toFixed(0)}
            </h2>
            <p className="text-center text-xs md:text-base text-gray-900 dark:text-gray-100">
              TROTEL
            </p>
          </div>
          <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-900/10 dark:border-gray-100/10 hover:border-gray-900/50 dark:hover:border-gray-100/50">
            <h2 className="font-semibold text-4xl md:text-6xl text-blue-600 dark:text-blue-200">
              {isDisconnected ? "0" : (govRewards - govBalance).toFixed(2)}
            </h2>
            <p className="text-center text-xs md:text-base text-gray-900 dark:text-gray-100">
              govTROTEL Rewards
            </p>
          </div>
          <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-900/10 dark:border-gray-100/10 hover:border-gray-900/50 dark:hover:border-gray-100/50">
            <h2 className="font-semibold text-4xl md:text-6xl text-blue-600 dark:text-blue-200">
              {isDisconnected ? "0" : govBalance.toFixed(2)}
            </h2>
            <p className="text-center text-xs md:text-base text-gray-900 dark:text-gray-100">
              govTROTEL Balance
            </p>
          </div>
          <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-900/10 dark:border-gray-100/10 hover:border-gray-900/50 dark:hover:border-gray-100/50">
            <h2 className="font-semibold text-4xl md:text-6xl text-blue-600 dark:text-blue-200">
              {isDisconnected
                ? "0"
                : formatNumber(
                    convertTimeToHours(
                      timeLeft?.toString() as string
                    ).toString()
                  )}
            </h2>
            <p className="text-center text-xs md:text-base text-gray-900 dark:text-gray-100">
              Hours left
            </p>
          </div>
        </div>
        <h2 className="font-semibold mt-10 text-gray-900 dark:text-gray-100">
          Stake & Earn
        </h2>
        <div className="flex flex-col mt-4 gap-6 max-w-xl">
          <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
            <input
              className="block px-4 py-2 focus:shadow focus:border-gray-900/50 dark:focus:border-gray-100/50 text-sm text-gray-900 border border-gray-900/10 rounded-lg bg-gray-50 dark:bg-gray-900 dark:border-gray-100/10 dark:placeholder-gray-400 dark:text-white focus:outline-none"
              placeholder="Amount"
              onChange={handleInputValue}
            ></input>
            {!successApprove && (
              <button
                className="border border-gray-900/10 dark:border-gray-100/10 bg-gray-50 dark:bg-gray-900 hover:shadow hover:border-gray-900/50 dark:hover:border-gray-100/50 focus:shadow-none focus:border-blue-600 dark:focus:border-blue-200 dark:hover-bg-blue-50 text-sm px-6 py-2 text-gray-900 dark:text-gray-100 rounded-lg font-semibold"
                onClick={handleApprove}
              >
                Approve
              </button>
            )}
            {successApprove && (
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
            <button
              className="border border-gray-900/10 dark:border-gray-100/10 bg-gray-50 dark:bg-gray-900 hover:shadow hover:border-gray-900/50 dark:hover:border-gray-100/50 focus:shadow-none focus:border-blue-600 dark:focus:border-blue-200 dark:hover-bg-blue-50 text-sm px-6 py-2 text-gray-900 dark:text-gray-100 rounded-lg font-semibold"
              onClick={handleClaimRewards}
            >
              Claim
            </button>
          </div>
          {informationMessage && (
            <span className="animate__animated animate__fadeIn text-yellow-600 dark:text-yellow-200">
              {informationMessage}
            </span>
          )}
          {approveLoading && (
            <span className="animate__animated animate__fadeIn text-blue-600 dark:text-blue-200">
              Transaction is pending...
            </span>
          )}
          {approveError && warningMessage && (
            <span className="animate__animated animate__fadeIn text-red-600 dark:text-red-200">
              {warningMessage}
            </span>
          )}
          {successApprove && !successStake && (
            <span className="animate__animated animate__fadeIn text-yellow-600 dark:text-yellow-200">
              Your TrotelCoin will be locked for 30 days!
            </span>
          )}
          {stakeLoading && (
            <span className="animate__animated animate__fadeIn text-blue-600 dark:text-blue-200">
              Transaction is pending...
            </span>
          )}
          {stakeError && warningMessage && (
            <span className="animate__animated animate__fadeIn text-red-600 dark:text-red-200">
              {warningMessage}
            </span>
          )}
          {successStake && stakedValue && stakedValue !== null && (
            <span className="animate__animated animate__fadeIn text-green-600 dark:text-green-200">
              You staked {stakedValue} TrotelCoin!
            </span>
          )}
          {withdrawLoading && (
            <span className="animate__animated animate__fadeIn text-blue-600 dark:text-blue-200">
              Transaction is pending...
            </span>
          )}
          {withdrawError && warningMessage && (
            <span className="animate__animated animate__fadeIn text-red-600 dark:text-red-200">
              {warningMessage}
            </span>
          )}
          {successWithdraw && (
            <span className="animate__animated animate__fadeIn text-green-600 dark:text-green-200">
              You withdrew your TrotelCoin !
            </span>
          )}
          {claimRewardsLoading && (
            <span className="animate__animated animate__fadeIn text-blue-600 dark:text-blue-200">
              Transaction is pending...
            </span>
          )}
          {claimRewardsError && warningMessage && (
            <span className="animate__animated animate__fadeIn text-red-600 dark:text-red-200">
              {warningMessage}
            </span>
          )}
          {successClaimRewards && (
            <span className="animate__animated animate__fadeIn text-green-600 dark:text-green-200">
              You claimed {govBalance.toFixed(2)} govTrotelCoin !
            </span>
          )}
          {warningMessage && warningMessage !== "Transaction error!" && (
            <span className="animate__animated animate__fadeIn text-red-600 dark:text-red-200">
              {warningMessage}
            </span>
          )}
        </div>
      </div>
    </>
  );
}
