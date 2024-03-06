import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

//COMPONENTS
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";

const App = () => {
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
      <Routes>
        <Route path="/" element={<Authors />} />
        <Route path="/books" element={<Books />} />
        <Route path="/books/add" element={<NewBook />} />
      </Routes>
    </Router>
  );
};

export default App;
