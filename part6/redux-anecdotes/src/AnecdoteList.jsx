import React from "react";
import { useSelector, useDispatch } from "react-redux";
import anecdoteReducer, { voteAnecdote } from "./reducers/anecdoteReducer";

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
  const dispatch = useDispatch();
  return (
    <>
      {anecdotesList.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button
              onClick={() =>
                dispatch({
                  type: "anecdotes/voteAnecdote",
                  payload: anecdote.id,
                })
              }
            >
              vote
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
