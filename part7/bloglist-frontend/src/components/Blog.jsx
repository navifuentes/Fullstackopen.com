import Togglable from "./Togglable";

const Blog = ({ blog, user, handleUpdateBlog, handleDeleteBlog }) => {
  const deleteBlogToDB = (b) => {
    if (window.confirm(`Remove ${b.title} by ${b.author}`)) {
      handleDeleteBlog(b);
    }
  };

  return (
    <div className="blog">
      {blog.title} {blog.author}
      <Togglable>
        <div id="url">{blog.url}</div>
        <div id="likes">{blog.likes}</div>{" "}
        <div>
          <button className="likeButton" onClick={() => handleUpdateBlog(blog)}>
            Like
          </button>
        </div>
        <div>{blog.user.name}</div>
        {user.username === blog.user.username ? (
          <div>
            <button id="remove-button" onClick={() => deleteBlogToDB(blog)}>
              remove
            </button>
          </div>
        ) : null}
      </Togglable>
    </div>
  );
};

export default Blog;
