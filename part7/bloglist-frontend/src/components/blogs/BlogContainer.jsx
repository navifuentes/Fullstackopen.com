import Blog from "./Blog";
import BlogForm from "./BlogForm";


import { useSelector } from "react-redux";

const BlogContainer = ({
  user,
  handleNewBlog,
  handleUpdateBlog,
  handleDeleteBlog,
}) => {
  const blogs = useSelector((state) => state.blogs);

  return (
    <>
      <BlogForm user={user} handleNewBlog={handleNewBlog} />

      <br />

      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            user={user}
            blog={blog}
            handleUpdateBlog={handleUpdateBlog}
            handleDeleteBlog={handleDeleteBlog}
          />
        ))}
    </>
  );
};

export default BlogContainer;
