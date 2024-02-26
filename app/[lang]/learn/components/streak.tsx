import { DictType } from "@/types/types";
import { useAddress } from "@thirdweb-dev/react";
import React, { useContext, useEffect, useState } from "react";
import StreakButton from "@/app/[lang]/learn/components/streak/streakButton";
import StreakCount from "@/app/[lang]/learn/components/streak/streakCount";
import MaxStreakCount from "@/app/[lang]/learn/components/streak/maxStreakCount";
import StreakCooldown from "@/app/[lang]/learn/components/streak/streakCooldown";
import StreakContext from "@/app/[lang]/streakContext";

const Streak = ({ dict }: { dict: DictType }) => {
  const [maxStreak, setMaxStreak] = useState<number>(0);

  const address = useAddress();

  const { streak, setStreak, disabled, cooldown } = useContext(StreakContext);

  useEffect(() => {
    const fetchMaxStreak = async () => {
      const result = await fetch(
        `/api/database/userMaxStreak?wallet=${address}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-store",
          },
          cache: "no-store",
        }
      );
      const data = await result.json();
      setMaxStreak(data);
    };

    if (address) {
      fetchMaxStreak();

      const interval = setInterval(fetchMaxStreak, 10000);

      return () => clearInterval(interval);
    } else {
      setMaxStreak(0);
    }
  }, [address, maxStreak]);

  return (
    <>
      <h2 className="font-semibold text-gray-900 dark:text-gray-100 text-xl">
        {typeof dict?.learn !== "string" && <>{dict?.learn.streak}</>}
      </h2>
      <p className="text-gray-700 dark:text-gray-300">
        {address &&
          (disabled
            ? typeof dict?.learn !== "string" && (
                <>{dict?.learn.streakDisabled}</>
              )
            : typeof dict?.learn !== "string" && (
                <>{dict?.learn.streakEnabled}</>
              ))}
        {!address &&
          typeof dict?.modals !== "string" &&
          dict?.modals.connectWallet !== "string" &&
          typeof dict?.modals.connectWallet !== "string" &&
          dict?.modals.connectWallet.message && (
            <>{dict?.modals.connectWallet.message}</>
          )}
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 mt-4 gap-4">
        <StreakButton
          disabled={disabled}
          setStreak={setStreak}
          setMaxStreak={setMaxStreak}
          streak={streak}
        />

        <StreakCount dict={dict} streak={streak} />

        <MaxStreakCount dict={dict} maxStreak={maxStreak} />

        <StreakCooldown dict={dict} cooldown={cooldown} />
      </div>
    </>
  );
};

export default Streak;
