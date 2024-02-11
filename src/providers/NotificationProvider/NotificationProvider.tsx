import { AlertColor } from "@mui/material";
import React, { ProviderProps, useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const notificationMessageTimeout = 3000;

export type NotificationMessage = {
  id?: string | number;
  severity?: AlertColor;
  text: string;
}

export type NotificationContextType = {
  notifications: NotificationMessage[];
  currentNotification?: NotificationMessage;
  pushNotification: (notification: NotificationMessage) => void;
  nextNotification: () => void;
}

type NotificationProviderProps = Omit<ProviderProps<NotificationContextType>, "value">;

export const NotificationContext = React.createContext<NotificationContextType>({} as NotificationContextType);

function NotificationProvider(props: NotificationProviderProps) {
  const [notifications, setNotifications] = useState<NotificationMessage[]>([]);
  const timeout = useRef<NodeJS.Timeout>();
  const [shouldSetTimeout, setShouldSetTimeout] = useState<boolean>(true);

  // remove oldest notification after timeout
  useEffect(() => {
    if (notifications.length !== 0 && shouldSetTimeout) {
      timeout.current = setTimeout(() => {
        setNotifications(notifications => notifications.slice(1));
        setShouldSetTimeout(true);
      }, notificationMessageTimeout);
      setShouldSetTimeout(false);
    }
  }, [notifications, shouldSetTimeout]);

  const pushNotification = (notification: NotificationMessage) => {
    notification.id ||= uuidv4();
    setNotifications(notifications => [...notifications, notification]);
  };

  const nextNotification = () => {
    clearTimeout(timeout.current);
    setShouldSetTimeout(true);
    setNotifications(notifications => notifications.slice(1));
  };

  return <NotificationContext.Provider value={{
    notifications,
    currentNotification: notifications[0],
    pushNotification,
    nextNotification,
  }} {...props} />;
}

export default NotificationProvider;
