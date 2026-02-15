import axios from "axios";

/** set the base URL for axios requests */
const api = axios.create({
  baseURL:
    "http://ec2-175-41-212-25.ap-northeast-1.compute.amazonaws.com:8080/api",
  //  "http://localhost:8080/api",
  // "http://ec2-54-250-2-23.ap-northeast-1.compute.amazonaws.com:8080/api",
  // "http://ecommerce-rest-api-2025.ap-northeast-1.elasticbeanstalk.com/api",
  withCredentials: "true",
});

export default api;
