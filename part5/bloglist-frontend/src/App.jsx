import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsernname] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  //GET USERS'S BLOGS FROM API
  useEffect(() => {
    const getBlogsReq = async (u) => {
      if (user) {
        return await blogService.getAll(u).then((blogs) => setBlogs(blogs));
      } else {
        return null;
      }
    };
    getBlogsReq(user);
  }, [user]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      setUser(user);
      setUsernname("");
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

  //RETURN
  if (user === null) {
    return (
      <>
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsernname(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </>
    );
  }
  return (
    <div>
      <h2>blogs</h2>

      <p>{user.name} logged in</p>

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
