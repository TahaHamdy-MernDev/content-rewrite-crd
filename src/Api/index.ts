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
export default Api;
