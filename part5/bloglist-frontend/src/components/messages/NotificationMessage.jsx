import React from "react";

const NotificationMessage = ({ message }) => {
  if (message === null) {
    return null;
  }
  return <div className="notification">{message}</div>;
};

export default NotificationMessage;
