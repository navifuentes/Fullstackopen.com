import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import AnecdoteForm from "./AnecdoteForm";
import AnecdoteList from "./AnecdoteList";
import Filter from "./Filter";
import Notification from "./components/Notification";
import { initializeAnecdotes } from "./reducers/anecdoteReducer";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAnecdotes());
  }, []);

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
