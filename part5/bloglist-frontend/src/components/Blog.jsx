import { useEffect, useState } from "react";
import Togglable from "./Togglable";
import blogService from "../services/blogs";

const Blog = ({ blog, user, getBlogsInDB }) => {
  const [updatedBlog, setUpdatedBlog] = useState({});

  useEffect(() => {
    updateBlogToDB(updateBlog);
  }, [updatedBlog]);

  const updateBlog = async () => {
    setUpdatedBlog({
      ...blog,
      likes: blog.likes + 1,
    });
    //setBlogsLikes(blogsLikes + 1);
    console.log("updateBlog", updatedBlog);
  };
  const updateBlogToDB = async (b) => {
    const result = await blogService.update(blog.id, updatedBlog);
    await getBlogsInDB(user);
    console.log(result);
  };
  const deleteBlogToDB = async (b) => {
    window.confirm(`Remove ${b.title} by ${b.author}`)
      ? await blogService.remove(blog.id)
      : null;
    await getBlogsInDB(user);
  };

  return (
    <div className="blog">
      {blog.title} {blog.author}
      <Togglable>
        {blog.url}
        <br />
        {blog.likes} <button onClick={() => updateBlog()}>Like</button>
        <br />
        {blog.user.name}
        <br />
        <br />
        <button onClick={() => deleteBlogToDB(blog)}>remove</button>
        <br />
      </Togglable>
    </div>
  );
};

export default Blog;
