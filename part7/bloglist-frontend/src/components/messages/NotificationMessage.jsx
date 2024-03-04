import React from "react";
import { useSelector } from "react-redux";

const NotificationMessage = () => {
  const message = useSelector((state) => state.notification);
  if (message === "") {
    return null;
  }
  return <div className="notification">{message}</div>;
};

export default NotificationMessage;
