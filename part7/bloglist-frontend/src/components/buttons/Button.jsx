import React from "react";

const Button = ({ text, handleClick }) => {
  return (
    <button
      className="rounded-full bg-blue-600 w-20 text-white hover:border-2 border-black"
      onClick={handleClick}
    >
      {text}
    </button>
  );
};

export default Button;
