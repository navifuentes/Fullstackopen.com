import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { voteAnecdote } from "./reducers/anecdoteReducer";

const AnecdoteList = () => {
  const anecdotesList = useSelector(({ anecdotes, filter }) => {
    const sorted = anecdotes.sort((a, b) => b.votes - a.votes);

    return filter === ""
      ? sorted
      : sorted.filter((a) => a.content.includes(filter));
  });
  const dispatch = useDispatch();
  return (
    <>
      {anecdotesList.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => dispatch(voteAnecdote(anecdote.id))}>
              vote
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
