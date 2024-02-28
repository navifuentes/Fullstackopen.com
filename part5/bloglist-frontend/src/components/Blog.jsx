import { useEffect, useState } from "react";
import Togglable from "./Togglable";

const Blog = ({ blog }) => {
  const [blogLikes, setBlogLikes] = useState(0);

  useEffect(() => {
    setBlogLikes(blog.likes);
  }, []);

  return (
    <div className="blog">
      {blog.title} {blog.author}
      <Togglable>
        {blog.url}
        <br />
        {blog.likes} <button>Like</button>
        <br />
        {blog.user.name}
      </Togglable>
    </div>
  );
};

export default Blog;
