import axios from "axios";

/** set the base URL for axios requests */
const customAxios = (contentType) => {
  const axiosInstance = axios.create({
    baseURL: "https://wild-blossom-garden.org/api",
    withCredentials: "true",
    headers: {
      "Content-Type": contentType,
    },
  });
  return axiosInstance;
};

export default customAxios;
