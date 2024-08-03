import axios from "axios";

const Api = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_URI}`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
export default Api;
