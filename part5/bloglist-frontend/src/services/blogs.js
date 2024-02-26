import axios from "axios";
const baseUrl = "/api/blogs";

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

export default { getAll };
