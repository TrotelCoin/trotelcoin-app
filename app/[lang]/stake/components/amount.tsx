import { trotelCoinAddress } from "@/data/web3/addresses";
import type { Lang } from "@/types/language/lang";
import React, { useEffect, useState } from "react";
import type { Address } from "viem";
import { polygon } from "viem/chains";
import { useBalance, useBlockNumber } from "wagmi";
import { roundPrice } from "@/utils/price/roundPrice";

const Amount = ({
  lang,
  amount,
  setAmount,
  address,
  isMax,
  setIsMax,
  trotelPrice,
  APR,
  stakingPeriod
}: {
  lang: Lang;
  amount: number;
  setAmount: React.Dispatch<React.SetStateAction<number | undefined>>;
  address: Address;
  isMax: boolean;
  setIsMax: React.Dispatch<React.SetStateAction<boolean>>;
  trotelPrice: number;
  APR: number;
  stakingPeriod: number;
}) => {
  const [expectedEarnings, setExpectedEarnings] = useState<number | null>(null);

  const { data: blockNumber } = useBlockNumber({
    watch: true,
    chainId: polygon.id
  });

  const { data: balance, refetch } = useBalance({
    chainId: polygon.id,
    token: trotelCoinAddress,
    address: address
  });

  useEffect(() => {
    refetch();
  }, [blockNumber, refetch]);

  useEffect(() => {
    if (amount && address) {
      const max = Number(balance?.formatted) * 0.999999;

      if (amount === max) {
        setIsMax(true);
      } else {
        setIsMax(false);
      }
    } else {
      setIsMax(false);
    }
  }, [amount, balance, address, setIsMax]);

  const setMax = () => {
    const max = Number(balance?.formatted) * 0.999999;
    setAmount(max);
  };

  const calculateExpectedEarnings = (
    amount: number,
    APR: number,
    days: number
  ) => {
    const dailyRate = APR / 365 / 100;
    return amount * dailyRate * days;
  };

  useEffect(() => {
    if (amount && APR && stakingPeriod) {
      const expectedEarnings = calculateExpectedEarnings(
        amount,
        APR,
        stakingPeriod
      );
      setExpectedEarnings(expectedEarnings);
    } else {
      setExpectedEarnings(0);
    }
  }, [amount, APR, stakingPeriod]);

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex items-end gap-2">
          <input
            type="number"
            className={`w-full rounded-xl border-transparent bg-transparent px-2 py-0 text-4xl font-semibold text-gray-900 [appearance:textfield] focus:border-transparent focus:outline-none focus:ring-transparent dark:text-gray-100 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none ${
              !address && "cursor-not-allowed"
            }`}
            value={amount ?? ""}
            onChange={(e) => {
              setAmount(Number(e.target.value));
            }}
            onWheel={(e) => (e.target as HTMLInputElement).blur()}
            placeholder={lang === "en" ? "Amount" : "Montant"}
            disabled={!address}
          />

          <span className="font-semibold text-gray-900 dark:text-gray-100">
            TROTEL
          </span>
          {!isMax && Number(balance?.formatted) > 0 && (
            <button
              onClick={() => setMax()}
              className="cursor-pointer text-sm text-blue-500 hover:text-blue-400 dark:text-blue-300 dark:hover:text-blue-400"
            >
              {lang === "en" ? "Max" : "Max"}
            </button>
          )}
        </div>

        <div className="flex items-center">
          <p className="text-sm text-gray-900 dark:text-gray-100">
            {lang === "en" ? (
              <>
                You&apos;re going to stake{" "}
                <span className="font-semibold">
                  ${roundPrice(trotelPrice * amount)} TROTEL
                </span>{" "}
                that will earn you{" "}
                <span className="font-semibold">
                  ${roundPrice((expectedEarnings as number) * trotelPrice)}{" "}
                  TROTEL
                </span>{" "}
                after a period of{" "}
                <span className="font-semibold">{stakingPeriod} days</span>.
              </>
            ) : (
              <>
                Vous allez staker{" "}
                <span className="font-semibold">
                  ${roundPrice(trotelPrice * amount)} TROTEL
                </span>{" "}
                et vous gagnerez{" "}
                <span className="font-semibold">
                  ${roundPrice((expectedEarnings as number) * trotelPrice)}{" "}
                  TROTEL
                </span>{" "}
                après une période de{" "}
                <span className="font-semibold">{stakingPeriod} jours</span>.
              </>
            )}
          </p>
        </div>
      </div>
    </>
  );
};

export default Amount;
