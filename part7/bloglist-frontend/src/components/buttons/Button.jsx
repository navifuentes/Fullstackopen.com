import React from "react";

const Button = ({ type, text, handleClick }) => {
  if (type === "small") {
    return (
      <button
        className="w-10 h-6 rounded-xl bg-blue-600 text-white hover:border-2 border-black"
        onClick={handleClick}
      >
        {text}
      </button>
    );
  }

  return (
    <button
      className="w-20 rounded-full bg-blue-600 text-white hover:border-2 border-black"
      onClick={handleClick}
    >
      {text}
    </button>
  );
};

export default Button;
