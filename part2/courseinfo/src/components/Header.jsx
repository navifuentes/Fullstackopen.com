import React from "react";

const Header = ({ name, first }) => {
  if (first) {
    return <h1>{name}</h1>;
  }
  return <h2>{name}</h2>;
};

export default Header;
