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
      if (!currentNotification && notificationQueue.length > 0) {
        setCurrentNotification(notificationQueue[0]);
        setNotificationQueue((prevQueue) => prevQueue.slice(1));
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [currentNotification, notificationQueue]);

  return (
    <>
      <>{children}</>
      {currentNotification === "lifeResetMessage" && (
        <SuccessNotification
          title={lang === "en" ? "Your lives" : "Vos vies"}
          display={true}
          message={
            lang === "en"
              ? "You have all your lives!"
              : "Vous avez toutes vos vies!"
          }
          lang={lang}
        />
      )}
      {currentNotification === "streakResetMessage" && (
        <SuccessNotification
          title={lang === "en" ? "Your streak" : "Votre série"}
          display={true}
          message={
            lang === "en"
              ? "You can do your streak!"
              : "Vous pouvez faire vos flammes!"
          }
          lang={lang}
        />
      )}
      {currentNotification === "notLoggedIn" && (
        <WarningNotification
          title={lang === "en" ? "Not connected" : "Non connecté"}
          message={
            lang === "en"
              ? "You are not connected."
              : "Vous n'êtes pas connecté."
          }
          lang={lang}
          display={true}
        />
      )}
      {currentNotification === "loggedIn" && (
        <SuccessNotification
          title={lang === "en" ? "Connected" : "Connecté"}
          message={lang === "en" ? "You are connected." : "Vous êtes connecté."}
          lang={lang}
          display={true}
        />
      )}
    </>
  );
};

export default NotificationProvider;
