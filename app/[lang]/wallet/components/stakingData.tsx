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
    if (balance) {
      setAvailableTrotelCoins(
        parseFloat(parseFloat(balance.displayValue).toFixed(2))
      );
    }
  }, [balance]);

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
    if (getUserStakingData) {
      setEarnedTrotelCoins(getUserStakingData[0].toString());
      setTimeLeft(getUserStakingData[1].toString());
    }
  }, [getUserStakingData]);

  useEffect(() => {
    if (getStakingData) {
      setStakedTrotelCoins(getStakingData[0].toString());
    }
  }, [getStakingData]);

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