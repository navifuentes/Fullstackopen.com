import React from "react";
import Header from "./Header";
import Content from "./Content";

const Course = ({ courses }) => {
  return (
    <>
      <Header first={true} name="Web development curriculum" />
      {courses.map((x) => (
        <div key={x.id}>
          <Header name={x.name} />
          <Content courses={x.parts} />
        </div>
      ))}
    </>
  );
};

export default Course;
