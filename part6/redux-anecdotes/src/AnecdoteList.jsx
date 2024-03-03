import React from "react";
import { useSelector, useDispatch } from "react-redux";
import anecdoteReducer, { voteAnecdote } from "./reducers/anecdoteReducer";
import notificationReducer, {
  setNotification,
  removeNotification,
} from "./reducers/notificationReducer";

const AnecdoteList = () => {
  const filterContent = (array, filter) => {
    const lowerCaseFilter = filter.toLowerCase();
    return array.filter((a) =>
      a.content.toLowerCase().includes(lowerCaseFilter)
    );
  };

  const anecdotesList = useSelector(({ anecdotes, filter }) => {
    const sorted = [...anecdotes].sort((a, b) => b.votes - a.votes);
    return filter === "" ? sorted : filterContent(sorted, filter);
  });
  const handleVote = (anecdote) => {
    dispatch({
      type: "anecdotes/voteAnecdote",
      payload: anecdote.id,
    });
    dispatch({
      type: "notification/setNotification",
      payload: `you voted : ${anecdote.content}`,
    });
    setTimeout(() => {
      dispatch({
        type: "notification/removeNotification",
        payload: "",
      });
    }, 5000);
  };

  const dispatch = useDispatch();
  return (
    <>
      {anecdotesList.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
