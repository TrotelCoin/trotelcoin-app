import { Lang } from "@/types/types";
import {
  useAddress,
  useBalance,
  useContract,
  useContractRead,
} from "@thirdweb-dev/react";
import React, { useEffect, useState } from "react";
import { trotelCoinAddress, trotelCoinStakingV1 } from "@/data/web3/addresses";
import { Address } from "viem";
import trotelCoinStakingV1ABI from "@/abi/trotelCoinStakingV1";

const StakingData = ({ lang }: { lang: Lang }) => {
  const [stakedTrotelCoins, setStakedTrotelCoins] = useState<number>(0);
  const [earnedTrotelCoins, setEarnedTrotelCoins] = useState<number>(0);
  const [availableTrotelCoins, setAvailableTrotelCoins] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(0);

  const address = useAddress();

  const { data: balance } = useBalance(trotelCoinAddress);

  useEffect(() => {
    if (balance && address) {
      setAvailableTrotelCoins(
        parseFloat(parseFloat(balance.displayValue).toFixed(2))
      );
    } else {
      setAvailableTrotelCoins(0);
    }
  }, [balance, address]);

  const { contract: trotelCoinStakingContract } = useContract(
    trotelCoinStakingV1,
    trotelCoinStakingV1ABI
  );

  const { data: getUserStakingData } = useContractRead(
    trotelCoinStakingContract,
    "getUserStakingDetails",
    [address as Address]
  );

  const { data: getStakingData } = useContractRead(
    trotelCoinStakingContract,
    "stakings",
    [address as Address]
  );

  useEffect(() => {
    if (getUserStakingData && address) {
      const initialTimeLeft = parseFloat(getUserStakingData[1].toString());
      setEarnedTrotelCoins(getUserStakingData[0].toString());
      setTimeLeft(initialTimeLeft);

      const interval = setInterval(() => {
        if (timeLeft >= 0) {
          setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
        } else {
          setTimeLeft(0);
        }
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    } else {
      setTimeLeft(0);
      setEarnedTrotelCoins(0);
    }
  }, [getUserStakingData, address]);

  useEffect(() => {
    if (getStakingData) {
      setStakedTrotelCoins(getStakingData[0].toString());
    } else {
      setStakedTrotelCoins(0);
    }
  }, [getStakingData, address]);

  return (
    <>
      <div className="flex flex-col flex-wrap gap-2">
        <div className="flex justify-between">
          <span>{lang === "en" ? "Available" : "Disponible"}</span>
          <div>
            {availableTrotelCoins} <span className="font-semibold">TROTEL</span>
          </div>
        </div>
        <div className="flex justify-between">
          <span>{lang === "en" ? "Deposit" : "Dépôt"}</span>
          <div>
            {stakedTrotelCoins * 1e-18}{" "}
            <span className="font-semibold">TROTEL</span>
          </div>
        </div>
        <div className="flex justify-between">
          <span>
            {lang === "en" ? "Earned rewards" : "Récompenses gagnées"}
          </span>
          <div>
            {earnedTrotelCoins * 1e-18}{" "}
            <span className="font-semibold">TROTEL</span>
          </div>
        </div>
        <div className="flex justify-between">
          <span>{lang === "en" ? "Time left" : "Temps restant"}</span>
          <div>
            {timeLeft}{" "}
            <span className="font-semibold">
              {lang === "en" ? "seconds" : "secondes"}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default StakingData;
