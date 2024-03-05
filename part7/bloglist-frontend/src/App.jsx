import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import blogService from "./services/blogs";

import LoginForm from "./components/login/LoginForm";
import BlogContainer from "./components/blogs/BlogContainer";
import LoginInfo from "./components/login/LoginInfo";
import UsersContainer from "./components/users/UsersContainer";
import User from "./components/users/User";

import { loginUser, setLocalUser } from "./reducers/userReducer";
import { initializeUsers } from "./reducers/usersReducer";
import {
  initializeBlogs,
  createNewBlog,
  deleteOneBlog,
  updateBlogLikes,
} from "./reducers/blogsReducer";
import { setNotification } from "./reducers/notificationReducer";
import { setError } from "./reducers/errorReducer";
import { useSelector, useDispatch } from "react-redux";
import Title from "./components/titles/title";

const App = () => {
  const dispatch = useDispatch();
  let user = useSelector((state) => state.user);
  const users = useSelector((state) => state.users);

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
  //GET DATA FROM API
  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initializeUsers());
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
        <Router>
          <Title type={"h1"} text={"Blogs"} />
          <LoginInfo user={user} handleLogout={handleLogout} />
          <Routes>
            <Route
              path="/"
              element={
                <BlogContainer
                  user={user}
                  handleNewBlog={handleNewBlog}
                  handleUpdateBlog={handleUpdateBlog}
                  handleDeleteBlog={handleDeleteBlog}
                />
              }
            />
            <Route
              path="/users"
              element={
                <UsersContainer
                  user={user}
                  users={users}
                  handleLogout={handleLogout}
                />
              }
            />
            <Route path="/users/:id" element={<User users={users} />} />
          </Routes>
        </Router>
      )}
    </div>
  );
};

export default App;
