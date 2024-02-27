import { Lang } from "@/types/types";
import React from "react";

const TokenAmount = ({
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
      <input
        type="text"
        className="bg-gray-200 dark:bg-gray-700 text-sm text-gray-700 dark:text-gray-300 w-full p-2 border border-gray-900/10 dark:border-gray-100/10 rounded-lg"
        value={amount}
        onChange={(e) => setAmount(parseFloat(e.target.value))}
        placeholder={lang === "en" ? "Amount" : "Montant"}
      ></input>
      {amountError && (
        <div className="mt-2">
          <span className="text-red-500 dark:text-red-300">{amountError}</span>
        </div>
      )}
    </>
  );
};

export default TokenAmount;
