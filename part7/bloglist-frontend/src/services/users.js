import axios from "axios";
const baseUrl = "/api/users";

const getUsers = async () => {
  try {
    const request = await axios.get(baseUrl);
    return request.data;
  } catch (error) {
    console.log(error);
  }
};

const getUser = async (id) => {
  try {
    const request = await axios.get(`${baseUrl}/${id}`);
    return request.data;
  } catch (error) {
    console.log(error);
  }
};

export default { getUser,getUsers };
