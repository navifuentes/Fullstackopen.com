import React from "react";
import Part from "./Part";

const Content = ({ course }) => {
  const { parts } = course;
  return (
    <>
      {parts.map((x) => (
        <Part key={x.id} name={x.name} exercises={x.exercises} />
      ))}
    </>
  );
};

export default Content;
