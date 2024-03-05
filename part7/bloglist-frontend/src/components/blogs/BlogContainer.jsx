import BlogForm from "./BlogForm";
import { Link } from "react-router-dom";

const BlogContainer = ({ user, blogs, handleNewBlog }) => {
  return (
    <>
      <BlogForm user={user} handleNewBlog={handleNewBlog} />

      <br />

      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Link
            className="my-1 px-5 border-2 border-black"
            key={blog.id}
            to={`blogs/${blog.id}`}
          >
            {blog.title}, by {blog.author}
          </Link>
        ))}
    </>
  );
};

export default BlogContainer;
