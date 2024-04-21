"use client";

import React, { useContext, useEffect, useState } from "react";
import { Lang } from "@/types/lang";
import SuccessNotification from "@/app/[lang]/components/modals/successNotification";
import WarningNotification from "@/app/[lang]/components/modals/warningNotification";
import LifeContext from "@/app/[lang]/contexts/lifeContext";
import StreakContext from "@/app/[lang]/contexts/streakContext";
import type { NotificationType } from "@/types/notifications/notifications";
import { addNotificationToQueue } from "@/lib/notifications/notifications";
import PremiumContext from "@/app/[lang]/contexts/premiumContext";

const NotificationProvider = ({
  children,
  lang,
}: {
  children: React.ReactNode;
  lang: Lang;
}) => {
  const [notificationQueue, setNotificationQueue] = useState<
    NotificationType[]
  >([]);
  const [currentNotification, setCurrentNotification] =
    useState<NotificationType | null>(null);
  const [isNotificationShowing, setIsNotificationShowing] =
    useState<boolean>(false);

  const { lifeResetMessage } = useContext(LifeContext);
  const { streakResetMessage, streakMessage, lostStreak } =
    useContext(StreakContext);
  const { isEarly } = useContext(PremiumContext);

  useEffect(() => {
    if (lostStreak) {
      addNotificationToQueue("lostStreak", setNotificationQueue);
    } else if (streakResetMessage) {
      addNotificationToQueue("streakResetMessage", setNotificationQueue);
    }
    if (lifeResetMessage) {
      addNotificationToQueue("lifeResetMessage", setNotificationQueue);
    }
    if (streakMessage) {
      addNotificationToQueue("streakUpdated", setNotificationQueue);
    }
  }, [lifeResetMessage, streakResetMessage, streakMessage, lostStreak]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isNotificationShowing && notificationQueue.length > 0) {
        setCurrentNotification(notificationQueue[0]);
        setNotificationQueue((prevQueue) => prevQueue.slice(1));
        setIsNotificationShowing(true);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [notificationQueue, isNotificationShowing]);

  return (
    <>
      <>{children}</>

      {isEarly && ( // to change
        <>
          <SuccessNotification
            title={lang === "en" ? "Your lives" : "Vos vies"}
            display={currentNotification === "lifeResetMessage"}
            message={
              lang === "en"
                ? "You have all your lives!"
                : "Vous avez toutes vos vies!"
            }
            lang={lang}
            onDismiss={() => setIsNotificationShowing(false)}
          />
          <SuccessNotification
            title={lang === "en" ? "Your streak" : "Votre série"}
            display={currentNotification === "streakResetMessage"}
            message={
              lang === "en"
                ? "You can do your streak!"
                : "Vous pouvez faire vos flammes!"
            }
            lang={lang}
            onDismiss={() => setIsNotificationShowing(false)}
          />
          <WarningNotification
            title={lang === "en" ? "Streak lost" : "Série perdue"}
            message={
              lang === "en"
                ? "You have lost your streak."
                : "Vous avez perdu votre série."
            }
            lang={lang}
            display={currentNotification === "lostStreak"}
            onDismiss={() => setIsNotificationShowing(false)}
          />
        </>
      )}
    </>
  );
};

export default NotificationProvider;
