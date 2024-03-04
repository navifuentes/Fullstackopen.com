import Togglable from "./Togglable";
import blogService from "../services/blogs";

const Blog = ({ blog, user, getBlogsInDB, handleUpdateBlog }) => {
  const updateBlog = async () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    };
    await handleUpdateBlog(updatedBlog);
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
        <div id="url">{blog.url}</div>
        <div id="likes">{blog.likes}</div>{" "}
        <div>
          <button className="likeButton" onClick={() => updateBlog()}>
            Like
          </button>
        </div>
        <div>{blog.user.name}</div>
        {user.username === blog.user.username ? <div>
          <button id="remove-button" onClick={() => deleteBlogToDB(blog)}>
            remove
          </button>
        </div> : null}
        
      </Togglable>
    </div>
  );
};

export default Blog;
