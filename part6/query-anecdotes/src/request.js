import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

export const getAnecdotes = () => axios.get(baseUrl).then((res) => res.data);

export const createNew = (newAnecdote) =>
  axios.post(baseUrl, newAnecdote).then((res) => res.data);

export const updateVote = (updatedNote) =>
  axios
    .put(`${baseUrl}/${updatedNote.id}`, updatedNote)
    .then((res) => res.data);
