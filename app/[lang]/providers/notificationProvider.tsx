"use client";

import React, { use, useContext, useEffect, useMemo, useState } from "react";
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
      setCurrentNotification("lifeResetMessage");
    }
    if (streakResetMessage) {
      setCurrentNotification("streakResetMessage");
    }
    if (!isLoggedIn) {
      setCurrentNotification("notLoggedIn");
    }
    if (isLoggedIn) {
      setCurrentNotification("loggedIn");
    }
  }, [lifeResetMessage, streakResetMessage, isLoggedIn]);

  useEffect(() => {
    if (!currentNotification && notificationQueue) {
      setCurrentNotification(notificationQueue[0]);
      setNotificationQueue(notificationQueue.slice(1));
    }
  }, [currentNotification, notificationQueue]);

  return (
    <>
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
