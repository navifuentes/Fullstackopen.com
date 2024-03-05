import { useState, useRef } from "react";
import Togglable from "../reciclables/Togglable";

const BlogForm = ({ handleNewBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
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
      <form onSubmit={handleSubmit}>
        <div>
          Title :{" "}
          <input
            id="title"
            type="text"
            name="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          Author :{" "}
          <input
            id="author"
            type="text"
            name="author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url :{" "}
          <input
            id="url"
            type="text"
            name="url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button id="create-button" type="submit">
          create
        </button>
      </form>
    </Togglable>
  );
};

export default BlogForm;
