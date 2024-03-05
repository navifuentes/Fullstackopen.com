import { useEffect } from "react";

import blogService from "./services/blogs";
import LoginForm from "./components/forms/LoginForm";
import BlogContainer from "./components/BlogContainer";

import { loginUser, setLocalUser } from "./reducers/userReducer";
import {
  initializeBlogs,
  createNewBlog,
  deleteOneBlog,
  updateBlogLikes,
} from "./reducers/blogsReducer";
import { setNotification } from "./reducers/notificationReducer";
import { setError } from "./reducers/errorReducer";
import { useSelector, useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();
  let user = useSelector((state) => state.user);

  //EFFECT HOOKS
  //GET USER FROM LOCAL STORAGE
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      user = JSON.parse(loggedUserJSON);
      dispatch(setLocalUser(user));
      blogService.setToken(user.token);
    }
  }, []);
  //GET USERS'S BLOGS FROM API
  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  //FUNCTIONS
  //LOGIN HANDLERS
  const handleLogin = async (credentials) => {
    const response = await dispatch(loginUser(credentials));
    if (response === undefined) {
      console.log("logging in");
    } else if (response.name === "AxiosError") {
      dispatch(setError("wrong credentials", 5));
    }
  };
  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    dispatch(setLocalUser(null));
  };
  //BLOGS HANDLERS
  const handleNewBlog = (blog) => {
    dispatch(createNewBlog(blog));
    dispatch(setNotification(`new blog created : ${blog.title}`, 5));
  };
  const handleDeleteBlog = (blog) => {
    dispatch(deleteOneBlog(blog));
    dispatch(setNotification(`you deleted blog : ${blog.title}`, 5));
  };
  const handleUpdateBlog = (blog) => {
    dispatch(updateBlogLikes(blog));
    dispatch(setNotification(`you voted : ${blog.title}`, 5));
  };

  //RETURN
  return (
    <div>
      {user === null ? (
        <LoginForm handleSubmit={handleLogin} />
      ) : (
        <BlogContainer
          user={user}
          handleNewBlog={handleNewBlog}
          handleLogout={handleLogout}
          handleUpdateBlog={handleUpdateBlog}
          handleDeleteBlog={handleDeleteBlog}
        />
      )}
    </div>
  );
};

export default App;
