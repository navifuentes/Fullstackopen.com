import { useState, useEffect } from "react";

import blogService from "./services/blogs";
import loginService from "./services/login";
import LoginForm from "./components/forms/LoginForm";
import BlogContainer from "./components/BlogContainer";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

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
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
    console.log("logging in with", username, password);
  };
  const handleLogout = async (e) => {
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
  };
  const handleNewBlog = async (b) => {
    await blogService.create(b);
    await getBlogsInDB(user);
  };
  const handleUpdateBlog = async (updatedBlog) => {
    await blogService.update(updatedBlog.id, updatedBlog);
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
          errorMessage={errorMessage}
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
