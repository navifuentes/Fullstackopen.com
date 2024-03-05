import React from "react";

const Title = ({ type, text }) => {
  if (type === "h1") {
    return <h1 className="text-8xl my-8">{text}</h1>;
  } else if (type === "h2") {
    return <h2 className="text-5xl my-4 font-bold">{text}</h2>;
  } else if (type === "h3") {
    return <h3 className="text-2xl my-1 font-medium">{text}</h3>;
  }
};

export default Title;
