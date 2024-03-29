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
  const [isNotificationShowing, setIsNotificationShowing] =
    useState<boolean>(false);

  const { lifeResetMessage } = useContext(LifeContext);
  const { streakResetMessage, streakMessage } = useContext(StreakContext);
  const { isLoggedIn } = useContext(UserContext);

  useEffect(() => {
    const addNotificationToQueue = (notification: NotificationType) => {
      setNotificationQueue((prevQueue) => {
        if (!prevQueue.includes(notification)) {
          return [...prevQueue, notification];
        } else {
          return prevQueue;
        }
      });
    };

    if (isLoggedIn) {
      addNotificationToQueue("loggedIn");
    }
    if (!isLoggedIn) {
      addNotificationToQueue("notLoggedIn");
    }
    if (lifeResetMessage) {
      addNotificationToQueue("lifeResetMessage");
    }
    if (streakResetMessage) {
      addNotificationToQueue("streakResetMessage");
    }
    if (streakMessage) {
      addNotificationToQueue("streakUpdated");
    }
  }, [lifeResetMessage, streakResetMessage, isLoggedIn]);

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
      <SuccessNotification
        title={lang === "en" ? "Connected" : "Connecté"}
        message={lang === "en" ? "You are connected." : "Vous êtes connecté."}
        lang={lang}
        display={currentNotification === "loggedIn"}
        onDismiss={() => setIsNotificationShowing(false)}
      />
      <SuccessNotification
        title={lang === "en" ? "Streak updated" : "Série mise à jour"}
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
