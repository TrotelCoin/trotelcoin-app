import type { Lang } from "@/types/lang";
import React from "react";
import type { Address } from "viem";

const Amount = ({
  lang,
  amount,
  setAmount,
  address,
}: {
  lang: Lang;
  amount: number;
  setAmount: (amount: number) => void;
  address: Address;
}) => {
  return (
    <>
      <div className="flex items-end">
        <input
          type="number"
          className={`[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none bg-transparent text-4xl font-semibold text-gray-900 dark:text-gray-100 w-full px-2 py-0 border-transparent rounded-xl focus:outline-none focus:ring-transparent focus:border-transparent ${
            !address && "cursor-not-allowed"
          }`}
          value={amount < 0 ? 0 : amount}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
          onWheel={(e) => e.preventDefault()}
          placeholder={lang === "en" ? "Amount" : "Montant"}
          disabled={!address}
        />
        <span className="font-semibold text-gray-900 dark:text-gray-100">
          TROTEL
        </span>
      </div>
    </>
  );
};

export default Amount;
