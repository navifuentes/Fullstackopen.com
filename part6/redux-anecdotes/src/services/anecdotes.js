import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const resposne = await axios.get(baseUrl);
  return resposne.data;
};

const createNew = async (content) => {
  const object = { content, votes: 0 };
  const response = await axios.post(baseUrl, object);
  return response.data;
};

const updateVote = async (id) => {
  const anecdotesInDB = await getAll();
  const foundAnecdote = anecdotesInDB.find((a) => a.id === id);
  const object = {
    ...foundAnecdote,
    votes: foundAnecdote.votes + 1,
  };
  const response = await axios.put(`${baseUrl}/${id}`, object);
  return response.data;
};

export default { getAll, createNew, updateVote };
