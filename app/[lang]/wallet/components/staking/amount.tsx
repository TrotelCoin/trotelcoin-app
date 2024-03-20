import { Lang } from "@/types/types";
import React from "react";

const Amount = ({
  lang,
  amount,
  setAmount,
}: {
  lang: Lang;
  amount: number;
  setAmount: (amount: number) => void;
}) => {
  return (
    <>
      <div className="flex items-end">
        <input
          type="number"
          className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none bg-transparent text-4xl font-semibold text-gray-900 dark:text-gray-100 w-full p-0 border-transparent rounded-xl focus:outline-none focus:ring-transparent focus:border-transparent"
          value={amount < 0 ? 0 : amount}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
          onWheel={(e) => e.preventDefault()}
          placeholder={lang === "en" ? "Amount" : "Montant"}
        />
        <span className="font-semibold text-gray-900 dark:text-gray-100">
          TROTEL
        </span>
      </div>
    </>
  );
};

export default Amount;
