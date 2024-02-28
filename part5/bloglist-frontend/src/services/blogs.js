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
  try {
    const config = {
      headers: { Authorization: token },
    };
    const response = await axios.post(baseUrl, newObject, config);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const update = (id, newObject) => {
  try {
    const config = {
      headers: { Authorization: token },
    };
    const request = axios.put(`${baseUrl}/${id}`, newObject, config);
    return request.then((response) => response.data);
  } catch (error) {
    console.log(error);
  }
};
const remove = (id) => {
  try {
    const config = {
      headers: { Authorization: token },
    };
    const request = axios.delete(`${baseUrl}/${id}`, config);
    return request.then((response) => response.data);
  } catch (error) {
    console.log(error);
  }
};

export default { getAll, create, update, remove, setToken };
