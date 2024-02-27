import { useState } from "react";
import blogService from "../services/blogs";

const BlogForm = ({ blogs, handleNewBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newBlog = {
      title,
      author,
      url,
    };
    setTitle("");
    setAuthor("");
    setUrl("");
    const result = await blogService.create(newBlog);
    handleNewBlog([...blogs, result]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        Title :{" "}
        <input
          type="text"
          name="title"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        Author :{" "}
        <input
          type="text"
          name="author"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url :{" "}
        <input
          type="text"
          name="url"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>
  );
};

export default BlogForm;
