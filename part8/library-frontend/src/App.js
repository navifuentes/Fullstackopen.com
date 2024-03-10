import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useApolloClient } from "@apollo/client";
import { useSubscription } from "@apollo/client";
import { BOOK_ADDED } from "./queries";

//COMPONENTS
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import Recommend from "./components/Recommend";

const App = () => {
  const [token, setToken] = useState(null);
  const client = useApolloClient();

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      console.log(data.data);
      window.alert(`New book added from App.js!`);
    },
  });

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      setToken(token);
    } else if (!token) {
      setToken(null);
    }
  }, [token]);

  if (!token) {
    return (
      <div>
        <h2>Login</h2>
        <LoginForm setToken={setToken}></LoginForm>
      </div>
    );
  }

  return (
    <Router>
      <Link to={"/"}>
        <button>authors</button>
      </Link>
      <Link to={"/books"}>
        <button>books</button>
      </Link>
      <Link to={"/books/add"}>
        <button>add book</button>
      </Link>
      <Link to={"/recommend"}>
        <button>recommend</button>
      </Link>
      <button onClick={logout}>Logout</button>
      <Routes>
        <Route path="/" element={<Authors />} />
        <Route path="/books" element={<Books />} />
        <Route path="/books/add" element={<NewBook />} />
        <Route path="/recommend" element={<Recommend />} />
      </Routes>
    </Router>
  );
};

export default App;
