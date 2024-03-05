import React from "react";
import { useSelector } from "react-redux";

const NotificationMessage = () => {
  const message = useSelector((state) => state.notification);
  if (message === "") {
    return null;
  }
  return (
    <div className="flex flex-col items-center border-2 border-green-600 text-green-950 font-bold text-4xl px-8 py-4 italic">
      {message}
    </div>
  );
};

export default NotificationMessage;
