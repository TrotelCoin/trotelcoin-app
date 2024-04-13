"use client";

import React, { useContext, useEffect, useState } from "react";
import { Lang } from "@/types/lang";
import SuccessNotification from "@/app/[lang]/components/modals/successNotification";
import WarningNotification from "@/app/[lang]/components/modals/warningNotification";
import FailNotification from "@/app/[lang]/components/modals/failNotification";
import LifeContext from "@/app/[lang]/contexts/lifeContext";
import StreakContext from "@/app/[lang]/contexts/streakContext";
import UserContext from "@/app/[lang]/contexts/userContext";
import type { NotificationType } from "@/types/notifications/notifications";
import { addNotificationToQueue } from "@/lib/notifications/notifications";

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
  const [initialDelay, setInitialDelay] = useState<boolean>(false);

  const { lifeResetMessage } = useContext(LifeContext);
  const { streakResetMessage, streakMessage, lostStreak } =
    useContext(StreakContext);
  const { isLoggedIn } = useContext(UserContext);

  useEffect(() => {
    const delayTimer = setTimeout(() => {
      setInitialDelay(true);
    }, 1000);

    return () => clearTimeout(delayTimer);
  }, []);

  useEffect(() => {
    if (!initialDelay) {
      return;
    }

    if (isLoggedIn) {
      addNotificationToQueue("loggedIn", setNotificationQueue);
    } else {
      addNotificationToQueue("notLoggedIn", setNotificationQueue);
    }

    if (lostStreak) {
      addNotificationToQueue("lostStreak", setNotificationQueue);
    }
    if (lifeResetMessage) {
      addNotificationToQueue("lifeResetMessage", setNotificationQueue);
    }
    if (streakResetMessage) {
      addNotificationToQueue("streakResetMessage", setNotificationQueue);
    }
    if (streakMessage) {
      addNotificationToQueue("streakUpdated", setNotificationQueue);
    }
  }, [
    lifeResetMessage,
    streakResetMessage,
    isLoggedIn,
    streakMessage,
    lostStreak,
    initialDelay,
  ]);

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
        title={lang === "en" ? "Not connected" : "Non connecté"}
        message={
          lang === "en" ? "You are not connected." : "Vous n'êtes pas connecté."
        }
        lang={lang}
        display={currentNotification === "notLoggedIn"}
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
      <SuccessNotification
        title={lang === "en" ? "Connected" : "Connecté"}
        message={lang === "en" ? "You are connected." : "Vous êtes connecté."}
        lang={lang}
        display={currentNotification === "loggedIn"}
        onDismiss={() => setIsNotificationShowing(false)}
      />
      <SuccessNotification
        title={lang === "en" ? "Streak updated" : "Série mise ) jour"}
        message={
          lang === "en"
            ? "Your streak has been updated."
            : "Votre série a été mise à jour."
        }
        lang={lang}
        display={currentNotification === "streakUpdated"}
        onDismiss={() => setIsNotificationShowing(false)}
      />
    </>
  );
};

export default NotificationProvider;
