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

  const { lifeResetMessage } = useContext(LifeContext);
  const { streakResetMessage } = useContext(StreakContext);
  const { isLoggedIn } = useContext(UserContext);

  useEffect(() => {
    if (lifeResetMessage) {
      setNotificationQueue((prevQueue) => [...prevQueue, "lifeResetMessage"]);
    }
    if (streakResetMessage) {
      setNotificationQueue((prevQueue) => [...prevQueue, "streakResetMessage"]);
    }
    if (!isLoggedIn) {
      setNotificationQueue((prevQueue) => [...prevQueue, "notLoggedIn"]);
    }
    if (isLoggedIn) {
      setNotificationQueue((prevQueue) => [...prevQueue, "loggedIn"]);
    }
  }, [lifeResetMessage, streakResetMessage, isLoggedIn]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (notificationQueue.length > 0) {
        setCurrentNotification(notificationQueue[0]);
        setNotificationQueue((prevQueue) => prevQueue.slice(1));
      }
    }, 2500);

    return () => clearInterval(interval);
  }, [notificationQueue]);

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
      />
      <WarningNotification
        title={lang === "en" ? "Not connected" : "Non connecté"}
        message={
          lang === "en" ? "You are not connected." : "Vous n'êtes pas connecté."
        }
        lang={lang}
        display={currentNotification === "notLoggedIn"}
      />
      <SuccessNotification
        title={lang === "en" ? "Connected" : "Connecté"}
        message={lang === "en" ? "You are connected." : "Vous êtes connecté."}
        lang={lang}
        display={currentNotification === "loggedIn"}
      />
    </>
  );
};

export default NotificationProvider;
