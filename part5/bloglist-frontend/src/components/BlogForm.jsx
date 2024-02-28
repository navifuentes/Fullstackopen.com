import { useState } from "react";
import blogService from "../services/blogs";

const BlogForm = ({
  user,
  handleNewBlog,
  handleNotificationMessage,
  handleErrorMessage,
}) => {
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
    if (result.name === "AxiosError") {
      handleErrorMessage("Invalid fields value");
      setTimeout(() => {
        handleErrorMessage(null);
      }, 5000);
    } else if (!result.name) {
      const blogsFromDB = await blogService.getAll(user);
      handleNewBlog(blogsFromDB);
      handleNotificationMessage(
        `a new blog with title :${result.title} by ${result.author} has been added`
      );
      setTimeout(() => {
        handleNotificationMessage(null);
      }, 5000);
    }
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
