import React from "react";

const Filter = ({ handleSearch }) => {
  return (
    <>
      filter shown with: <input onChange={handleSearch} />
    </>
  );
};

export default Filter;
