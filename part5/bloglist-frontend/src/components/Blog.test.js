import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Blog from "./Blog";

//npm test -- components/Blog.test.js

test("renders blog title and author", () => {
  const blog = {
    title: "Component testing is done with react-testing-library",
    author: "Ivano Balic",
    url: "asdasd",
    user: { name: "ivan", username: "navita" },
  };

  render(<Blog blog={blog} />);

  screen.findByText("Component testing is done with react-testing-library");
  screen.findByText("Ivano Balic");
  screen.debug();
});
