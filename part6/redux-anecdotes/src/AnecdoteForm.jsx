import React from "react";
import { useDispatch } from "react-redux";
import anecdoteReducer, { createAnecdote } from "./reducers/anecdoteReducer";
import notificationReducer, {
  setNotification,
  removeNotification,
} from "./reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = (e) => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    e.target.anecdote.value = "";
    dispatch({ type: "anecdotes/createAnecdote", payload: content });
    dispatch({
      type: "notification/setNotification",
      payload: `you created a new anecdote !`,
    });
    setTimeout(() => {
      dispatch({
        type: "notification/removeNotification",
        payload: "",
      });
    }, 5000);
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
