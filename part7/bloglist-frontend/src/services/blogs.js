import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  try {
    const config = {
      headers: { Authorization: token },
    };

    const request = await axios.get(baseUrl);
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

    const request = await axios.post(baseUrl, newObject, config);
    return request.data;
  } catch (error) {
    console.log("front service", error);
  }
};

const update = async (id, newObject) => {
  try {
    const config = {
      headers: { Authorization: token },
    };

    const request = await axios.put(`${baseUrl}/${id}`, newObject, config);
    return request.data;
  } catch (error) {
    console.log(error);
  }
};

const updateComment = async (id, comment) => {
  try {
    const config = {
      headers: { Authorization: token },
    };

    const request = await axios.put(
      `${baseUrl}/${id}/comments`,
      comment,
      config
    );
    return request.data;
  } catch (error) {
    console.log(error);
  }
};

const remove = async (id) => {
  try {
    const config = {
      headers: { Authorization: token },
    };

    const request = axios.delete(`${baseUrl}/${id}`, config);
    return request.data;
  } catch (error) {
    console.log(error);
  }
};

export default { getAll, create, update, updateComment, remove, setToken };
