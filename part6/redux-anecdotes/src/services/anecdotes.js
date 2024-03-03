import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const resposne = await axios.get(baseUrl);
  return resposne.data;
};

export default { getAll };
