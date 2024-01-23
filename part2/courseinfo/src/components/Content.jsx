import React from "react";
import Part from "./Part";

const Content = ({ courses }) => {
  const total = courses.reduce((s, course) => {
    return s + course.exercises;
  }, 0);

  return (
    <>
      {courses.map((x) => (
        <Part key={x.id} name={x.name} exercises={x.exercises} />
      ))}
      <strong>total of {total} exercises</strong>
    </>
  );
};

export default Content;
