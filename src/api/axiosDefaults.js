import axios from "axios";

/** set the base URL for axios requests */
const api = axios.create({
  baseURL: "https://wild-blossom-garden.org/api",
  withCredentials: "true",
});

export default api;
