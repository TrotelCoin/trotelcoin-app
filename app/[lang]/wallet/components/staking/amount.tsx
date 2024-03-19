import { Lang } from "@/types/types";
import React from "react";

const Amount = ({
  lang,
  amount,
  setAmount,
  amountError,
}: {
  lang: Lang;
  amount: number;
  setAmount: (amount: number) => void;
  amountError: string;
}) => {
  return (
    <>
      <div className="flex items-end">
        <input
          type="number"
          className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none bg-transparent text-4xl font-semibold text-gray-900 dark:text-gray-100 w-full p-2 border-transparent rounded-xl focus:outline-none focus:ring-transparent focus:border-transparent"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
          onWheel={(e) => e.preventDefault()}
          placeholder={lang === "en" ? "Amount" : "Montant"}
        />
        <span className="ml-2 mb-2 font-semibold text-gray-900 dark:text-gray-100">
          TROTEL
        </span>
      </div>
      {amountError && (
        <div className="mt-2">
          <span className="text-red-500 dark:text-red-300">{amountError}</span>
        </div>
      )}
    </>
  );
};

export default Amount;
