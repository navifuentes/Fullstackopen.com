import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

//npm test -- components/Blog.test.js

let container;
const user = userEvent.setup();
const handleMock = jest.fn();

beforeEach(() => {
  const blog = {
    title: "Component testing is done with react-testing-library",
    author: "Ivano Balic",
    url: "www.test.js/reactjs",
    user: { name: "ivan", username: "navita" },
  };
  container = render(
    <Blog blog={blog} handleUpdateBlog={handleMock} />
  ).container;
});

test("renders only blog title and author", () => {
  screen.findByText("Component testing is done with react-testing-library");
  screen.findByText("Ivano Balic");
  const div = container.querySelector(".togglableContent");
  expect(div).toHaveStyle("display: none");

  screen.debug();
});
test("renders url and likes when clicking on show button", async () => {
  const button = screen.getByText("show");
  await user.click(button);

  const div = container.querySelector(".togglableContent");
  expect(div).not.toHaveStyle("display: none");

  screen.debug();
});
test("if like button is clicked twice the event handler is called twice", async () => {
  const button = screen.getByText("show");
  await user.click(button);

  const likeButton = container.querySelector(".likeButton");
  await user.dblClick(likeButton);

  expect(handleMock.mock.calls).toHaveLength(2);

  screen.debug();
});
