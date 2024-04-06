import { NotificationType } from "@/types/notifications/notifications";

export const addNotificationToQueue = (
  notification: NotificationType,
  setNotificationQueue: React.Dispatch<React.SetStateAction<NotificationType[]>>
) => {
  setNotificationQueue((prevQueue) => {
    if (!prevQueue.includes(notification)) {
      return [...prevQueue, notification];
    } else {
      return prevQueue;
    }
  });
};
