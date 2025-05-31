import axios from "axios";

/** set the base URL for axios requests */
const api = axios.create({
  baseURL: "http://localhost:8080/api",
  // "http://ecommerce-rest-api-2025.ap-northeast-1.elasticbeanstalk.com/api",
  withCredentials: true,
});

export default api;
