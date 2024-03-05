import { useState, useRef } from "react";
import Togglable from "../reciclables/Togglable";
import useField from "../../hooks/useField";

const BlogForm = ({ handleNewBlog }) => {
  const title = useField("text");
  const author = useField("text");
  const url = useField("text");
  const blogFormRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    blogFormRef.current.toggleVisibility();
    const newBlog = {
      title,
      author,
      url,
    };
    setTitle("");
    setAuthor("");
    setUrl("");
    handleNewBlog(newBlog);
  };

  return (
    <Togglable ref={blogFormRef}>
      <form className="flex flex-col items-center" onSubmit={handleSubmit}>
        <div className="my-2">
          Title :{" "}
          <input
            className="border-2 border-x-slate-600"
            {...title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div className="my-2">
          Author :{" "}
          <input
            className="border-2 border-x-slate-600"
            {...author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div className="my-2">
          url :{" "}
          <input
            className="border-2 border-x-slate-600"
            {...url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button
          className="w-20 rounded-full bg-blue-600 text-white "
          id="create-button"
          type="submit"
        >
          create
        </button>
      </form>
    </Togglable>
  );
};

export default BlogForm;
