import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useApolloClient } from "@apollo/client";
import { useSubscription } from "@apollo/client";
import { BOOK_ADDED, ALL_BOOKS } from "./queries";

//COMPONENTS
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import Recommend from "./components/Recommend";

export const updateCache = (cache, query, addedBook) => {
  const uniqByName = (a) => {
    let seen = new Set();
    return a.filter((item) => {
      let k = item.title;
      return seen.has(k) ? false : seen.add(k);
    });
  };

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqByName(allBooks.concat(addedBook)),
    };
  });
};

const App = () => {
  const [token, setToken] = useState(null);
  const client = useApolloClient();

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded;
      window.alert(`${addedBook.title} by ${addedBook.author.name} added`);
      updateCache(client.cache, { query: ALL_BOOKS }, addedBook);
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
