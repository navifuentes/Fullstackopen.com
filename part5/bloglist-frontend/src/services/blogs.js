import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async (u) => {
  try {
    const request = await axios.get(baseUrl, {
      headers: { authorization: "Bearer " + u.token },
    });
    return request.data;
  } catch (error) {
    console.log(error);
  }
};

const create = async (newObject) => {
  const config = {
    header: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};

export default { getAll, create, update, setToken };
