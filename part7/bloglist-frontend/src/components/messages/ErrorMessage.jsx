import React from "react";
import { useSelector } from "react-redux";

const ErrorMessage = () => {
  const message = useSelector((state) => state.error);
  if (message === "") {
    return null;
  }
  return (
    <div className="flex flex-col items-center border-2 border-red-600 text-red-950 font-bold text-4xl px-8 py-4 italic">
      {message}
    </div>
  );
};

export default ErrorMessage;
