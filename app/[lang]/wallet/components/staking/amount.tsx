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
      <input
        type="text"
        className="bg-gray-200 dark:bg-gray-700 text-sm text-gray-600 dark:text-gray-400 w-full p-2 border border-gray-900/20 dark:border-gray-100/20 rounded-lg"
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

export default Amount;
