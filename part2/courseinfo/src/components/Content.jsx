import React from "react";
import Part from "./Part";

const Content = ({ course }) => {
  const { parts } = course;

  const total = parts.reduce((s, part) => {
    return s + part.exercises;
  }, 0);

  return (
    <>
      {parts.map((x) => (
        <Part key={x.id} name={x.name} exercises={x.exercises} />
      ))}
      <strong>total of {total} exercises</strong>
    </>
  );
};

export default Content;
