import { useState } from "react";
import Blog from "./Blog";
import BlogForm from "./BlogForm";
import Notification from "./messages/NotificationMessage";
import Error from "./messages/ErrorMessage";
import Togglable from "./Togglable";

const BlogContainer = ({ user, blogs, handleNewBlog, handleLogout }) => {
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
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>

      <Togglable>
        <BlogForm
          blogs={blogs}
          handleNewBlog={handleNewBlog}
          handleNotificationMessage={handleNotificationMessage}
          handleErrorMessage={handleErrorMessage}
        />
      </Togglable>
      <br />

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </>
  );
};

export default BlogContainer;
