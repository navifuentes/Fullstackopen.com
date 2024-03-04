import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import BlogForm from "./BlogForm";
import userEvent from "@testing-library/user-event";

//npm test -- components/forms/BlogForm.test.js

test("<BlogForm /> updates parent state and calls onSubmit", async () => {
  const createBlog = jest.fn();
  const user = userEvent.setup();

  render(<BlogForm handleNewBlog={createBlog} />);

  const button = screen.getByText("show");
  await user.click(button);

  const input = screen.getAllByRole("textbox");
  const sendButton = screen.getByText("create");

  await user.type(input[0], "testing a form title...");
  await user.type(input[1], "testing a form user...");
  await user.type(input[2], "testing a form url...");

  await user.click(sendButton);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe("testing a form title...");
  expect(createBlog.mock.calls[0][0].author).toBe("testing a form user...");
  expect(createBlog.mock.calls[0][0].url).toBe("testing a form url...");
});
