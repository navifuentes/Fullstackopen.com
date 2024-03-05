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
      title: title.value,
      author: author.value,
      url: url.value,
    };
    handleNewBlog(newBlog);
  };

  return (
    <Togglable ref={blogFormRef} text={"create new blog"}>
      <form className="flex flex-col items-center" onSubmit={handleSubmit}>
        <div className="my-2">
          Title : <input className="border-2 border-x-slate-600" {...title} />
        </div>
        <div className="my-2">
          Author : <input className="border-2 border-x-slate-600" {...author} />
        </div>
        <div className="my-2">
          url : <input className="border-2 border-x-slate-600" {...url} />
        </div>
        <button
          className="w-20 rounded-full bg-blue-600 text-white "
          id="create-button"
          type="submit"
        >
          submit
        </button>
      </form>
    </Togglable>
  );
};

export default BlogForm;
