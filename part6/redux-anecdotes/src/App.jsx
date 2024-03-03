import React from "react";
import AnecdoteForm from "./AnecdoteForm";
import AnecdoteList from "./AnecdoteList";
import Filter from "./Filter";
import Notification from "./components/Notification";

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
