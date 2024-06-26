import React from "react";
import { useSelector, useDispatch } from "react-redux";
import anecdoteReducer, { voteAnecdote } from "./reducers/anecdoteReducer";
import notificationReducer, {
  setNotification
} from "./reducers/notificationReducer";

const AnecdoteList = () => {
  const dispatch = useDispatch();

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

  const handleVote = async (anecdote) => {
    dispatch(voteAnecdote(anecdote.id));
    dispatch(setNotification(`you voted: ${anecdote.content}`, 5))
  };

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
