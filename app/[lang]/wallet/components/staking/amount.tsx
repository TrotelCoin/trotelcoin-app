import { Lang } from "@/types/types";
import React, { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

const Amount = ({
  lang,
  amount,
  setAmount,
}: {
  lang: Lang;
  amount: number;
  setAmount: (amount: number) => void;
}) => {
  const [inputValue, setInputValue] = useState(amount);
  const [debouncedValue] = useDebounce(inputValue, 500);

  useEffect(() => {
    setAmount(debouncedValue);
  }, [debouncedValue, setAmount]);

  return (
    <>
      <div className="flex items-end">
        <input
          type="number"
          className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none bg-transparent text-4xl font-semibold text-gray-900 dark:text-gray-100 w-full p-2 border-transparent rounded-xl focus:outline-none focus:ring-transparent focus:border-transparent"
          value={amount < 0 ? 0 : amount}
          onChange={(e) => setInputValue(parseFloat(e.target.value))}
          onWheel={(e) => e.preventDefault()}
          placeholder={lang === "en" ? "Amount" : "Montant"}
        />
        <span className="ml-2 mb-2 font-semibold text-gray-900 dark:text-gray-100">
          TROTEL
        </span>
      </div>
    </>
  );
};

export default Amount;
