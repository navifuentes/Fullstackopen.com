import { useState } from "react";
import Blog from "./Blog";
import BlogForm from "./BlogForm";
import Notification from "./messages/NotificationMessage";
import Error from "./messages/ErrorMessage";

const BlogContainer = ({
  user,
  blogs,
  handleNewBlog,
  handleLogout,
  getBlogsInDB,
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
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>

      <BlogForm
        user={user}
        handleNewBlog={handleNewBlog}
        handleNotificationMessage={handleNotificationMessage}
        handleErrorMessage={handleErrorMessage}
      />

      <br />

      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          user={user}
          blog={blog}
          getBlogsInDB={getBlogsInDB}
        />
      ))}
    </>
  );
};

export default BlogContainer;
