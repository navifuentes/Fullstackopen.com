import { useState } from "react";
import Blog from "./Blog";
import BlogForm from "./forms/BlogForm";
import Notification from "./messages/NotificationMessage";
import Error from "./messages/ErrorMessage";

const BlogContainer = ({
  user,
  blogs,
  handleNewBlog,
  handleLogout,
  getBlogsInDB,
  handleUpdateBlog,
}) => {
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleNotificationMessage = (message) => {
    setNotificationMessage(message);
  };
  const handleErrorMessage = (message) => {
    setErrorMessage(message);
  };

  return (
    <>
      <h2>Blogs</h2>
      <Notification message={notificationMessage} />
      <Error message={errorMessage} />

      <p>
        {user.name} logged in <button id="logout-button" onClick={handleLogout}>log out</button>
      </p>

      <BlogForm
        user={user}
        handleNewBlog={handleNewBlog}
        handleNotificationMessage={handleNotificationMessage}
        handleErrorMessage={handleErrorMessage}
      />

      <br />

      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            user={user}
            blog={blog}
            getBlogsInDB={getBlogsInDB}
            handleUpdateBlog={handleUpdateBlog}
          />
        ))}
    </>
  );
};

export default BlogContainer;
