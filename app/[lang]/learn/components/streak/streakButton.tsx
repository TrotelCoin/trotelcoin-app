import React from "react";
import { Address } from "viem";
import { useAddress } from "@thirdweb-dev/react";

const StreakButton = ({
  disabled,
  setStreak,
  setMaxStreak,
  streak,
}: {
  disabled: boolean;
  setStreak: React.Dispatch<React.SetStateAction<number>>;
  setMaxStreak: React.Dispatch<React.SetStateAction<number>>;
  streak: number;
}) => {
  const address = useAddress();

  const updateStreak = async (address: Address) => {
    const result = await fetch(`/api/database/updateStreak?wallet=${address}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
      },
      cache: "no-store",
    });
    // if success from response is true, then setStreak to streak + 1
    const data = await result.json();
    if (data.success === "Streak updated.") {
      setStreak((streak: number) => streak + 1);
      setMaxStreak((maxStreak: number) => Math.max(maxStreak, streak + 1));
    } else {
      setStreak(0);
      setMaxStreak(0);
    }
  };

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
