import axios from "axios";

/** set the base URL for axios requests */
const customAxios = (contentType) => {
  const axiosInstance = axios.create({
    //baseURL: "https://wild-blossom-garden.org/api",
    baseURL: "http://localhost:8080/api",
    // "http://ec2-54-250-2-23.ap-northeast-1.compute.amazonaws.com:8080/api",
    withCredentials: "true",
    headers: {
      "Content-Type": contentType,
    },
  });
  return axiosInstance;
};

export default customAxios;
