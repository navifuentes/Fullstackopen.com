import { useState, useEffect } from "react";

import blogService from "./services/blogs";
import loginService from "./services/login";
import LoginForm from "./components/forms/LoginForm";
import BlogContainer from "./components/BlogContainer";

import { setNotification } from "./reducers/notificationReducer";
import { setError } from "./reducers/errorReducer";
import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  //EFFECT HOOKS
  //GET USER FROM LOCAL STORAGE
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);
  //GET USERS'S BLOGS FROM API
  useEffect(() => {
    console.log("effect");
    getBlogsInDB(user);
  }, [user]);

  //FUNCTIONS
  const getBlogsInDB = async (u) => {
    user ? setBlogs(await blogService.getAll(u)) : null;
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      console.log("exception", exception);
      dispatch(setError("wrong credentials", 5));
    }
    console.log("logging in with", username, password);
  };
  const handleLogout = async (e) => {
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
  };
  const handleNewBlog = async (b) => {
    await blogService.create(b);
    dispatch(setNotification(`new blog created : ${b.title}`, 5));
    await getBlogsInDB(user);
  };
  const handleUpdateBlog = async (updatedBlog) => {
    await blogService.update(updatedBlog.id, updatedBlog);
    dispatch(setNotification(`you voted : ${updatedBlog.title}`, 5));
    await getBlogsInDB(user);
  };

  //RETURN
  return (
    <div>
      {user === null ? (
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      ) : (
        <BlogContainer
          user={user}
          blogs={blogs}
          handleNewBlog={handleNewBlog}
          handleLogout={handleLogout}
          getBlogsInDB={getBlogsInDB}
          handleUpdateBlog={handleUpdateBlog}
        />
      )}
    </div>
  );
};

export default App;
