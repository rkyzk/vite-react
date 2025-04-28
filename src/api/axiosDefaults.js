import axios from "axios";

/** set the base URL for axios requests */
const api = axios.create({
  baseURL: "http://localhost:8080/api",
  withCredentials: true,
});

export default api;
