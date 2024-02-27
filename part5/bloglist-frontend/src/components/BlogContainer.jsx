import React from "react";
import Blog from "./Blog";
import BlogForm from "./BlogForm";

const BlogContainer = ({ user, blogs, handleNewBlog, handleLogout }) => {
  return (
    <>
      <h2>Blogs</h2>
      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>

      <BlogForm blogs={blogs} handleNewBlog={handleNewBlog} />

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </>
  );
};

export default BlogContainer;
