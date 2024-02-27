import React, { useContext } from "react";
import { Address } from "viem";
import { useAddress } from "@thirdweb-dev/react";
import StreakContext from "@/app/[lang]/streakContext";

const StreakButton = ({ disabled }: { disabled: boolean }) => {
  const address = useAddress();

  const { updateStreak } = useContext(StreakContext);

  return (
    <>
      <button
        className={`${
          disabled
            ? "cursor-not-allowed"
            : "hover:border-gray-900/50 dark:hover:border-gray-100/50 active:border-blue-500 dark:active:border-blue-300"
        } bg-gray-100 dark:bg-gray-800 border backdrop-blur-xl border-gray-900/20 dark:border-gray-100/20 text-center rounded-lg px-2 py-10 text-gray-900 dark:text-gray-100`}
        onClick={() => {
          if (!disabled) {
            updateStreak(address as Address);
          }
        }}
      >
        <span className="text-2xl md:text-4xl text-center mx-auto">
          {!address ? "❌" : !disabled ? "🔥" : "⏳"}
        </span>
      </button>
    </>
  );
};

export default StreakButton;
