"use client";

import React, { useEffect, useState } from "react";
import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useBalance,
} from "wagmi";
import govTrotelCoinABI from "@/abi/govTrotelCoin";
import trotelCoinABI from "@/abi/trotelCoin";
import govTrotelStakingABI from "@/abi/govTrotelStaking";
import { bsc } from "wagmi/chains";
import { parseEther, Hash } from "viem";
import useDebounce from "@/utils/useDebounce";

const GovTrotelCoinAddress = "0xB16fe47Bfe97BcA2242bb5b3B39B61B52E599F6d";
const TrotelCoinAddress = "0xf04ab1a43cBA1474160B7B8409387853D7Be02d5";
const GovTrotelStakingAddress = "0x15fF980Ac8534242d1A23F172FeCc63501AEF5D3";

export default function Governance() {
  const [warningMessage, setWarningMessage] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");
  const [stakedValue, setStakedValue] = useState<number>(0);
  const [userAddress, setUserAddress] = useState<string>("");
  const [informationMessage, setInformationMessage] = useState<string>("");
  const debouncedValue: string = useDebounce(inputValue, 500);

  const handleInputValue = (e: { target: { value: string } }) => {
    setInputValue(e.target.value);
  };

  const { address, isConnected } = useAccount();
  useEffect(() => {
    setUserAddress(address as Hash);
  }, [address]);

  const { data: totalLocked } = useBalance({
    address: GovTrotelStakingAddress,
    chainId: bsc.id,
    token: TrotelCoinAddress,
    watch: true,
    enabled: true,
  });

  const { data: totalSupply } = useContractRead({
    address: GovTrotelCoinAddress as Hash,
    abi: govTrotelCoinABI,
    functionName: "getTotalSupply",
    chainId: bsc.id,
    watch: true,
  });

  const { data: govBalance } = useContractRead({
    address: GovTrotelCoinAddress as Hash,
    abi: govTrotelCoinABI,
    functionName: "balanceOf",
    chainId: bsc.id,
    watch: true,
    args: [userAddress as Hash],
  });

  const { data: govRewards } = useContractRead({
    address: GovTrotelStakingAddress as Hash,
    abi: govTrotelStakingABI,
    functionName: "calculateRewards",
    chainId: bsc.id,
    watch: true,
    args: [address as Hash],
  });

  const { data: stakingBalance } = useContractRead({
    address: GovTrotelStakingAddress as Hash,
    abi: govTrotelStakingABI,
    functionName: "stakingBalance",
    chainId: bsc.id,
    watch: true,
    args: [userAddress as Hash],
  });

  const { data: timeLeft } = useContractRead({
    address: GovTrotelStakingAddress as Hash,
    abi: govTrotelStakingABI,
    functionName: "getTimeUntilWithdrawal",
    chainId: bsc.id,
    watch: true,
    args: [userAddress as Hash],
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
    enabled: true,
    onSuccess(data) {
      console.log("Success", data);
    },
  });

  const stakingFixedValue = debouncedValue === "" ? "0" : debouncedValue;

  const parsedStakingValue = isNaN(parseFloat(stakingFixedValue))
    ? "0"
    : stakingFixedValue;

  const stakingValueInEther = parseEther(parsedStakingValue);

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
    enabled: true,
    onSuccess(data) {
      console.log("Success", data);
    },
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
    account: userAddress as Hash,
    chainId: bsc.id,
    enabled: true,
    onSuccess(data) {
      console.log("Success", data);
    },
  });

  const {
    write: withdraw,
    isSuccess: successWithdraw,
    isLoading: withdrawLoading,
    isError: withdrawError,
  } = useContractWrite(withdrawConfig);

  useEffect(() => {
    if (!approveLoading && !stakeLoading && !withdrawLoading) {
      const timeout = setTimeout(() => {
        setWarningMessage("");
      }, 5000);
      return () => clearTimeout(timeout);
    }

    const timeout = setTimeout(() => {
      setInformationMessage("");
    }, 5000);

    return () => clearTimeout(timeout);
  }, [approveLoading, stakeLoading, warningMessage, withdrawLoading]);

  useEffect(() => {
    if (approveLoading || stakeLoading || withdrawLoading) {
      setWarningMessage("Transaction in progress...");
    }

    if (approveError || stakeError || withdrawError) {
      setWarningMessage("Transaction error!");
    }
  }, [
    approveError,
    approveLoading,
    stakeError,
    stakeLoading,
    withdrawError,
    withdrawLoading,
  ]);

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

    if (parseFloat(timeLeft?.toString() as string) > 0) {
      setWarningMessage("Staking duration is not finished.");
      return;
    }

    setWarningMessage("");

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

    setWarningMessage("");
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

  const convertTimeToDays = (timeInSeconds: string) => {
    const secondsInDay = 86400;
    return Math.floor(parseFloat(timeInSeconds) / secondsInDay);
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
          Stake & Earn
        </h2>
        <div className="flex flex-col mt-4 gap-6">
          <div className="flex flex-wrap gap-4">
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
            <button className="border border-gray-900/10 dark:border-gray-100/10 bg-gray-50 dark:bg-gray-900 hover:shadow hover:border-gray-900/50 dark:hover:border-gray-100/50 focus:shadow-none focus:border-blue-600 dark:focus:border-blue-200 dark:hover-bg-blue-50 text-sm px-6 py-2 text-gray-900 dark:text-gray-100 rounded-lg font-semibold">
              Claim rewards
            </button>

            <button
              className="border border-gray-900/10 dark:border-gray-100/10 bg-gray-50 dark:bg-gray-900 hover:shadow hover:border-gray-900/50 dark:hover:border-gray-100/50 focus:shadow-none focus:border-blue-600 dark:focus:border-blue-200 dark:hover-bg-blue-50 text-sm px-6 py-2 text-gray-900 dark:text-gray-100 rounded-lg font-semibold"
              onClick={handleWithdraw}
            >
              Withdraw
            </button>
          </div>
          {warningMessage !== "" &&
            !approveError &&
            !approveLoading &&
            !withdrawError &&
            !withdrawLoading &&
            !stakeError &&
            !stakeLoading && (
              <span className="animate__animated animate__fadeIn text-red-600 dark:text-red-200">
                {warningMessage}
              </span>
            )}
          {informationMessage !== "" && (
            <span className="animate__animated animate__fadeIn text-yellow-600 dark:text-yellow-200">
              {informationMessage}
            </span>
          )}
          {approveLoading && (
            <span className="animate__animated animate__fadeIn text-blue-600 dark:text-blue-200">
              {warningMessage}
            </span>
          )}
          {approveError && (
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
              {warningMessage}
            </span>
          )}
          {stakeError && (
            <span className="animate__animated animate__fadeIn text-red-600 dark:text-red-200">
              {warningMessage}
            </span>
          )}
          {successStake && (
            <span className="animate__animated animate__fadeIn text-green-600 dark:text-green-200">
              You staked {stakedValue} TrotelCoin!
            </span>
          )}
          {withdrawLoading && (
            <span className="animate__animated animate__fadeIn text-blue-600 dark:text-blue-200">
              {warningMessage}
            </span>
          )}
          {withdrawError && (
            <span className="animate__animated animate__fadeIn text-red-600 dark:text-red-200">
              {warningMessage}
            </span>
          )}
          {successWithdraw && (
            <span className="animate__animated animate__fadeIn text-green-600 dark:text-green-200">
              You withdrew your TrotelCoin and got
              {(parseFloat(govBalance?.toString() as string) * 1e-9)
                .toFixed(0)
                .toString()}{" "}
              (Gwei) !
            </span>
          )}
        </div>
        <h2 className="font-semibold mt-10 text-gray-900 dark:text-gray-100">
          Staking dashboard
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 justify-evenly sm:justify-start mt-4 items-center gap-4 w-full">
          <div className="flex flex-col items-center justify-center gap-1 p-2 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-900/10 dark:border-gray-100/10 hover:border-gray-900/50 dark:hover:border-gray-100/50">
            <h2 className="font-semibold text-xl md:text-6xl text-blue-600 dark:text-blue-200">
              {stakingBalance === undefined
                ? "0"
                : (parseFloat(stakingBalance?.toString() as string) * 1e-18)
                    .toFixed(0)
                    .toString()}
            </h2>
            <p className="text-center text-xs md:text-sm text-gray-900 dark:text-gray-100">
              TROTEL
            </p>
          </div>
          <div className="flex flex-col items-center justify-center gap-1 p-2 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-900/10 dark:border-gray-100/10 hover:border-gray-900/50 dark:hover:border-gray-100/50">
            <h2 className="font-semibold text-xl md:text-6xl text-blue-600 dark:text-blue-200">
              {govBalance === undefined
                ? "0"
                : (
                    (parseFloat(govBalance?.toString() as string) +
                      parseFloat(govRewards?.toString() as string)) *
                    1e-9
                  )
                    .toFixed(0)
                    .toString()}
            </h2>
            <p className="text-center text-xs md:text-sm text-gray-900 dark:text-gray-100">
              govTROTEL <span className="text-xs">(Gwei)</span>
            </p>
          </div>
          <div className="flex flex-col items-center justify-center gap-1 p-2 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-900/10 dark:border-gray-100/10 hover:border-gray-900/50 dark:hover:border-gray-100/50">
            <h2 className="font-semibold text-xl md:text-6xl text-blue-600 dark:text-blue-200">
              {timeLeft === undefined
                ? "0"
                : convertTimeToDays(timeLeft?.toString() as string)
                    .toFixed(0)
                    .toString()}
            </h2>
            <p className="text-center text-xs md:text-sm text-gray-900 dark:text-gray-100">
              Days left
            </p>
          </div>
          <div className="flex flex-col items-center justify-center gap-1 p-2 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-900/10 dark:border-gray-100/10 hover:border-gray-900/50 dark:hover:border-gray-100/50">
            <h2 className="font-semibold text-xl md:text-6xl text-blue-600 dark:text-blue-200">
              {totalSupply === undefined
                ? "0"
                : (parseFloat(totalSupply?.toString() as string) * 1e-18)
                    .toFixed(0)
                    .toString()}
            </h2>
            <p className="text-center text-xs md:text-sm text-gray-900 dark:text-gray-100">
              govTROTEL minted
            </p>
          </div>
          <div className="flex flex-col items-center justify-center gap-1 p-2 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-900/10 dark:border-gray-100/10 hover:border-gray-900/50 dark:hover:border-gray-100/50">
            <h2 className="font-semibold text-xl md:text-6xl text-blue-600 dark:text-blue-200">
              {totalLocked === undefined
                ? "0"
                : parseFloat(totalLocked?.formatted).toFixed(0).toString()}
            </h2>
            <p className="text-center text-xs md:text-sm text-gray-900 dark:text-gray-100">
              TROTEL locked
            </p>
          </div>
          <div className="flex flex-col items-center justify-center gap-1 p-2 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-900/10 dark:border-gray-100/10 hover:border-gray-900/50 dark:hover:border-gray-100/50">
            <h2 className="font-semibold text-xl md:text-6xl text-blue-600 dark:text-blue-200">
              5%
            </h2>
            <p className="text-center text-xs md:text-sm text-gray-900 dark:text-gray-100">
              APR
            </p>
          </div>
        </div>
        <h2 className="font-semibold mt-10 text-gray-900 dark:text-gray-100">
          Staking logs
        </h2>
        <div className="bg-gray-50 dark:bg-gray-900 border border-gray-900/10 dark:border-gray-100/10 rounded-lg"></div>
      </div>
    </>
  );
}
