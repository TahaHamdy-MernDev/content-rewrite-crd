import axios from "axios";
import CookiesService from "../services/CookiesService";


const Api = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_URI}`,
  headers: {
    "Content-Type": "application/json",
	"token": CookiesService.get("authToken")
  },
  withCredentials: true,
});
Api.interceptors.request.use(
  (config) => {
    const token = CookiesService.get("authToken");
    if (token) {
      config.headers["token"] = `${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default Api;
