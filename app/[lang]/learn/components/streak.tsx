import { DictType } from "@/types/types";
import { useAddress } from "@thirdweb-dev/react";
import React, { useEffect, useState } from "react";
import StreakButton from "@/app/[lang]/learn/components/streak/streakButton";
import StreakCount from "@/app/[lang]/learn/components/streak/streakCount";
import MaxStreakCount from "@/app/[lang]/learn/components/streak/maxStreakCount";
import StreakCooldown from "@/app/[lang]/learn/components/streak/streakCooldown";

const Streak = ({ dict }: { dict: DictType }) => {
  const [streak, setStreak] = useState<number>(0);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [lastUpdatedStreak, setLastUpdatedStreak] = useState<string>("");
  const [cooldown, setCooldown] = useState<string>("00:00:00");
  const [maxStreak, setMaxStreak] = useState<number>(0);

  const address = useAddress();

  useEffect(() => {
    const fetchStreak = async () => {
      const result = await fetch(`/api/database/streak?wallet=${address}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });
      const data = await result.json();
      if (Number(data.currentStreak)) {
        setStreak(data.currentStreak);
      }
      setLastUpdatedStreak(data.lastUpdated);
      setDisabled(data.disabled);
    };

    if (address) {
      fetchStreak();

      const interval = setInterval(fetchStreak, 10000);

      return () => clearInterval(interval);
    } else {
      setStreak(0);
      setCooldown("00:00:00");
      setDisabled(false);
    }
  }, [address, streak, maxStreak, disabled]);

  useEffect(() => {
    const fetchMaxStreak = async () => {
      const result = await fetch(
        `/api/database/userMaxStreak?wallet=${address}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
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
  }, [address, streak, maxStreak, disabled]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (lastUpdatedStreak && disabled) {
        const lastUpdated = new Date(lastUpdatedStreak);
        const now = new Date();
        const difference = now.getTime() - lastUpdated.getTime();
        if (difference > 86400000) {
          setCooldown("00:00:00");
        } else {
          const cooldown = 86400000 - difference;
          const cooldownString = new Date(cooldown).toISOString();
          const time = cooldownString.split("T")[1].split(".")[0];
          setCooldown(time);
        }
      } else {
        setCooldown("00:00:00");
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [lastUpdatedStreak, disabled]);

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
